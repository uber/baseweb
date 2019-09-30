import {Theme} from 'baseui/theme';
import {TProp, TThemeDiff} from './types';

export function assertUnreachable(): never {
  throw new Error("Didn't expect to get here");
}

export const formatBabelError = (error: string) => {
  return error
    .replace('1 | /* @babel/template */;', '')
    .replace(
      /\((\d+):(\d+)\)/,
      (_, line, col) => `(${parseInt(line, 10) - 1}:${col})`,
    )
    .replace('<>', '')
    .replace('</>', '')
    .replace(/(\d+) \|/g, (_, line) => {
      const lineNum = parseInt(line, 10);
      const newLineNum = lineNum - 1;
      const lenDiff = line.length - `${newLineNum}`.length;
      return `${' '.repeat(lenDiff)}${newLineNum} |`;
    });
};

export const buildPropsObj = (
  stateProps: {[key: string]: TProp},
  updatedPropValues: {[key: string]: any},
) => {
  const newProps: {
    [key: string]: TProp;
  } = {};
  Object.keys(stateProps).forEach(name => {
    newProps[name] = {...stateProps[name]};
  });
  Object.keys(updatedPropValues).forEach(name => {
    newProps[name] = {
      value: updatedPropValues[name],
      type: stateProps[name].type,
      options: stateProps[name].options,
      enumName: stateProps[name].enumName,
      description: stateProps[name].description,
      placeholder: stateProps[name].placeholder,
      hidden: stateProps[name].hidden,
      meta: stateProps[name].meta,
    };
  });
  return newProps;
};

export const getComponentThemeFromContext = (
  theme: Theme,
  themeConfig: string[],
) => {
  const componentThemeObj: {[key: string]: string} = {};
  themeConfig.forEach(key => {
    componentThemeObj[key] = (theme.colors as any)[key];
  });
  return componentThemeObj;
};

export const getThemeForCodeGenerator = (
  themeConfig: string[],
  updatedThemeValues: {[key: string]: string},
  theme: Theme,
) => {
  const componentThemeValueDiff: {[key: string]: string} = {};
  themeConfig.forEach(key => {
    if (
      updatedThemeValues[key] &&
      (theme.colors as any)[key] !== updatedThemeValues[key]
    ) {
      componentThemeValueDiff[key] = updatedThemeValues[key];
    }
  });
  const componentThemeDiff: TThemeDiff = {
    themeValues: {},
    themeName: '',
  };
  if (Object.keys(componentThemeValueDiff).length > 0) {
    componentThemeDiff.themeValues = componentThemeValueDiff;
    componentThemeDiff.themeName = theme.name;
  }
  return componentThemeDiff;
};
