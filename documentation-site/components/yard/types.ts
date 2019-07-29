import {PropTypes} from './const';

export type TProp = {
  value: any;
  type: PropTypes;
  description: string;
  options?: any;
  placeholder?: string;
};

export type TState = {
  code: string;
  props: {
    [key: string]: TProp;
  };
};
