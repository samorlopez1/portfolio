# Case Study Components & Styling

This directory contains reusable components and CSS for building flexible, modular case study pages. All styles follow your existing design token system.

## Structure

```
CaseStudy/
├── CaseStudy.css              # Reusable CSS for all case studies
├── components.tsx             # Reusable React components
├── TrainTrek.tsx              # Example: Traditional layout with sidebar
├── VitaminDesign.tsx          # Example: Multiple section types
├── InstagramEvents.tsx        # Example: Varied content organization
└── index.ts                   # Exports
```

## CSS Tokens Used

The CSS uses your existing design tokens:

- **Spacing**: `--padding-xs`, `--padding-s`, `--padding-m`, `--padding-l`, `--padding-xl`, `--padding-xxl`, `--padding-xxxl`
- **Typography**: `--text-xs`, `--text-base`, `--text-m`, `--text-lg`
- **Line Heights**: `--line-tight` (1.15), `--line-normal` (1.4)
- **Colors**: `--black`, `--grey`, `--white`, `--light-grey`
- **Transitions**: `--transition-veryfast`, `--transition-fast`

## Reusable Components

### 1. **CaseStudyNavbar**
Navigation bar with logo and menu links.

```tsx
<CaseStudyNavbar
  logo="PORTFOLIO"
  links={[
    { label: 'HOME', href: '/' },
    { label: 'WORK', href: '/#work' },
  ]}
/>
```

### 2. **CaseStudyHero**
Large hero section with title, subtitle, and image.

```tsx
<CaseStudyHero
  dateAndProject="PROJECT NAME – SEASON YEAR"
  title="Main Title Here"
  description="UI / UX, CATEGORY, TYPE"
  image="image-url"
/>
```

### 3. **CaseStudySidebar**
Sticky sidebar with project info and section navigation.

```tsx
<CaseStudySidebar
  projectTitle="Project Name"
  projectType="PROJECT TYPE"
  links={[
    { id: 'section1', label: 'SECTION 1' },
    { id: 'section2', label: 'SECTION 2' },
  ]}
  activeSection={activeSection}
  onSectionClick={setActiveSection}
/>
```

### 4. **TextSection**
Flexible text content with optional caption, heading, and body.

```tsx
<TextSection
  caption="OPTIONAL CAPTION"
  heading="Section Heading"
  body="Body text content here..."
/>
```

### 5. **ImageSection**
Image with optional caption below.

```tsx
<ImageSection
  src="image-url"
  alt="Alt text"
  caption="Image caption"
/>
```

### 6. **VideoSection**
Embedded video player with optional caption.

```tsx
<VideoSection
  src="video-url.mp4"
  caption="Video caption"
/>
```

### 7. **TextContentWithMetadata**
Text with associated metadata in a 2-column grid (responsive to 1 on mobile).

```tsx
<TextContentWithMetadata
  body="Main content text..."
  metadata={[
    {
      label: 'ROLE',
      items: ['Designer', 'Developer'],
    },
    {
      label: 'TIMELINE',
      items: ['Spring 2025', '4 months'],
    },
  ]}
/>
```

### 8. **ImageGrid**
Responsive grid of images (2 columns → 1 on mobile).

```tsx
<ImageGrid
  images={[
    { src: 'image1.jpg', alt: 'Image 1', caption: 'Caption 1' },
    { src: 'image2.jpg', alt: 'Image 2', caption: 'Caption 2' },
  ]}
/>
```

### 9. **CalloutSection**
Highlighted callout box with title and content.

```tsx
<CalloutSection
  title="Key Finding"
  body="Important insight or statistic..."
/>
```

## CSS Classes for Layout Variations

### Standard Layout (Two-Column with Sidebar)
```tsx
<div className="case-study-content-wrapper">
  <CaseStudySidebar {...props} />
  <main className="case-study-main-content">
    {/* Content sections */}
  </main>
</div>
```

### Full-Width Layout (No Sidebar)
```tsx
<div className="case-study-layout-fullwidth">
  <div className="case-study-content-wrapper">
    <main className="case-study-main-content">
      {/* Content sections */}
    </main>
  </div>
</div>
```

### Section Variations

#### Split Content Layout
```tsx
<div className="section-split">
  <div>Left content</div>
  <div>Right content</div>
</div>
```

#### Centered Section
```tsx
<section className="section-centered">
  {/* Content */}
</section>
```

## Creating a New Case Study

1. **Create a new file** in `src/pages/CaseStudy/`:
   ```tsx
   import React, { useState } from 'react';
   import '../CaseStudy.css';
   import { CaseStudyNavbar, CaseStudyHero, /* ... */ } from './components';
   ```

2. **Set up navigation and sidebar links**:
   ```tsx
   const sidebarLinks = [
     { id: 'section1', label: 'SECTION 1' },
     { id: 'section2', label: 'SECTION 2' },
   ];
   ```

3. **Build your page structure**:
   ```tsx
   <CaseStudyNavbar links={navLinks} />
   <CaseStudyHero {...heroProps} />
   <div className="case-study-content-wrapper">
     <CaseStudySidebar {...sidebarProps} />
     <main className="case-study-main-content">
       {/* Sections using reusable components */}
     </main>
   </div>
   ```

4. **Export from index.ts**:
   ```tsx
   export { NewCaseStudy } from './NewCaseStudy';
   ```

## Responsive Behavior

- **Desktop**: Two-column layout with sticky sidebar
- **Tablet (≤ 1200px)**: Full-width content, sidebar top
- **Mobile (≤ 768px)**: Single column, all content stacked

## Customization

Each component accepts optional `className` props and can be wrapped or extended with additional styling. The CSS is designed to be flexible and composable.

### Color Scheme
To override default colors, modify the CSS variables in your tokens or pass inline styles:

```tsx
<div style={{ backgroundColor: '#f5f5f5', padding: 'var(--padding-xl)' }}>
  {/* Content */}
</div>
```

### Typography
Modify `tokens.css` to adjust sizing, spacing, or weights globally.

## Examples

Three example case study pages are included:

1. **TrainTrek** - Speculative app with rewards system
2. **Vitamin Design** - Design system project with component library
3. **Instagram Events** - Social commerce feature design

Each demonstrates different content organization while using the same reusable components.
