/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

import * as React from 'react';
import Yard from '../../components/yard/index';
import {PropTypes} from '../../components/yard/const';
import dndListYardConfig from '../../components/yard/config/dnd-list';

const config = {
  ...dndListYardConfig,
  imports: {
    'baseui/dnd-list': {
      named: ['List'],
    },
  },
  props: {
    ...dndListYardConfig.props,
    items: {
      value: `["Item 1","Item 2","Item 3"]`,
      type: PropTypes.Array,
      description: 'The total number of items to display.',
    },
    onChange: {
      value: `({oldIndex, newIndex}) => console.log('what now?')`,
      placeholder: '({oldIdx, newIdx}) => {}',
      type: PropTypes.Function,
      description: 'MovableLists onChange handler.',
    },
  },
};

export default () => (
  <div style={{maxWidth: '700px', margin: '40px auto'}}>
    <Yard componentName="List" placeholderHeight={208} {...config} />
  </div>
);
