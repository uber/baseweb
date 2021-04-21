/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import Upload from '../../icon/upload.js';

import {SnackbarElement} from '../index.js';

export default function Scenario() {
  return (
    <div style={{margin: '16px'}}>
      <SnackbarElement
        focus={false}
        message="09.06.2020.CSV was uploaded"
        startEnhancer={({size}) => <Upload size={size} />}
        overrides={{
          Root: {style: {border: 'solid 2px red'}},
          Content: {style: {border: 'solid 2px blue'}},
          StartEnhancerContainer: {style: {border: 'solid 2px green'}},
          Message: {style: {border: 'solid 2px orange'}},
        }}
      />

      <div style={{height: '36px'}} />

      <SnackbarElement
        focus={false}
        message="09.06.2020.CSV was uploaded"
        progress
        overrides={{
          Root: {style: {border: 'solid 2px red'}},
          Content: {style: {border: 'solid 2px blue'}},
          StartEnhancerContainer: {style: {border: 'solid 2px green'}},
          Message: {style: {border: 'solid 2px orange'}},
          Spinner: {style: {border: 'solid 2px cyan'}},
        }}
      />

      <div style={{height: '36px'}} />

      <SnackbarElement
        focus={false}
        message="It seems to me then as if all the moments of our life occupy the same space, as if future events already existed and were only waiting for us to find our way to them at last, just as when we have accepted an invitation we duly arrive in a certain house at a given time."
        actionMessage="A button label much longer than 50%"
        overrides={{
          Root: {style: {border: 'solid 2px red'}},
          Content: {style: {border: 'solid 2px blue'}},
          StartEnhancerContainer: {style: {border: 'solid 2px green'}},
          Message: {style: {border: 'solid 2px orange'}},
          WrapActionButtonContainer: {style: {border: 'solid 2px purple'}},
          ActionButtonContainer: {style: {border: 'solid 2px yellow'}},
        }}
      />
    </div>
  );
}
