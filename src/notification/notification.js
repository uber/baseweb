/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import React from 'react';
import type {NotifcationPropsT} from './types';
import {KIND} from './constants';
import {StyledRoot} from './styled-components';
import {getOverrides} from '../helpers/overrides';

function Notification({children, kind, overrides = {}}: NotifcationPropsT) {
  const [Root, baseRootProps] = getOverrides(overrides.Root, StyledRoot);

  return (
    <Root role="alert" $kind={kind} {...baseRootProps}>
      {children}
    </Root>
  );
}

Notification.defaultProps = {
  overrides: {},
  kind: KIND.primary,
};

export default Notification;
