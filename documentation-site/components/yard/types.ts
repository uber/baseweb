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
};

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
  scope: {[key: string]: any};
  props: {[key: string]: TProp};
  theme: string[];
  imports: TImportsConfig;
};

export type TConfig = {
  scope: {[key: string]: any};
  props: {[key: string]: TProp};
  theme: string[];
  imports: TImportsConfig;
};

type TPropValueOverrides = {
  [key: string]: {
    active: boolean;
    style: string;
  };
};

export type TPropValue =
  | undefined
  | boolean
  | string
  | number
  | TPropValueOverrides;

export type TProp = {
  value: TPropValue;
  type: PropTypes;
  description: string;
  options?: any;
  placeholder?: string;
  renderFalseValue?: boolean;
  enumName?: string;
  hidden?: boolean;
  names?: string[];
  sharedProps?: {[key: string]: string | {type: string; description: string}};
  stateful?: boolean;
  propHook?: TPropHook;
  imports?: TImportsConfig;
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
