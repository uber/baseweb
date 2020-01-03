/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable */
// @flow
import * as React from 'react';
import {StyledInitials, StyledRoot, Avatar} from '../index.js';

describe('Avatar styled Components flow', () => {
  test('it runs without flow error when we override Initials', () => {
    const CustomInitials = () => <StyledInitials>0_o</StyledInitials>;
    const CustomAvatar = () => (
      <Avatar
        overrides={{
          Initials: {
            component: CustomInitials,
          },
        }}
      />
    );
  });

  test('it provides flow error if we not provide all required props for StyledRoot', () => {
    const CustomRoot = props => {
      const {children, ...rest} = props;
      // $FlowFixMe missing $didImageFailToLoad prop
      const BrokenCustomRootComponent = <Root>{props.children}</Root>;
      const CustomRootComponent = (
        <StyledRoot {...rest}>{props.children}</StyledRoot>
      );
      return CustomRootComponent;
    };
    const CustomAvatar = () => (
      <Avatar
        overrides={{
          Root: {
            component: CustomRoot,
          },
        }}
      />
    );
  });
});
