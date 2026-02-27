# StyleX Theme System - Usage Guide

## Quick Start

### 1. Build the StyleX Theme CSS

```bash
npm run build:stylex:readable
```

This generates `dist/baseui-theme-readable.css` with human-readable CSS variable names.

### 2. Import the CSS in Your App

```tsx
import 'baseui/dist/baseui-theme-readable.css';
```

### 3. Use ThemeProvider (Default: Readable Names)

The ThemeProvider now uses **human-readable CSS variable names by default**, making it easy to use with CSS Modules and for debugging:

```tsx
import { ThemeProvider, LightTheme, DarkTheme } from 'baseui';

function App() {
  return (
    <ThemeProvider theme={LightTheme}>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

This gives you CSS variables like:
- `--bui-background-primary`
- `--bui-content-primary`
- `--bui-color-blue-600`
- `--bui-sizing-scale-600`

### 4. Theme Switching

Simply change the theme prop - the ThemeProvider handles the rest:

```tsx
import { useState } from 'react';
import { ThemeProvider, LightTheme, DarkTheme } from 'baseui';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeProvider theme={isDark ? DarkTheme : LightTheme}>
      <button onClick={() => setIsDark(!isDark)}>
        Toggle Theme
      </button>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

---

## Using with CSS Modules

The human-readable CSS variables are **perfect for CSS Modules**:

```css
/* MyComponent.module.css */
.card {
  background: var(--bui-background-primary);
  color: var(--bui-content-primary);
  padding: var(--bui-sizing-scale-600);
  border-radius: var(--bui-border-radius-300);
  box-shadow: var(--bui-shadow-400);
}

.title {
  font-size: var(--bui-font-size-650);
  font-weight: var(--bui-font-weight-bold);
  color: var(--bui-brand-content-primary);
}
```

See **[CSS_MODULES_GUIDE.md](./CSS_MODULES_GUIDE.md)** for comprehensive examples.

---

## Advanced Usage

### Customizing Themes via CSS

You can now customize the theme by overriding CSS variables:

```css
/* custom-theme.css */
:root {
  /* Override with your brand colors */
  --bui-brand-background-primary: #FF6B00;
  --bui-brand-content-primary: #FF6B00;
  --bui-background-accent: #FF6B00;
}

[data-theme="dark"] {
  --bui-brand-background-primary: #FF8533;
  --bui-brand-content-primary: #FF8533;
}
```

Import after the base CSS:
```tsx
import 'baseui/dist/baseui-theme-readable.css';
import './custom-theme.css';
```

### Using Optimized (Hashed) Names for Production

For maximum bundle size optimization, you can use the hashed version:

```tsx
import 'baseui/dist/stylex.css'; // Optimized version

<ThemeProvider theme={LightTheme} useReadableClassNames={false}>
  {/* Your app */}
</ThemeProvider>
```

**Note:** This uses hashed variable names (`--x1q4dcxg`) which are harder to debug but ~30% smaller.

### Conditional Import (Dev = Readable, Prod = Optimized)

Best of both worlds:

```tsx
// main.tsx
if (import.meta.env.DEV) {
  await import('baseui/dist/baseui-theme-readable.css');
} else {
  await import('baseui/dist/stylex.css');
}

<ThemeProvider
  theme={LightTheme}
  useReadableClassNames={import.meta.env.DEV}
>
  <App />
</ThemeProvider>
```

### Disabling CSS Variables (Fallback to JS Themes)

If you need to use the legacy JavaScript theme system:

```tsx
<ThemeProvider theme={LightTheme} useCSSVars={false}>
  {/* Your app */}
</ThemeProvider>
```

### Accessing Theme in Components

Components continue to work exactly as before:

```tsx
import { styled } from 'baseui';

const StyledDiv = styled('div', ({ $theme }) => ({
  // $theme now returns CSS variable references
  backgroundColor: $theme.colors.backgroundPrimary, // Returns: var(--bui-background-primary)
  color: $theme.colors.contentPrimary, // Returns: var(--bui-content-primary)
}));
```

---

## Performance Benefits

### Before (JavaScript Themes)
- Theme values computed at runtime
- JavaScript bundle contains all theme tokens
- Theme switching requires React re-render of entire tree

### After (StyleX CSS Variables)
- Theme values resolved by browser
- Theme tokens in CSS (parallel download)
- Theme switching = instant CSS class swap (no re-render)

---

## Browser Support

CSS custom properties are supported in:
- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 15+

For older browsers, use `useCSSVars={false}`.

---

## Troubleshooting

### Theme not switching
- Ensure `dist/baseui-theme-readable.css` is imported
- Check that ThemeProvider has `useCSSVars={true}` (default)
- Verify theme prop is changing

### Styles not applying
- Make sure you've run `npm run build:stylex:readable` after token changes
- Import the CSS file before any component imports
- Check browser DevTools for CSS variable values

### Wrong CSS file imported
- **Readable version:** `baseui/dist/baseui-theme-readable.css` (default, recommended)
- **Optimized version:** `baseui/dist/stylex.css` (requires `useReadableClassNames={false}`)
- Using the wrong combination will result in missing styles

### TypeScript errors
- Run `npm run build:lib:dts` to regenerate type definitions
- Ensure @stylexjs/stylex is in devDependencies

---

## Migration Checklist

- [ ] Run `npm run build:stylex:readable`
- [ ] Import `baseui/dist/baseui-theme-readable.css` in your app
- [ ] Remove explicit `useReadableClassNames={true}` (it's now the default)
- [ ] Test theme switching functionality
- [ ] Verify all components render correctly
- [ ] Check browser DevTools for CSS variable resolution (should see `--bui-` prefixed names)
- [ ] Test in target browsers
- [ ] (Optional) Start using CSS Modules with design tokens

---

## Build Commands

```bash
# Build readable version (recommended)
npm run build:stylex:readable

# Build optimized version
npm run build:stylex

# Build both (included in full library build)
npm run build:lib
```

---

## What's Next?

This implementation includes:
- ✅ All semantic color tokens
- ✅ Typography, spacing, animation, border, shadow tokens
- ✅ **Component-specific color tokens** (buttons, inputs, modals, tags, etc.) ⭐ **NEW**
- ✅ Light and dark theme support
- ✅ Full backward compatibility
- ✅ **Human-readable CSS variables for CSS Modules** ⭐

The system now includes 563 CSS custom properties covering all design tokens, including:
- **370+ component-specific colors** for buttons, inputs, tags, modals, tooltips, tables, etc.
- All primitive, semantic, and brand colors
- Complete typography, spacing, animation, border, and shadow tokens

Coming soon:
- Additional documentation and examples
- Design token browser/explorer tool

---

## Additional Resources

- **[CSS Modules Guide](./CSS_MODULES_GUIDE.md)** - Complete guide for using CSS Modules with BaseWeb tokens
- **[Readable vs Optimized](./STYLEX_READABLE_VS_OPTIMIZED.md)** - Detailed comparison of both approaches
- **[Migration Status](./STYLEX_MIGRATION_STATUS.md)** - Implementation progress and technical details

---

## Support

For issues or questions:
- Check the guides listed above
- Open an issue on GitHub
- Refer to the [StyleX documentation](https://stylexjs.com/) for advanced usage
