'use client';

/**
 * PHASE-12 — «مسار واحد مرئي» (Journey Rail).
 *
 * القاعدة: لا شاشة بلا جواب عن ثلاثة أسئلة — أين أنا؟ ما التالي؟ ماذا أفعل إن تعثّرت؟
 * الحالة كلها من الخادم (`journey` + جلسة التوثيق) — لا اشتقاق محلي.
 */

import { motion } from 'framer-motion';
import { Check, Loader2, ShieldCheck, Smartphone, Ticket, Download, AlertTriangle } from 'lucide-react';

export type StageKey = 'account' | 'device' | 'subscription' | 'install';
type StageState = 'done' | 'active' | 'pending' | 'blocked';

export interface JourneyRailProps {
  isRtl: boolean;
  signedIn: boolean;
  deviceEnrolled: boolean;
  subscriptionActive: boolean;
  canInstall: boolean;
  /** حالة جلسة التوثيق الجارية — تجعل المحطة الثانية حيّة بدل ساكنة */
  enrollmentStatus?: string;
  enrollmentUdid?: string | null;
  blockedReason?: string | null;
  onStageAction?: (stage: StageKey) => void;
}

const LABELS: Record<StageKey, { ar: string; en: string; icon: typeof Check }> = {
  account: { ar: 'الحساب', en: 'Account', icon: ShieldCheck },
  device: { ar: 'توثيق الجهاز', en: 'Device', icon: Smartphone },
  subscription: { ar: 'الاشتراك', en: 'Subscription', icon: Ticket },
  install: { ar: 'التثبيت', en: 'Install', icon: Download }
};

const ACTION_LABELS: Record<StageKey, { ar: string; en: string }> = {
  account: { ar: 'إنشاء حساب', en: 'Create account' },
  device: { ar: 'توثيق جهازي', en: 'Enroll device' },
  subscription: { ar: 'تفعيل الاشتراك', en: 'Activate' },
  install: { ar: 'تثبيت التطبيق', en: 'Install app' }
};

export function JourneyRail({
  isRtl,
  signedIn,
  deviceEnrolled,
  subscriptionActive,
  canInstall,
  enrollmentStatus,
  enrollmentUdid,
  blockedReason,
  onStageAction
}: JourneyRailProps) {
  const enrollmentInFlight =
    enrollmentStatus === 'created' ||
    enrollmentStatus === 'profile_downloaded' ||
    enrollmentStatus === 'udid_received';
  const enrollmentFailed = enrollmentStatus === 'bind_failed' || enrollmentStatus === 'expired';

  const stages: { key: StageKey; state: StageState; hint: string }[] = [
    {
      key: 'account',
      state: signedIn ? 'done' : 'active',
      hint: signedIn
        ? isRtl ? 'حسابك جاهز' : 'Account ready'
        : isRtl ? 'أنشئ حسابك للبدء' : 'Create your account'
    },
    {
      key: 'device',
      state: deviceEnrolled ? 'done' : enrollmentFailed ? 'blocked' : signedIn || enrollmentInFlight ? 'active' : 'pending',
      hint: deviceEnrolled
        ? isRtl ? 'معرّف جهازك موثّق ومربوط بشهادة' : 'UDID enrolled and bound'
        : enrollmentStatus === 'udid_received'
          ? isRtl ? 'وصل معرّف جهازك — جارٍ الربط' : 'UDID received — binding'
          : enrollmentStatus === 'profile_downloaded'
            ? isRtl ? 'أكمل تثبيت الملف من الإعدادات' : 'Finish installing the profile in Settings'
            : isRtl ? 'ثبّت ملف التوثيق لربط جهازك' : 'Install the profile to bind your device'
    },
    {
      key: 'subscription',
      state: subscriptionActive ? 'done' : deviceEnrolled ? 'active' : 'pending',
      hint: subscriptionActive
        ? isRtl ? 'اشتراكك فعّال' : 'Subscription active'
        : isRtl ? 'فعّل كود اشتراكك أو اختر باقة' : 'Redeem a code or pick a plan'
    },
    {
      key: 'install',
      state: canInstall ? 'active' : 'pending',
      hint: canInstall
        ? isRtl ? 'جاهز — ثبّت المتجر على جهازك' : 'Ready — install the store'
        : isRtl ? 'يفتح بعد إكمال الخطوات السابقة' : 'Unlocks after the previous steps'
    }
  ];

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="mb-8 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
      aria-label={isRtl ? 'مسار تفعيل حسابك' : 'Activation journey'}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-bold tracking-wide text-[#0f766e]">
          {isRtl ? 'مسارك خطوة بخطوة' : 'Your journey'}
        </h2>
        {enrollmentUdid && (
          <span className="truncate font-mono text-[11px] text-gray-400" title={enrollmentUdid}>
            {enrollmentUdid}
          </span>
        )}
      </div>

      <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stages.map((stage, index) => {
          const Icon = LABELS[stage.key].icon;
          const isDone = stage.state === 'done';
          const isActive = stage.state === 'active';
          const isBlocked = stage.state === 'blocked';
          const busy = stage.key === 'device' && enrollmentInFlight && !isDone;

          return (
            <li key={stage.key}>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={[
                  'h-full rounded-2xl border p-3 transition-colors',
                  isDone
                    ? 'border-emerald-300 bg-emerald-50'
                    : isBlocked
                      ? 'border-red-300 bg-red-50'
                      : isActive
                        ? 'border-teal-300 bg-teal-50'
                        : 'border-gray-200 bg-gray-50'
                ].join(' ')}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={[
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                      isDone
                        ? 'bg-emerald-100 text-emerald-700'
                        : isBlocked
                          ? 'bg-red-100 text-red-700'
                          : isActive
                            ? 'bg-teal-100 text-[#0f766e]'
                            : 'bg-gray-200 text-gray-500'
                    ].join(' ')}
                  >
                    {isDone ? (
                      <Check className="h-4 w-4" aria-hidden />
                    ) : busy ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    ) : isBlocked ? (
                      <AlertTriangle className="h-4 w-4" aria-hidden />
                    ) : (
                      <Icon className="h-4 w-4" aria-hidden />
                    )}
                  </span>
                  <span className={`text-xs font-bold ${isDone ? 'text-emerald-800' : isActive ? 'text-[#0f766e]' : 'text-gray-500'}`}>
                    {isRtl ? LABELS[stage.key].ar : LABELS[stage.key].en}
                  </span>
                </div>

                <p className="text-[11px] leading-relaxed text-gray-600">{stage.hint}</p>

                {(isActive || isBlocked) && onStageAction && (
                  <button
                    type="button"
                    onClick={() => onStageAction(stage.key)}
                    className="mt-2 min-h-[36px] w-full rounded-xl bg-[#0f766e] px-3 text-[11px] font-bold text-white transition-colors hover:bg-[#115e59] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f766e]"
                  >
                    {isRtl ? ACTION_LABELS[stage.key].ar : ACTION_LABELS[stage.key].en}
                  </button>
                )}
              </motion.div>
            </li>
          );
        })}
      </ol>

      {blockedReason && !canInstall && (
        <p className="mt-4 rounded-2xl border border-amber-300 bg-amber-50 p-3 text-[12px] leading-relaxed text-amber-800">
          {blockedReason}
        </p>
      )}
    </div>
  );
}
