# StyleX Theme System - Usage Guide

## Quick Start

### 1. Build the StyleX Theme CSS

```bash
npm run build:stylex
```

This generates `dist/stylex.css` with all theme variables and theme classes.

### 2. Import the CSS in Your App

```tsx
import 'baseui/dist/stylex.css';
```

### 3. Use ThemeProvider (No Code Changes Required!)

The existing ThemeProvider now supports CSS variables by default:

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

## Advanced Usage

### Customizing Themes via CSS

You can now customize the theme by overriding CSS variables:

```css
/* Override specific colors globally */
:root {
  --x1q4dcxg: #your-custom-primary-color;
  --x186ow94: #your-custom-secondary-color;
}

/* Override colors in dark theme */
.x1vai19m { /* dark theme class */
  --x1q4dcxg: #your-custom-dark-primary-color;
}
```

**Note:** Variable names are currently hashed for optimization. We may add an option for human-readable names in a future update.

### Disabling CSS Variables (Fallback)

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
  backgroundColor: $theme.colors.backgroundPrimary, // Returns: var(--x1q4dcxg)
  color: $theme.colors.contentPrimary,
}));
```

## Performance Benefits

### Before (JavaScript Themes)
- Theme values computed at runtime
- JavaScript bundle contains all theme tokens
- Theme switching requires React re-render of entire tree

### After (StyleX CSS Variables)
- Theme values resolved by browser
- Theme tokens in CSS (parallel download)
- Theme switching = instant CSS class swap (no re-render)

## Browser Support

CSS custom properties are supported in:
- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 15+

For older browsers, use `useCSSVars={false}`.

## Troubleshooting

### Theme not switching
- Ensure `dist/stylex.css` is imported
- Check that ThemeProvider has `useCSSVars={true}` (default)
- Verify theme prop is changing

### Styles not applying
- Make sure you've run `npm run build:stylex` after token changes
- Import the CSS file before any component imports
- Check browser DevTools for CSS variable values

### TypeScript errors
- Run `npm run build:lib:dts` to regenerate type definitions
- Ensure @stylexjs/stylex is in devDependencies

## Migration Checklist

- [ ] Run `npm run build:stylex`
- [ ] Import `baseui/dist/stylex.css` in your app
- [ ] Test theme switching functionality
- [ ] Verify all components render correctly
- [ ] Check browser DevTools for CSS variable resolution
- [ ] Test in target browsers
- [ ] (Optional) Customize theme via CSS variables

## What's Next?

This initial implementation includes:
- ✅ All semantic color tokens
- ✅ Typography, spacing, animation, border, shadow tokens
- ✅ Light and dark theme support
- ✅ Full backward compatibility

Coming soon:
- Component-specific color tokens (buttons, inputs, modals, etc.)
- Human-readable CSS variable names option
- Additional documentation and examples

## Support

For issues or questions:
- Check the [STYLEX_MIGRATION_STATUS.md](./STYLEX_MIGRATION_STATUS.md) for implementation details
- Open an issue on GitHub
- Refer to the [StyleX documentation](https://stylexjs.com/) for advanced usage
