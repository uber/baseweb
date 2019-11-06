/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

import * as React from 'react';
import Yard from '../../components/yard/index';
import dndListYardConfig from '../../components/yard/config/dnd-list';

export default () => (
  <div style={{maxWidth: '700px', margin: '40px auto'}}>
    <Yard componentName="List" placeholderHeight={208} {...dndListYardConfig} />
  </div>
);
