import {PropTypes} from './const';
import {Action} from './const';

export type TDispatch = (value: {type: Action; payload: any}) => void;

export type TThemeDiff = {
  themeValues: {[key: string]: string};
  themeName: string;
};

export type TPropHook = {
  what: string;
  into: string;
} | null;

export type TImportsConfig = {
  [key: string]: {
    named?: string[];
    default?: string;
  };
};

export type TError = {
  where: string;
  msg: string | null;
};

export type TYardProps = {
  componentName: string;
  minHeight: number;
  importsConfig?: TImportsConfig;
  scopeConfig: {[key: string]: any};
  propsConfig: {[key: string]: TProp};
  themeConfig: string[];
};

export type TProp = {
  value: any;
  type: PropTypes;
  description: string;
  options?: any;
  placeholder?: string;
  enumName?: string;
  hidden?: boolean;
  meta?: {
    names?: string[];
    sharedKeys?: any;
    stateful?: boolean;
    propHook?: TPropHook;
    imports?: string[];
  };
};

export type TState = {
  code: string;
  codeNoRecompile: string;
  theme: {
    [key: string]: string;
  };
  props: {
    [key: string]: TProp;
  };
};
