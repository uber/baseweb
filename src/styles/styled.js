/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {createStyled} from 'styletron-react';
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
type StyletronComponent<Props> = React.StatelessFunctionalComponent<Props> & {
  __STYLETRON__: any,
};

type StyleFn = {
  (string, StyleObject): StyletronComponent<{}>,

  <Props>(
    string,
    ({$theme: ThemeT} & Props) => StyleObject,
  ): StyletronComponent<Props>,

  <Props, CustomTheme>(
    string,
    ({$theme: CustomTheme} & Props) => StyleObject,
  ): StyletronComponent<Props>,

  <Base: React.ComponentType<any>>(
    Base,
    StyleObject,
  ): StyletronComponent<$Diff<React.ElementConfig<Base>, {className: any}>>,

  <Base: React.ComponentType<any>, Props>(
    Base,
    ({$theme: ThemeT} & Props) => StyleObject,
  ): StyletronComponent<
    $Diff<React.ElementConfig<Base>, {className: any}> & Props,
  >,

  <Base: React.ComponentType<any>, Props, CustomTheme>(
    Base,
    ({$theme: CustomTheme} & Props) => StyleObject,
  ): StyletronComponent<
    $Diff<React.ElementConfig<Base>, {className: any}> & Props,
  >,
};
/* eslint-enable flowtype/generic-spacing */
/* eslint-enable flowtype/no-weak-types */

const styled = ((createStyled({
  wrapper,
  getInitialStyle,
  driver,
  // eslint-disable-next-line flowtype/no-weak-types
}): any): StyleFn);
export default styled;
