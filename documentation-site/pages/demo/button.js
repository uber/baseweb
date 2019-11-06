/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

import * as React from 'react';
import Yard from '../../components/yard/index';
import buttonYardConfig from '../../components/yard/config/button';

export default () => (
  <div style={{maxWidth: '700px', margin: '40px auto'}}>
    <Yard componentName="Button" placeholderHeight={52} {...buttonYardConfig} />
  </div>
);
