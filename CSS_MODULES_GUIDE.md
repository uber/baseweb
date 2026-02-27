# Using CSS Modules with BaseWeb Design Tokens

BaseWeb now provides **human-readable CSS custom properties** that can be referenced in CSS Modules, allowing you to build custom components while maintaining design system consistency.

## Why Human-Readable Variables?

When writing CSS in CSS Modules, you need to reference design tokens by name. Compare:

### ❌ With Hashed Names (Not Practical)
```css
/* MyComponent.module.css */
.container {
  background: var(--x1q4dcxg); /* What is this? */
  color: var(--xlgqh2z); /* No idea! */
  padding: var(--xtexlk8); /* Have to look it up */
}
```

### ✅ With Human-Readable Names (Perfect!)
```css
/* MyComponent.module.css */
.container {
  background: var(--bui-background-primary);
  color: var(--bui-content-primary);
  padding: var(--bui-sizing-scale-600);
  border-radius: var(--bui-border-radius-300);
}
```

---

## Setup

### 1. Import the CSS Variables

```tsx
// main.tsx or App.tsx
import 'baseui/dist/baseui-theme-readable.css';
import { BaseProvider, LightTheme } from 'baseui';

function App() {
  return (
    <BaseProvider theme={LightTheme} useReadableClassNames={true}>
      {/* Your app */}
    </BaseProvider>
  );
}
```

### 2. Create Your CSS Module

```css
/* MyComponent.module.css */
.card {
  background: var(--bui-background-primary);
  border: 1px solid var(--bui-border-opaque);
  border-radius: var(--bui-border-radius-300);
  padding: var(--bui-sizing-scale-600);
  box-shadow: var(--bui-shadow-400);
}

.cardTitle {
  font-family: var(--bui-font-family-secondary);
  font-size: var(--bui-font-size-550);
  font-weight: var(--bui-font-weight-bold);
  line-height: var(--bui-line-height-550);
  color: var(--bui-content-primary);
  margin-bottom: var(--bui-sizing-scale-300);
}

.cardContent {
  font-family: var(--bui-font-family-primary);
  font-size: var(--bui-font-size-300);
  line-height: var(--bui-line-height-300);
  color: var(--bui-content-secondary);
}

.primaryButton {
  background: var(--bui-brand-background-primary);
  color: var(--bui-brand-content-on-primary);
  border: none;
  border-radius: var(--bui-border-radius-200);
  padding: var(--bui-sizing-scale-400) var(--bui-sizing-scale-600);
  font-size: var(--bui-font-size-200);
  font-weight: var(--bui-font-weight-medium);
  cursor: pointer;
  transition: transform var(--bui-animation-timing-200) var(--bui-animation-ease-decelerate);
}

.primaryButton:hover {
  transform: translateY(-1px);
  box-shadow: var(--bui-shadow-400);
}

.primaryButton:active {
  transform: translateY(0);
}
```

### 3. Use in Your Component

```tsx
// MyComponent.tsx
import styles from './MyComponent.module.css';

export function MyComponent() {
  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>Design System Card</h2>
      <p className={styles.cardContent}>
        This card uses CSS Modules with BaseWeb design tokens!
      </p>
      <button className={styles.primaryButton}>
        Click Me
      </button>
    </div>
  );
}
```

---

## Complete Token Reference

### Colors

#### Primitives
```css
/* Grays */
--bui-color-white: #FFFFFF;
--bui-color-black: #000000;
--bui-color-gray-50: #F3F3F3;
--bui-color-gray-100: #E8E8E8;
--bui-color-gray-200: #DDDDDD;
--bui-color-gray-300: #C6C6C6;
--bui-color-gray-400: #A6A6A6;
--bui-color-gray-500: #868686;
--bui-color-gray-600: #727272;
--bui-color-gray-700: #5E5E5E;
--bui-color-gray-800: #4B4B4B;
--bui-color-gray-900: #282828;

/* Brand */
--bui-color-brand-50: #EFF4FE;
--bui-color-brand-600: #276EF1; /* Primary brand color */
--bui-color-brand-700: #175BCC;

/* Red */
--bui-color-red-50: #FFF0EE;
--bui-color-red-600: #DE1135;
--bui-color-red-700: #BB032A;

/* Green */
--bui-color-green-50: #EAF6ED;
--bui-color-green-600: #0E8345;
--bui-color-green-700: #166C3B;

/* Blue */
--bui-color-blue-50: #EFF4FE;
--bui-color-blue-600: #276EF1;
--bui-color-blue-700: #175BCC;

/* Yellow */
--bui-color-yellow-50: #FDF2DC;
--bui-color-yellow-600: #9F6402;
--bui-color-yellow-700: #845201;
```

#### Semantic Colors
```css
/* Background */
--bui-background-primary: #FFFFFF;
--bui-background-secondary: #F3F3F3;
--bui-background-tertiary: #E8E8E8;
--bui-background-inverse-primary: #000000;
--bui-background-state-disabled: #F3F3F3;
--bui-background-overlay: rgba(0, 0, 0, 0.5);
--bui-background-accent: #276EF1;
--bui-background-negative: #DE1135;
--bui-background-warning: #F6BC2F;
--bui-background-positive: #0E8345;
--bui-background-accent-light: #EFF4FE;

/* Content (Text) */
--bui-content-primary: #000000;
--bui-content-secondary: #4B4B4B;
--bui-content-tertiary: #5E5E5E;
--bui-content-inverse-primary: #FFFFFF;
--bui-content-state-disabled: #A6A6A6;
--bui-content-on-color: #FFFFFF;
--bui-content-accent: #276EF1;
--bui-content-negative: #DE1135;
--bui-content-warning: #9F6402;
--bui-content-positive: #0E8345;

/* Border */
--bui-border-opaque: #F3F3F3;
--bui-border-transparent: rgba(0, 0, 0, 0.08);
--bui-border-selected: #000000;
--bui-border-state-disabled: #F3F3F3;
--bui-border-accent: #276EF1;
--bui-border-negative: #DE1135;
--bui-border-warning: #9F6402;
--bui-border-positive: #0E8345;

/* Brand */
--bui-brand-background-primary: #276EF1;
--bui-brand-background-secondary: #EFF4FE;
--bui-brand-content-primary: #276EF1;
--bui-brand-content-on-primary: #FFFFFF;
--bui-brand-border-accessible: #276EF1;
```

### Typography
```css
/* Font Families */
--bui-font-family-primary: UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif;
--bui-font-family-secondary: UberMove, UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif;
--bui-font-family-mono: UberMoveMono, "Lucida Console", Monaco, monospace;

/* Font Sizes */
--bui-font-size-100: 12px;  /* Small text */
--bui-font-size-200: 14px;  /* Body text */
--bui-font-size-300: 16px;  /* Default body */
--bui-font-size-400: 18px;  /* Large body */
--bui-font-size-550: 20px;  /* Small heading */
--bui-font-size-650: 24px;  /* Medium heading */
--bui-font-size-750: 28px;  /* Large heading */
--bui-font-size-850: 32px;  /* XL heading */

/* Font Weights */
--bui-font-weight-normal: normal;
--bui-font-weight-medium: 500;
--bui-font-weight-bold: 700;

/* Line Heights */
--bui-line-height-100: 20px;
--bui-line-height-200: 20px;
--bui-line-height-300: 24px;
--bui-line-height-400: 28px;
--bui-line-height-550: 28px;
--bui-line-height-650: 32px;
```

### Spacing
```css
--bui-sizing-scale-0: 2px;     /* 0.125rem */
--bui-sizing-scale-100: 4px;   /* 0.25rem */
--bui-sizing-scale-200: 6px;   /* 0.375rem */
--bui-sizing-scale-300: 8px;   /* 0.5rem */
--bui-sizing-scale-400: 10px;  /* 0.625rem */
--bui-sizing-scale-500: 12px;  /* 0.75rem */
--bui-sizing-scale-600: 16px;  /* 1rem */
--bui-sizing-scale-700: 20px;  /* 1.25rem */
--bui-sizing-scale-800: 24px;  /* 1.5rem */
--bui-sizing-scale-900: 32px;  /* 2rem */
--bui-sizing-scale-1000: 40px; /* 2.5rem */
--bui-sizing-scale-1200: 48px; /* 3rem */
```

### Borders
```css
--bui-border-radius-100: 2px;
--bui-border-radius-200: 4px;
--bui-border-radius-300: 8px;
--bui-border-radius-400: 16px;
--bui-border-radius-circle: 50%;
--bui-border-radius-pill: 9999px;
```

### Shadows
```css
--bui-shadow-100: 0 1px 4px rgba(0, 0, 0, 0.16);
--bui-shadow-400: 0 2px 8px rgba(0, 0, 0, 0.16);
--bui-shadow-600: 0 4px 16px rgba(0, 0, 0, 0.16);
--bui-shadow-700: 0 8px 24px rgba(0, 0, 0, 0.16);
```

### Animation
```css
--bui-animation-timing-100: 100ms;
--bui-animation-timing-200: 200ms;
--bui-animation-timing-300: 300ms;
--bui-animation-timing-400: 400ms;

--bui-animation-ease-linear: cubic-bezier(0, 0, 1, 1);
--bui-animation-ease-decelerate: cubic-bezier(0.22, 1, 0.36, 1);
--bui-animation-ease-accelerate: cubic-bezier(0.64, 0, 0.78, 0);
--bui-animation-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## Real-World Examples

### Example 1: Alert Component
```css
/* Alert.module.css */
.alert {
  border-radius: var(--bui-border-radius-200);
  padding: var(--bui-sizing-scale-500) var(--bui-sizing-scale-600);
  font-size: var(--bui-font-size-200);
  line-height: var(--bui-line-height-200);
  border: 1px solid;
}

.alertInfo {
  background: var(--bui-background-accent-light);
  color: var(--bui-content-accent);
  border-color: var(--bui-border-accent);
}

.alertSuccess {
  background: var(--bui-background-positive-light);
  color: var(--bui-content-positive);
  border-color: var(--bui-border-positive);
}

.alertWarning {
  background: var(--bui-background-warning-light);
  color: var(--bui-content-warning);
  border-color: var(--bui-border-warning);
}

.alertError {
  background: var(--bui-background-negative-light);
  color: var(--bui-content-negative);
  border-color: var(--bui-border-negative);
}
```

### Example 2: Form Input
```css
/* Input.module.css */
.inputWrapper {
  margin-bottom: var(--bui-sizing-scale-600);
}

.label {
  display: block;
  font-size: var(--bui-font-size-200);
  font-weight: var(--bui-font-weight-medium);
  color: var(--bui-content-primary);
  margin-bottom: var(--bui-sizing-scale-200);
}

.input {
  width: 100%;
  padding: var(--bui-sizing-scale-400) var(--bui-sizing-scale-500);
  font-size: var(--bui-font-size-300);
  font-family: var(--bui-font-family-primary);
  color: var(--bui-content-primary);
  background: var(--bui-background-primary);
  border: 1px solid var(--bui-border-opaque);
  border-radius: var(--bui-border-radius-200);
  transition: border-color var(--bui-animation-timing-200) var(--bui-animation-ease-decelerate);
}

.input:focus {
  outline: none;
  border-color: var(--bui-border-accent);
  box-shadow: 0 0 0 3px var(--bui-background-accent-light);
}

.input:disabled {
  background: var(--bui-background-state-disabled);
  color: var(--bui-content-state-disabled);
  cursor: not-allowed;
}

.inputError {
  border-color: var(--bui-border-negative);
}

.errorMessage {
  font-size: var(--bui-font-size-100);
  color: var(--bui-content-negative);
  margin-top: var(--bui-sizing-scale-200);
}
```

### Example 3: Navigation
```css
/* Nav.module.css */
.nav {
  background: var(--bui-background-primary);
  border-bottom: 1px solid var(--bui-border-opaque);
  padding: var(--bui-sizing-scale-600) var(--bui-sizing-scale-800);
  box-shadow: var(--bui-shadow-100);
}

.navList {
  display: flex;
  gap: var(--bui-sizing-scale-600);
  list-style: none;
  margin: 0;
  padding: 0;
}

.navLink {
  font-size: var(--bui-font-size-200);
  font-weight: var(--bui-font-weight-medium);
  color: var(--bui-content-secondary);
  text-decoration: none;
  padding: var(--bui-sizing-scale-300) var(--bui-sizing-scale-500);
  border-radius: var(--bui-border-radius-200);
  transition: all var(--bui-animation-timing-200) var(--bui-animation-ease-decelerate);
}

.navLink:hover {
  color: var(--bui-content-primary);
  background: var(--bui-background-secondary);
}

.navLinkActive {
  color: var(--bui-brand-content-primary);
  background: var(--bui-brand-background-secondary);
}
```

### Example 4: Dark Mode Support
```css
/* Theme.module.css */
.container {
  min-height: 100vh;
  background: var(--bui-background-primary);
  color: var(--bui-content-primary);
  transition: background var(--bui-animation-timing-300) var(--bui-animation-ease-decelerate);
}

.sidebar {
  background: var(--bui-background-secondary);
  border-right: 1px solid var(--bui-border-opaque);
  padding: var(--bui-sizing-scale-800);
}

/* No dark mode overrides needed!
   The CSS variables automatically update when theme changes */
```

### Example 5: Custom Button Component (Using Component Tokens)
```css
/* CustomButton.module.css */
.button {
  /* Use component-specific tokens for consistency with BaseUI buttons */
  font-size: var(--bui-font-size-200);
  font-weight: var(--bui-font-weight-medium);
  padding: var(--bui-sizing-scale-400) var(--bui-sizing-scale-600);
  border-radius: var(--bui-border-radius-200);
  border: none;
  cursor: pointer;
  transition: all var(--bui-animation-timing-200) var(--bui-animation-ease-decelerate);
}

.buttonPrimary {
  background: var(--bui-button-primary-fill);
  color: var(--bui-button-primary-text);
}

.buttonPrimary:hover {
  background: var(--bui-button-primary-hover);
}

.buttonPrimary:active {
  background: var(--bui-button-primary-active);
}

.buttonSecondary {
  background: var(--bui-button-secondary-fill);
  color: var(--bui-button-secondary-text);
}

.buttonSecondary:hover {
  background: var(--bui-button-secondary-hover);
}

.buttonDanger {
  background: var(--bui-button-danger-primary-fill);
  color: var(--bui-button-danger-primary-text);
}

.buttonDisabled {
  background: var(--bui-button-disabled-fill);
  color: var(--bui-button-disabled-text);
  cursor: not-allowed;
}
```

### Example 6: Custom Tag Component
```css
/* Tag.module.css */
.tag {
  display: inline-flex;
  align-items: center;
  gap: var(--bui-sizing-scale-200);
  padding: var(--bui-sizing-scale-200) var(--bui-sizing-scale-400);
  border-radius: var(--bui-border-radius-pill);
  font-size: var(--bui-font-size-100);
  font-weight: var(--bui-font-weight-medium);
}

.tagAccent {
  background: var(--bui-tag-accent-outlined-background);
  color: var(--bui-tag-accent-outlined-font);
}

.tagPositive {
  background: var(--bui-tag-positive-outlined-background);
  color: var(--bui-tag-positive-outlined-font);
}

.tagWarning {
  background: var(--bui-tag-warning-outlined-background);
  color: var(--bui-tag-warning-outlined-font);
}

.tagNegative {
  background: var(--bui-tag-negative-outlined-background);
  color: var(--bui-tag-negative-outlined-font);
}

.tagSolid {
  /* Override with solid variants */
}

.tagSolid.tagAccent {
  background: var(--bui-tag-accent-solid-background);
  color: var(--bui-tag-accent-solid-font);
}
```

---

## Mixing CSS Modules with BaseUI Components

You can use CSS Modules for custom styling while using BaseUI components:

```tsx
// Dashboard.tsx
import { Button } from 'baseui/button';
import { Card } from 'baseui/card';
import styles from './Dashboard.module.css';

export function Dashboard() {
  return (
    <div className={styles.container}>
      {/* Custom CSS Module styling */}
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
      </header>

      {/* BaseUI component */}
      <Card>
        {/* Mix custom CSS with BaseUI */}
        <div className={styles.cardContent}>
          <Button>BaseUI Button</Button>
        </div>
      </Card>
    </div>
  );
}
```

```css
/* Dashboard.module.css */
.container {
  padding: var(--bui-sizing-scale-800);
  background: var(--bui-background-secondary);
}

.header {
  margin-bottom: var(--bui-sizing-scale-800);
  padding-bottom: var(--bui-sizing-scale-600);
  border-bottom: 1px solid var(--bui-border-opaque);
}

.title {
  font-family: var(--bui-font-family-secondary);
  font-size: var(--bui-font-size-850);
  font-weight: var(--bui-font-weight-bold);
  color: var(--bui-content-primary);
  margin: 0;
}

.cardContent {
  padding: var(--bui-sizing-scale-600);
}
```

---

## TypeScript Support

For autocomplete in CSS modules (optional):

```ts
// csstype.d.ts
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
```

---

## Best Practices

### ✅ DO:
- Use semantic tokens (`--bui-background-primary`) over primitives for consistency
- Reference spacing scale variables instead of hardcoded values
- Use design system colors to maintain brand consistency
- Leverage animation tokens for consistent motion
- Let CSS variables handle theme switching automatically

### ❌ DON'T:
- Hardcode colors: `background: #FFFFFF` ❌ → Use `background: var(--bui-background-primary)` ✅
- Hardcode spacing: `padding: 16px` ❌ → Use `padding: var(--bui-sizing-scale-600)` ✅
- Create custom shadows: `box-shadow: 0 2px 4px rgba(...)` ❌ → Use `box-shadow: var(--bui-shadow-400)` ✅
- Hardcode transitions: `transition: all 200ms ease` ❌ → Use the animation tokens ✅

---

## IDE Support

### VS Code Autocomplete

Install the "CSS Var Complete" extension for autocomplete:
1. Install: `CSS Var Complete` by phoenisx
2. Variables starting with `--bui-` will autocomplete
3. Hover to see values

### Custom Snippets

Add to your VS Code settings:
```json
{
  "css.customData": [".vscode/css-custom-data.json"]
}
```

Create `.vscode/css-custom-data.json`:
```json
{
  "version": 1.1,
  "properties": [],
  "atDirectives": [],
  "pseudoClasses": [],
  "pseudoElements": []
}
```

---

## Migration from Inline Styles

### Before (Inline styles)
```tsx
function Card({ children }) {
  return (
    <div style={{
      background: '#FFFFFF',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.16)'
    }}>
      {children}
    </div>
  );
}
```

### After (CSS Modules + Design Tokens)
```tsx
// Card.tsx
import styles from './Card.module.css';

function Card({ children }) {
  return (
    <div className={styles.card}>
      {children}
    </div>
  );
}
```

```css
/* Card.module.css */
.card {
  background: var(--bui-background-primary);
  padding: var(--bui-sizing-scale-600);
  border-radius: var(--bui-border-radius-300);
  box-shadow: var(--bui-shadow-400);
}
```

**Benefits:**
- ✅ Automatic dark mode support
- ✅ Design system consistency
- ✅ Easier to maintain
- ✅ Better performance (CSS vs inline styles)

---

## Component Color Tokens Reference

BaseUI now includes **370+ component-specific color tokens** for building custom components that match the BaseUI design system perfectly.

### Buttons
All button variants with states (hover, active, disabled, selected):
- `--bui-button-primary-*` - Primary buttons (black background, white text)
- `--bui-button-secondary-*` - Secondary buttons (gray background)
- `--bui-button-tertiary-*` - Tertiary/ghost buttons
- `--bui-button-danger-*` - Danger buttons (all variants)
- `--bui-button-outline-*` - Outline buttons
- `--bui-button-disabled-*` - Disabled state

### Form Controls
- `--bui-input-*` - Input fields (fill, border, error, positive, disabled states)
- `--bui-tick-*` - Checkboxes (fill, selected, error, hover states)
- `--bui-toggle-*` - Toggle switches
- `--bui-slider-*` - Sliders and range inputs

### Tags
All tag color variants with solid and outlined styles:
- `--bui-tag-accent-*` (blue)
- `--bui-tag-positive-*` (green)
- `--bui-tag-warning-*` (yellow)
- `--bui-tag-negative-*` (red)
- `--bui-tag-neutral-*` / `--bui-tag-primary-*` (gray)

### Notifications & Feedback
- `--bui-notification-*` - In-page notifications (info, positive, warning, negative)
- `--bui-toast-*` - Toast notifications
- `--bui-banner-*` - Banners
- `--bui-modal-*` - Modal dialogs
- `--bui-tooltip-*` - Tooltips

### Navigation & Menus
- `--bui-menu-*` - Dropdown menus
- `--bui-tab-*` - Tabs
- `--bui-breadcrumbs-*` - Breadcrumbs
- `--bui-bottom-navigation-*` - Bottom navigation

### Data Display
- `--bui-table-*` - Tables
- `--bui-list-*` - Lists
- `--bui-calendar-*` - Calendar/Datepicker

### Other Components
- `--bui-link-*` - Links (default, visited, hover, active)
- `--bui-file-uploader-*` - File upload component
- `--bui-combobox-*` - Combobox/autocomplete
- `--bui-progress-steps-*` - Progress indicators
- `--bui-spinner-*` / `--bui-progressbar-*` - Loading states
- `--bui-rating-*` - Rating component

**Complete list:** See `dist/baseui-theme-readable.css` for all 563 available tokens.

---

## Summary

Human-readable CSS variables enable:
1. **CSS Modules integration** - Write custom styles with design tokens
2. **Easier debugging** - Know what each variable represents
3. **Better developer experience** - Autocomplete and documentation
4. **Design system consistency** - Use official tokens everywhere
5. **Automatic theming** - Dark mode works without extra code

All while maintaining full compatibility with BaseUI components! 🎉
