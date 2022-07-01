/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable cup/no-undef */
import * as React from 'react';
import { getOverride, getOverrideProps } from '../helpers/overrides';
import { Root as StyledRoot } from './styled-components';

import type { ComponentPropsT, SharedStylePropsT } from './types';

class Component extends React.Component<ComponentPropsT> {
  static defaultProps: Partial<ComponentPropsT> = {
    prop: true,
    onClick: () => {},
  };

  getSharedProps(): Omit<SharedStylePropsT, 'children'> {
    const { prop } = this.props;
    return {
      $prop: Boolean(prop),
    };
  }

  render() {
    const { overrides = {}, children } = this.props;
    const { Root: RootOverride } = overrides;

    const Root = getOverride(RootOverride) || StyledRoot;
    const sharedProps = this.getSharedProps();

    return (
      <Root
        data-baseweb="component"
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
