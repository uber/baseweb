import type {
  Animation,
  Border,
  Borders,
  Breakpoints,
  Colors,
  Grid,
  Lighting,
  MediaQuery,
  Sizing,
  Typography,
  ZIndex,
} from '../theme';
import type { StyleObject, StyletronComponent } from 'styletron-react';
import * as React from 'react';

type StyletronStyledFn = typeof import('styletron-react').styled;
type StyletronWithStyleFn = typeof import('styletron-react').withStyle;

export function expandBorderStyles(borderStyles: Border): StyleObject;

export interface Theme {
  name: string;
  direction: 'auto' | 'rtl' | 'ltr';
  breakpoints: Breakpoints;
  mediaQuery: MediaQuery;
  grid: Grid;
  colors: Colors;
  typography: Typography;
  sizing: Sizing;
  lighting: Lighting;
  animation: Animation;
  borders: Borders;
  zIndex: ZIndex;
}

type UseStyletronFn<Theme> = () => [(arg: StyleObject) => string, Theme];
export function createThemedUseStyletron<Theme>(): UseStyletronFn<Theme>;
export declare const useStyletron: UseStyletronFn<Theme>;
export function withWrapper<C extends StyletronComponent<any>, P extends object>(
  component: C,
  wrapper: (component: C) => React.ComponentType<P>
): StyletronComponent<React.ComponentProps<C> & P>;

export function styled<
  P extends object,
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  T = Theme
>(
  component: C,
  styledFn: StyleObject | ((props: { $theme: T } & P) => StyleObject)
): StyletronComponent<
  Pick<React.ComponentProps<C>, Exclude<keyof React.ComponentProps<C>, { className: string }>> & P
>;
export function withStyle<C extends StyletronComponent<any>, P extends object, T = Theme>(
  component: C,
  styledFn: StyleObject | ((props: { $theme: T } & P) => StyleObject)
): StyletronComponent<React.ComponentProps<C> & P>;

export interface StyledFn<T> extends StyletronStyledFn {
  <C extends keyof JSX.IntrinsicElements | React.ComponentType<any>, P extends object>(
    component: C,
    style: (props: { $theme: T } & P) => StyleObject
  ): StyletronComponent<
    Pick<React.ComponentProps<C>, Exclude<keyof React.ComponentProps<C>, { className: string }>> & P
  >;
}

export function createThemedStyled<Theme>(): StyledFn<Theme>;

export interface WithStyleFn<T = Theme> extends StyletronWithStyleFn {
  <C extends StyletronComponent<any>, P extends object, T1 = T>(
    component: C,
    style: (props: P & { $theme: T1 }) => StyleObject
  ): StyletronComponent<React.ComponentProps<C> & P>;
}

export function createThemedWithStyle<Theme>(): WithStyleFn<Theme>;

export interface ThemeProviderProps {
  theme: Theme;
  children?: React.ReactNode;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
