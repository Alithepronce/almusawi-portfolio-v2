import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'شروط الاستخدام — متصفح زِمام | Zemam Browser Terms of Service',
  description: 'شروط وأحكام استخدام تطبيق متصفح زمام. Terms of Service for Zemam Browser.',
};

export default function ZemamTermsPage() {
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
            شروط الاستخدام
          </h1>
          <p style={{ color: 'var(--w-text-sec)', fontSize: '14px' }}>
            متصفح زِمام — Zemam Browser
          </p>
          <p style={{ color: 'var(--w-text-muted)', fontSize: '13px', marginTop: '8px' }}>
            آخر تحديث: 21 يونيو 2026
          </p>
        </div>

        {/* Content */}
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
          <Section title="1. القبول بالشروط">
            باستخدامك أو تثبيتك لتطبيق متصفح زِمام (&quot;التطبيق&quot;)، فإنك توافق
            على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه
            الشروط، يرجى عدم استخدام التطبيق وحذفه من جهازك.
          </Section>

          <Section title="2. وصف الخدمة">
            متصفح زِمام هو تطبيق متصفح ويب يوفر تجربة تصفح آمنة وخاصة مع
            ميزات مدمجة تشمل: حظر الإعلانات، اتصال VPN مشفر، وضع القراءة
            المنقّى، حفظ المقالات دون اتصال، مشغل وسائط مدمج، قفل بيومتري
            (FaceID)، ودعم التبويبات المتعددة ووضع التصفح الخاص.
          </Section>

          <Section title="3. الاستخدام المقبول">
            <p>يُسمح باستخدام التطبيق لأغراض قانونية فقط. يلتزم المستخدم بما يلي:</p>
            <ul style={{ paddingRight: '20px', margin: '12px 0' }}>
              <li>استخدام التطبيق لتصفح الويب بطريقة قانونية ومسؤولة.</li>
              <li>عدم استخدام التطبيق للوصول إلى محتوى غير قانوني بموجب القوانين المحلية والدولية.</li>
              <li>عدم استخدام ميزات الخصوصية (VPN/Proxy) لأنشطة تخريبية أو ضارة أو مخالفة للقانون.</li>
              <li>عدم محاولة استغلال أو اختراق التطبيق أو التلاعب بأنظمته الداخلية.</li>
              <li>الالتزام بحقوق الملكية الفكرية للمحتوى المتاح عبر الإنترنت.</li>
            </ul>
          </Section>

          <Section title="4. التصنيف العمري">
            التطبيق مصنف للفئة العمرية <strong>17+</strong> نظراً لطبيعته كمتصفح ويب يتيح الوصول المفتوح للإنترنت. يقر المستخدم بأنه يبلغ من العمر 17 عاماً أو أكثر، أو يستخدم التطبيق تحت إشراف ولي الأمر.
          </Section>

          <Section title="5. الملكية الفكرية">
            <p>جميع حقوق الملكية الفكرية المتعلقة بالتطبيق، بما في ذلك التصميم والكود البرمجي والشعار والاسم التجاري &quot;زِمام&quot;، محفوظة لصالح المطور Ali Muwaffaq.</p>
            <p style={{ marginTop: '8px' }}>يتحمل المستخدم المسؤولية الكاملة عن أي محتوى يتم الوصول إليه أو تحميله عبر التطبيق، ويجب عليه احترام حقوق الملكية الفكرية لأصحابها.</p>
          </Section>

          <Section title="6. إخلاء المسؤولية">
            <ul style={{ paddingRight: '20px', margin: '12px 0' }}>
              <li>يُقدم التطبيق &quot;كما هو&quot; (As-Is) بدون أي ضمانات صريحة أو ضمنية.</li>
              <li>لا نتحمل مسؤولية أي محتوى يتم الوصول إليه عبر المتصفح، حيث إن المحتوى يأتي من مواقع ويب خارجية مستقلة.</li>
              <li>لا نتحمل أي مسؤولية عن فقدان البيانات المخزنة محلياً نتيجة حذف التطبيق أو إعادة ضبط الجهاز.</li>
            </ul>
          </Section>

          <Section title="7. الخدمات المجانية">
            جميع ميزات التطبيق متاحة مجاناً بالكامل ولا يتضمن التطبيق أي اشتراكات أو مشتريات داخلية. نحتفظ بالحق في إضافة ميزات مدفوعة مستقبلاً مع الإعلان المسبق عنها.
          </Section>

          <Section title="8. التعديلات والتحديثات">
            <p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر النسخة المحدثة على هذه الصفحة مع تحديث تاريخ آخر تعديل. استمرارك في استخدام التطبيق بعد نشر التعديلات يعني قبولك للشروط المحدثة.</p>
          </Section>

          <Section title="9. إنهاء الاستخدام">
            يمكنك التوقف عن استخدام التطبيق في أي وقت بحذفه من جهازك. عند الحذف، تُزال جميع البيانات المحلية المرتبطة بالتطبيق بشكل نهائي.
          </Section>

          <Section title="10. القانون المعمول به">
            تخضع هذه الشروط للقوانين المعمول بها في جمهورية العراق. في حال نشوء أي نزاع، يتم حله ودياً أولاً عبر التواصل المباشر، وفي حال تعذر ذلك، تختص المحاكم المدنية المحلية بالنظر فيه.
          </Section>

          <Section title="11. تواصل معنا">
            <p>لأي استفسارات حول هذه الشروط:</p>
            <ul style={{ paddingRight: '20px', margin: '12px 0' }}>
              <li><strong>البريد الإلكتروني:</strong> gamegdeo@gmail.com</li>
              <li><strong>المطور:</strong> Ali Muwaffaq</li>
              <li><strong>الموقع:</strong> alimuwaffaq.my</li>
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <h2
        style={{
          fontSize: '18px',
          fontWeight: 700,
          color: 'var(--w-text)',
          marginBottom: '12px',
          paddingBottom: '8px',
          borderBottom: '1px solid var(--w-border)',
        }}
      >
        {title}
      </h2>
      <div style={{ color: 'var(--w-text-sec)' }}>{children}</div>
    </div>
  );
}
