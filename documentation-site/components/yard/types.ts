import {TImportsConfig, TProp} from 'react-view';

export type TConfig = {
  scope: {[key: string]: any};
  props: {[key: string]: TProp};
  theme: string[];
  imports: TImportsConfig;
  mapTokensToProps?: {[key: string]: any};
};
