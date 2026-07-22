'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Check, AlertCircle, Loader2, Upload, CreditCard, Lock, User, Mail, Phone,
  CheckCircle, Copy, ShieldCheck, Navigation, Droplet, Zap, ArrowLeft, LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const supabase = createClient(
  'https://rpxqzpfhbtuavrkeevnm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJweHF6cGZoYnR1YXZya2Vldm5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NDk4NzUsImV4cCI6MjA4OTMyNTg3NX0.9aeEqYSi5MbuBRkvJO_1yoX8UrFAqvEvhML5AB7AEmM'
);

interface DriverPlan {
  id: string;
  name: string;
  price_iqd: number;
  daily_order_limit: number;
  features: string[];
  duration_days: number;
}

export default function DeliveryAppPage() {
  const [plans, setPlans] = useState<DriverPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<DriverPlan | null>(null);
  const [step, setStep] = useState<'info' | 'auth' | 'checkout' | 'success'>('info');
  
  // Auth state
  const [user, setUser] = useState<any>(null);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Checkout state
  const [paymentMethod, setPaymentMethod] = useState<'zain_cash' | 'qi_card' | 'fib' | 'asia_hawala'>('zain_cash');
  const [paymentReference, setPaymentReference] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  
  const [checkoutError, setCheckoutError] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    async function fetchPlans() {
      try {
        const { data, error } = await supabase
          .from('driver_subscription_plans')
          .select('*')
          .order('price_iqd', { ascending: true });

        if (error) throw error;
        
        const freePlan: DriverPlan = {
          id: 'free',
          name: 'الباقة المجانية',
          price_iqd: 0,
          daily_order_limit: 3,
          features: ['حد أقصى 3 طلبات يومياً', 'أولوية اعتيادية لتلقي الطلبات', 'استخدام الخريطة والتتبع الأساسي'],
          duration_days: 30
        };

        setPlans([freePlan, ...(data || [])]);
      } catch (err) {
        console.error('Error fetching plans:', err);
      } finally {
        setLoadingPlans(false);
      }
    }

    fetchPlans();

    return () => subscription.unsubscribe();
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      if (authTab === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setUser(data.user);
        
        // If free plan is selected, activate directly
        if (selectedPlan && selectedPlan.price_iqd === 0) {
           await supabase
             .from('delivery_drivers')
             .update({ subscription_plan: 'free', is_active: true })
             .eq('user_id', data.user.id);
           setStep('success');
        } else {
           setStep('checkout');
        }
      } else {
        if (!fullName.trim()) throw new Error('يرجى إدخال الاسم الكامل');
        if (!phoneNumber.trim()) throw new Error('يرجى إدخال رقم الهاتف');
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { 
            data: { 
              full_name: fullName,
              phone: phoneNumber
            } 
          }
        });
        if (error) throw error;
        if (data.user) {
          // Link delivery driver profile
          await supabase.from('delivery_drivers').insert({
            user_id: data.user.id,
            full_name: fullName,
            phone_number: phoneNumber,
            is_active: selectedPlan?.price_iqd === 0, // active immediately if free
            subscription_plan: selectedPlan?.price_iqd === 0 ? 'free' : 'none'
          });
          setUser(data.user);
          
          if (selectedPlan?.price_iqd === 0) {
             setStep('success');
          } else {
             setStep('checkout');
          }
        } else {
          setAuthError('يرجى مراجعة بريدك الإلكتروني لتأكيد التسجيل.');
        }
      }
    } catch (err: any) {
      setAuthError(err.message || 'حدث خطأ ما في التحقق من البيانات');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setStep('info');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (file.size > 5 * 1024 * 1024) {
        setCheckoutError('حجم الملف كبير جداً. الحد الأقصى هو 5 ميغابايت.');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setCheckoutError('نوع الملف غير صالح. يرجى رفع صورة فقط.');
        return;
      }

      setReceiptFile(file);
      setCheckoutError('');
      
      const reader = new FileReader();
      reader.onload = () => {
        setReceiptPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError('');
    
    if (!selectedPlan) return;
    if (!user) {
      setStep('auth');
      return;
    }

    if (!amountPaid.trim()) {
      setCheckoutError('يرجى إدخال المبلغ الفعلي المحول');
      return;
    }
    
    const paidAmountNum = parseFloat(amountPaid);
    if (isNaN(paidAmountNum) || paidAmountNum < selectedPlan.price_iqd) {
      setCheckoutError(`مبلغ التحويل غير كافٍ. يجب دفع مبلغ لا يقل عن ${selectedPlan.price_iqd.toLocaleString()} د.ع لهذه الباقة.`);
      return;
    }

    if (!receiptFile) {
      setCheckoutError('يرجى رفع صورة إيصال الدفع كإثبات على عملية التحويل');
      return;
    }

    setCheckoutLoading(true);

    try {
      const { data: driver } = await supabase
        .from('delivery_drivers')
        .select('id')
        .eq('user_id', user.id)
        .single();
        
      if (!driver) {
         throw new Error('لم يتم العثور على حساب كابتن توصيل مرتبط بهذا البريد.');
      }

      const fileExt = receiptFile.name.split('.').pop();
      const fileName = `receipts/driver_${user.id}_${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('order-files')
        .upload(fileName, receiptFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw new Error('فشل رفع صورة الإيصال: ' + uploadError.message);

      const { data: { publicUrl } } = supabase.storage
        .from('order-files')
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase
        .from('driver_subscription_requests')
        .insert({
          driver_id: driver.id,
          plan_id: selectedPlan.id,
          status: 'pending',
          payment_method: paymentMethod,
          transaction_number: paymentReference.trim() || 'RECEIPT_UPLOADED',
        });

      if (insertError) throw insertError;
      
      setStep('success');
    } catch (err: any) {
      setCheckoutError(err.message || 'حدث خطأ أثناء معالجة طلب الاشتراك');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const getPaymentDetails = () => {
    switch (paymentMethod) {
      case 'zain_cash':
        return {
          title: 'زين كاش (Zain Cash)',
          number: '0780 123 4567',
          instructions: 'قم بتحويل القيمة المطلوبة للمحفظة عبر تطبيق زين كاش أو أقرب وكيل معتمد.'
        };
      case 'qi_card':
        return {
          title: 'كي كارد (Qi Card)',
          number: '0750 555 1234',
          instructions: 'قم بتحويل المبلغ إلى رقم المحفظة الموضح أعلاه عبر تطبيق خدمات كي كارد.'
        };
      case 'fib':
        return {
          title: 'البنك العراقي الأول (FIB)',
          number: '+964770 987 6543',
          instructions: 'قم بالتحويل المباشر إلى رقم الحساب الموضح أعلاه عبر تطبيق FIB.'
        };
      case 'asia_hawala':
        return {
          title: 'آسيا حوالة',
          number: '0780 111 2233',
          instructions: 'قم بتحويل المبلغ المطلوب لمحفظة آسيا حوالة الموضحة أعلاه.'
        };
    }
  };

  return (
    <div className="w-container" style={{ padding: '60px 24px', minHeight: '80vh', position: 'relative' }}>
      
      {/* Background Blurs */}
      <div style={{ position: 'absolute', top: 50, right: '10%', width: 250, height: 250, background: 'rgba(99,102,241,0.12)', filter: 'blur(120px)', borderRadius: '50%', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: 100, left: '5%', width: 250, height: 250, background: 'rgba(245,158,11,0.08)', filter: 'blur(120px)', borderRadius: '50%', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        
        {/* User Info Bar if logged in */}
        {user && step !== 'success' && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--w-bg-subtle)', padding: '12px 20px', borderRadius: '16px', marginBottom: '32px', border: '1px solid var(--w-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ShieldCheck size={18} style={{ color: 'var(--w-primary)' }} />
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>مسجّل ككابتن توصيل: <strong style={{ color: 'var(--w-text)' }}>{user.email}</strong></span>
            </div>
            <button onClick={handleLogout} className="w-btn" style={{ padding: '6px 14px', fontSize: '0.8125rem', background: 'rgba(239,68,68,0.1)', color: '#EF4444', gap: 6, height: 32 }}>
              <LogOut size={14} /> خروج
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          
          {/* ═══ STEP 1: INFO & PLANS ═══ */}
          {step === 'info' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} key="info">
              
              <div style={{ textAlign: 'center', marginBottom: 50 }}>
                <span className="w-tag" style={{ background: 'rgba(99,102,241,0.1)', color: '#6366F1', padding: '6px 14px', borderRadius: 99, fontSize: 13, fontWeight: 700 }}>تطبيق ورّاق كابتن 🏍️</span>
                <h1 className="w-section-title" style={{ marginTop: 16, marginBottom: 12 }}>كن شريك التوصيل الأول في العراق</h1>
                <p className="w-section-subtitle" style={{ maxWidth: 650, margin: '0 auto' }}>
                  تطبيق كباتن ورّاق يتيح لك توصيل الكتب والمطبوعات للمناطق القريبة بأسهل الأدوات الجغرافية وأعلى سرعة، وبنموذج اشتراك مميز دون استقطاع أي عمولة من قيمة توصيلتك!
                </p>
              </div>

              {/* Bento Core features for rider */}
              <div className="w-bento-grid" style={{ marginBottom: 60, gap: 20 }}>
                <div className="w-col-span-4 w-card-glass" style={{ padding: 24 }}>
                  <Navigation size={28} style={{ color: '#6366F1', marginBottom: 12 }} />
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>تتبع GPS متقدم وحي</h3>
                  <p style={{ fontSize: 13, color: 'var(--w-text-sec)', lineHeight: 1.6 }}>حساب تراكمي للمسافة المقطوعة تلقائياً مع خريطة توضح بؤر الطلبات النشطة والساخنة.</p>
                </div>
                <div className="w-col-span-4 w-card-glass" style={{ padding: 24 }}>
                  <Droplet size={28} style={{ color: '#EF4444', marginBottom: 12 }} />
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>تسجيل مصاريف الوقود</h3>
                  <p style={{ fontSize: 13, color: 'var(--w-text-sec)', lineHeight: 1.6 }}>تتبع استهلاك وقود الدراجة أو المركبة يدوياً، وحساب الهامش الحقيقي لأرباحك اليومية بكشف PDF.</p>
                </div>
                <div className="w-col-span-4 w-card-glass" style={{ padding: 24 }}>
                  <Zap size={28} style={{ color: '#F59E0B', marginBottom: 12 }} />
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>صفر % عمولات! 💰</h3>
                  <p style={{ fontSize: 13, color: 'var(--w-text-sec)', lineHeight: 1.6 }}>كامل تكلفة التوصيل (3,500 د.ع وأكثر) تذهب لجيبك مباشرة! لا نستقطع أي فلس من أرباحك.</p>
                </div>
              </div>

              {/* Why subscription? self-sustaining explanation */}
              <div className="w-card-glass" style={{ padding: 32, borderRadius: 20, marginBottom: 50, border: '1px solid rgba(99,102,241,0.2)', background: 'rgba(99,102,241,0.02)' }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#6366F1', marginBottom: 10, textAlign: 'center' }}>نموذج التمويل الذاتي كباتن وراق 🤝</h3>
                <p style={{ fontSize: 14, color: 'var(--w-text-sec)', lineHeight: 1.8, textAlign: 'center', maxWidth: 750, margin: '0 auto' }}>
                  لكي نحافظ على منصة وراق <strong>مجانية تماماً للمكتبات (أصحاب الأعمال) والطلاب (الزبائن) دون أي عمولات إضافية أو إعلانات مزعجة</strong>، يقوم التطبيق على اشتراكات شهرية رمزية وثابتة فقط لأسطول المندوبين.
                  هذا الاشتراك يغطي مصاريف الخرائط الجغرافية والسيرفرات الحية ويمنحك وصولاً مباشراً لمئات طلبات المطبوعات يومياً.
                </p>
              </div>

              {/* Plans section */}
              <h2 className="w-section-title" style={{ fontSize: 20, textAlign: 'center', marginBottom: 30 }}>خطط اشتراك الكباتن</h2>
              
              {loadingPlans ? (
                <div style={{ textAlign: 'center', padding: 40 }}>
                  <Loader2 size={36} className="animate-spin" style={{ color: 'var(--w-primary)', margin: '0 auto' }} />
                  <p style={{ marginTop: 12, fontSize: 14, color: 'var(--w-text-sec)' }}>جاري جلب خطط الكباتن...</p>
                </div>
              ) : (
                <div className="w-bento-grid" style={{ gap: 24 }}>
                  {plans.map((plan) => {
                    const isFree = plan.price_iqd === 0;
                    const isDiamond = plan.daily_order_limit > 50;
                    const accent = isFree ? '#94A3B8' : isDiamond ? '#6366F1' : '#F59E0B';
                    return (
                      <div key={plan.id} className="w-col-span-4" style={{ display: 'flex' }}>
                        <div className="w-card-glass" style={{ width: '100%', padding: 24, display: 'flex', flexDirection: 'column', border: `1px solid ${accent}40`, position: 'relative' }}>
                          {isDiamond && (
                            <span style={{ position: 'absolute', top: 16, left: 16, backgroundColor: accent, color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6 }}>الباقة المفضلة</span>
                          )}
                          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--w-text)', marginBottom: 4 }}>{plan.name}</h3>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, margin: '12px 0' }}>
                            <span style={{ fontSize: 24, fontWeight: 800, color: accent }}>{isFree ? 'مجاني' : plan.price_iqd.toLocaleString()}</span>
                            {!isFree && <span style={{ fontSize: 12, color: 'var(--w-text-muted)' }}>د.ع / شهرياً</span>}
                          </div>
                          
                          <div style={{ height: 1, backgroundColor: 'var(--w-border)', margin: '14px 0' }} />
                          
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1, marginBottom: 20 }}>
                            {plan.features?.map((f, i) => (
                              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--w-text-sec)', textAlign: 'right' }}>
                                <Check size={12} style={{ color: accent, flexShrink: 0 }} />
                                <span>{f}</span>
                              </div>
                            ))}
                          </div>

                          <button 
                            className="w-btn" 
                            style={{ width: '100%', backgroundColor: accent, color: '#fff', fontWeight: 700, height: 44, borderRadius: 10 }}
                            onClick={async () => { 
                              setSelectedPlan(plan); 
                              if (user) {
                                 if (plan.price_iqd === 0) {
                                    await supabase
                                      .from('delivery_drivers')
                                      .update({ subscription_plan: 'free', is_active: true })
                                      .eq('user_id', user.id);
                                    setStep('success');
                                 } else {
                                    setStep('checkout');
                                 }
                              } else {
                                 setStep('auth');
                              }
                            }}
                          >
                            {isFree ? 'البدء مجاناً' : 'اشترك الآن'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </motion.div>
          )}

          {/* ═══ STEP 2: AUTHENTICATION ═══ */}
          {step === 'auth' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} key="auth" style={{ maxWidth: 450, margin: '0 auto' }}>
              <button onClick={() => setStep('info')} className="w-btn w-btn-outline" style={{ gap: 8, padding: '8px 16px', marginBottom: 24, fontSize: 13, height: 36 }}>
                <ArrowLeft size={16} /> تراجع
              </button>

              <div className="clay-card" style={{ padding: 32 }}>
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>تسجيل الدخول للكابتن</h2>
                  <p style={{ fontSize: 13, color: 'var(--w-text-sec)' }}>اشترك وسجل الدفع لتنشيط حسابك في تطبيق المندوب</p>
                </div>

                <div style={{ display: 'flex', borderBottom: '1px solid var(--w-border)', marginBottom: 20 }}>
                  <button 
                    onClick={() => { setAuthTab('login'); setAuthError(''); }}
                    style={{ flex: 1, padding: 12, border: 'none', background: 'none', fontSize: 14, fontWeight: authTab === 'login' ? 700 : 500, color: authTab === 'login' ? 'var(--w-primary)' : 'var(--w-text-sec)', borderBottom: authTab === 'login' ? '2px solid var(--w-primary)' : 'none', cursor: 'pointer' }}
                  >
                    تسجيل دخول
                  </button>
                  <button 
                    onClick={() => { setAuthTab('signup'); setAuthError(''); }}
                    style={{ flex: 1, padding: 12, border: 'none', background: 'none', fontSize: 14, fontWeight: authTab === 'signup' ? 700 : 500, color: authTab === 'signup' ? 'var(--w-primary)' : 'var(--w-text-sec)', borderBottom: authTab === 'signup' ? '2px solid var(--w-primary)' : 'none', cursor: 'pointer' }}
                  >
                    حساب جديد
                  </button>
                </div>

                {authError && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', padding: 12, borderRadius: 10, color: '#EF4444', fontSize: 12, marginBottom: 16 }}>
                    <AlertCircle size={16} style={{ flexShrink: 0 }} />
                    <p style={{ flex: 1, textAlign: 'right' }}>{authError}</p>
                  </div>
                )}

                <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {authTab === 'signup' && (
                    <>
                      <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--w-text-sec)', marginBottom: 6, textAlign: 'right' }}>الاسم الثلاثي الكامل</label>
                        <div style={{ position: 'relative' }}>
                          <User size={16} style={{ position: 'absolute', top: 14, right: 12, color: 'var(--w-text-muted)' }} />
                          <input 
                            type="text" 
                            className="w-input" 
                            style={{ paddingRight: 36, width: '100%', height: 44, fontSize: 13 }}
                            placeholder="علي محمد كاظم"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--w-text-sec)', marginBottom: 6, textAlign: 'right' }}>رقم الهاتف المعتمد</label>
                        <div style={{ position: 'relative' }}>
                          <Phone size={16} style={{ position: 'absolute', top: 14, right: 12, color: 'var(--w-text-muted)' }} />
                          <input 
                            type="tel" 
                            className="w-input" 
                            style={{ paddingRight: 36, width: '100%', height: 44, fontSize: 13 }}
                            placeholder="07XXXXXXXX"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--w-text-sec)', marginBottom: 6, textAlign: 'right' }}>البريد الإلكتروني</label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={16} style={{ position: 'absolute', top: 14, right: 12, color: 'var(--w-text-muted)' }} />
                      <input 
                        type="email" 
                        className="w-input" 
                        style={{ paddingRight: 36, width: '100%', height: 44, fontSize: 13 }}
                        placeholder="example@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--w-text-sec)', marginBottom: 6, textAlign: 'right' }}>كلمة المرور</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={16} style={{ position: 'absolute', top: 14, right: 12, color: 'var(--w-text-muted)' }} />
                      <input 
                        type="password" 
                        className="w-input" 
                        style={{ paddingRight: 36, width: '100%', height: 44, fontSize: 13 }}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-btn w-btn-primary" 
                    style={{ width: '100%', height: 44, marginTop: 10, gap: 8 }}
                    disabled={authLoading}
                  >
                    {authLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : authTab === 'login' ? (
                      'تسجيل الدخول'
                    ) : (
                      'إنشاء حساب كابتن جديد'
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* ═══ STEP 3: CHECKOUT ═══ */}
          {step === 'checkout' && selectedPlan && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} key="checkout">
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <button onClick={() => setStep('info')} className="w-btn w-btn-outline" style={{ gap: 8, padding: '8px 16px', fontSize: 13, height: 36 }}>
                  <ArrowLeft size={16} /> تراجع للخطط
                </button>
                <h2 style={{ fontSize: 18, fontWeight: 700 }}>سداد قيمة باقة الكابتن 💸</h2>
              </div>

              <div className="w-bento-grid" style={{ gap: 24 }}>
                
                {/* Billing Summary Box */}
                <div className="w-col-span-4">
                  <div className="clay-card" style={{ padding: 24, height: '100%' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, borderBottom: '1px solid var(--w-border)', paddingBottom: 10 }}>ملخص الفاتورة</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                        <span style={{ color: 'var(--w-text-sec)' }}>الباقة المختارة:</span>
                        <strong style={{ color: 'var(--w-text)' }}>{selectedPlan.name}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                        <span style={{ color: 'var(--w-text-sec)' }}>المدة:</span>
                        <strong style={{ color: 'var(--w-text)' }}>{selectedPlan.duration_days} يوم</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                        <span style={{ color: 'var(--w-text-sec)' }}>العمولات المستقطعة:</span>
                        <strong style={{ color: '#10B981' }}>0% (كامل العائد لك)</strong>
                      </div>
                      <div style={{ height: 1, backgroundColor: 'var(--w-border)', margin: '4px 0' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16 }}>
                        <span style={{ fontWeight: 700 }}>المبلغ الإجمالي للدفع:</span>
                        <strong style={{ color: 'var(--w-primary)', fontSize: 18 }}>{selectedPlan.price_iqd.toLocaleString()} د.ع</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Payment & Upload Details */}
                <div className="w-col-span-8">
                  <div className="clay-card" style={{ padding: 32 }}>
                    
                    {checkoutError && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', padding: 12, borderRadius: 10, color: '#EF4444', fontSize: 12, marginBottom: 20 }}>
                        <AlertCircle size={16} style={{ flexShrink: 0 }} />
                        <p style={{ flex: 1, textAlign: 'right' }}>{checkoutError}</p>
                      </div>
                    )}

                    <form onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      
                      {/* Payment network tab */}
                      <div>
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 8, textAlign: 'right' }}>1. اختر الشبكة المالية</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 10 }}>
                          {(['zain_cash', 'qi_card', 'fib', 'asia_hawala'] as const).map((method) => {
                            const active = paymentMethod === method;
                            return (
                              <button
                                key={method}
                                type="button"
                                onClick={() => setPaymentMethod(method)}
                                style={{
                                  padding: '12px 8px', borderRadius: 12, border: active ? '2px solid var(--w-primary)' : '1px solid var(--w-border)',
                                  background: active ? 'var(--w-bg-subtle)' : 'transparent',
                                  color: active ? 'var(--w-primary)' : 'var(--w-text-sec)',
                                  fontSize: 12, fontWeight: 700, cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s'
                                }}
                              >
                                {method === 'zain_cash' ? 'زين كاش' : method === 'qi_card' ? 'كي كارد' : method === 'fib' ? 'First FIB' : 'آسيا حوالة'}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Instructions */}
                      <div style={{ background: 'var(--w-bg-subtle)', padding: 16, borderRadius: 12, border: '1px solid var(--w-border)' }}>
                        <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--w-text)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end' }}>
                          {getPaymentDetails()?.title}
                          <CreditCard size={14} style={{ color: 'var(--w-primary)' }} />
                        </h4>
                        <p style={{ fontSize: 12, color: 'var(--w-text-sec)', lineHeight: 1.6, textAlign: 'right', marginBottom: 12 }}>{getPaymentDetails()?.instructions}</p>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--w-bg)', padding: '10px 14px', borderRadius: 8, border: '1px dashed var(--w-border)' }}>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(getPaymentDetails()?.number || '', 'wallet_no')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: 'var(--w-text-sec)', fontSize: 12 }}
                          >
                            <Copy size={13} />
                            {copiedText === 'wallet_no' ? 'تم النسخ!' : 'نسخ الرقم'}
                          </button>
                          <strong style={{ fontSize: 14, letterSpacing: 0.5, color: 'var(--w-text)' }}>{getPaymentDetails()?.number}</strong>
                        </div>
                      </div>

                      {/* Transaction Fields */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--w-text-sec)', marginBottom: 6, textAlign: 'right' }}>رقم العملية / الحوالة</label>
                          <input 
                            type="text" 
                            className="w-input" 
                            style={{ height: 44, width: '100%', fontSize: 13, textAlign: 'right' }}
                            placeholder="مثال: 98721102"
                            value={paymentReference}
                            onChange={(e) => setPaymentReference(e.target.value)}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--w-text-sec)', marginBottom: 6, textAlign: 'right' }}>المبلغ المحوّل الفعلي (د.ع)</label>
                          <input 
                            type="number" 
                            className="w-input" 
                            style={{ height: 44, width: '100%', fontSize: 13, textAlign: 'right', fontWeight: 700 }}
                            placeholder={selectedPlan.price_iqd.toString()}
                            value={amountPaid}
                            onChange={(e) => setAmountPaid(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {/* Receipt Upload */}
                      <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--w-text-sec)', marginBottom: 6, textAlign: 'right' }}>2. ارفع صورة الإيصال أو التحويل</label>
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          style={{ display: 'none' }}
                          accept="image/*"
                          onChange={handleFileChange}
                        />

                        {receiptPreview ? (
                          <div style={{ position: 'relative', width: '100%', height: 160, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--w-border)' }}>
                            <img src={receiptPreview} alt="Receipt preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <button 
                              type="button" 
                              onClick={() => { setReceiptFile(null); setReceiptPreview(null); }}
                              style={{ position: 'absolute', top: 10, right: 10, backgroundColor: '#EF4444', color: '#fff', border: 'none', borderRadius: 8, padding: '4px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
                            >
                              إزالة وصورة أخرى
                            </button>
                          </div>
                        ) : (
                          <div 
                            onClick={() => fileInputRef.current?.click()}
                            style={{ width: '100%', border: '2px dashed var(--w-border)', borderRadius: 12, padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', background: 'var(--w-bg-subtle)', transition: 'all 0.15s' }}
                          >
                            <Upload size={22} style={{ color: 'var(--w-text-muted)' }} />
                            <span style={{ fontSize: 12, fontWeight: 700 }}>انقر لرفع صورة الإشعار أو إشعار الإيداع</span>
                            <span style={{ fontSize: 10, color: 'var(--w-text-muted)' }}>صيغ صور مدعومة، حجم أقصى 5 ميغابايت</span>
                          </div>
                        )}
                      </div>

                      {/* Submit button */}
                      <button 
                        type="submit" 
                        className="w-btn w-btn-primary" 
                        style={{ width: '100%', height: 48, borderRadius: 12, fontWeight: 700, fontSize: 14, gap: 8, marginTop: 10 }}
                        disabled={checkoutLoading}
                      >
                        {checkoutLoading ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <>
                            <Lock size={15} />
                            تأكيد التحويل وإرسال للإشراف المالي
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>

              </div>

            </motion.div>
          )}

          {/* ═══ STEP 4: SUCCESS ═══ */}
          {step === 'success' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} key="success" style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
              <div className="clay-card" style={{ padding: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                  <CheckCircle size={44} style={{ color: '#10B981' }} />
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 800 }}>
                  {selectedPlan?.price_iqd === 0 ? 'تم تنشيط الباقة المجانية! 🎉' : 'تم إرسال الطلب للمطابقة بنجاح! 🎉'}
                </h2>
                <p style={{ fontSize: 14, color: 'var(--w-text-sec)', lineHeight: 1.7, marginBottom: 12 }}>
                  {selectedPlan?.price_iqd === 0 
                    ? 'تم ربط وتنشيط الباقة المجانية لحسابك بنجاح. يمكنك الآن فتح تطبيق كباتن وراق والبدء باستقبال طلبات التوصيل القريبة فوراً (بحد أقصى ٣ طلبات باليوم).'
                    : 'لقد استلم مشرفو النظام المالي حوالة الاشتراك الخاصة بك. سنقوم بفحص رقم العملية ومطابقة إيصال الرفع لتنشيط حسابك في تطبيق الكابتن وراق فوراً (بحد أقصى ٣ ساعات في أوقات العمل).'
                  }
                </p>
                <Link href="/warraq/site" className="w-btn w-btn-primary" style={{ width: '100%', height: 44, borderRadius: 10 }}>
                  العودة للرئيسية للمنصة
                </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
