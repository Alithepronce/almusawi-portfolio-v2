'use client';

/**
 * PHASE-08 — طبقة حالة توثيق الجهاز في الواجهة.
 *
 * القاعدة الحاكمة: **الخادم يملك الحالة، والعميل يعرضها فقط.**
 * كل تخمين سابق (فحص بادئة `00008101-`، واشتقاق `hasRealDevice` في ثلاثة مواضع)
 * كان يسبب انحرافاً بين ما يراه المستخدم وما يعرفه النظام. لا تخمين بعد اليوم.
 *
 * ما يوفّره هذا الـ hook:
 *  - بدء جلسة توثيق (24 ساعة) بدل توكن 10 دقائق،
 *  - استئناف تلقائي من `?s=` بعد عودة المستخدم من إعدادات iOS،
 *  - بث حيّ (SSE) فتتقدّم الشاشة وحدها بلا تحديث يدوي،
 *  - مطالبة الضيف بجلسته بعد التسجيل (claim) — بلا إعادة إدخال الـ UDID،
 *  - `nextStep` تأتي من الخادم: لا شاشة بلا خطوة تالية، ولا طريق مسدود.
 */

import { useCallback, useEffect, useRef, useState } from 'react';

export type EnrollmentStatus =
  | 'idle'
  | 'created'
  | 'profile_downloaded'
  | 'udid_received'
  | 'bound'
  | 'bind_failed'
  | 'expired';

export type NextStep =
  | 'install_profile'
  | 'authenticate'
  | 'binding'
  | 'subscribe'
  | 'install_app'
  | 'contact_support'
  | 'restart';

export interface EnrollmentState {
  status: EnrollmentStatus;
  udid: string | null;
  productName: string | null;
  osVersion: string | null;
  certId: number | null;
  bindError: string | null;
  nextStep: NextStep;
  token: string | null;
  isOwned: boolean;
}

const STORAGE_KEY = 'zmam_enrollment_token';

const EMPTY: EnrollmentState = {
  status: 'idle',
  udid: null,
  productName: null,
  osVersion: null,
  certId: null,
  bindError: null,
  nextStep: 'install_profile',
  token: null,
  isOwned: false
};

function readStoredToken(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeToken(token: string | null) {
  try {
    if (token) localStorage.setItem(STORAGE_KEY, token);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* وضع التصفح الخاص — الجلسة تبقى في الذاكرة فقط */
  }
}

export function useEnrollment(apiBaseUrl: string, authToken: string | null) {
  const [state, setState] = useState<EnrollmentState>(EMPTY);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<EventSource | null>(null);
  const claimedRef = useRef<string | null>(null);

  const applyPayload = useCallback((token: string, payload: any) => {
    setState({
      status: (payload?.status as EnrollmentStatus) || 'created',
      udid: payload?.udid ?? null,
      productName: payload?.product_name ?? null,
      osVersion: payload?.os_version ?? null,
      certId: payload?.cert_id ?? null,
      bindError: payload?.bind_error ?? null,
      nextStep: (payload?.next_step as NextStep) || 'install_profile',
      token,
      isOwned: Boolean(payload?.is_owned)
    });
  }, []);

  /** بث حيّ لحالة الجلسة — يعود إلى الاستطلاع تلقائياً إن تعذّر SSE. */
  const watch = useCallback(
    (token: string) => {
      if (streamRef.current) {
        streamRef.current.close();
        streamRef.current = null;
      }
      try {
        const es = new EventSource(`${apiBaseUrl}/api/enrollment/${encodeURIComponent(token)}/stream`);
        es.onmessage = (evt) => {
          try {
            applyPayload(token, JSON.parse(evt.data));
          } catch {
            /* رسالة نبض */
          }
        };
        es.onerror = () => {
          es.close();
          streamRef.current = null;
        };
        streamRef.current = es;
      } catch {
        /* المتصفح لا يدعم SSE — الاستطلاع الدوري أدناه يغطي الحالة */
      }
    },
    [apiBaseUrl, applyPayload]
  );

  const refresh = useCallback(
    async (token: string) => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/enrollment/${encodeURIComponent(token)}`);
        if (!res.ok) {
          if (res.status === 404) {
            storeToken(null);
            setState(EMPTY);
          }
          return;
        }
        applyPayload(token, await res.json());
      } catch {
        /* الشبكة متقطعة — نحاول في الدورة التالية */
      }
    },
    [apiBaseUrl, applyPayload]
  );

  /** بدء رحلة توثيق جديدة وإعادة رابط ملف التكوين. */
  const start = useCallback(async (): Promise<string | null> => {
    setStarting(true);
    setError(null);
    try {
      const res = await fetch(`${apiBaseUrl}/api/enrollment`, {
        method: 'POST',
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : {}
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'تعذّر بدء جلسة التوثيق');
      storeToken(data.token);
      setState({ ...EMPTY, status: 'created', token: data.token, isOwned: Boolean(authToken) });
      watch(data.token);
      return data.mobileconfig_url as string;
    } catch (e: any) {
      setError(e?.message || 'تعذّر بدء جلسة التوثيق');
      return null;
    } finally {
      setStarting(false);
    }
  }, [apiBaseUrl, authToken, watch]);

  /** مطالبة الضيف بجلسته بعد تسجيل الدخول — تُستدعى تلقائياً عند توفّر الشرطين. */
  const claim = useCallback(
    async (token?: string | null): Promise<{ ok: boolean; error?: string }> => {
      const target = token || state.token || readStoredToken();
      if (!target || !authToken) return { ok: false, error: 'لا توجد جلسة توثيق قابلة للربط' };
      if (claimedRef.current === target) return { ok: true };
      claimedRef.current = target;
      try {
        const res = await fetch(`${apiBaseUrl}/api/enrollment/${encodeURIComponent(target)}/claim`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${authToken}` }
        });
        const data = await res.json();
        await refresh(target);
        if (!res.ok) {
          claimedRef.current = null;
          return { ok: false, error: data?.error || 'تعذّر ربط الجهاز بحسابك' };
        }
        return { ok: true };
      } catch (e: any) {
        claimedRef.current = null;
        return { ok: false, error: e?.message || 'تعذّر ربط الجهاز بحسابك' };
      }
    },
    [apiBaseUrl, authToken, refresh, state.token]
  );

  /** استئناف: من رابط العودة `?s=` أولاً، ثم من التخزين المحلي. */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const fromReturn = params.get('s');
    const token = fromReturn || readStoredToken();
    if (!token) return;
    if (fromReturn) storeToken(fromReturn);
    refresh(token);
    watch(token);
    // تنظيف الرابط: توكن الجلسة لا يبقى معروضاً في شريط العنوان
    if (fromReturn) {
      params.delete('s');
      params.delete('enrolled');
      const qs = params.toString();
      window.history.replaceState({}, '', window.location.pathname + (qs ? `?${qs}` : ''));
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.close();
        streamRef.current = null;
      }
    };
  }, [refresh, watch]);

  /** شبكة أمان: استطلاع دوري ما دامت الجلسة لم تُغلق (يغطي فشل SSE خلف الوسطاء). */
  useEffect(() => {
    const token = state.token;
    if (!token) return;
    if (state.status === 'bound' || state.status === 'expired') return;
    const id = setInterval(() => refresh(token), 5000);
    return () => clearInterval(id);
  }, [state.token, state.status, refresh]);

  /** الضيف الذي وثّق جهازه ثم سجّل: تُربط جلسته تلقائياً بلا تدخل منه. */
  useEffect(() => {
    if (!authToken) return;
    if (!state.token || !state.udid) return;
    if (state.isOwned || state.status === 'bound') return;
    claim(state.token);
  }, [authToken, state.token, state.udid, state.isOwned, state.status, claim]);

  return { enrollment: state, start, claim, refresh, starting, error };
}
