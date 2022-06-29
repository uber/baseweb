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
  <C extends keyof JSX.IntrinsicElements | React.ComponentType<any>>(
    component: C,
    style: StyleObject
  ): StyletronComponent<C, {}>;
};

type WithStyleFn<DefaultTheme> = {
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
  <C extends StyletronComponent<any, any>>(component: C, style: StyleObject): C;
};

/* eslint-enable flowtype/generic-spacing */
/* flowlint unclear-type:error */

export function createThemedStyled<Theme>(): StyleFn<Theme> {
  return createStyled({
    wrapper,
    getInitialStyle,
    driver,
  }) as any as StyleFn<Theme>;
}

export const styled = createThemedStyled<Theme>();

export function createThemedWithStyle<Theme>(): WithStyleFn<Theme> {
  return styletronWithStyle as any as WithStyleFn<Theme>;
}

export const withStyle = createThemedWithStyle<Theme>();

type UseStyletronFn<Theme> = () => [(a: StyleObject) => string, Theme];

export function createThemedUseStyletron<Theme>(): UseStyletronFn<Theme> {
  return function () {
    const theme = React.useContext(ThemeContext) as any as Theme;
    const [css] = styletronUseStyletron();
    return [css, theme];
  };
}

export const useStyletron = createThemedUseStyletron<Theme>();

export function withWrapper<C extends StyletronComponent<any, any>, Props>(
  StyledElement: C,
  wrapperFn: (
    component: C
  ) => (
    props: Props & (C extends StyletronComponent<any, infer CP> ? CP : never)
  ) => React.ReactElement
): C extends StyletronComponent<infer D, infer P> ? StyletronComponent<D, P & Props> : never {
  return styletronWithWrapper(StyledElement, (Styled) => {
    // eslint-disable-next-line react/display-name
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
