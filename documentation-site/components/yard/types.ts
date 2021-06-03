import {TImportsConfig, TProp} from 'react-view';

export type TConfig = {
  componentName: string;
  scope: {[key: string]: any};
  props: {[key: string]: TProp};
  theme: string[];
  imports: TImportsConfig;
  mapTokensToProps?: {[key: string]: any};
};

export type TYardProps = TConfig & {
  componentName: string;
  placeholderHeight: number;
  queryStringName?: string;
  mapTokensToProps?: {[key: string]: any};
  compilerStyles: {[key: string]: any};
  initialTab?: string;
};
