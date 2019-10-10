import {Theme} from 'baseui/theme';
import * as React from 'react';
import {TProp, TThemeDiff, TPropValue} from './types';

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
  updatedPropValues: {[key: string]: TPropValue},
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
      names: stateProps[name].names,
      sharedProps: stateProps[name].sharedProps,
      stateful: stateProps[name].stateful,
      propHook: stateProps[name].propHook,
      imports: stateProps[name].imports,
      defaultValue: stateProps[name].defaultValue,
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

export const countOverrides = (overrides: any) => {
  const existingOverrides = overrides.value ? Object.keys(overrides.value) : [];
  return existingOverrides.filter(key => overrides.value[key].active).length;
};

export const countProps = (
  props: {[key: string]: TProp},
  propsConfig: {[key: string]: TProp},
) => {
  let changedProps = 0;
  Object.keys(props).forEach(prop => {
    if (
      prop !== 'overrides' &&
      props[prop].value !== '' &&
      typeof props[prop].value !== 'undefined' &&
      //@ts-ignore
      props[prop].value !== propsConfig[prop].value
    ) {
      changedProps++;
    }
  });
  return changedProps;
};

export const countThemeValues = (componentThemeDiff: TThemeDiff) => {
  return Object.keys(componentThemeDiff.themeValues).length;
};

// creates a duplicate internal state, so we can preserve instant value editing
// while debouncing top-level state updates that are slow
export function useValueDebounce<T>(
  globalVal: T,
  globalSet: (val: T) => void,
): [T, (val: T) => void] {
  const [val, set] = React.useState(globalVal);

  React.useEffect(() => {
    // begins a countdown when 'val' changes. if it changes before countdown
    // ends, clear the timeout avoids lodash debounce to avoid stale
    // values in globalSet.
    if (val !== globalVal) {
      const timeout = setTimeout(() => globalSet(val), 250);
      return () => clearTimeout(timeout);
    }
    return void 0;
  }, [val]);

  React.useEffect(() => {
    set(globalVal);
  }, [globalVal]);

  return [val, set];
}
