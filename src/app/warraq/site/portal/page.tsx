'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Package, Loader2, AlertCircle, User } from 'lucide-react';

const supabase = createClient(
  'https://rpxqzpfhbtuavrkeevnm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJweHF6cGZoYnR1YXZya2Vldm5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NDk4NzUsImV4cCI6MjA4OTMyNTg3NX0.9aeEqYSi5MbuBRkvJO_1yoX8UrFAqvEvhML5AB7AEmM'
);

const statusMap: Record<string, { label: string; color: string }> = {
  new:         { label: 'جديد',       color: '#6366F1' },
  in_progress: { label: 'قيد العمل',   color: '#F59E0B' },
  ready:       { label: 'جاهز',       color: '#22C55E' },
  delivered:   { label: 'تم التسليم',  color: '#10B981' },
  cancelled:   { label: 'ملغي',       color: '#EF4444' },
};

function PortalContent({ token }: { token: string }) {
  const [customer, setCustomer] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPortal() {
      try {
        const { data: portal } = await supabase
          .from('customer_portals')
          .select('*, customers(id, name, phone)')
          .eq('token', token)
          .eq('is_active', true)
          .maybeSingle();
        if (!portal || !portal.customers) {
          setError('البوابة غير موجودة أو غير نشطة');
          setLoading(false);
          return;
        }
        setCustomer(portal.customers);
        const { data: customerOrders } = await supabase
          .from('orders')
          .select('*, services(name, price)')
          .eq('customer_id', portal.customers.id)
          .eq('owner_id', portal.user_id)
          .order('created_at', { ascending: false });
        setOrders(customerOrders || []);
      } catch {
        setError('حدث خطأ أثناء تحميل البيانات');
      } finally {
        setLoading(false);
      }
    }
    fetchPortal();
  }, [token]);

  return (
    <>
      {loading && (
        <div className="clay-card" style={{ textAlign: 'center', padding: 48 }}>
          <Loader2 size={36} style={{ color: 'var(--w-gold)', animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: 16, color: 'var(--w-text-sec)' }}>جاري التحميل...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      )}
      {error && (
        <div className="clay-card" style={{ textAlign: 'center', padding: 48 }}>
          <AlertCircle size={40} style={{ color: '#EF4444', marginBottom: 12 }} />
          <h3 style={{ color: '#EF4444', marginBottom: 8 }}>{error}</h3>
          <p style={{ fontSize: 14, color: 'var(--w-text-muted)' }}>تواصل مع المكتبة للحصول على رابط صالح</p>
        </div>
      )}
      {customer && (
        <>
          <div className="clay-card" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              background: 'linear-gradient(135deg, var(--w-gold), var(--w-gold-light))',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <User size={26} style={{ color: '#fff' }} />
            </div>
            <div>
              <h2 style={{ fontSize: 20, marginBottom: 2 }}>{customer.name}</h2>
              {customer.phone && (
                <p style={{ fontSize: 14, color: 'var(--w-text-muted)' }}>{customer.phone}</p>
              )}
            </div>
          </div>
          <div className="clay-card clay-stat" style={{ marginBottom: 20 }}>
            <div className="clay-stat-number">{orders.length}</div>
            <div className="clay-stat-label">طلب مسجّل</div>
          </div>
          <h3 style={{ marginBottom: 16, fontSize: 17 }}>الطلبات</h3>
          {orders.length === 0 ? (
            <div className="clay-card" style={{ textAlign: 'center', padding: 32 }}>
              <Package size={32} style={{ color: 'var(--w-text-muted)', marginBottom: 8 }} />
              <p style={{ color: 'var(--w-text-muted)' }}>لا توجد طلبات حالياً</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {orders.map((order, i) => {
                const status = statusMap[order.status] || statusMap.new;
                return (
                  <div key={order.id || i} className="clay-card" style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <h4 style={{ fontSize: 16, fontWeight: 700 }}>{order.title || `طلب #${i + 1}`}</h4>
                      <span className="clay-status" style={{ background: `${status.color}10`, color: status.color, fontSize: 12 }}>
                        {status.label}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 13, color: 'var(--w-text-sec)' }}>
                      {order.total_price != null && (
                        <span>💰 {Number(order.total_price).toLocaleString()} د.ع</span>
                      )}
                      {order.created_at && (
                        <span>📅 {new Date(order.created_at).toLocaleDateString('ar-IQ')}</span>
                      )}
                    </div>
                    {order.services && (
                      <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {(Array.isArray(order.services) ? order.services : [order.services]).map((svc: any, j: number) => (
                          <span key={j} className="clay-tag" style={{ fontSize: 12, padding: '4px 10px' }}>
                            {svc.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </>
  );
}

function PortalInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get('t') || '';

  return (
    <div className="w-container" style={{ padding: '40px 24px', maxWidth: 700 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 32, fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
        بوابة الزبون
      </h1>
      {!token ? (
        <div className="clay-card" style={{ textAlign: 'center', padding: 48 }}>
          <AlertCircle size={40} style={{ color: 'var(--w-text-muted)', marginBottom: 12 }} />
          <h3 style={{ marginBottom: 8 }}>لا يوجد رمز بوابة</h3>
          <p style={{ fontSize: 14, color: 'var(--w-text-muted)' }}>استخدم الرابط الذي حصلت عليه من المكتبة</p>
        </div>
      ) : (
        <PortalContent token={token} />
      )}
    </div>
  );
}

export default function PortalPage() {
  return (
    <Suspense fallback={
      <div className="w-container" style={{ padding: '40px 24px', maxWidth: 700, textAlign: 'center' }}>
        <Loader2 size={36} style={{ color: 'var(--w-gold)', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    }>
      <PortalInner />
    </Suspense>
  );
}
