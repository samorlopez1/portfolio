# Design Tokens System

Your portfolio now uses a centralized design tokens system. All style values are stored in `src/tokens.css` and can be easily edited in one place.

## How to Use

### 1. **View All Tokens**
All design tokens are defined in `/src/tokens.css`

### 2. **Edit Globally**
To change any design value across your entire portfolio, simply update the corresponding token in `src/tokens.css`. All components automatically inherit the changes.

## Available Tokens

### Spacing
```css
--padding-m: 9.9px;
--padding-l: 16px;
--padding-xl: 25.9px;
--padding-xxxl: 57.9px;
```

### Colors
```css
--black: #29292e;
--grey: rgba(41, 41, 46, 0.6);
--white: #ffffff;
--light-grey: #c5c5c5;
```

### Typography - Font Families
```css
--font-primary: 'Helvetica Neue', system-ui, sans-serif;
--font-serif: 'PP Editorial New', 'Times New Roman', serif;
```

### Typography - Font Sizes
```css
--text-xs: 12px;           /* Small text */
--text-sm: 14px;           /* Small text variant */
--text-base: 16px;         /* Body text */
--text-lg: 28px;           /* Large heading */
--text-xl: 32px;           /* Extra large heading */
--text-2xl: 142px;         /* Hero name */
```

### Typography - Font Weights
```css
--weight-light: 200;       /* PP Editorial New */
--weight-regular: 400;     /* Default */
--weight-medium: 500;      /* Future use */
```

### Typography - Line Heights
```css
--line-tight: 1.15;        /* Headings */
--line-normal: 1.4;        /* Body text */
--line-loose: 1.5;         /* Spacious text */
```

### Typography - Letter Spacing
```css
--letter-tight: -0.071px;  /* Hero name */
--letter-xsmall: -0.016px; /* Headings */
--letter-normal: 0;        /* Default */
```

### Sizes
```css
--height-hero: 724px;
--height-thumbnail: 400px;
--height-about-image: 420px;
--height-footer: 832px;
--width-about-text: 440px;
--width-about-image: 336px;
--width-skills: 640px;
--width-case-study: 601.15px;
```

### Transitions
```css
--transition-fast: 0.3s ease;
```

## Examples: How to Change Things

### Change all heading font sizes
Edit in `src/tokens.css`:
```css
--text-lg: 32px;  /* was 28px */
--text-xl: 40px;  /* was 32px */
--text-2xl: 160px; /* was 142px */
```
All headings across your site update automatically.

### Change all primary colors
```css
--black: #1a1a1a;
--grey: rgba(26, 26, 26, 0.6);
--white: #f5f5f5;
```

### Change all spacing
```css
--padding-m: 12px;
--padding-l: 20px;
--padding-xl: 32px;
--padding-xxxl: 64px;
```

### Change all fonts
```css
--font-primary: 'Inter', sans-serif;
--font-serif: 'Georgia', serif;
```

## Component Files Using Tokens

All components import the tokens automatically through `index.css`:
- ✅ Navbar.css
- ✅ Hero.css
- ✅ CaseStudy.css
- ✅ AboutSection.css
- ✅ Footer.css
- ✅ HomePage.css

## Quick Reference: Token Usage in CSS

```css
/* Instead of hardcoding colors */
color: var(--black);
color: var(--grey);
background-color: var(--white);

/* Instead of hardcoding sizes */
font-size: var(--text-base);
padding: var(--padding-xl);
height: var(--height-hero);

/* Instead of hardcoding fonts */
font-family: var(--font-primary);
font-family: var(--font-serif);

/* Instead of hardcoding transitions */
transition: opacity var(--transition-fast);
```

## Benefits

✅ **Single Source of Truth** - Edit values once, update everywhere
✅ **Consistency** - Guaranteed consistent design across the site
✅ **Maintainability** - Easy to find and change any design value
✅ **Scalability** - Add new tokens as you expand your design system
✅ **Flexibility** - Quickly test design changes site-wide

## Next Steps

1. Customize any token value in `src/tokens.css`
2. The changes will automatically reflect across all components
3. Save and rebuild with `npm run build`
