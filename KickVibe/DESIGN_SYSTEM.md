# KickVibe Design System - Quick Reference Guide

## 🎨 Color System

### Primary Colors
```css
--primary: #FF6B35                 /* Main brand orange */
--primary-light: #FFB380           /* Light variant for backgrounds */
--primary-dark: #E85A2A            /* Dark variant for hover states */
```

### Secondary Colors
```css
--secondary: #004E89               /* Navy blue */
--secondary-light: #1A6BA8         /* Light variant */
--secondary-dark: #00365F          /* Dark variant */
```

### Accent Colors
```css
--accent: #F7B801                  /* Gold accent */
--accent-light: #FFD447            /* Light variant */
--accent-dark: #D49800             /* Dark variant */
```

### Status Colors
```css
--success: #10b981                 /* Green for positive actions */
--danger: #ef4444                  /* Red for destructive actions */
--warning: #f59e0b                 /* Amber for warnings */
--info: #3b82f6                    /* Blue for informational */
```

## 📐 Typography

### Font Families
```css
--font-family: 'Poppins', 'Inter', 'Montserrat', sans-serif;
--font-family-mono: 'Courier New', monospace;
```

### Font Sizes
```
--font-size-xs: 12px           /* Small captions */
--font-size-sm: 14px           /* Small body text */
--font-size-base: 16px         /* Default */
--font-size-lg: 18px           /* Body text large */
--font-size-xl: 20px           /* Subheadings */
--font-size-2xl: 24px          /* Headings */
--font-size-3xl: 32px          /* Large headings */
--font-size-4xl: 40px          /* Extra large headings */
--font-size-5xl: 48px          /* Hero text */
```

### Usage Examples
```html
<!-- Hero heading -->
<h1 style="font-size: clamp(2rem, 5vw, 3rem);">Your Title</h1>

<!-- Subheading -->
<h2 style="font-size: 1.5rem; font-weight: 800;">Subtitle</h2>

<!-- Body text -->
<p style="font-size: 1rem; line-height: 1.6;">Body text</p>

<!-- Small caption -->
<span style="font-size: var(--font-size-xs); text-transform: uppercase;">Caption</span>
```

## 📏 Spacing Scale (8px Grid)

```css
--spacing-xs: 4px;     /* Minimal spacing */
--spacing-sm: 8px;     /* Small spacing */
--spacing-md: 16px;    /* Default spacing */
--spacing-lg: 24px;    /* Large spacing */
--spacing-xl: 32px;    /* Extra large */
--spacing-2xl: 48px;   /* 2x extra large */
--spacing-3xl: 64px;   /* 3x extra large */
```

## 🎯 Component Patterns

### Button Styles

#### Primary Button
```html
<button class="btn btn-primary">Click Me</button>
```

#### Large Primary Button
```html
<button class="btn btn-primary btn-large">Click Me</button>
```

#### Outline Button
```html
<button class="btn btn-outline">Click Me</button>
```

#### Ghost Button
```html
<button class="btn btn-ghost">Click Me</button>
```

#### Icon Button
```html
<button class="btn btn-icon">🔍</button>
```

### Card Components

#### Basic Card
```html
<div class="card">
  <h3>Title</h3>
  <p>Content here</p>
</div>
```

#### Product Card
```html
<div class="product-card">
  <div class="product-image">
    <img src="..." alt="...">
    <div class="product-badge">New</div>
  </div>
  <div class="product-info">
    <div class="product-name">Product Name</div>
    <div class="product-price">$99.99</div>
  </div>
</div>
```

### Form Components

#### Form Group
```html
<div class="form-group">
  <label>Email Address</label>
  <input type="email" placeholder="Enter email" />
  <div class="form-error">Error message</div>
</div>
```

#### Form Row (Grid Layout)
```html
<div class="form-row">
  <div class="form-group">
    <label>First Name</label>
    <input type="text" />
  </div>
  <div class="form-group">
    <label>Last Name</label>
    <input type="text" />
  </div>
</div>
```

## 🎭 Color Combinations

### Navigation Bar
```css
background: linear-gradient(135deg, var(--white), var(--gray-50));
```

### Hero Section
```css
background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
```

### Footer
```css
background: linear-gradient(135deg, var(--dark) 0%, var(--gray-800) 100%);
```

### Product Cards
```css
background: linear-gradient(135deg, var(--gray-50), var(--white));
border: 1px solid var(--gray-200);
```

## 🔄 Responsive Design

### Breakpoints
```css
Mobile: 480px and below
Tablet: 768px
Desktop: 1200px+
```

### Responsive Text Sizing
```css
/* Responsive heading that scales with viewport */
h1 { font-size: clamp(2rem, 5vw, 3rem); }

/* Scale from 1rem on mobile to 1.3rem on desktop */
p { font-size: clamp(1rem, 2vw, 1.3rem); }
```

### Responsive Spacing
```css
/* Scales spacing based on viewport */
section { padding: var(--spacing-lg) var(--spacing-md); }
```

## ✨ Shadow System

### Usage
```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.15);
```

### Example
```css
.card {
  box-shadow: var(--shadow-md);
}

.card:hover {
  box-shadow: var(--shadow-lg);
}
```

## 🎬 Animation System

### Transitions
```css
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-fast: all 0.15s ease;
--transition-slow: all 0.5s ease;
```

### Usage
```css
.button {
  transition: var(--transition);
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

### Keyframe Animations
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUp 0.5s ease;
}
```

## 🔗 Grid Layouts

### 3-Column Grid
```html
<div class="grid grid-3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### 4-Column Grid
```html
<div class="grid grid-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```

### Responsive Grid
```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--spacing-lg);">
  <div>Item</div>
  <div>Item</div>
  <div>Item</div>
</div>
```

## 🌙 Dark Mode

### Applying Dark Mode
```javascript
document.body.classList.add('dark-mode');
```

### Dark Mode Variables (Automatic)
```css
body.dark-mode {
  --light: #2d2d2d;
  --dark: #f8f9fa;
  --gray-light: #3d3d3d;
  --gray-medium: #8a8a8a;
  --gray-dark: #b8b8b8;
}
```

## 📊 Common Patterns

### Header Layout
```html
<header>
  <div class="container">
    <nav class="navbar">
      <a href="/" class="logo">🔥 KickVibe</a>
      <ul class="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/shop">Shop</a></li>
      </ul>
      <div class="nav-actions">
        <button class="nav-icon">🌙</button>
        <button class="nav-icon">🛒</button>
      </div>
    </nav>
  </div>
</header>
```

### Hero Section
```html
<section style="
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: white;
  padding: var(--spacing-3xl) var(--spacing-md);
  text-align: center;
">
  <div class="container">
    <h1 style="font-size: clamp(2rem, 5vw, 3rem);">Title</h1>
    <p style="font-size: 1.1rem; max-width: 600px;">Description</p>
  </div>
</section>
```

### Feature Grid
```html
<section style="padding: var(--spacing-3xl) var(--spacing-md);">
  <div class="container">
    <div class="grid grid-2">
      <div style="display: flex; gap: var(--spacing-lg);">
        <div style="font-size: 2rem;">🚀</div>
        <div>
          <h3>Title</h3>
          <p>Description</p>
        </div>
      </div>
      <!-- Repeat -->
    </div>
  </div>
</section>
```

## 💡 Pro Tips

1. **Always use spacing variables** - Maintains consistency across the site
2. **Leverage color gradients** - Makes design feel modern and premium
3. **Use clamp() for responsive text** - No media queries needed for typography
4. **Apply transitions to interactive elements** - Improves perceived performance
5. **Layer shadows for depth** - Creates visual hierarchy
6. **Maintain contrast ratios** - Ensure accessibility (WCAG AA minimum 4.5:1)
7. **Use GPU-accelerated properties** - Stick to transform and opacity
8. **Test on real devices** - Responsive design matters on actual phones

---

**Last Updated**: December 5, 2025
**Design System Version**: 1.0
