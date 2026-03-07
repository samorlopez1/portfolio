# Project Structure Guide

## Overview

This portfolio project follows a scalable, modular architecture optimized for growth. The structure supports adding multiple case study pages and features without increasing complexity.

## Directory Structure

```
src/
├── app/
│   ├── App.tsx                 # Root application shell (thin layer)
│   └── App.css                 # Global app styles
│
├── routes/
│   └── index.tsx               # Centralized route configuration (ready for React Router)
│
├── pages/                      # Route-level components (full page views)
│   ├── Home/
│   │   ├── Home.tsx            # Home landing page
│   │   ├── Home.css
│   │   └── index.ts
│   ├── Gallery/
│   │   ├── Gallery.tsx         # Gallery/Play page
│   │   ├── Gallery.css
│   │   └── index.ts
│   └── CaseStudy/              # Future: Individual case study pages
│       └── CaseStudy.tsx
│
├── components/                 # Reusable UI components (organized by feature)
│   ├── Navbar/
│   │   ├── Navbar.tsx
│   │   ├── Navbar.css
│   │   └── index.ts
│   ├── Footer/
│   │   ├── Footer.tsx
│   │   ├── Footer.css
│   │   └── index.ts
│   ├── Hero/
│   │   ├── Hero.tsx
│   │   ├── Hero.css
│   │   └── index.ts
│   ├── CaseStudies/
│   │   ├── CaseStudies.tsx     # Case studies section component
│   │   ├── CaseStudies.css
│   │   └── index.ts
│   ├── AboutSection/
│   │   ├── AboutSection.tsx
│   │   ├── AboutSection.css
│   │   └── index.ts
│   ├── ThreeJsHero/            # 3D background component
│   │   ├── ThreeJsHero.tsx
│   │   ├── ThreeJsHero.css
│   │   └── index.ts
│   ├── P5Background/           # P5.js background component
│   │   ├── P5Background.tsx
│   │   ├── P5Background.css
│   │   └── index.ts
│   ├── Button/                 # Future: Reusable button component
│   ├── Card/                   # Future: Reusable card component
│   └── ...                     # Add more shared components as needed
│
├── layouts/                    # Shared page wrappers/templates
│   ├── MainLayout.tsx          # Base layout for all pages
│   └── index.ts
│
├── hooks/                      # Custom React hooks
│   └── README.md               # Add custom hooks here (e.g., useScroll, useFetch)
│
├── lib/                        # Utilities & helpers
│   └── README.md               # Add helpers, constants, API clients
│
├── store/                      # Global state management
│   └── README.md               # Set up Context API, Zustand, or Redux
│
├── data/                       # Data files & constants (if not using a backend)
│   └── caseStudies.ts
│
├── assets/
│   └── ...                     # Images, SVGs, fonts, etc.
│
├── index.css                   # Global styles
├── tokens.css                  # Design tokens (colors, spacing, typography)
├── main.tsx                    # Entry point
└── vite.config.ts              # Vite configuration
```

## File Organization Principles

### 1. **Component Structure**
Each component gets its own folder with:
- `ComponentName.tsx` - Component file
- `ComponentName.css` - Component styles (scoped with BEM)
- `index.ts` - Export file for clean imports

**Import cleanly:**
```typescript
// ✅ Good
import { Navbar } from '@/components/Navbar'

// ❌ Avoid
import { Navbar } from '@/components/Navbar/Navbar.tsx'
```

### 2. **Pages vs Components**
- **Pages**: Containers for full-page views (found in `/pages`)
  - Compose multiple components
  - Handle page-level logic & data
  - Correspond to routes
  
- **Components**: Reusable UI pieces (found in `/components`)
  - Single responsibility
  - Can be used across multiple pages
  - Receive props for customization

### 3. **Adding New Case Study Pages**
Since this is a portfolio with multiple case studies, follow this pattern:

**Option A: Case Study Components** (Current approach)
```typescript
// In components/CaseStudies/CaseStudies.tsx
export function CaseStudies() {
  return caseStudiesData.map(study => <CaseStudyWrapper {...study} />)
}
```

**Option B: Individual Case Study Pages** (Future expansion)
```typescript
// In pages/CaseStudy/
export function CaseStudyPage() {
  const { id } = useParams() // React Router
  const caseStudy = getCaseStudyById(id)
  return <div>{/* Case study detail view */}</div>
}
```

### 4. **Import Paths**
Consider adding these path aliases in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/pages/*": ["src/pages/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/lib/*": ["src/lib/*"]
    }
  }
}
```

Then import with:
```typescript
import { Navbar } from '@/components/Navbar'
import { HomePage } from '@/pages/Home'
```

## Scalability for Future Case Studies

### Adding a New Case Study Page:
1. Create `src/pages/CaseStudy/[id]` folder
2. Add `CaseStudy.tsx`, `CaseStudy.css`, `index.ts`
3. Update routes in `src/routes/index.tsx`
4. Add navigation link in `Navbar.tsx`

### Adding New Components:
1. Create folder in `src/components/ComponentName/`
2. Add TSX, CSS, and index files
3. Export from parent index if needed

### Global State (when needed):
1. Add stores in `src/store/` (e.g., `portfolioStore.ts`)
2. Export from `src/store/index.ts`
3. Use in components with hooks or Context API

## Best Practices

✅ **Do:**
- Keep components small and focused
- Use TypeScript interfaces for props
- Follow BEM convention for CSS class names
- Add comments for complex logic
- Use barrel exports (`index.ts` files) for clean imports

❌ **Don't:**
- Mix page and component logic
- Create deeply nested folder structures
- Use generic names like "Container" or "Wrapper"
- Import from sibling folders with relative paths

## Next Steps

1. Set up path aliases in `tsconfig.json`
2. Implement React Router for multi-page navigation
3. Create custom hooks for common patterns
4. Set up state management (Context API or Zustand)
5. Add reusable component library (Button, Card, Modal, etc.)
