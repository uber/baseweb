/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Button } from '../../button';
import { toaster, ToasterContainer, PLACEMENT } from '..';

export function Scenario() {
  const [text, setText] = React.useState('not updated');
  return (
    <React.Fragment>
      <ToasterContainer
        autoHideDuration={3000}
        closeable={false}
        placement={PLACEMENT.bottomRight}
      />

      <Button
        id="default"
        onClick={() => {
          toaster.info('hi');
        }}
      >
        Info toast
      </Button>

      <Button
        id="same-key"
        onClick={() => {
          toaster.info(text, { key: 'same-key' });
          setText('updated');
        }}
      >
        Info toast
      </Button>
    </React.Fragment>
  );
}
