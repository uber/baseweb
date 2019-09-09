import {PropTypes} from './const';

type TConfigProps = {
  value: any;
  type: PropTypes;
  description: string;
  hidden?: boolean;
  placeholder?: string;
  meta?: {
    names: string[];
    sharedProps: {
      [key: string]: string | {type: PropTypes; description: string};
    };
  };
};

export type TYardProps = {
  componentName: string;
  scopeConfig: {[key: string]: any};
  propsConfig: {[key: string]: TConfigProps};
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
  };
};

export type TState = {
  code: string;
  theme: {
    [key: string]: string;
  };
  props: {
    [key: string]: TProp;
  };
};
