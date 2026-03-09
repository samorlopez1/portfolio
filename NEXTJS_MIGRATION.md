# Next.js Migration Guide

## Branch Info
This is the `refactor/nextjs-migration` branch - a work-in-progress refactor from Vite + React Router to Next.js App Router.

## What's Changed

### ✅ Completed
- [x] **Package.json** - Updated to use Next.js instead of Vite
  - Removed: `react-router-dom`, `vite`, `@vitejs/plugin-react`, `vite-plugin-imagemin`
  - Added: `next`
  - Updated scripts: `dev`, `build`, `start`

- [x] **New App Router Structure** (`/app` directory)
  - `app/layout.tsx` - Root layout (replaces `MainLayout`)
  - `app/page.tsx` - Home page (/)
  - `app/play/page.tsx` - Gallery page (/play)
  - `app/case-study/[id]/page.tsx` - Dynamic case studies

- [x] **TypeScript Config** - Updated for Next.js compatibility

- [x] **Next.js Config** - `next.config.ts` created

- [x] **Component Migration**
  - Navbar.tsx - Removed React Router, using Next.js Link
  - ScrollToTop.tsx - Changed useLocation to usePathname
  - Home.tsx - Removed useLocation, using URL hash
  - CaseStudies.tsx - Removed useNavigate, using Next.js Link
  - All components: Added 'use client' directives where needed

- [x] **Case Studies** - Converted from import.meta.glob to static imports
  - TrainTrek: 15 static image imports
  - TikTok: 1 Lottie JSON import
  - Instagram: 6 static image/JSON imports
  - Wordlet: 5 static media imports
  - Case study components use Next.js Link for back button

- [x] **Case Study Data Routes** - Updated to use /case-study/* paths

### 🚧 Still TODO

1. **Environment Setup** (URGENT - do first)
   - Run `npm install` to update dependencies
   - Delete `node_modules` and lock file, reinstall
   - Test `npm run dev` to ensure dev server works
   - Debug any build/runtime errors

2. **Test All Routes**
   - Verify home page (/) works
   - Test /play route
   - Test all case studies: /case-study/traintrek, /case-study/tiktok, etc.
   - Test navigation between pages
   - Test hash-based scrolling (#work, #about)

3. **Test Assets/Styling**
   - Verify CSS loads correctly
   - Check images load from `/public` and `assets`
   - Test video playback, Lottie animations, p5.js background
   - Verify fonts load properly

4. **Delete Old Files** (when ready)
   - Delete `src/app/App.tsx` (main component)
   - Delete `src/app/App.css`
   - Delete `src/main.tsx` (entry point)
   - Delete `src/routes/` (routing now file-based)
   - Delete Vite-specific files: `vite.config.ts`, `index.html` (Next.js has its own)
   - Delete `tsconfig.app.json`, `tsconfig.node.json` (consolidated in main tsconfig.json)

## Key Differences from Current Setup

| Feature | Vite + React Router | Next.js |
|---------|-------------------|---------|
| Routing | BrowserRouter + Routes | File-based (App Router) |
| Layout | MainLayout component | app/layout.tsx |
| Build | Vite | Next.js build |
| Pages Location | `src/pages/` | `app/` |
| Entry Point | `src/main.tsx` | `app/layout.tsx` + `app/page.tsx` |
| Navigation | `<NavLink>` from React Router | `<Link>` from Next.js |

## How to Continue

**NEXT STEP: Install dependencies and test the dev server**

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

If you encounter errors:
1. Check the error message for missing dependencies
2. Review console warnings about deprecated APIs
3. Check browser console for client-side errors
4. Verify all imports are correct (especially from `src/`)

Once dev server is working:
- Test all routes (/,  /play, /case-study/*)
- Test navigation and scroll behavior
- Test styling and asset loading
- Then delete old Vite files when confident

## Files Already Migrated

**Core components updated:**
- `src/components/Navbar/Navbar.tsx` ✅
- `src/components/CaseStudies/CaseStudies.tsx` ✅
- `src/components/ScrollToTop/ScrollToTop.tsx` ✅
- `src/pages/Home/Home.tsx` ✅
- `src/pages/Gallery/Gallery.tsx` ✅
- `src/pages/CaseStudy/TrainTrek.tsx` ✅
- `src/pages/CaseStudy/tiktok.tsx` ✅
- `src/pages/CaseStudy/instagram.tsx` ✅
- `src/pages/CaseStudy/wordlet.tsx` ✅
- `src/pages/CaseStudy/ea.tsx` ✅
- `src/pages/CaseStudy/components.tsx` ✅

**App pages created:**
- `app/layout.tsx` ✅
- `app/page.tsx` ✅
- `app/play/page.tsx` ✅
- `app/case-study/[id]/page.tsx` ✅

## Resources
- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Next.js Migration from React Router](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
