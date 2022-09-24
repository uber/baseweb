/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { Spinner } from 'baseui/spinner';
import { PropTypes } from 'react-view';
import type { TConfig } from '../types';

const SpinnerConfig: TConfig = {
  componentName: 'Spinner',
  imports: {
    'baseui/spinner': {
      named: ['Spinner'],
    },
  },
  scope: { Spinner },
  theme: [],
  props: {
    $size: {
      value: undefined,
      placeholder: '30px',
      type: PropTypes.String,
      description: 'Size used for the spinner.',
    },
    $borderWidth: {
      value: undefined,
      placeholder: '30px',
      type: PropTypes.String,
      description: 'Size of the circular border',
    },
    $color: {
      value: undefined,
      placeholder: '#ee1100',
      type: PropTypes.String,
      description: 'Color used for the spinner.',
    },
  },
};

export default SpinnerConfig;
