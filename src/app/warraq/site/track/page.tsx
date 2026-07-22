'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Package, Clock, CheckCircle, Truck, Loader2, AlertCircle, Search, Hash, ScanLine } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const supabase = createClient(
  'https://rpxqzpfhbtuavrkeevnm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJweHF6cGZoYnR1YXZya2Vldm5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NDk4NzUsImV4cCI6MjA4OTMyNTg3NX0.9aeEqYSi5MbuBRkvJO_1yoX8UrFAqvEvhML5AB7AEmM'
);

const statusMap: Record<string, { label: string; color: string; icon: typeof Package }> = {
  new:         { label: 'جديد',       color: '#6366F1', icon: Package },
  in_progress: { label: 'قيد العمل',   color: '#F59E0B', icon: Clock },
  ready:       { label: 'جاهز',       color: '#22C55E', icon: CheckCircle },
  delivered:   { label: 'تم التسليم',  color: '#10B981', icon: Truck },
  cancelled:   { label: 'ملغي',       color: '#EF4444', icon: AlertCircle },
};

function TrackContent({ token }: { token: string }) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchOrder() {
      try {
        const { data: tracking } = await supabase
          .from('order_tracking')
          .select('order_id, orders(*, services(name, price), customers(name, phone))')
          .eq('token', token)
          .maybeSingle();
        if (tracking?.orders) {
          setOrder(tracking.orders);
        } else {
          setError('لم يتم العثور على الطلب');
        }
      } catch {
        setError('حدث خطأ أثناء تحميل البيانات');
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [token]);

  const status = order?.status ? statusMap[order.status] || statusMap.new : statusMap.new;
  const StatusIcon = status.icon;
  const statusSteps = ['new', 'in_progress', 'ready', 'delivered'];
  const currentIndex = statusSteps.indexOf(order?.status || 'new');

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <p className="w-pill" style={{ fontFamily: 'monospace', direction: 'ltr' }}>
          <Hash size={14} style={{ marginRight: 6 }} /> {token}
        </p>
      </div>

      {loading && (
        <div className="w-card-glass" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <Loader2 size={40} style={{ color: 'var(--w-primary)', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
          <p style={{ marginTop: 20, color: 'var(--w-text-sec)' }}>جاري تحميل بيانات الطلب بشكل آمن...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      )}

      {error && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-card-glass" style={{ textAlign: 'center', padding: '60px 24px', border: '1px solid rgba(239,68,68,0.2)' }}>
          <div className="w-icon-wrapper" style={{ margin: '0 auto 16px auto', color: '#EF4444', background: 'rgba(239,68,68,0.1)' }}>
            <AlertCircle size={32} />
          </div>
          <h3 style={{ color: '#EF4444', marginBottom: 8 }}>{error}</h3>
          <p style={{ fontSize: 14, color: 'var(--w-text-sec)' }}>يرجى التأكد من صحة رمز التتبع وحاول مرة أخرى.</p>
        </motion.div>
      )}

      {order && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ staggerChildren: 0.1 }}>
          
          <motion.div className="w-card-glass" style={{ textAlign: 'center', marginBottom: 24, padding: '40px 24px' }}>
            <div style={{
              width: 80, height: 80, borderRadius: 24, margin: '0 auto 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `${status.color}15`,
              border: `1px solid ${status.color}30`
            }}>
              <StatusIcon size={36} style={{ color: status.color }} />
            </div>
            <div style={{ background: `${status.color}15`, color: status.color, fontSize: '0.875rem', fontWeight: 600, padding: '8px 20px', borderRadius: 9999, display: 'inline-flex', marginBottom: 16 }}>
              {status.label}
            </div>
            <h2 style={{ fontSize: '1.75rem' }}>{order.title || 'طلب بدون اسم'}</h2>
          </motion.div>

          <div className="w-bento-grid">
            {/* Timeline */}
            <motion.div className="w-card-glass w-col-span-12" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 32 }}>مسار التنفيذ</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'relative' }}>
                <div style={{ position: 'absolute', right: 19, top: 10, bottom: 20, width: 2, background: 'var(--w-border)', zIndex: 0 }} />
                {statusSteps.map((step, i) => {
                  const s = statusMap[step];
                  const isActive = i <= currentIndex;
                  const Icon = s.icon;
                  return (
                    <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 20, zIndex: 1, position: 'relative' }}>
                      <div style={{ 
                        width: 40, height: 40, borderRadius: '50%', background: isActive ? s.color : 'var(--w-bg)', 
                        border: isActive ? 'none' : '2px solid var(--w-border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: isActive ? '#fff' : 'var(--w-text-muted)',
                        flexShrink: 0,
                        boxShadow: isActive ? `0 4px 12px ${s.color}40` : 'none'
                      }}>
                        <Icon size={18} />
                      </div>
                      <div style={{ opacity: isActive ? 1 : 0.4, flex: 1 }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--w-text)' : 'var(--w-text-sec)', margin: 0 }}>{s.label}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div className="w-card-glass w-col-span-12" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 24 }}>ملخص الطلب</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: '1rem' }}>
                {order.customers?.name && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid var(--w-border)' }}>
                    <span style={{ color: 'var(--w-text-sec)' }}>العميل</span>
                    <span style={{ fontWeight: 600 }}>{order.customers.name}</span>
                  </div>
                )}
                {order.total_price != null && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid var(--w-border)' }}>
                    <span style={{ color: 'var(--w-text-sec)' }}>المبلغ الإجمالي</span>
                    <span style={{ fontWeight: 800, color: 'var(--w-primary)' }}>
                      {Number(order.total_price).toLocaleString()} د.ع
                    </span>
                  </div>
                )}
                {order.created_at && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--w-text-sec)' }}>تاريخ البدء</span>
                    <span style={{ fontWeight: 500 }}>{new Date(order.created_at).toLocaleDateString('ar-IQ')}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Services */}
            {order.services && (Array.isArray(order.services) ? order.services : [order.services]).length > 0 && (
              <motion.div className="w-card-glass w-col-span-12" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: 24 }}>الخدمات المضافة</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {(Array.isArray(order.services) ? order.services : [order.services]).map((svc: any, i: number) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--w-bg-subtle)', borderRadius: 16 }}>
                      <span style={{ fontSize: '1rem', fontWeight: 600 }}>{svc.name}</span>
                      {svc.price != null && (
                        <span style={{ fontSize: '0.9375rem', color: 'var(--w-text-sec)', fontWeight: 600 }}>
                          {Number(svc.price).toLocaleString()} د.ع
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
}

function TrackInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get('t') || '';
  const [manualToken, setManualToken] = useState('');

  return (
    <div className="w-container" style={{ padding: '80px 24px', maxWidth: 640 }}>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: 60 }}
      >
        <h1 className="w-section-title" style={{ marginBottom: 16 }}>تتبع الطلب الحي</h1>
        <p className="w-section-subtitle" style={{ margin: '0 auto' }}>تابع حالة طلباتك ومراحل التنفيذ بشفافية مطلقة.</p>
      </motion.div>

      {!token ? (
        <motion.div 
          className="w-card-glass" 
          style={{ textAlign: 'center', padding: '64px 32px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="w-icon-wrapper" style={{ margin: '0 auto 24px auto', width: 80, height: 80, color: 'var(--w-primary)', background: 'rgba(37,99,235,0.1)' }}>
            <ScanLine size={40} />
          </div>
          <h3 style={{ marginBottom: 24, fontSize: '1.5rem' }}>أدخل رمز التتبع</h3>
          <div style={{ display: 'flex', gap: 12, maxWidth: 460, margin: '0 auto' }}>
            <input
              type="text"
              className="w-input"
              placeholder="مثال: abc-123"
              value={manualToken}
              onChange={(e) => setManualToken(e.target.value)}
              style={{ direction: 'ltr', textAlign: 'center', flex: 1 }}
            />
            <Link
              href={manualToken ? `/warraq/site/track?t=${manualToken}` : '#'}
              className="w-btn w-btn-primary"
            >
              بحث
            </Link>
          </div>
          <p style={{ marginTop: 24, fontSize: '0.9375rem', color: 'var(--w-text-muted)' }}>
            أدخل الرمز المرفق أسفل إيصال الطلب والذي يصلك عند إنشاء الطلب.
          </p>
        </motion.div>
      ) : (
        <TrackContent token={token} />
      )}
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={
      <div className="w-container" style={{ padding: '80px 24px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 size={40} style={{ color: 'var(--w-primary)', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    }>
      <TrackInner />
    </Suspense>
  );
}
