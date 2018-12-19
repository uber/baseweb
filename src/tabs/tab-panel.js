/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

import type {TabPropsT} from './types.js';

class TabPanel extends React.Component<TabPropsT> {
  static defaultProps: $Shape<TabPropsT> = {
    disabled: false,
    onSelect: () => {},
    onClick: () => {},
    onKeyDown: () => {},
    title: '',
  };

  render() {
    return null;
  }
}

export default TabPanel;
