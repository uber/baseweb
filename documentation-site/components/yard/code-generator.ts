import {TProp} from './types';
import {PropTypes} from './const';
import {assertUnreachable} from './utils';

export const getCode = (
  props: {[key: string]: TProp},
  componentName: string,
  theme: {themeValues: {[key: string]: string}; themeName: string},
) => {
  let propsString = ``;
  let enumImports = ``;
  const isCustomTheme =
    theme && theme.themeValues && Object.keys(theme.themeValues).length > 0;
  const {children, ...restProps} = props;
  Object.keys(restProps).forEach(name => {
    const value = restProps[name].value;
    const type = restProps[name].type;
    if (value) {
      switch (type as PropTypes) {
        case PropTypes.String:
          propsString += ` ${name}="${value}"`;
          break;
        case PropTypes.Boolean:
          propsString += ` ${name}`;
          break;
        case PropTypes.Number:
        case PropTypes.Array:
        case PropTypes.Object:
        case PropTypes.Function:
        case PropTypes.ReactNode:
          propsString += ` ${name}={${value}}`;
          break;
        case PropTypes.Enum:
          enumImports += `, ${name.toUpperCase()}`;
          propsString += ` ${name}={${value}}`;
          break;
        case PropTypes.Overrides:
          if (!value) break;
          let overrideString = '{';
          Object.keys(value).forEach(key => {
            if (value[key].active === true) {
              overrideString += `${key}: { style: ${value[key].style} },`;
            }
          });
          overrideString += '}';
          if (overrideString === '{}') break;
          propsString += ` ${name}={${overrideString}}`;
          break;
        default:
          assertUnreachable();
      }
    }
  });
  const themeImports = isCustomTheme
    ? `import {ThemeProvider, createTheme, lightThemePrimitives} from 'baseui';\n`
    : '';
  const imports = `${themeImports}import {${componentName}${enumImports}} from 'baseui/${componentName.toLowerCase()}';\n\n`;

  const themeProviderOpen = isCustomTheme
    ? `<ThemeProvider theme={createTheme(lightThemePrimitives, { colors: ${JSON.stringify(
        theme.themeValues,
      )} })}>`
    : '';
  return `${imports}export default () => ${themeProviderOpen}<${componentName}${propsString}>${
    children ? children.value : undefined
  }</Button>${isCustomTheme ? '</ThemeProvider>' : ''}`;
};
