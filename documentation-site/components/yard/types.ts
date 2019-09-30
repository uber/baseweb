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
  scopeConfig: {[key: string]: any};
  propsConfig: {[key: string]: TProp};
  themeConfig: string[];
  importsConfig?: TImportsConfig;
};

export type TConfig = {
  scopeConfig: {[key: string]: any};
  propsConfig: {[key: string]: TProp};
  themeConfig: string[];
  importsConfig?: TImportsConfig;
};

export type TPropValue =
  | undefined
  | boolean
  | string
  | {
      [key: string]: {
        active: boolean;
        style: string;
      };
    };

export type TProp = {
  value: TPropValue;
  type: PropTypes;
  description: string;
  options?: any;
  placeholder?: string;
  enumName?: string;
  hidden?: boolean;
  names?: string[];
  sharedProps?: {[key: string]: string | {type: string; description: string}};
  stateful?: boolean;
  propHook?: TPropHook;
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
