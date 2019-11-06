/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

import * as React from 'react';
import Yard from '../../components/yard/index';
import tabsYardConfig from '../../components/yard/config/tabs';

export default () => (
  <div style={{maxWidth: '700px', margin: '40px auto'}}>
    <Yard componentName="Tabs" placeholderHeight={102} {...tabsYardConfig} />
  </div>
);
