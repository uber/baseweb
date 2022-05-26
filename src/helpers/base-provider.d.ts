import { Override } from './overrides';
import * as React from 'react';
import { Theme } from '../styles';

export interface BaseProviderOverrides {
  AppContainer?: Override<any>;
  LayersContainer?: Override<any>;
}

export interface BaseProviderProps {
  children: React.ReactNode;
  theme: Theme;
  overrides?: BaseProviderOverrides;
  zIndex?: number;
}
export declare const BaseProvider: React.FC<BaseProviderProps>;
