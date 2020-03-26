import * as React from 'react';
import {
  StyleObject,
  StyletronComponent,
  WithStyleFn as StyletronWithStyleFn,
  StyledFn as StyletronStyledFn,
} from 'styletron-react';
import {Override, Overrides} from './overrides';
import {Locale} from './locale';
import {Theme, ThemePrimitives} from './theme';

type UseStyletronFn<Theme> = () => [(arg: StyleObject) => string, Theme];
export function createThemedUseStyletron<Theme>(): UseStyletronFn<Theme>;
export const useStyletron: UseStyletronFn<Theme>;

export function createTheme<P extends object>(
  primitives: ThemePrimitives,
  overrides?: P,
): Theme & P;
export function mergeOverrides<T>(
  target?: Overrides<T>,
  source?: Overrides<T>,
): Overrides<T>;
export function styled<
  P extends object,
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  T = Theme
>(
  component: C,
  styledFn: StyleObject | ((props: {$theme: T} & P) => StyleObject),
): StyletronComponent<
  Pick<
    React.ComponentProps<C>,
    Exclude<keyof React.ComponentProps<C>, {className: string}>
  > &
    P
>;

export const LightTheme: Theme;
export const LightThemeMove: Theme;
export const lightThemePrimitives: ThemePrimitives;
export const DarkTheme: Theme;
export const DarkThemeMove: Theme;
export const darkThemePrimitives: ThemePrimitives;

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
export const BaseProvider: React.FC<BaseProviderProps>;

export interface LocaleProviderProps {
  locale: Partial<Locale>;
  children?: React.ReactNode;
}
export const LocaleProvider: React.FC<LocaleProviderProps>;

export interface ThemeProviderProps {
  theme: Theme;
  children?: React.ReactNode;
}
export const ThemeProvider: React.FC<ThemeProviderProps>;

export interface StyledFn<T> extends StyletronStyledFn {
  <
    C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
    P extends object
  >(
    component: C,
    style: (props: {$theme: T} & P) => StyleObject,
  ): StyletronComponent<
    Pick<
      React.ComponentProps<C>,
      Exclude<keyof React.ComponentProps<C>, {className: string}>
    > &
      P
  >;
}

export function createThemedStyled<Theme>(): StyledFn<Theme>;

export interface WithStyleFn<T = Theme> extends StyletronWithStyleFn {
  <C extends StyletronComponent<any>, P extends object, T1 = T>(
    component: C,
    style: (props: P & {$theme: T1}) => StyleObject,
  ): StyletronComponent<React.ComponentProps<C> & P>;
}

export const withStyle: WithStyleFn;
