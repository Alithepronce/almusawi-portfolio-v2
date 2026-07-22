import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'شروط الاستخدام — ورّاق',
  description: 'شروط استخدام تطبيق ورّاق — حقوقك والتزاماتك عند استخدام التطبيق',
};

export default function TermsPage() {
  return (
    <div className="w-container" style={{ padding: '40px 24px', maxWidth: 800 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 8 }}>شروط الاستخدام</h1>
      <p style={{ textAlign: 'center', color: 'var(--w-text-muted)', marginBottom: 40, fontSize: 14 }}>
        آخر تحديث: مارس 2026
      </p>

      <div className="clay-card-flat" style={{ lineHeight: 2, fontSize: 15, color: 'var(--w-text-sec)' }}>

        <h2 style={{ fontSize: 18, color: 'var(--w-text)', marginBottom: 12 }}>1. القبول بالشروط</h2>
        <p style={{ marginBottom: 20 }}>
          باستخدامك لتطبيق ورّاق، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام التطبيق.
        </p>

        <h2 style={{ fontSize: 18, color: 'var(--w-text)', marginBottom: 12 }}>2. وصف الخدمة</h2>
        <p style={{ marginBottom: 20 }}>
          ورّاق هو تطبيق يربط الزبائن بمكتبات الطباعة والتصوير. يتيح للزبائن إرسال طلبات الطباعة والتصوير والتجليد وغيرها من الخدمات إلى المكتبات القريبة، مع إمكانية تتبع الطلبات والتوصيل.
        </p>

        <h2 style={{ fontSize: 18, color: 'var(--w-text)', marginBottom: 12 }}>3. حساب المستخدم</h2>
        <ul style={{ paddingRight: 20, marginBottom: 20 }}>
          <li>يجب أن تكون المعلومات المقدمة عند التسجيل صحيحة ودقيقة</li>
          <li>أنت مسؤول عن الحفاظ على سرية بيانات حسابك</li>
          <li>يجب إبلاغنا فوراً في حال الاشتباه بأي استخدام غير مصرح به</li>
          <li>يحق لنا تعليق أو إلغاء الحسابات المخالفة</li>
        </ul>

        <h2 style={{ fontSize: 18, color: 'var(--w-text)', marginBottom: 12 }}>4. الطلبات والدفع</h2>
        <ul style={{ paddingRight: 20, marginBottom: 20 }}>
          <li>الأسعار المعروضة تقديرية وقد تختلف حسب المكتبة</li>
          <li>السعر النهائي يُحدد من قبل صاحب المكتبة بعد مراجعة الطلب</li>
          <li>الدفع يتم مباشرة بين الزبون والمكتبة</li>
          <li>يمكنك إلغاء الطلب قبل بدء التنفيذ</li>
        </ul>

        <h2 style={{ fontSize: 18, color: 'var(--w-text)', marginBottom: 12 }}>5. الملفات المرفوعة</h2>
        <p style={{ marginBottom: 20 }}>
          أنت تتحمل المسؤولية الكاملة عن المحتوى الذي ترفعه عبر التطبيق. يجب ألا يحتوي على مواد غير قانونية أو تنتهك حقوق الملكية الفكرية للآخرين. نحتفظ بالحق في رفض أي محتوى مخالف.
        </p>

        <h2 style={{ fontSize: 18, color: 'var(--w-text)', marginBottom: 12 }}>6. التقييمات والمراجعات</h2>
        <ul style={{ paddingRight: 20, marginBottom: 20 }}>
          <li>يجب أن تكون التقييمات صادقة وتعكس تجربتك الحقيقية</li>
          <li>يُمنع نشر محتوى مسيء أو تشهيري</li>
          <li>نحتفظ بحق إزالة التقييمات المخالفة</li>
        </ul>

        <h2 style={{ fontSize: 18, color: 'var(--w-text)', marginBottom: 12 }}>7. المسؤولية</h2>
        <p style={{ marginBottom: 20 }}>
          ورّاق هو منصة وسيطة بين الزبائن والمكتبات. لا نتحمل المسؤولية عن جودة الخدمات المقدمة من المكتبات أو أي نزاعات تنشأ بين الأطراف. نسعى دائماً لحل أي مشكلة عبر فريق الدعم.
        </p>

        <h2 style={{ fontSize: 18, color: 'var(--w-text)', marginBottom: 12 }}>8. التعديلات</h2>
        <p style={{ marginBottom: 20 }}>
          نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعارك بأي تغييرات جوهرية عبر التطبيق. استمرارك في استخدام التطبيق بعد التعديل يعني موافقتك على الشروط المحدّثة.
        </p>

        <h2 style={{ fontSize: 18, color: 'var(--w-text)', marginBottom: 12 }}>9. إنهاء الخدمة</h2>
        <ul style={{ paddingRight: 20, marginBottom: 20 }}>
          <li>يمكنك حذف حسابك في أي وقت من إعدادات التطبيق</li>
          <li>يحق لنا إنهاء أو تقييد وصولك في حال مخالفة هذه الشروط</li>
          <li>عند حذف الحساب، يتم حذف جميع بياناتك نهائياً</li>
        </ul>

        <h2 style={{ fontSize: 18, color: 'var(--w-text)', marginBottom: 12 }}>10. التواصل</h2>
        <p>
          لأي استفسارات حول شروط الاستخدام، تواصل معنا عبر:{' '}
          <a href="https://t.me/Jormunghandr" style={{ color: 'var(--w-gold)', textDecoration: 'none', fontWeight: 700 }}>
            تيليغرام
          </a>{' '}
          أو البريد: gamegdeo@gmail.com
        </p>
      </div>
    </div>
  );
}
