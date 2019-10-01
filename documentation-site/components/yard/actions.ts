import Router from 'next/router';
import {parseCode, parseOverrides} from './ast';
import {Action} from './const';
import {TProp, TDispatch, TPropValue} from './types';

export const updateCode = (dispatch: TDispatch, newCode: string) => {
  dispatch({
    type: Action.UpdateCode,
    payload: newCode,
  });
};

export const updateAll = (
  dispatch: TDispatch,
  newCode: string,
  componentName: string,
  propsConfig: {[key: string]: TProp},
) => {
  const propValues: {[key: string]: TPropValue} = {};
  const {parsedProps, parsedTheme} = parseCode(newCode, componentName);
  Object.keys(propsConfig).forEach(name => {
    propValues[name] = propsConfig[name].value;
    if (name === 'overrides') {
      // overrides need a special treatment since the value needs to
      // be further analyzed and parsed
      propValues[name] = parseOverrides(
        parsedProps[name],
        propsConfig.overrides ? propsConfig.overrides.names || [] : [],
      );
    } else {
      propValues[name] = parsedProps[name];
    }
  });
  dispatch({
    type: Action.Update,
    payload: {
      code: newCode,
      updatedPropValues: propValues,
      theme: parsedTheme,
    },
  });
};

export const updateUrl = (pathname: string, code?: string) => {
  Router.push(
    code
      ? {
          pathname: pathname,
          query: {code},
        }
      : {
          pathname: pathname,
        },
  );
};

export const updatePropsAndCodeNoRecompile = (
  dispatch: TDispatch,
  newCode: string,
  propName: string,
  propValue: TPropValue,
) => {
  dispatch({
    type: Action.UpdatePropsAndCodeNoRecompile,
    payload: {
      codeNoRecompile: newCode,
      updatedPropValues: {[propName]: propValue},
    },
  });
};

export const updatePropsAndCode = (
  dispatch: TDispatch,
  newCode: string,
  propName: string,
  propValue: TPropValue,
) => {
  dispatch({
    type: Action.UpdatePropsAndCode,
    payload: {
      code: newCode,
      updatedPropValues: {[propName]: propValue},
    },
  });
};

export const updateProps = (
  dispatch: TDispatch,
  propName: string,
  propValue: TPropValue,
) => {
  dispatch({
    type: Action.UpdateProps,
    payload: {[propName]: propValue},
  });
};

export const updateThemeAndCode = (
  dispatch: TDispatch,
  newCode: string,
  updatedThemeValues: {[key: string]: string},
) => {
  dispatch({
    type: Action.UpdateThemeAndCode,
    payload: {
      code: newCode,
      theme: updatedThemeValues,
    },
  });
};

export const reset = (
  dispatch: TDispatch,
  initialCode: string,
  propsConfig: {[key: string]: TProp},
  initialThemeObj: {[key: string]: string},
) => {
  dispatch({
    type: Action.Reset,
    payload: {
      code: initialCode,
      props: propsConfig,
      theme: initialThemeObj,
    },
  });
};
