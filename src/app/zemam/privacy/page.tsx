import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'سياسة الخصوصية — متصفح زِمام | Zemam Browser Privacy Policy',
  description: 'سياسة الخصوصية لتطبيق متصفح زمام. Privacy Policy for Zemam Browser application.',
};

export default function ZemamPrivacyPage() {
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
            سياسة الخصوصية
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
          <Section title="مقدمة">
            نحن في متصفح زِمام ("التطبيق"، "نحن") نلتزم بحماية خصوصيتك وأمان
            بياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية تعاملنا مع بياناتك
            عند استخدامك لتطبيق متصفح زِمام المتاح على أنظمة iOS وAndroid
            وWindows. باستخدامك للتطبيق، فإنك توافق على الممارسات الموصوفة في
            هذه السياسة.
          </Section>

          <Section title="1. البيانات التي يجمعها التطبيق">
            <p>يقوم التطبيق بتخزين البيانات التالية <strong>محلياً فقط على جهازك</strong> ولا تُرسل أبداً إلى أي خوادم خارجية:</p>
            <ul style={{ paddingRight: '20px', margin: '12px 0' }}>
              <li><strong>سجل التصفح:</strong> عناوين المواقع التي تمت زيارتها وعناوين الصفحات</li>
              <li><strong>الإشارات المرجعية (المفضلة):</strong> المواقع المحفوظة من قبل المستخدم</li>
              <li><strong>المقالات المحفوظة:</strong> المقالات المحفوظة للقراءة دون اتصال</li>
              <li><strong>الملفات الصوتية المحملة:</strong> ملفات الوسائط المحفوظة داخل مساحة التطبيق</li>
              <li><strong>إعدادات التطبيق:</strong> تفضيلات المظهر واللون والخطوط وإعدادات الخصوصية</li>
              <li><strong>بيانات المصادقة البيومترية:</strong> حالة تفعيل قفل FaceID/TouchID (تتم المعالجة محلياً بالكامل عبر أطر عمل Apple الآمنة، ولا يتم تخزين أي بيانات بيومترية من قبل التطبيق)</li>
            </ul>
          </Section>

          <Section title="2. طريقة تخزين البيانات">
            <p>
              يستخدم التطبيق تقنية <strong>AsyncStorage</strong> المحلية لتخزين
              جميع البيانات على جهازك مباشرة. لا يملك التطبيق أي خوادم خلفية
              (backend servers) ولا يقوم بإرسال بياناتك إلى أي جهة خارجية. جميع
              البيانات مشفرة ضمن صندوق رمل التطبيق (App Sandbox) المحمي بنظام
              التشغيل.
            </p>
          </Section>

          <Section title="3. مشاركة البيانات مع أطراف ثالثة">
            <p><strong>لا نقوم بمشاركة أي بيانات شخصية مع أطراف ثالثة.</strong></p>
            <p style={{ marginTop: '8px' }}>عند استخدام بعض الميزات، قد يتم الاتصال بخدمات خارجية:</p>
            <ul style={{ paddingRight: '20px', margin: '12px 0' }}>
              <li><strong>خدمة VPN/Proxy:</strong> عند تفعيل VPN، تمر حركة مرور التصفح عبر خوادم بروكسي عامة (ProxySite) لتشفير اتصالك. لا نتحكم في سياسات خصوصية هذه الخوادم الخارجية ونوصي المستخدم بالاطلاع على شروطها.</li>
              <li><strong>محرك البحث:</strong> عند استخدام البحث، يتم توجيه طلبات البحث إلى محرك Google مباشرة وفق سياسة خصوصية Google.</li>
              <li><strong>ترجمة الصفحات:</strong> تتم عبر خدمة Google Translate العامة.</li>
            </ul>
            <p><strong>لا نستخدم أي أدوات تحليل (Analytics) أو تتبع (Tracking) أو إعلانات.</strong></p>
          </Section>

          <Section title="4. حقوق المستخدم (GDPR والقوانين المعمول بها)">
            <p>يحق لك بصفتك مستخدماً:</p>
            <ul style={{ paddingRight: '20px', margin: '12px 0' }}>
              <li><strong>حق الوصول:</strong> يمكنك الاطلاع على جميع بياناتك المخزنة من خلال إعدادات التطبيق (السجل، المفضلة، المقالات، الموسيقى).</li>
              <li><strong>حق التصحيح:</strong> يمكنك تعديل أي من بياناتك المحفوظة مباشرة.</li>
              <li><strong>حق الحذف (حق النسيان):</strong> يمكنك مسح جميع بياناتك بالكامل من خلال خيار "مسح الكل" المتاح في كل قسم، أو بحذف التطبيق نهائياً من جهازك.</li>
              <li><strong>حق سحب الموافقة:</strong> يمكنك التوقف عن استخدام التطبيق في أي وقت وحذفه مع جميع البيانات المرتبطة.</li>
              <li><strong>حق نقل البيانات:</strong> بياناتك مخزنة محلياً ويمكنك الوصول إليها عبر نظام ملفات جهازك.</li>
            </ul>
          </Section>

          <Section title="5. سياسة الاحتفاظ بالبيانات">
            <p>
              تُحفظ البيانات على جهازك فقط طوال مدة تثبيت التطبيق. عند حذف
              التطبيق من جهازك، تُحذف جميع البيانات المرتبطة به تلقائياً وبشكل
              نهائي ولا يمكن استرجاعها. لا نحتفظ بأي نسخ احتياطية من بياناتك
              على خوادمنا.
            </p>
          </Section>

          <Section title="6. أمان البيانات">
            <ul style={{ paddingRight: '20px', margin: '12px 0' }}>
              <li>جميع البيانات محمية ضمن صندوق رمل التطبيق (Sandbox) المؤمّن من قبل نظام التشغيل iOS/Android.</li>
              <li>تتم المصادقة البيومترية (FaceID/TouchID) عبر أطر عمل Apple الآمنة محلياً دون إرسال أي بيانات للخارج.</li>
              <li>يتم تفعيل ترويسة Do Not Track (DNT) وGlobal Privacy Control (GPC) تلقائياً لجميع طلبات التصفح.</li>
              <li>يتضمن التطبيق مانع إعلانات مدمجاً يحظر شبكات التتبع والإعلانات المعروفة.</li>
            </ul>
          </Section>

          <Section title="7. خصوصية الأطفال">
            <p>
              التطبيق مصنف للفئة العمرية 17+ ولا يستهدف الأطفال دون سن 17
              عاماً. لا نجمع عن علم أي بيانات شخصية من الأطفال. إذا اكتشفنا أن
              طفلاً دون 17 عاماً يستخدم التطبيق، فلن تكون هناك بيانات شخصية
              مخزنة على خوادمنا لحذفها، حيث أن جميع البيانات محلية فقط.
            </p>
          </Section>

          <Section title="8. التغييرات على هذه السياسة">
            <p>
              قد نقوم بتحديث سياسة الخصوصية هذه من حين لآخر لتعكس التغييرات في
              ممارساتنا أو لأسباب تشغيلية أو قانونية. سيتم الإشارة إلى تاريخ
              آخر تحديث في أعلى هذه الصفحة. نوصيك بمراجعة هذه السياسة دورياً.
            </p>
          </Section>

          <Section title="9. تواصل معنا">
            <p>
              إذا كانت لديك أي أسئلة أو استفسارات حول سياسة الخصوصية هذه أو
              ممارسات بياناتنا، يرجى التواصل معنا عبر:
            </p>
            <ul style={{ paddingRight: '20px', margin: '12px 0' }}>
              <li><strong>البريد الإلكتروني:</strong> gamegdeo@gmail.com</li>
              <li><strong>المطور:</strong> Ali Muwaffaq</li>
              <li><strong>الموقع:</strong> alimuwaffaq.my</li>
            </ul>
          </Section>

          {/* English Summary */}
          <div
            style={{
              marginTop: '40px',
              paddingTop: '32px',
              borderTop: '1px solid var(--w-border)',
              direction: 'ltr',
              textAlign: 'left',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#3B82F6',
                marginBottom: '16px',
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Privacy Policy Summary (English)
            </h2>
            <p style={{ color: 'var(--w-text-sec)', fontSize: '14px', lineHeight: 1.8 }}>
              Zemam Browser stores all user data (browsing history, bookmarks,
              saved articles, downloaded media, and settings) <strong>locally on your device only</strong>.
              We do not collect, transmit, or share any personal data with external
              servers. We do not use analytics, tracking, or advertising SDKs. When
              using the optional VPN/Proxy feature, browsing traffic is routed through
              third-party proxy servers; we recommend reviewing their privacy policies.
              Biometric authentication (FaceID/TouchID) is handled entirely by Apple&apos;s
              secure frameworks on-device. You have full control over your data and can
              delete it at any time through the app settings or by uninstalling the app.
              For questions, contact us at <strong>gamegdeo@gmail.com</strong>.
            </p>
          </div>
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
