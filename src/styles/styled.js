/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {
  createStyled,
  withStyle as styletronWithStyle,
  useStyletron as styletronUseStyletron,
} from 'styletron-react';
import {driver, getInitialStyle} from 'styletron-standard';
import type {StyleObject} from 'styletron-standard';
import type {ThemeT} from './types.js';

import {ThemeContext} from './theme-provider.js';

const wrapper = StyledComponent => {
  return React.forwardRef((props, ref) => (
    <ThemeContext.Consumer>
      {theme => <StyledComponent ref={ref} {...props} $theme={theme} />}
    </ThemeContext.Consumer>
  ));
};

/* eslint-disable flowtype/generic-spacing */
/* eslint-disable flowtype/no-weak-types */
export type StyletronComponent<
  Props,
> = React.StatelessFunctionalComponent<Props> & {
  __STYLETRON__: any,
};

type StyleFn<Theme> = {
  (string): StyletronComponent<{||}>,

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
/* eslint-enable flowtype/no-weak-types */

export function createThemedStyled<Theme>(): StyleFn<Theme> {
  return ((createStyled({
    wrapper,
    getInitialStyle,
    driver,
    // eslint-disable-next-line flowtype/no-weak-types
  }): any): StyleFn<Theme>);
}

export const styled = createThemedStyled<ThemeT>();

export function createThemedWithStyle<Theme>(): WithStyleFn<Theme> {
  // eslint-disable-next-line flowtype/no-weak-types
  return ((styletronWithStyle: any): WithStyleFn<Theme>);
}

export const withStyle = createThemedWithStyle<ThemeT>();

type UseStyletronFn<Theme> = () => [(StyleObject) => string, Theme];

export function createThemedUseStyletron<Theme>(): UseStyletronFn<Theme> {
  return function() {
    // eslint-disable-next-line flowtype/no-weak-types
    const theme = ((React.useContext(ThemeContext): any): Theme);
    const [css] = styletronUseStyletron();
    return [css, theme];
  };
}

export const useStyletron = createThemedUseStyletron<ThemeT>();
