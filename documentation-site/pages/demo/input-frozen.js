/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

import * as React from 'react';
import Yard from '../../components/yard/index';
import {PropTypes} from '../../components/yard/const';
import inputYardConfig from '../../components/yard/config/input';

const config = {
  ...inputYardConfig,
  props: {
    ...inputYardConfig.props,
    value: {
      value: 'Hello',
      type: PropTypes.String,
      description: 'Input value attribute.',
    },
    onChange: {
      value: 'e => console.log("what now?")',
      type: PropTypes.Function,
      description: 'Called when input value is changed.',
    },
  },
};

export default () => (
  <div style={{maxWidth: '700px', margin: '40px auto'}}>
    <Yard componentName="Input" placeholderHeight={48} {...config} />
  </div>
);
