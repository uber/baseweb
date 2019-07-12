import * as React from 'react';
import {StyleObject, StyletronComponent} from 'styletron-react';
import {Overrides} from './overrides';
import {Locale} from './locale';
import {Theme, ThemePrimitives} from './theme';

export function createTheme(
  primitives: ThemePrimitives,
  overrides?: object,
): Theme;
export function withProps(
  Component: React.ComponentType,
  customProps?: object,
): (props: object) => any;
export function mergeOverrides<T>(
  target?: Overrides<T>,
  source?: Overrides<T>,
): Overrides<T>;
export function styled<
  P extends object,
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>
>(
  component: C,
  styledFn: StyleObject | ((props: {$theme: Theme} & P) => StyleObject),
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

export interface BaseProviderProps {
  children: React.ReactNode;
  theme: Theme;
}
export const BaseProvider: React.FC<BaseProviderProps>;

export interface LocaleProviderProps {
  locale: Locale;
  children?: React.ReactNode;
}
export const LocaleProvider: React.FC<LocaleProviderProps>;

export interface ThemeProviderProps {
  theme: Theme;
  children?: React.ReactNode;
}
export const ThemeProvider: React.FC<ThemeProviderProps>;
