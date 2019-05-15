/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

import Tab from './tab.js';
import type {TabPropsT} from './types.js';

class TabPanel extends React.Component<TabPropsT> {
  constructor(props: TabPropsT) {
    super(props);
    // eslint-disable-next-line no-console
    console.warn(
      `The TabPanel will be deprecated in the next major version of baseui. Please replace uses of TabPanel with Tab.`,
    );
  }

  render() {
    return <Tab {...this.props} />;
  }
}

export default TabPanel;
