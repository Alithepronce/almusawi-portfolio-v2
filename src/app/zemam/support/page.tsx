import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'الدعم الفني — متصفح زِمام | Zemam Browser Support',
  description: 'صفحة الدعم الفني والأسئلة الشائعة لتطبيق متصفح زمام. Support and FAQ for Zemam Browser.',
};

export default function ZemamSupportPage() {
  return (
    <div
      style={{
        minHeight: '80vh',
        color: 'var(--w-text)',
        fontFamily: "'Tajawal', 'Inter', system-ui, sans-serif",
        direction: 'rtl',
        padding: '40px 20px 80px',
      }}
    >
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1
            style={{
              fontSize: 'clamp(28px, 5vw, 42px)',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '12px',
            }}
          >
            الدعم الفني
          </h1>
          <p style={{ color: 'var(--w-text-sec)', fontSize: '14px' }}>
            متصفح زِمام — Zemam Browser
          </p>
        </div>

        {/* Contact Card */}
        <div
          style={{
            background: 'var(--w-bg-subtle)',
            border: '1px solid var(--w-border)',
            borderRadius: '20px',
            padding: 'clamp(24px, 5vw, 40px)',
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>📧</div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>
            تواصل معنا
          </h2>
          <p style={{ color: 'var(--w-text-sec)', fontSize: '15px', marginBottom: '20px', lineHeight: 1.7 }}>
            للحصول على مساعدة أو الإبلاغ عن مشكلة، يمكنك التواصل معنا مباشرة
            عبر البريد الإلكتروني وسنقوم بالرد في أقرب وقت ممكن.
          </p>
          <a
            href="mailto:gamegdeo@gmail.com?subject=دعم%20متصفح%20زمام"
            style={{
              display: 'inline-block',
              padding: '14px 36px',
              background: '#3B82F6',
              color: '#fff',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '15px',
            }}
          >
            gamegdeo@gmail.com
          </a>
          <p style={{ color: 'var(--w-text-muted)', fontSize: '13px', marginTop: '16px' }}>
            المطور: Ali Muwaffaq
          </p>
        </div>

        {/* FAQ */}
        <div
          style={{
            background: 'var(--w-bg-subtle)',
            border: '1px solid var(--w-border)',
            borderRadius: '20px',
            padding: 'clamp(24px, 5vw, 40px)',
            lineHeight: 1.85,
            fontSize: '15px',
          }}
        >
          <h2
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: 'var(--w-text)',
              marginBottom: '28px',
              textAlign: 'center',
            }}
          >
            الأسئلة الشائعة (FAQ)
          </h2>

          <FAQ
            q="كيف أحذف سجل التصفح أو المفضلة؟"
            a='انتقل إلى قسم "السجل" أو "المفضلة" من الشريط السفلي، ثم اضغط على زر "مسح الكل" لحذف جميع البيانات دفعة واحدة. يمكنك أيضاً حذف عناصر فردية بالضغط على أيقونة سلة المحذوفات بجانب كل عنصر.'
          />
          <FAQ
            q="هل التطبيق يجمع بياناتي الشخصية؟"
            a="لا. جميع البيانات تُخزن محلياً على جهازك فقط ولا تُرسل إلى أي خادم خارجي. لا نستخدم أي أدوات تحليل أو تتبع."
          />
          <FAQ
            q="كيف أفعّل قفل التطبيق بالبصمة (FaceID)؟"
            a='افتح إعدادات التطبيق (أيقونة الترس في الشاشة الرئيسية)، ثم فعّل خيار "قفل بالبصمة". سيُطلب منك المصادقة عبر FaceID أو TouchID في كل مرة تفتح التطبيق.'
          />
          <FAQ
            q="ما هي ميزة VPN/Proxy؟"
            a="عند تفعيل VPN من الشاشة الرئيسية، يتم توجيه حركة تصفحك عبر خوادم بروكسي مشفرة لإخفاء عنوان IP الحقيقي وحماية خصوصيتك. الميزة مجانية بالكامل."
          />
          <FAQ
            q="هل التطبيق يدعم iPad؟"
            a="نعم، التطبيق يدعم أجهزة iPad بالكامل مع واجهة مُحسّنة للشاشات الكبيرة."
          />
          <FAQ
            q="ما هي ميزة وضع القراءة؟"
            a="وضع القراءة يستخرج النص الأساسي من أي صفحة ويب ويعرضه بتنسيق نظيف وخالي من الإعلانات والفوضى البصرية. يمكنك أيضاً حفظ المقالات للقراءة لاحقاً دون الحاجة لاتصال إنترنت."
          />
          <FAQ
            q="كيف أغيّر لون ومظهر التطبيق؟"
            a='افتح الإعدادات واختر من بين ألوان التمييز المتاحة، أو أدخل لوناً مخصصاً بصيغة HEX. يمكنك أيضاً التبديل بين وضع التدرج اللوني ووضع OLED (الأسود الداكن).'
          />
          <FAQ
            q="التطبيق لا يعمل أو يتوقف فجأة، ماذا أفعل؟"
            a="جرّب إغلاق التطبيق تماماً وإعادة فتحه. إذا استمرت المشكلة، قم بحذف التطبيق وإعادة تثبيته. إذا لم يحل ذلك المشكلة، تواصل معنا عبر البريد الإلكتروني مع وصف المشكلة ونوع جهازك."
          />
        </div>

        {/* Links */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            marginTop: '40px',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="/zemam/privacy"
            style={{ color: '#3B82F6', fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}
          >
            سياسة الخصوصية
          </a>
          <a
            href="/zemam/terms"
            style={{ color: '#3B82F6', fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}
          >
            شروط الاستخدام
          </a>
          <a
            href="/zemam"
            style={{ color: '#3B82F6', fontSize: '14px', textDecoration: 'none', fontWeight: 600 }}
          >
            صفحة التطبيق الرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <h3
        style={{
          fontSize: '16px',
          fontWeight: 700,
          color: 'var(--w-text)',
          marginBottom: '8px',
        }}
      >
        ❓ {q}
      </h3>
      <p style={{ color: 'var(--w-text-sec)', fontSize: '14px', lineHeight: 1.75 }}>{a}</p>
    </div>
  );
}
