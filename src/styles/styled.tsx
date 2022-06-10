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
import type { ThemeT } from './types';

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
  <C extends StyletronComponent<any, any>, P extends object, Theme = DefaultTheme>(
    component: C,
    style:
      | ((
          props: Omit<P, '$theme'> & {
            $theme: Theme;
          }
        ) => StyleObject)
      | StyleObject
  ): StyletronComponent<C, P>;
  <C extends StyletronComponent<any, any>>(component: C, style: StyleObject): C;
};

/* eslint-enable flowtype/generic-spacing */
/* flowlint unclear-type:error */

export function createThemedStyled<Theme>(): StyleFn<Theme> {
  return createStyled({
    wrapper,
    getInitialStyle,
    driver,
    // flowlint-next-line unclear-type:off
  }) as any as StyleFn<Theme>;
}

export const styled = createThemedStyled<ThemeT>();

export function createThemedWithStyle<Theme>(): WithStyleFn<Theme> {
  // flowlint-next-line unclear-type:off
  return styletronWithStyle as any as WithStyleFn<Theme>;
}

export const withStyle = createThemedWithStyle<ThemeT>();

type UseStyletronFn<Theme> = () => [(a: StyleObject) => string, Theme];

export function createThemedUseStyletron<Theme>(): UseStyletronFn<Theme> {
  return function () {
    // flowlint-next-line unclear-type:off
    const theme = React.useContext(ThemeContext) as any as Theme;
    const [css] = styletronUseStyletron();
    return [css, theme];
  };
}

export const useStyletron = createThemedUseStyletron<ThemeT>();

export function withWrapper(
  // flowlint-next-line unclear-type:off
  StyledElement: StyletronComponent<any, any>,
  wrapperFn: (
    // flowlint-next-line unclear-type:off
    // flowlint-next-line unclear-type:off
    a: StyletronComponent<any, any>
  ) => (a: any) => any
) {
  // flowlint-next-line unclear-type:off
  return styletronWithWrapper<StyletronComponent<any, any>, any>(StyledElement, (Styled) => {
    // eslint-disable-next-line react/display-name
    return React.forwardRef((props, ref) => (
      <ThemeContext.Consumer>
        {(theme) => wrapperFn(Styled)({ ref: ref, ...props, $theme: theme })}
      </ThemeContext.Consumer>
    ));
  });
}
