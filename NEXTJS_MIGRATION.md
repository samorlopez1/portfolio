# Next.js Migration Guide

## Branch Info
This is the `refactor/nextjs-migration` branch - a work-in-progress refactor from Vite + React Router to Next.js App Router.

## What's Changed

### ✅ Completed
- [ ] **Package.json** - Updated to use Next.js instead of Vite
  - Removed: `react-router-dom`, `vite`, `@vitejs/plugin-react`, `vite-plugin-imagemin`
  - Added: `next`
  - Updated scripts: `dev`, `build`, `start`

- [ ] **New App Router Structure** (`/app` directory)
  - `app/layout.tsx` - Root layout (replaces `MainLayout`)
  - `app/page.tsx` - Home page (/)
  - `app/play/page.tsx` - Gallery page (/play)
  - `app/case-study/[id]/page.tsx` - Dynamic case studies

- [ ] **TypeScript Config** - Updated for Next.js compatibility

- [ ] **Next.js Config** - `next.config.ts` created

### 🚧 Still TODO

1. **Update Component Imports**
   - Change `react-router-dom` imports (useLocation, useNavigate) to Next.js equivalents
   - Remove BrowserRouter wrapping

2. **Update Navigation**
   - Replace React Router `<Link>` with Next.js `<Link>`
   - Update navigation logic in Navbar component

3. **Handle Scroll Behavior**
   - The current scroll-to implementation uses `useLocation` hook
   - Need to implement with Next.js routing

4. **Test All Case Studies**
   - Ensure all case study routes work with dynamic routing
   - Test: `/case-study/traintrek`, `/case-study/tiktok`, etc.

5. **Update CSS/Asset Imports**
   - Ensure all CSS imports use correct relative paths
   - Test image and font loading from `/public`

6. **Delete Old Files** (when ready)
   - Delete `src/app/App.tsx` (main component)
   - Delete `src/app/App.css`
   - Delete `src/pages/` (components now in `app/`)
   - Delete `src/main.tsx` (entry point)
   - Delete `src/routes/` (routing now file-based)
   - Delete Vite-specific files: `vite.config.ts`, `index.html` (Next.js has its own)

7. **Environment Setup**
   - Run `npm install` to update dependencies
   - Test `npm run dev` to ensure dev server works
   - Test `npm run build` to ensure build works

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

1. Update components to remove React Router dependencies
2. Update the Navbar with Next.js Link component
3. Test routing works correctly
4. Once stable, delete old files
5. Merge into main when ready

## Resources
- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Next.js Migration from React Router](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
