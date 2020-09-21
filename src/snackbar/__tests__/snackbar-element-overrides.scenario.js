/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import Upload from '../../icon/upload.js';
import {withStyle, useStyletron} from '../../styles/index.js';

import {SnackbarElement} from '../index.js';

export default function Scenario() {
  const [css] = useStyletron();
  return (
    <div style={{margin: '16px'}}>
      <SnackbarElement
        message="09.06.2020.CSV was uploaded"
        startEnhancer={({size}) => <Upload size={size} />}
        actionMessage="Show in Finder"
        overrides={{
          Root: {
            style: {border: 'solid 4px green'},
          },
          Content: {
            style: {border: 'solid 4px red'},
          },
          StartEnhancer: {
            style: {border: 'solid 4px blue'},
          },
          Message: {
            style: {border: 'solid 4px purple'},
          },
          Action: {
            style: {border: 'solid 4px orange'},
          },
        }}
      />
    </div>
  );
}
