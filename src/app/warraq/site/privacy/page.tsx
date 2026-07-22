import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'سياسة الخصوصية — ورّاق',
  description: 'سياسة خصوصية تطبيق ورّاق — كيف نحمي بياناتك ونتعامل معها',
};

export default function PrivacyPage() {
  return (
    <div className="w-container" style={{ padding: '40px 24px', maxWidth: 800 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 8 }}>سياسة الخصوصية</h1>
      <p style={{ textAlign: 'center', color: 'var(--w-text-muted)', marginBottom: 40, fontSize: 14 }}>
        آخر تحديث: مارس 2026
      </p>

      <div className="clay-card-flat" style={{ lineHeight: 2, fontSize: 15, color: 'var(--w-text-sec)' }}>

        <h2 style={{ fontSize: 18, color: 'var(--w-text)', marginBottom: 12 }}>1. مقدمة</h2>
        <p style={{ marginBottom: 20 }}>
          نحن في تطبيق ورّاق نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية المعلومات التي نحصل عليها من خلال استخدامك للتطبيق.
        </p>

        <h2 style={{ fontSize: 18, color: 'var(--w-text)', marginBottom: 12 }}>2. البيانات التي نجمعها</h2>
        <ul style={{ paddingRight: 20, marginBottom: 20 }}>
          <li>معلومات الحساب: البريد الإلكتروني وكلمة المرور عند التسجيل</li>
          <li>بيانات العمل: الطلبات والعملاء والمخزون والفواتير التي تدخلها</li>
          <li>بيانات الاستخدام: كيفية تفاعلك مع التطبيق لتحسين التجربة</li>
          <li>معلومات الجهاز: نوع الجهاز ونظام التشغيل للدعم الفني</li>
        </ul>

        <h2 style={{ fontSize: 18, color: 'var(--w-text)', marginBottom: 12 }}>3. كيف نستخدم بياناتك</h2>
        <ul style={{ paddingRight: 20, marginBottom: 20 }}>
          <li>تشغيل التطبيق وتقديم الخدمات المطلوبة</li>
          <li>تحسين أداء التطبيق وتطوير ميزات جديدة</li>
          <li>إرسال إشعارات مهمة متعلقة بحسابك</li>
          <li>تقديم الدعم الفني عند الحاجة</li>
        </ul>

        <h2 style={{ fontSize: 18, color: 'var(--w-text)', marginBottom: 12 }}>4. تخزين البيانات وحمايتها</h2>
        <p style={{ marginBottom: 20 }}>
          نستخدم خوادم Supabase المحمية بمعايير أمان عالية. جميع البيانات مشفرة أثناء النقل والتخزين. نحتفظ ببياناتك طالما حسابك نشط، ويمكنك طلب حذفها في أي وقت.
        </p>

        <h2 style={{ fontSize: 18, color: 'var(--w-text)', marginBottom: 12 }}>5. مشاركة البيانات</h2>
        <p style={{ marginBottom: 20 }}>
          لا نبيع أو نشارك بياناتك الشخصية مع أطراف ثالثة. قد نشارك بيانات مجهّلة لأغراض إحصائية فقط.
        </p>

        <h2 style={{ fontSize: 18, color: 'var(--w-text)', marginBottom: 12 }}>6. حقوقك</h2>
        <ul style={{ paddingRight: 20, marginBottom: 20 }}>
          <li>الوصول إلى بياناتك المخزنة</li>
          <li>تعديل أو تصحيح بياناتك</li>
          <li>طلب حذف حسابك وجميع بياناتك</li>
          <li>الانسحاب من الإشعارات التسويقية</li>
        </ul>

        <h2 style={{ fontSize: 18, color: 'var(--w-text)', marginBottom: 12 }}>7. بوابة الزبائن وتتبع الطلبات</h2>
        <p style={{ marginBottom: 20 }}>
          عند مشاركة رابط تتبع أو بوابة زبون، يتم عرض معلومات الطلب فقط (العنوان، الحالة، السعر) دون الكشف عن بيانات حساسة أخرى. روابط التتبع تعمل عبر رموز فريدة ولا تتطلب تسجيل دخول.
        </p>

        <h2 style={{ fontSize: 18, color: 'var(--w-text)', marginBottom: 12 }}>8. التواصل</h2>
        <p>
          للاستفسارات المتعلقة بالخصوصية، تواصل معنا عبر:{' '}
          <a href="https://t.me/Jormunghandr" style={{ color: 'var(--w-gold)', textDecoration: 'none', fontWeight: 700 }}>
            تيليغرام
          </a>{' '}
          أو البريد: gamegdeo@gmail.com
        </p>
      </div>
    </div>
  );
}
