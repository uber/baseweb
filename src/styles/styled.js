/*
Copyright (c) 2018 Uber Technologies, Inc.

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

type StyletronComponent<Props> = React.StatelessFunctionalComponent<Props> & {
  // eslint-disable-next-line flowtype/no-weak-types
  __STYLETRON__: any,
};
type WithTheme<Props> = {$theme: ThemeT} & Props;
type StyleFn = {
  (string, StyleObject): StyletronComponent<{}>,

  <Props>(string, (WithTheme<Props>) => StyleObject): StyletronComponent<Props>,

  // Not specifying pattern where a react component can be provided as first argument. Was seeing flow
  // problems where Props generic was being interpreted as a component rather than simply an object.
  // I've never seen this pattern used in practice and is not documented.
  // https://github.com/styletron/styletron/blob/master/packages/styletron-react/src/types.js#L55-L62
};

const styled = ((createStyled({
  wrapper,
  getInitialStyle,
  driver,
  // eslint-disable-next-line flowtype/no-weak-types
}): any): StyleFn);
export default styled;
