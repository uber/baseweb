/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Button, KIND } from '../../button/index';
import { ButtonGroup } from '../index';

export function Scenario() {
  return (
    <>
      <ButtonGroup kind={KIND.primary} disabled>
        <Button>Label</Button>
        <Button>Label</Button>
        <Button>Label</Button>
      </ButtonGroup>
      <ButtonGroup kind={KIND.secondary} disabled>
        <Button>Label</Button>
        <Button>Label</Button>
        <Button>Label</Button>
      </ButtonGroup>
      <ButtonGroup kind={KIND.tertiary} disabled>
        <Button>Label</Button>
        <Button>Label</Button>
        <Button>Label</Button>
      </ButtonGroup>
    </>
  );
}
