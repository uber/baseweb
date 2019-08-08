import {PropTypes} from './const';

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
