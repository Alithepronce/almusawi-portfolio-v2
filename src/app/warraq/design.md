# Design System & UI/UX Architecture — Warraq Web Platform

This document defines the core visual design tokens, page layout directory, component architecture, responsiveness standards, and deployment configurations implemented in the **Warraq Marketing & SaaS Portal Website** (Next.js sub-site).

---

## 1. Visual Identity & Design Philosophy

The Warraq Web Platform is built with a **Swiss Minimalism** design language combined with **Glassmorphism 2.0** elements. It is designed to look super premium, feel highly interactive, and communicate trust. The layout prioritizes clear whitespace, bold gradient typography, and a structured layout system.

### 1.1 Color Tokens & CSS Variables
All styles are structured using central CSS variables defined in [warraq-site.css](file:///c:/Users/pc/Desktop/warraq/cd/portfolio-3d/src/app/warraq/site/warraq-site.css):

| CSS Variable | Value | Description |
| :--- | :--- | :--- |
| `--w-primary` | `#2563EB` (Deep Trust Blue) | Brand primary color, used for customer app branding, highlights, and main CTAs. |
| `--w-primary-hover` | `#1D4ED8` | Hover state color for primary elements. |
| `--w-admin` | `#F97316` (Admin Orange) | Secondary brand color, representing the admin management console. |
| `--w-admin-hover` | `#EA580C` | Hover state color for admin elements. |
| `--w-bg` | `#FFFFFF` | Base page canvas background. |
| `--w-bg-subtle` | `#F8FAFC` (Slate 50) | Background for alternating sections, layout panels, and containers. |
| `--w-surface` | `rgba(255, 255, 255, 0.7)` | Glassmorphic card surfaces with high transparency. |
| `--w-surface-dark` | `#0F172A` (Slate 900) | Dark theme surfaces and footer background. |
| `--w-text` | `#0F172A` (Slate 900) | Primary text color. |
| `--w-text-sec` | `#475569` (Slate 600) | Secondary body copy and subtitles. |
| `--w-text-muted` | `#94A3B8` (Slate 400) | Captions, disabled labels, and inactive meta text. |
| `--w-text-inverse` | `#FFFFFF` | Text color on dark surfaces. |
| `--w-border` | `rgba(15, 23, 42, 0.08)` | Subtle card outlines and division lines. |
| `--w-border-light` | `rgba(255, 255, 255, 0.2)` | Frosted glass borders on cards. |
| `--w-shadow-glass` | `0 8px 32px rgba(15, 23, 42, 0.04)`| Default box shadow for glass cards. |
| `--w-shadow-hover` | `0 20px 40px rgba(15, 23, 42, 0.08)`| Soft spread hover shadow for cards. |
| `--w-radius` | `24px` | Standard corner rounding for large containers. |
| `--w-radius-sm` | `16px` | Corner rounding for input fields and tags. |
| `--w-radius-btn` | `9999px` | Pill-shaped geometry for buttons to give a modern feel. |

### 1.2 Web Typography
The web portal utilizes premium Cairo typography configured via Next.js Google Fonts in the main site layout.
*   **Font Family:** `var(--font-cairo)` (Cairo font family with fallback to system-ui).
*   **Standard import:** Injected dynamically inside the root wrapper, with an import fallback to Tajawal (`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;600;700&display=swap');`) for custom elements.
*   **Gradient Headings:** Headings frequently employ `linear-gradient(135deg, var(--w-text) 0%, #475569 100%)` clipped to the text boundaries (`.w-text-gradient`) to give a sleek metal-like sheen.

---

## 2. Page Directory & Routing Architecture

The website is fully integrated inside the main portfolio project under [src/app/warraq/](file:///c:/Users/pc/Desktop/warraq/cd/portfolio-3d/src/app/warraq):

```
src/app/warraq/
├── layout.tsx                # Layout shell for the warraq route
├── page.tsx                  # Main app showcase (dual presentation)
└── site/
    ├── layout.tsx            # Global sub-site shell (Navbar & Footer wrapper)
    ├── warraq-site.css       # Core design token variables & layouts
    ├── LandingPage.tsx       # Actual landing page component
    ├── page.tsx              # site landing entry point
    ├── admin/
    │   └── page.tsx          # Admin app deep-dive feature tour
    ├── customer/
    │   └── page.tsx          # Customer app deep-dive feature tour
    ├── pricing/
    │   └── page.tsx          # SaaS subscription package tier lists
    ├── support/
    │   └── page.tsx          # Support ticket submissions and FAQs
    ├── track/
    │   └── page.tsx          # Order tracking & barcode simulator page
    ├── privacy/
    │   └── page.tsx          # Privacy policy compliance guidelines
    └── terms/
        └── page.tsx          # Terms and conditions guidelines
```

### 2.1 Screen Breakdowns
*   **Showcase Portal (`src/app/warraq/page.tsx`):** Provides a visual presentation of the Warraq mobile platform, listing client-facing highlights.
*   **Landing Page (`site/page.tsx`):** Features the `AnimatedHero`, the dynamic mobile screen mockup showcase, the Bento features grid, and the direct APK installer download section.
*   **Admin deep-dive (`site/admin/page.tsx`):** Educates shop owners about the 28+ management features, demonstrating the backend metrics.
*   **Customer deep-dive (`site/customer/page.tsx`):** Explains how print shop customers can order online, upload PDF files, and track printing progress.
*   **Pricing Page (`site/pricing/page.tsx`):** Transparent subscription pricing sheet displaying three plans (Free/Bronze, Silver, Gold) with lists of limits on orders, storage, and active branches.
*   **Order Tracker (`site/track/page.tsx`):** Simulates looking up active printing orders from the database using a receipt serial code.
*   **Support Portal (`site/support/page.tsx`):** Dynamic support ticket submission form with common troubleshooting sections.

---

## 3. Core Component Library

Common design assets are placed in the shared theme directory [src/components/warraq/Theme/](file:///c:/Users/pc/Desktop/warraq/cd/portfolio-3d/src/components/warraq/Theme):

### 3.1 AnimatedHero (`AnimatedHero.tsx`)
A customizable landing hero block utilizing `framer-motion` spring animations.
*   Renders dynamic badges (e.g., "Version 2026").
*   Fades in headings, description subtitles, and custom button arrays.
*   Handles responsiveness constraints automatically, stacking items on smaller screens.

### 3.2 BentoGrid & BentoItem (`BentoGrid.tsx`)
A flexible layout system mimicking dashboard grids.
*   **BentoGrid:** Grid layout system (`display: grid`) with gap parameters that adapt column sizes dynamically based on screen widths.
*   **BentoItem:** Accepts `colSpan` parameters (spanning up to 12 columns) to build layouts where some cards are wider than others, creating an asymmetrical modern look.

### 3.3 InteractiveMockup (`InteractiveMockup.tsx`)
An interactive component showcasing real-time screens of both mobile applications (Admin & Customer).
*   *Customer View Simulator:* Renders simulated mobile screens for service selection (Photocopy, Spiral, Lamination) and file upload.
*   *Admin View Simulator:* Renders simulated screens showing order status updates, Kanban status shifts, and store analytics.

---

## 4. UI/UX Rules & Responsive Adaptation

### 4.1 Glassmorphism 2.0 Implementation
To maintain visual consistency with the 3D portfolio site, cards use frosted glass rules:
```css
.w-card-glass {
  background: var(--w-surface);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--w-border-light);
  box-shadow: var(--w-shadow-glass);
  border-radius: var(--w-radius);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```
Hovering over glass cards adds a subtle transform lift (`translateY(-4px)`) and intensifies the drop shadow (`var(--w-shadow-hover)`).

### 4.2 Responsive Navigation
*   **Header Navigation:** The main navbar automatically converts to a mobile drawer layout when the viewport width is below `768px`.
*   **Mobile Hamburger Trigger:** The menu button slides open a full-height glass panel displaying all navigation links, preventing layout breaking on compact mobile displays.

---

## 5. Build & Deployment Optimization

The website is optimized for high-speed delivery on Cloudflare Pages static hosting.

*   **Webpack Bundler Customization:**
    *   *WAF Bypass:* Cloudflare's Web Application Firewall (WAF) blocks files with tildes (`~`) in their filenames. Since Next.js Turbopack generates chunk files containing tildes, the build settings are forced to use **Webpack** (`turbopack: false` in `next.config.ts`) to output standard letters-and-numbers chunk files, ensuring 100% deployment success.
