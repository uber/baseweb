import {PropTypes} from './const';

export type TPropHook = {
  what: string;
  into: string;
} | null;

export type TYardProps = {
  componentName: string;
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
  hidden?: boolean;
  meta?: {
    names?: string[];
    sharedKeys?: any;
    stateful?: boolean;
    propHook?: TPropHook;
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
