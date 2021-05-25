/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button} from '../../button/index.js';
import {StatefulPopover} from '../index.js';
import renderInWebComponent from '../../helpers/renderInWebComponent.js';

renderInWebComponent('popover-scenario', () => (
  <StatefulPopover
    accessibilityType={'tooltip'}
    content={<div data-e2e="content">content</div>}
  >
    <Button>Open</Button>
  </StatefulPopover>
));

export default function Scenario() {
  return (
    <>
      <div data-e2e="outside-popover">
        Element outside of the popover to click on
      </div>
      <popover-scenario></popover-scenario>
    </>
  );
}
