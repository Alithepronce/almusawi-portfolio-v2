'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Check, AlertCircle, Loader2, Upload, CreditCard, Lock, User, Mail, 
  CheckCircle, Copy, HelpCircle, ArrowLeft, LogOut, ShieldCheck, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const supabase = createClient(
  'https://rpxqzpfhbtuavrkeevnm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJweHF6cGZoYnR1YXZya2Vldm5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NDk4NzUsImV4cCI6MjA4OTMyNTg3NX0.9aeEqYSi5MbuBRkvJO_1yoX8UrFAqvEvhML5AB7AEmM'
);

interface Plan {
  id: string;
  name: string;
  name_ar: string;
  description: string;
  price: number;
  annual_price: number;
  duration_days: number;
  features: string[];
  is_active: boolean;
  sort_order: number;
  plan_type?: string;
}

export default function PricingPage() {
  const [allPlans, setAllPlans] = useState<Plan[]>([]);
  const [plansType, setPlansType] = useState<'shop' | 'customer'>('shop');
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [step, setStep] = useState<'plans' | 'auth' | 'checkout' | 'success'>('plans');
  
  // Auth state
  const [user, setUser] = useState<any>(null);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Checkout state
  const [libraryName, setLibraryName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'zain_cash' | 'qi_card' | 'fib'>('zain_cash');
  const [paymentReference, setPaymentReference] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  
  const [checkoutError, setCheckoutError] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    // Fetch active plans
    async function fetchPlans() {
      try {
        const { data, error } = await supabase
          .from('subscription_plans')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (error) throw error;
        
        setAllPlans(data || []);
      } catch (err) {
        console.error('Error fetching plans:', err);
      } finally {
        setLoadingPlans(false);
      }
    }

    fetchPlans();

    return () => subscription.unsubscribe();
  }, []);

  // Filter plans dynamically based on plan_type and price > 0
  useEffect(() => {
    const filtered = allPlans.filter(p => (p.plan_type || 'shop') === plansType && Number(p.price) > 0);
    setPlans(filtered);
  }, [allPlans, plansType]);

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
        setStep('checkout');
      } else {
        if (!fullName.trim()) throw new Error('يرجى إدخال الاسم الكامل');
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } }
        });
        if (error) throw error;
        if (data.user) {
          setUser(data.user);
          setStep('checkout');
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
    setStep('plans');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Security Check: Size (max 5MB) and type
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

    const price = isAnnual ? selectedPlan.annual_price : selectedPlan.price;

    // Security & Financial Validation
    if (plansType === 'shop' && !libraryName.trim()) {
      setCheckoutError('يرجى إدخال اسم المكتبة / المتجر');
      return;
    }
    if (plansType === 'customer' && !libraryName.trim()) {
      setCheckoutError('يرجى إدخال الاسم الكامل / اسم الطالب');
      return;
    }
    if (!amountPaid.trim()) {
      setCheckoutError('يرجى إدخال المبلغ الفعلي المحول');
      return;
    }
    
    const paidAmountNum = parseFloat(amountPaid);
    if (isNaN(paidAmountNum) || paidAmountNum < price) {
      setCheckoutError(`مبلغ التحويل غير كافٍ. يجب دفع مبلغ لا يقل عن ${price.toLocaleString()} د.ع لهذه الباقة.`);
      return;
    }

    if (!receiptFile) {
      setCheckoutError('يرجى رفع صورة إيصال الدفع كإثبات على عملية التحويل');
      return;
    }

    setCheckoutLoading(true);

    try {
      // 1. Upload receipt image to Supabase Storage in 'order-files' bucket under 'receipts' folder
      const fileExt = receiptFile.name.split('.').pop();
      const fileName = `receipts/${user.id}_${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('order-files')
        .upload(fileName, receiptFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw new Error('فشل رفع صورة الإيصال: ' + uploadError.message);

      // Get public URL of the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('order-files')
        .getPublicUrl(fileName);

      // 2. Insert subscription request into subscriptions table
      // Calculated expires_at based on plan duration
      const durationDays = isAnnual ? 365 : selectedPlan.duration_days;
      
      const { error: insertError } = await supabase
        .from('subscriptions')
        .insert({
          owner_id: user.id,
          plan_id: selectedPlan.id,
          status: 'pending',
          payment_method: paymentMethod,
          payment_reference: paymentReference.trim() || null,
          amount_paid: paidAmountNum,
          receipt_image: publicUrl
        });

      if (insertError) throw insertError;

      // 3. Update metadata full name or shop info in public profiles if needed
      // (Optional: can create a shop template with pending status)
      
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
          number: '07811699202',
          instructions: 'قم بتحويل القيمة المطلوبة للمحفظة عبر تطبيق زين كاش أو أقرب وكيل معتمد.'
        };
      case 'qi_card':
        return {
          title: 'سوبر كي (Super Qi)',
          number: '07811699202',
          instructions: 'قم بتحويل المبلغ إلى رقم المحفظة / الكارت الموضح أعلاه عبر تطبيق خدمات سوبر كي.'
        };
      case 'fib':
        return {
          title: 'البنك العراقي للتجارة (FIB)',
          number: '+9647767625001',
          instructions: 'قم بالتحويل البنكي المباشر إلى رقم الحساب الموضح أعلاه عبر تطبيق FIB.'
        };
    }
  };

  return (
    <div className="w-container" style={{ padding: '60px 24px', minHeight: '80vh', position: 'relative' }}>
      
      {/* Background Blurs */}
      <div style={{ position: 'absolute', top: 50, right: '10%', width: 250, height: 250, background: 'rgba(37,99,235,0.12)', filter: 'blur(120px)', borderRadius: '50%', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: 100, left: '5%', width: 250, height: 250, background: 'rgba(249,115,22,0.08)', filter: 'blur(120px)', borderRadius: '50%', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        
        {/* User Info Bar if logged in */}
        {user && step !== 'success' && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--w-bg-subtle)', padding: '12px 20px', borderRadius: '16px', marginBottom: '32px', border: '1px solid var(--w-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ShieldCheck size={18} style={{ color: 'var(--w-primary)' }} />
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>مسجّل كمالك متجر: <strong style={{ color: 'var(--w-text)' }}>{user.email}</strong></span>
            </div>
            <button onClick={handleLogout} className="w-btn" style={{ padding: '6px 14px', fontSize: '0.8125rem', background: 'rgba(239,68,68,0.1)', color: '#EF4444', gap: 6, height: 32 }}>
              <LogOut size={14} /> خروج
            </button>
          </div>
        )}

        {/* ═══ STEP 1: PLANS LISTING ═══ */}
        {step === 'plans' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div style={{ textAlign: 'center', marginBottom: 50 }}>
              <h1 className="w-section-title" style={{ marginBottom: 16 }}>خطط الاشتراك والأسعار</h1>
              
              {/* Plans Type Toggle Selector */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 28 }}>
                <button
                  onClick={() => { setPlansType('shop'); setSelectedPlan(null); }}
                  className={`w-btn ${plansType === 'shop' ? 'w-btn-primary' : 'w-btn-outline'}`}
                  style={{ borderRadius: 99, padding: '10px 24px', fontSize: '0.9rem', fontWeight: 700 }}
                >
                  💼 اشتراكات المكتبات (الأدمن)
                </button>
                <button
                  onClick={() => { setPlansType('customer'); setSelectedPlan(null); }}
                  className={`w-btn ${plansType === 'customer' ? 'w-btn-primary' : 'w-btn-outline'}`}
                  style={{ borderRadius: 99, padding: '10px 24px', fontSize: '0.9rem', fontWeight: 700 }}
                >
                  👑 اشتراكات الزبائن والطلاب
                </button>
              </div>

              <p className="w-section-subtitle" style={{ margin: '0 auto 32px' }}>
                {plansType === 'shop'
                  ? 'اختر الباقة الأنسب لحجم مطبعتك وافتح المزايا الاحترافية لورّاق.'
                  : 'اختر الباقة الأنسب لاحتياجات دراستك وافتح مزايا ورّاق بريميوم الفريدة لطباعة أسرع ونقاط مضاعفة.'}
              </p>
              
              {/* Billing Cycle Toggle */}
              <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--w-bg-subtle)', padding: 6, borderRadius: '9999px', border: '1px solid var(--w-border)' }}>
                <button 
                  onClick={() => setIsAnnual(false)} 
                  style={{
                    padding: '8px 24px', borderRadius: '9999px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.9375rem',
                    background: !isAnnual ? 'var(--w-text)' : 'transparent',
                    color: !isAnnual ? '#fff' : 'var(--w-text-sec)',
                    transition: 'all 0.2s'
                  }}
                >
                  شهرياً
                </button>
                <button 
                  onClick={() => setIsAnnual(true)} 
                  style={{
                    padding: '8px 24px', borderRadius: '9999px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.9375rem',
                    background: isAnnual ? 'var(--w-text)' : 'transparent',
                    color: isAnnual ? '#fff' : 'var(--w-text-sec)',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                >
                  سنوياً
                  <span style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#EF4444', color: '#fff', fontSize: '0.6875rem', fontWeight: 800, padding: '2px 8px', borderRadius: 99, whiteSpace: 'nowrap' }}>خصم 20% 🔥</span>
                </button>
              </div>
            </div>

            {loadingPlans ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px 0' }}>
                <Loader2 size={40} style={{ color: 'var(--w-primary)', animation: 'spin 1s linear infinite' }} />
                <p style={{ marginTop: 16, color: 'var(--w-text-sec)' }}>جاري جلب الباقات المحدثة...</p>
                <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
              </div>
            ) : (
              <div className="w-bento-grid" style={{ gap: 24 }}>
                {plans.map((plan) => {
                  const isPro = plan.name === 'pro';
                  const price = isAnnual ? plan.annual_price : plan.price;
                  const cycleText = isAnnual ? 'سنوياً' : 'شهرياً';
                  const saveText = isAnnual ? `وفرت ${(plan.price * 12 - plan.annual_price).toLocaleString()} د.ع` : null;

                  return (
                    <div 
                      key={plan.id} 
                      className="w-col-span-4" 
                      style={{ display: 'flex' }}
                    >
                      <div 
                        className="w-card-glass" 
                        style={{ 
                          width: '100%',
                          display: 'flex', 
                          flexDirection: 'column',
                          position: 'relative',
                          border: isPro ? '2px solid var(--w-primary)' : '1px solid var(--w-border)',
                          transform: isPro ? 'scale(1.02)' : 'none',
                          boxShadow: isPro ? '0 12px 40px rgba(37,99,235,0.08)' : 'var(--w-shadow-glass)'
                        }}
                      >
                        {isPro && (
                          <div style={{ position: 'absolute', top: 16, left: 24, background: 'var(--w-primary)', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '4px 12px', borderRadius: 99 }}>
                            الأكثر شعبية
                          </div>
                        )}

                        <div style={{ marginBottom: 24 }}>
                          <span className="w-pill" style={{ marginBottom: 12, background: isPro ? 'rgba(37,99,235,0.1)' : 'transparent', color: isPro ? 'var(--w-primary)' : 'inherit' }}>
                            {plan.name_ar}
                          </span>
                          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 8 }}>{plan.description}</h3>
                          
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 16 }}>
                            <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--w-text)' }}>
                              {price.toLocaleString()}
                            </span>
                            <span style={{ fontSize: '0.875rem', color: 'var(--w-text-sec)', fontWeight: 600 }}>
                              د.ع / {cycleText}
                            </span>
                          </div>
                          {saveText && (
                            <span style={{ fontSize: '0.8125rem', color: '#10B981', fontWeight: 600, display: 'block', marginTop: 4 }}>
                              🎉 {saveText}
                            </span>
                          )}
                        </div>

                        {/* Features List */}
                        <div style={{ flex: 1, marginBottom: 32 }}>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {plan.features.map((feat, i) => (
                              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.9375rem', color: 'var(--w-text-sec)' }}>
                                <span style={{ 
                                  width: 18, height: 18, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', 
                                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22C55E', flexShrink: 0, marginTop: 2
                                }}>
                                  <Check size={12} strokeWidth={3} />
                                </span>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button 
                          onClick={() => {
                            setSelectedPlan(plan);
                            setStep(user ? 'checkout' : 'auth');
                          }}
                          className={`w-btn ${isPro ? 'w-btn-blue' : 'w-btn-outline'}`}
                          style={{ width: '100%', borderRadius: 16 }}
                        >
                          اشترك الآن
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* ═══ STEP 2: USER LOGIN / REGISTRATION ═══ */}
        {step === 'auth' && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ maxWidth: 480, margin: '0 auto' }}>
            
            <button onClick={() => setStep('plans')} className="w-btn w-btn-outline" style={{ padding: '8px 16px', fontSize: '0.875rem', gap: 6, marginBottom: 24, border: 'none' }}>
              <ArrowLeft size={16} /> العودة للباقات
            </button>

            <div className="w-card-glass" style={{ padding: '40px 32px' }}>
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 8 }}>خطوة واحدة للبدء</h2>
                <p style={{ color: 'var(--w-text-sec)', fontSize: '0.9375rem' }}>يجب تسجيل الدخول أو إنشاء حساب لربط اشتراك مكتبتك.</p>
              </div>

              {/* Login/Signup Tabs */}
              <div style={{ display: 'flex', background: 'var(--w-bg-subtle)', padding: 4, borderRadius: 12, border: '1px solid var(--w-border)', marginBottom: 24 }}>
                <button 
                  onClick={() => setAuthTab('login')} 
                  style={{
                    flex: 1, padding: '10px 0', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem',
                    background: authTab === 'login' ? 'var(--w-bg)' : 'transparent',
                    color: authTab === 'login' ? 'var(--w-text)' : 'var(--w-text-sec)',
                    boxShadow: authTab === 'login' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  تسجيل الدخول
                </button>
                <button 
                  onClick={() => setAuthTab('signup')} 
                  style={{
                    flex: 1, padding: '10px 0', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem',
                    background: authTab === 'signup' ? 'var(--w-bg)' : 'transparent',
                    color: authTab === 'signup' ? 'var(--w-text)' : 'var(--w-text-sec)',
                    boxShadow: authTab === 'signup' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  إنشاء حساب جديد
                </button>
              </div>

              <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {authTab === 'signup' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: 8 }}>الاسم الكامل</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="text" 
                        className="w-input" 
                        placeholder="الاسم الأول والأخير" 
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        style={{ paddingRight: 44 }}
                      />
                      <User size={18} style={{ position: 'absolute', top: 17, right: 16, color: 'var(--w-text-muted)' }} />
                    </div>
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: 8 }}>البريد الإلكتروني</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="email" 
                      className="w-input" 
                      placeholder="name@example.com" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      style={{ paddingRight: 44, direction: 'ltr', textAlign: 'right' }}
                    />
                    <Mail size={18} style={{ position: 'absolute', top: 17, right: 16, color: 'var(--w-text-muted)' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: 8 }}>كلمة المرور</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="password" 
                      className="w-input" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      style={{ paddingRight: 44, direction: 'ltr', textAlign: 'right' }}
                    />
                    <Lock size={18} style={{ position: 'absolute', top: 17, right: 16, color: 'var(--w-text-muted)' }} />
                  </div>
                </div>

                {authError && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: 'rgba(239,68,68,0.08)', borderRadius: 12, border: '1px solid rgba(239,68,68,0.15)', color: '#EF4444', fontSize: '0.875rem' }}>
                    <AlertCircle size={16} style={{ flexShrink: 0 }} />
                    <span>{authError}</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={authLoading}
                  className="w-btn w-btn-primary" 
                  style={{ width: '100%', borderRadius: 16, marginTop: 8 }}
                >
                  {authLoading ? (
                    <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                  ) : authTab === 'login' ? 'تسجيل الدخول ومتابعة' : 'إنشاء الحساب ومتابعة'}
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* ═══ STEP 3: CHECKOUT & PAYMENT DETAILS ═══ */}
        {step === 'checkout' && selectedPlan && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ maxWidth: 1000, margin: '0 auto' }}>
            
            <button onClick={() => setStep('plans')} className="w-btn w-btn-outline" style={{ padding: '8px 16px', fontSize: '0.875rem', gap: 6, marginBottom: 24, border: 'none' }}>
              <ArrowLeft size={16} /> تغيير الباقة
            </button>

            <div className="w-bento-grid" style={{ gap: 32 }}>
              
              {/* Checkout Form */}
              <div className="w-col-span-8">
                <div className="w-card-glass" style={{ padding: 32 }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 24 }}>تفاصيل الاشتراك والدفع</h2>
                  
                  <form onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    
                    {/* Store Info */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: 8 }}>
                        {plansType === 'shop' ? 'اسم المكتبة / المتجر' : 'الاسم الكامل / اسم الطالب'}
                      </label>
                      <input 
                        type="text" 
                        className="w-input" 
                        placeholder={plansType === 'shop' ? 'مثال: مطبعة التميز السريعة' : 'مثال: علي موفق'}
                        value={libraryName}
                        onChange={e => setLibraryName(e.target.value)}
                        required
                      />
                    </div>

                    {/* Payment Method Selector */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: 12 }}>وسيلة الدفع المحلية</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                        {(['zain_cash', 'qi_card', 'fib'] as const).map(method => {
                          const isActive = paymentMethod === method;
                          const name = method === 'zain_cash' ? 'زين كاش' : method === 'qi_card' ? 'سوبر كي' : 'FIB';
                          return (
                            <button
                              key={method}
                              type="button"
                              onClick={() => {
                                setPaymentMethod(method);
                                setCheckoutError('');
                              }}
                              style={{
                                padding: '16px 8px', borderRadius: 16, cursor: 'pointer', fontWeight: 700, fontSize: '0.9375rem',
                                border: isActive ? '2px solid var(--w-primary)' : '1px solid var(--w-border)',
                                background: isActive ? 'rgba(37,99,235,0.04)' : 'transparent',
                                color: isActive ? 'var(--w-primary)' : 'var(--w-text-sec)',
                                transition: 'all 0.2s',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 8
                              }}
                            >
                              <CreditCard size={20} />
                              {name}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Transfer details and copy */}
                    <div style={{ background: 'var(--w-bg-subtle)', padding: 20, borderRadius: 20, border: '1px solid var(--w-border)' }}>
                      <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, marginBottom: 12, color: 'var(--w-text)' }}>معلومات تحويل الأموال لـ {getPaymentDetails()?.title}</h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--w-text-sec)', marginBottom: 16 }}>{getPaymentDetails()?.instructions}</p>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--w-bg)', padding: '10px 16px', borderRadius: 12, border: '1px solid var(--w-border)' }}>
                        <span style={{ fontSize: '0.875rem', color: 'var(--w-text-sec)' }}>رقم محفظة التحويل:</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontWeight: 800, fontFamily: 'monospace', direction: 'ltr', fontSize: '1.0625rem' }}>{getPaymentDetails()?.number}</span>
                          <button 
                            type="button" 
                            onClick={() => copyToClipboard(getPaymentDetails()?.number || '', 'num')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--w-primary)', display: 'flex', alignItems: 'center' }}
                          >
                            <Copy size={16} />
                          </button>
                        </div>
                      </div>
                      {copiedText === 'num' && (
                        <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600, display: 'block', marginTop: 6, textAlign: 'left' }}>✓ تم نسخ الرقم بنجاح</span>
                      )}
                    </div>

                    {/* Amount Transferred */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: 4 }}>المبلغ الفعلي المحول (د.ع)</label>
                      <span style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--w-text-sec)', marginBottom: 8 }}>
                        يجب إدخال القيمة الحقيقية التي قمت بتحويلها. الحد الأدنى: <strong>{(isAnnual ? selectedPlan.annual_price : selectedPlan.price).toLocaleString()} د.ع</strong>
                      </span>
                      <input 
                        type="number" 
                        className="w-input" 
                        placeholder="أدخل المبلغ بالدينار العراقي" 
                        value={amountPaid}
                        onChange={e => setAmountPaid(e.target.value)}
                        required
                      />
                    </div>

                    {/* Reference ID / ID of transaction */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: 8 }}>رمز التحويل / رقم المعاملة (اختياري)</label>
                      <input 
                        type="text" 
                        className="w-input" 
                        placeholder="الرقم المرجعي المذكور في رسالة التحويل" 
                        value={paymentReference}
                        onChange={e => setPaymentReference(e.target.value)}
                      />
                    </div>

                    {/* File Upload for receipt image */}
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: 8 }}>رفع صورة إيصال التحويل (إجباري)</label>
                      
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/*" 
                        style={{ display: 'none' }} 
                      />
                      
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                          border: '2px dashed var(--w-border)',
                          borderRadius: 20,
                          padding: '32px 24px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          background: 'rgba(15, 23, 42, 0.01)',
                          transition: 'all 0.2s',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 12
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--w-primary)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--w-border)'}
                      >
                        {receiptPreview ? (
                          <div style={{ position: 'relative', width: '100%', maxHeight: 200, display: 'flex', justifyContent: 'center', overflow: 'hidden', borderRadius: 12 }}>
                            <img src={receiptPreview} alt="Receipt Preview" style={{ maxHeight: 200, objectFit: 'contain', borderRadius: 12 }} />
                            <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '0.75rem', padding: '4px 10px', borderRadius: 99, fontWeight: 500 }}>
                              تغيير الصورة
                            </div>
                          </div>
                        ) : (
                          <>
                            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(37,99,235,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--w-primary)' }}>
                              <Upload size={20} />
                            </div>
                            <div>
                              <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--w-text)' }}>اضغط لرفع صورة إيصال الدفع</p>
                              <p style={{ fontSize: '0.8125rem', color: 'var(--w-text-sec)', marginTop: 4 }}>صيغة JPG أو PNG. حجم أقصى 5 ميغابايت.</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {checkoutError && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: 'rgba(239,68,68,0.08)', borderRadius: 12, border: '1px solid rgba(239,68,68,0.15)', color: '#EF4444', fontSize: '0.875rem' }}>
                        <AlertCircle size={16} style={{ flexShrink: 0 }} />
                        <span>{checkoutError}</span>
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={checkoutLoading}
                      className="w-btn w-btn-blue" 
                      style={{ width: '100%', borderRadius: 16, marginTop: 8 }}
                    >
                      {checkoutLoading ? (
                        <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                      ) : 'إرسال طلب الاشتراك للدراسة'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Order Summary Side */}
              <div className="w-col-span-4">
                <div className="w-card-glass" style={{ padding: 32, position: 'sticky', top: 96, borderTop: '4px solid var(--w-primary)' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 20 }}>ملخص الاشتراك</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, borderBottom: '1px solid var(--w-border)', paddingBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--w-text-sec)' }}>الباقة المختارة:</span>
                      <strong style={{ color: 'var(--w-text)' }}>{selectedPlan.name_ar}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--w-text-sec)' }}>دورة الفوترة:</span>
                      <span style={{ fontWeight: 600 }}>{isAnnual ? 'سنوياً (365 يوم)' : 'شهرياً (30 يوم)'}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, marginBottom: 24 }}>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--w-text)' }}>المبلغ الإجمالي المستحق:</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--w-primary)' }}>
                      {(isAnnual ? selectedPlan.annual_price : selectedPlan.price).toLocaleString()} د.ع
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: 10, background: 'rgba(37,99,235,0.04)', padding: '16px', borderRadius: 16, border: '1px solid rgba(37,99,235,0.08)', fontSize: '0.8125rem', color: 'var(--w-text-sec)', lineHeight: 1.6 }}>
                    <ShieldCheck size={20} style={{ color: 'var(--w-primary)', flexShrink: 0, marginTop: 2 }} />
                    <p>
                      <strong>طريقة تفعيل آمنة:</strong> عند إرسال طلب الاشتراك، تتم مراجعة إيصال التحويل بشكل يدوي من قبل الدعم الفني للمطابقة مع محفظة الحساب البنكي، ويتم تنشيط حساب مكتبتكم تلقائياً خلال أقل من ساعتين.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ STEP 4: SUCCESS SCREEN ═══ */}
        {step === 'success' && selectedPlan && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} style={{ maxWidth: 580, margin: '0 auto', textAlign: 'center' }}>
            <div className="w-card-glass" style={{ padding: '60px 40px', borderTop: '4px solid #22C55E' }}>
              <div style={{ 
                width: 80, height: 80, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22C55E', margin: '0 auto 24px auto'
              }}>
                <CheckCircle size={44} />
              </div>

              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 12 }}>تم استلام طلب الاشتراك بنجاح!</h2>
              <p style={{ color: 'var(--w-text-sec)', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: 32 }}>
                شكراً لاشتراكك في منصة <strong>ورّاق</strong>. لقد تم إرسال معلومات التحويل وصورة إيصال الدفع إلى فريق التنشيط بنجاح. 
                سيقوم الدعم الفني بمراجعة المعاملة المالية وتفعيل صلاحيات باقة <strong>{selectedPlan.name_ar}</strong> لحسابكم خلال أقل من ساعتين.
              </p>

              <div style={{ background: 'var(--w-bg-subtle)', padding: 24, borderRadius: 20, border: '1px solid var(--w-border)', textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--w-text)' }}>ماذا تفعل الآن؟</h4>
                <ol style={{ paddingRight: 20, margin: 0, fontSize: '0.875rem', color: 'var(--w-text-sec)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {plansType === 'shop' ? (
                    <>
                      <li>يمكنك تحميل تطبيق <strong>ورّاق أدمن</strong> وتسجيل الدخول بحسابك.</li>
                      <li>بمجرد إتمام تفعيل الاشتراك، سيتحول وضع مكتبتك داخل التطبيق من الوضع المجاني إلى الباقة المفعلة مباشرة.</li>
                    </>
                  ) : (
                    <>
                      <li>يمكنك فتح تطبيق <strong>ورّاق زبون</strong> وتسجيل الدخول بحسابك.</li>
                      <li>بمجرد إتمام تفعيل الاشتراك، ستتحول رتبة حسابك إلى العضوية المميزة مباشرة لتستمتع بالنقاط المضاعفة وميزات الخزانة السحابية.</li>
                    </>
                  )}
                  <li>في حال وجود أي استفسار، يمكنك التواصل مع الدعم الفني مباشرة عبر تيليغرام.</li>
                </ol>
              </div>

              <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                <a href="https://t.me/Jormunghandr" target="_blank" rel="noopener noreferrer" className="w-btn w-btn-outline" style={{ borderRadius: 16 }}>
                  تواصل مع الدعم الفني
                </a>
                <button onClick={() => setStep('plans')} className="w-btn w-btn-primary" style={{ borderRadius: 16 }}>
                  تصفح خطط أخرى
                </button>
              </div>
            </div>
          </motion.div>
        )}
        
      </div>
    </div>
  );
}
