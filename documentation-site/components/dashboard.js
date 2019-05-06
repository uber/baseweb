/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {Button} from 'baseui/button';

const Dashboard = () => {
  return (
    <React.Fragment>
      <Button
        href="#"
        overrides={{
          BaseButton: {
            props: {
              $as: 'a',
            },
          },
        }}
      >
        Hello there!
      </Button>
    </React.Fragment>
  );
};

export default Dashboard;
