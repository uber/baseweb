/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {
  createStyled,
  withStyle as styletronWithStyle,
  useStyletron as styletronUseStyletron,
  withWrapper as styletronWithWrapper,
} from 'styletron-react';
import {driver, getInitialStyle} from 'styletron-standard';
import type {StyleObject} from 'styletron-standard';
import type {ThemeT} from './types.js';

import {ThemeContext} from './theme-provider.js';

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
export type StyletronComponent<Props> =
  React.StatelessFunctionalComponent<Props> & {
    __STYLETRON__: any,
  };

type StyleFn<Theme> = {
  (string): StyletronComponent<{}>,

  (string, StyleObject): StyletronComponent<{}>,

  <Props>(
    string,
    ({$theme: Theme} & Props) => StyleObject,
  ): StyletronComponent<Props>,

  <Base: React.ComponentType<any>>(
    Base,
    StyleObject,
  ): StyletronComponent<$Diff<React.ElementConfig<Base>, {className: any}>>,

  <Base: React.ComponentType<any>, Props>(
    Base,
    ({$theme: Theme} & Props) => StyleObject,
  ): StyletronComponent<
    $Diff<React.ElementConfig<Base>, {className: any}> & Props,
  >,
};

type ExtractPropTypes = <T>(StyletronComponent<T>) => T;
type WithStyleFn<Theme> = {
  <Base: StyletronComponent<any>, Props>(
    Base,
    (Props & {$theme: Theme}) => StyleObject,
  ): StyletronComponent<$Call<ExtractPropTypes, Base> & Props>,

  <Base: StyletronComponent<any>>(
    Base,
    StyleObject,
  ): StyletronComponent<$Call<ExtractPropTypes, Base>>,
};
/* eslint-enable flowtype/generic-spacing */
/* flowlint unclear-type:error */

export function createThemedStyled<Theme>(): StyleFn<Theme> {
  return ((createStyled({
    wrapper,
    getInitialStyle,
    driver,
    // flowlint-next-line unclear-type:off
  }): any): StyleFn<Theme>);
}

export const styled = createThemedStyled<ThemeT>();

export function createThemedWithStyle<Theme>(): WithStyleFn<Theme> {
  // flowlint-next-line unclear-type:off
  return ((styletronWithStyle: any): WithStyleFn<Theme>);
}

export const withStyle = createThemedWithStyle<ThemeT>();

type UseStyletronFn<Theme> = () => [(StyleObject) => string, Theme];

export function createThemedUseStyletron<Theme>(): UseStyletronFn<Theme> {
  return function () {
    // flowlint-next-line unclear-type:off
    const theme = ((React.useContext(ThemeContext): any): Theme);
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
    StyletronComponent<any>,
    // flowlint-next-line unclear-type:off
  ) => (any) => any,
) {
  // flowlint-next-line unclear-type:off
  return styletronWithWrapper<StyletronComponent<any>, any>(
    StyledElement,
    (Styled) => {
      // eslint-disable-next-line react/display-name
      return React.forwardRef((props, ref) => (
        <ThemeContext.Consumer>
          {(theme) => wrapperFn(Styled)({ref: ref, ...props, $theme: theme})}
        </ThemeContext.Consumer>
      ));
    },
  );
}
