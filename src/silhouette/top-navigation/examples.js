/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import React from 'react';
import {TopNavigation} from './';
import {Button} from '../../button';
import examples from './examples-list';

export default {
  [examples.DEFAULT]: function Story1() {
    return (
      <TopNavigation
        overrides={{
          Root: {
            style: {backgroundColor: '#D1E2F9'},
          },
        }}
      />
    );
  },
  [examples.OVERRIDES]: function Story2() {
    return (
      <TopNavigation
        height={12}
        overrides={{
          Root: {
            props: {
              as: 'h2',
            },
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: `1px solid #CCCCCC`,
              marginTop: '40px',
            },
          },
        }}
      >
        <Button style={{margin: '10px'}}>Get Started</Button>
        <Button style={{margin: '10px'}}>About</Button>
      </TopNavigation>
    );
  },
};
