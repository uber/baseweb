/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {getOverride, getOverrideProps} from '../helpers/overrides';
import {Root as StyledRoot} from './styled-components';

import type {ComponentPropsT, SharedStylePropsArgT} from './types';

class Component extends React.Component<ComponentPropsT> {
  static defaultProps: $Shape<ComponentPropsT> = {
    prop: true,
    onClick: () => {},
  };

  getSharedProps(): $Diff<SharedStylePropsArgT, {children?: React.Node}> {
    const {prop} = this.props;
    return {
      $prop: prop,
    };
  }

  render() {
    const {overrides = {}, children} = this.props;
    const {Root: RootOverride} = overrides;

    const Root = getOverride(RootOverride) || StyledRoot;
    const sharedProps = this.getSharedProps();

    return (
      //$FlowFixMe
      <Root
        onClick={this.props.onClick}
        {...sharedProps}
        {...getOverrideProps(RootOverride)}
      >
        {children}
      </Root>
    );
  }
}

export default Component;
