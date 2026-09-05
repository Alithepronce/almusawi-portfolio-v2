# CLAUDE.md — almusawi-portfolio-v2

الموقع الشخصي لعلي موفق على **https://alimuwaffaq.my**، ويحتضن أيضاً **صفحة هبوط متجر زمام ستور** والصفحات القانونية لمنظومات زمام.
يخضع لدستور **منظومة زمام** (`~/programming /store/.agents/skills/zmam-doctrine/SKILL.md`): زجاجية، ألوان obsidian/emerald، خطوط Inter/Tajawal/Cairo، صفر placeholders.

## التقنية
Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion + next-themes + zustand + lucide-react.
**static export**: `output: 'export'`, `trailingSlash: true`, `images.unoptimized` → لا API routes ولا كود خادم. Node 20 (`.nvmrc`). النشر: ملفات ثابتة (Cloudflare Pages، `public/_routes.json`)، المخرجات في `out/`.

```bash
npm run dev      # تطوير
npm run build    # ينتج out/ للنشر
npm run lint
```

## البنية
```
src/app/            # الصفحات: / , /apps , /work/[slug] , /cv , /blog , /links , /guestbook , /contact
  store/            # ← صفحة هبوط زمام ستور (+ privacy, terms)
  zemam/            # مشروع زمام (+ privacy, terms, support)
  warraq/           # وراق + warraq/site/* (portal, admin, customer, pricing, track, delivery...)
  glamora/          # جلامورا POS (+ privacy, terms, support)
src/components/     # ui/ (Navbar, PageShell), providers/ (Theme, Lang, ClientLayout), warraq/Theme/
src/data/           # projects.ts (store, glamora, trado, automation, prompt, robot, ise-next, rag-pipeline, telegram-bot), experience.ts
src/lib/i18n.ts     # ثنائية اللغة ar/en (العربية افتراضية، RTL)
src/store/useStore.ts, src/hooks/useInteractiveSounds.ts
```

## صفحة هبوط المتجر — `src/app/store/page.tsx`
Client Component (~2.2k سطر) تتحدث **مباشرة** مع خادم زمام ستور:
```ts
const API_BASE_URL = 'https://ios-store-production.up.railway.app';
```
- التسجيل/الدخول: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- ربط الجهاز (UDID): `POST /api/udid/profile-link`, `GET /api/udid/mobileconfig`, `GET /api/udid/guest-mobileconfig`
- كود التفعيل: `POST /api/subscriptions/redeem`
- التثبيت المباشر OTA: `GET /api/ota/install-latest` → `itms-services://` (مع باراميترات كسر كاش Safari)
- الجلسة في `localStorage`: `zmam_store_token`, `zmam_store_user`, `zmam_store_certified`

## الارتباط بمستودع المتجر (`~/programming /store`)
1. نطاقا `alimuwaffaq.my` و `www.alimuwaffaq.my` **في CORS allowlist** داخل `backend/src/index.js` — أي تغيير نطاق يستوجب تحديثها هناك.
2. أي تعديل في عقود الـ API أعلاه يكسر هذه الصفحة — نسّق التغيير في المستودعين معاً.
3. `store/privacy` و `store/terms` و `zemam/*` تقابل `backend/public/legal/` — أبقِها متطابقة.
4. اقرأ `~/programming /store/CLAUDE.md` لفهم الـ backend وسير عمل التوقيع.

## تنبيهات
- ⚠️ **git remotes (`origin` و `old-origin`) تحوي GitHub PAT مضمّناً في الـ URL** — أبطِل التوكن من GitHub وأعد ضبط الريموت بـ SSH أو credential helper.
- لا تضع أي سر في الكود — الموقع static export ويُنفَّذ كاملاً في المتصفح.
- كل واجهة ثنائية اللغة عبر `useLang()`؛ لا تضف نصاً بلغة واحدة.
