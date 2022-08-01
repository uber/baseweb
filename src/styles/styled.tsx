/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import {
  createStyled,
  withStyle as styletronWithStyle,
  useStyletron as styletronUseStyletron,
  withWrapper as styletronWithWrapper,
  StyletronComponent,
} from 'styletron-react';
import { driver, getInitialStyle } from 'styletron-standard';
import type { StyleObject } from 'styletron-standard';
import type { Theme } from './types';

import { ThemeContext } from './theme-provider';

const wrapper = (StyledComponent) => {
  // eslint-disable-next-line react/display-name
  return React.forwardRef((props, ref) => (
    <ThemeContext.Consumer>
      {(theme) => <StyledComponent ref={ref} {...props} $theme={theme} />}
    </ThemeContext.Consumer>
  ));
};

export type { StyletronComponent };

type StyleFn<DefaultTheme> = {
  <
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
    P extends {},
    Theme = DefaultTheme
  >(
    component: C,
    style:
      | StyleObject
      | ((
          props: Omit<P, '$theme'> & {
            $theme: Theme;
          }
        ) => StyleObject)
  ): StyletronComponent<C, P>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <C extends keyof JSX.IntrinsicElements | React.ComponentType<any>>(
    component: C,
    style: StyleObject
  ): StyletronComponent<C, {}>;
};

type WithStyleFn<DefaultTheme> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <C extends StyletronComponent<any, any>, P extends {}, Theme = DefaultTheme>(
    component: C,
    style:
      | ((
          props: Omit<P, '$theme'> & {
            $theme: Theme;
          } & (C extends StyletronComponent<infer CC, infer PP> ? PP : never)
        ) => StyleObject)
      | StyleObject
  ): C extends StyletronComponent<infer CC, infer PP> ? StyletronComponent<CC, P & PP> : never;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <C extends StyletronComponent<any, any>>(component: C, style: StyleObject): C;
};

export function createThemedStyled<Theme>(): StyleFn<Theme> {
  return createStyled({
    wrapper,
    getInitialStyle,
    driver,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any as StyleFn<Theme>;
}

export const styled = createThemedStyled<Theme>();

export function createThemedWithStyle<Theme>(): WithStyleFn<Theme> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return styletronWithStyle as any as WithStyleFn<Theme>;
}

export const withStyle = createThemedWithStyle<Theme>();

type UseStyletronFn<Theme> = () => [(a: StyleObject) => string, Theme];

export function createThemedUseStyletron<Theme>(): UseStyletronFn<Theme> {
  return function () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const theme = React.useContext(ThemeContext) as any as Theme;
    const [css] = styletronUseStyletron();
    return [css, theme];
  };
}

export const useStyletron = createThemedUseStyletron<Theme>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withWrapper<C extends StyletronComponent<any, any>, Props>(
  StyledElement: C,
  wrapperFn: (component: C) => (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: Props & (C extends StyletronComponent<any, infer CP> ? CP : never)
  ) => React.ReactElement
): C extends StyletronComponent<infer D, infer P> ? StyletronComponent<D, P & Props> : never {
  return styletronWithWrapper(StyledElement, (Styled) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,react/display-name
    return React.forwardRef<any, React.ComponentProps<C> & Props>((props, ref) => (
      <ThemeContext.Consumer>
        {(theme) =>
          // @ts-ignore
          wrapperFn(Styled)({ ref: ref, ...props, $theme: theme })
        }
      </ThemeContext.Consumer>
    ));
  });
}

/** @deprecated use StyleFn instead. To be removed in future versions.*/
export type StyletronStyledFn<T> = StyleFn<T>;
/** @deprecated use WithStyleFn instead. To be removed in future versions.*/
export type StyletronWithStyleFn<T> = WithStyleFn<T>;
/** @deprecated use StyleFn instead. To be removed in future versions.*/
export type StyledFn<T> = StyleFn<T>;
