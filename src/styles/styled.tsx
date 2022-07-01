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
} from 'styletron-react';
import { driver, getInitialStyle } from 'styletron-standard';
import type { StyleObject } from 'styletron-standard';
import type { ThemeT } from './types';

import { ThemeContext } from './theme-provider';

type $Call1<F extends (...args: any) => any, A> = F extends (a: A, ...args: any) => infer R
  ? R
  : never;

const wrapper = (StyledComponent) => {
  // eslint-disable-next-line react/display-name
  return React.forwardRef((props, ref) => (
    <ThemeContext.Consumer>
      {(theme) => <StyledComponent ref={ref} {...props} $theme={theme} />}
    </ThemeContext.Consumer>
  ));
};

/* eslint-disable flowtype/generic-spacing */
/* flowlint unclear-type:off */
export type StyletronComponent<Props> = React.FunctionComponent<Props> & {
  __STYLETRON__: any;
};

type StyleFn<Theme> = {
  (a: string): StyletronComponent<{}>;
  (b: string, a: StyleObject): StyletronComponent<{}>;
  <Props>(
    b: string,
    a: (
      a: {
        $theme: Theme;
      } & Props
    ) => StyleObject
  ): StyletronComponent<Props>;
  <Base extends React.ComponentType<any>>(b: Base, a: StyleObject): StyletronComponent<
    Omit<React.ComponentProps<Base>, 'className'>
  >;
  <Base extends React.ComponentType<any>, Props>(
    b: Base,
    a: (
      a: {
        $theme: Theme;
      } & Props
    ) => StyleObject
  ): StyletronComponent<Omit<React.ComponentProps<Base>, 'className'> & Props>;
};

type ExtractPropTypes = <T>(a: StyletronComponent<T>) => T;

type WithStyleFn<Theme> = {
  <Base extends StyletronComponent<any>, Props>(
    b: Base,
    a: (
      a: Props & {
        $theme: Theme;
      }
    ) => StyleObject
  ): StyletronComponent<$Call1<ExtractPropTypes, Base> & Props>;
  <Base extends StyletronComponent<any>>(b: Base, a: StyleObject): StyletronComponent<
    $Call1<ExtractPropTypes, Base>
  >;
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
  StyledElement: StyletronComponent<any>,
  wrapperFn: (
    // flowlint-next-line unclear-type:off
    // flowlint-next-line unclear-type:off
    a: StyletronComponent<any>
  ) => (a: any) => any
) {
  // flowlint-next-line unclear-type:off
  return styletronWithWrapper<StyletronComponent<any>, any>(StyledElement, (Styled) => {
    // eslint-disable-next-line react/display-name
    return React.forwardRef((props, ref) => (
      <ThemeContext.Consumer>
        {(theme) => wrapperFn(Styled)({ ref: ref, ...props, $theme: theme })}
      </ThemeContext.Consumer>
    ));
  });
}
