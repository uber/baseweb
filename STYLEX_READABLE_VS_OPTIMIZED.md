# BaseWeb StyleX CSS Variables - Readable vs Optimized

BaseWeb now supports two versions of CSS custom properties for theming:

## 1. Human-Readable Version (Recommended for Development)

**File:** `baseui/dist/baseui-theme-readable.css`
**Size:** ~9.4 KB

### Variable Names
```css
--bui-background-primary: #FFFFFF;
--bui-content-primary: #000000;
--bui-color-blue-600: #276EF1;
--bui-font-size-300: 16px;
--bui-sizing-scale-600: 16px;
```

### Usage
```tsx
import 'baseui/dist/baseui-theme-readable.css';

<BaseProvider theme={LightTheme} useReadableClassNames={true}>
  {/* Your app */}
</BaseProvider>
```

### Advantages
✅ **Easy to debug** - Variable names are self-documenting
✅ **Better DevTools experience** - Know what you're looking at
✅ **Easier customization** - Override specific variables by name
✅ **Great for development** - Understand styles at a glance

### Disadvantages
⚠️ **Slightly larger file size** (~9.4 KB vs ~6.7 KB gzipped)
⚠️ **Slightly larger HTML** (data-theme attribute vs single class)

---

## 2. Optimized Version (Recommended for Production)

**File:** `baseui/dist/stylex.css`
**Size:** ~6.7 KB gzipped

### Variable Names
```css
--x1q4dcxg: #FFFFFF;
--xlgqh2z: #000000;
--xis5df6: #276EF1;
--xtexlk8: 24px;
```

### Usage
```tsx
import 'baseui/dist/stylex.css';

<BaseProvider theme={LightTheme}>
  {/* Your app */}
</BaseProvider>
```

### Advantages
✅ **Smaller bundle size** - Optimized variable and class names
✅ **Faster rendering** - Single class swap for theme switching
✅ **Production-ready** - Used by Meta internally

### Disadvantages
⚠️ **Harder to debug** - Hashed variable names
⚠️ **Less readable** in DevTools

---

## Comparison

| Feature | Readable | Optimized |
|---------|----------|-----------|
| **CSS File Size** | 9.4 KB | 6.7 KB (gzipped) |
| **Variable Names** | `--bui-background-primary` | `--x1q4dcxg` |
| **Theme Switching** | `data-theme="dark"` | `.x1vai19m` |
| **Debugging** | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐ Difficult |
| **Performance** | ⭐⭐⭐⭐ Very Good | ⭐⭐⭐⭐⭐ Excellent |
| **Customization** | ⭐⭐⭐⭐⭐ Easy | ⭐⭐⭐ Moderate |
| **Production Use** | ✅ Fine | ✅ Preferred |

---

## Recommended Approach

### Development
Use **readable version** for better DX:
```tsx
import 'baseui/dist/baseui-theme-readable.css';

<BaseProvider theme={LightTheme} useReadableClassNames={true}>
  <App />
</BaseProvider>
```

### Production
Use **optimized version** for performance:
```tsx
import 'baseui/dist/stylex.css';

<BaseProvider theme={LightTheme}>
  <App />
</BaseProvider>
```

### Conditional Import (Best of Both Worlds)
```tsx
// main.tsx
if (import.meta.env.DEV) {
  await import('baseui/dist/baseui-theme-readable.css');
} else {
  await import('baseui/dist/stylex.css');
}

<BaseProvider
  theme={LightTheme}
  useReadableClassNames={import.meta.env.DEV}
>
  <App />
</BaseProvider>
```

---

## Customization Examples

### Readable Version
Easy to understand and override:
```css
/* Custom theme overrides */
:root {
  --bui-background-primary: #F0F0F0;
  --bui-content-primary: #1A1A1A;
  --bui-color-brand-600: #FF6B00; /* Custom brand color */
}

[data-theme="dark"] {
  --bui-background-primary: #1A1A1A;
  --bui-content-primary: #F0F0F0;
}
```

### Optimized Version
Requires looking up variable mappings:
```css
/* Custom theme overrides */
:root {
  --x1q4dcxg: #F0F0F0; /* backgroundPrimary */
  --xlgqh2z: #1A1A1A;  /* contentPrimary */
}
```

---

## Debugging Tips

### Readable Version
Open DevTools → Inspect element → Computed tab:
```
background-color: var(--bui-background-primary)
↳ #FFFFFF
```

You immediately know this is the primary background color.

### Optimized Version
Open DevTools → Inspect element → Computed tab:
```
background-color: var(--x1q4dcxg)
↳ #FFFFFF
```

You need to search the CSS file to find what `--x1q4dcxg` represents.

---

## Migration Guide

### From Legacy JS Themes
Both versions work identically in your code:

```tsx
// Your component code stays the same!
const StyledDiv = styled('div', ({ $theme }) => ({
  backgroundColor: $theme.colors.backgroundPrimary,
  color: $theme.colors.contentPrimary,
}));

// With readable CSS vars: backgroundColor: var(--bui-background-primary)
// With optimized CSS vars: backgroundColor: var(--x1q4dcxg)
// Both resolve to the same color!
```

### Switching Between Versions

**From Optimized → Readable:**
1. Change import: `stylex.css` → `baseui-theme-readable.css`
2. Add prop: `useReadableClassNames={true}`

**From Readable → Optimized:**
1. Change import: `baseui-theme-readable.css` → `stylex.css`
2. Remove prop: `useReadableClassNames={true}` (or set to `false`)

---

## Build Scripts

Generate both versions:
```bash
# Generate optimized (hashed) version
npm run build:stylex

# Generate readable version
npm run build:stylex:readable

# Generate both
npm run build:lib
```

---

## When to Use Each

### Use Readable Version When:
- 🔧 Developing and debugging
- 📚 Learning the design system
- 🎨 Creating custom themes
- 🧪 Prototyping with design tokens
- 👥 Working in a team (easier code reviews)

### Use Optimized Version When:
- 🚀 Deploying to production
- ⚡ Performance is critical
- 📦 Bundle size matters
- 🏭 Following Meta's StyleX best practices

---

## Technical Details

### How Readable Names Are Generated
The readable version uses a naming convention:
- **Colors:** `--bui-{category}-{name}` (e.g., `--bui-color-blue-600`)
- **Semantic:** `--bui-{purpose}` (e.g., `--bui-background-primary`)
- **Typography:** `--bui-font-{property}-{scale}` (e.g., `--bui-font-size-300`)
- **Spacing:** `--bui-sizing-scale-{value}` (e.g., `--bui-sizing-scale-600`)

### How Optimized Names Are Generated
StyleX uses deterministic hashing:
1. Hash the file path + variable name + value
2. Generate short alphanumeric identifier
3. Prefix with 'x' (e.g., `x1q4dcxg`)
4. Collision-resistant and cacheable

---

## FAQs

**Q: Can I use both files simultaneously?**
A: No, choose one. Using both would create conflicts and double the CSS size.

**Q: Will the readable version be slower?**
A: Negligibly. The 2.7 KB difference is minimal, and browsers handle both equally well.

**Q: Can I customize variable names further?**
A: The readable version is already customizable. For full control, edit `src/stylex/human-readable.css.ts`.

**Q: Does this affect TypeScript types?**
A: No, both versions use the same TypeScript types. Your code is type-safe either way.

**Q: Can I inspect which version is loaded?**
A: Yes! Check DevTools:
- Readable: see `data-theme="light"` or `data-theme="dark"` on `<html>`
- Optimized: see class like `.x1tw6nxx` on `<html>`
