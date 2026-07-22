'use client';

import { motion } from 'framer-motion';

interface InteractiveMockupProps {
  type: 'admin' | 'customer';
  imagePath?: string;
}

export function InteractiveMockup({ type, imagePath }: InteractiveMockupProps) {
  const isAdmin = type === 'admin';
  const accentColor = isAdmin ? 'rgba(249, 115, 22, 0.15)' : 'rgba(37, 99, 235, 0.15)';
  const brandColor = isAdmin ? 'var(--w-admin)' : 'var(--w-primary)';
  
  return (
    <motion.div 
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 500,
        margin: '0 auto',
        perspective: 1000
      }}
      initial={{ rotateY: 15, rotateX: 5, opacity: 0, scale: 0.9 }}
      whileInView={{ rotateY: 0, rotateX: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
    >
      {/* Decorative Glow Behind */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '120%',
        height: '120%',
        background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
        zIndex: 0,
        filter: 'blur(40px)',
      }} />

      {/* Mockup Frame */}
      <motion.div 
        className="w-card-glass"
        style={{ 
          position: 'relative', 
          zIndex: 1, 
          padding: 8, 
          borderRadius: 32,
          background: 'rgba(255,255,255,0.95)',
          border: `1px solid rgba(255,255,255,0.8)`,
          boxShadow: `0 20px 40px rgba(0,0,0,0.1), inset 0 1px 1px white`,
          overflow: 'hidden'
        }}
        whileHover={{ y: -8, boxShadow: `0 30px 60px ${accentColor}` }}
      >
        <div style={{ 
          width: '100%', 
          paddingTop: '180%', /* Mobile aspect ratio approx */
          background: '#F8FAFC', 
          borderRadius: 24, 
          position: 'relative',
          overflow: 'hidden' 
        }}>
          
          {/* Detailed Mock UI Elements */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
            
            {/* Contextual Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: brandColor, opacity: 0.9, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                  {isAdmin ? 'إ' : 'ع'}
                </div>
                <div>
                  <div style={{ fontSize: 13, color: '#64748b', marginBottom: 2 }}>{isAdmin ? 'مرحباً بعودتك' : 'صباح الخير'}</div>
                  <div style={{ fontSize: 16, fontWeight: 'bold', color: '#0f172a' }}>{isAdmin ? 'مدير النظام' : 'محمد علي'}</div>
                </div>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #64748b' }} />
              </div>
            </div>
            
            {/* Primary Stat Card */}
            <motion.div 
              style={{ padding: 20, borderRadius: 20, background: '#fff', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div style={{ fontSize: 14, color: '#64748b', marginBottom: 8 }}>{isAdmin ? 'إجمالي المبيعات (اليوم)' : 'رصيد المحفظة'}</div>
              <div style={{ fontSize: 28, fontWeight: '800', color: brandColor }}>{isAdmin ? '1,450 د.ع' : '50,000 د.ع'}</div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 12 }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 600 }}>+12% {isAdmin ? 'عن الأمس' : 'استرداد نقدي'}</span>
              </div>
            </motion.div>
            
            {/* Horizontal Mini Cards */}
            <div style={{ display: 'flex', gap: 12 }}>
              <motion.div 
                style={{ flex: 1, padding: 16, borderRadius: 16, background: brandColor, color: '#fff' }} 
                initial={{ y: 20, opacity: 0 }} 
                whileInView={{ y: 0, opacity: 1 }} 
                transition={{ delay: 0.4 }}
              >
                <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>{isAdmin ? 'طلبات جديدة' : 'طلباتي النشطة'}</div>
                <div style={{ fontSize: 22, fontWeight: 'bold' }}>{isAdmin ? '24' : '2'}</div>
              </motion.div>
              <motion.div 
                style={{ flex: 1, padding: 16, borderRadius: 16, background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} 
                initial={{ y: 20, opacity: 0 }} 
                whileInView={{ y: 0, opacity: 1 }} 
                transition={{ delay: 0.5 }}
              >
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>{isAdmin ? 'قيد التوصيل' : 'النقاط المكتسبة'}</div>
                <div style={{ fontSize: 22, fontWeight: 'bold', color: '#0f172a' }}>{isAdmin ? '8' : '450'}</div>
              </motion.div>
            </div>

            {/* List Items Placeholder */}
            <div>
              <div style={{ fontSize: 16, fontWeight: 'bold', color: '#0f172a', marginBottom: 12, marginTop: 8 }}>{isAdmin ? 'أحدث الطلبات' : 'المكتبات القريبة'}</div>
              {[1, 2, 3].map((item, idx) => (
                <motion.div 
                  key={idx}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: '#fff', borderRadius: 12, marginBottom: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + (idx * 0.1) }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(0,0,0,0.04)' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ width: '60%', height: 10, borderRadius: 4, background: '#cbd5e1', marginBottom: 6 }} />
                    <div style={{ width: '40%', height: 8, borderRadius: 4, background: '#f1f5f9' }} />
                  </div>
                  <div style={{ width: 30, height: 12, borderRadius: 6, background: brandColor, opacity: 0.2 }} />
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
