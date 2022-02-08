/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {render, findByText, fireEvent, getByText} from '@testing-library/react';

import {TestBaseProvider} from '../../test/test-utils.js';

import {
  Tooltip,
  ACCESSIBILITY_TYPE,
  PLACEMENT,
  TRIGGER_TYPE,
} from '../index.js';

describe('Tooltip', () => {
  it('basic render', async () => {
    const content = 'content';
    const anchor = 'anchor';

    const props = {
      accessibilityType: ACCESSIBILITY_TYPE.none,
      content,
      id: 'mock-id',
      isOpen: true,
      onBlur: jest.fn(),
      onClick: jest.fn(),
      onEsc: jest.fn(),
      onFocus: jest.fn(),
      onMouseEnter: jest.fn(),
      onMouseEnterDelay: 100,
      onMouseLeave: jest.fn(),
      onMouseLeaveDelay: 200,
      placement: PLACEMENT.topLeft,
      showArrow: true,
      popoverMargin: 8,
      triggerType: TRIGGER_TYPE.hover,
    };

    function TestCase() {
      const [open, setOpen] = React.useState(false);
      return (
        <TestBaseProvider>
          <Tooltip {...props} onMouseEnter={() => setOpen(true)} isOpen={open}>
            <span>{anchor}</span>
          </Tooltip>
        </TestBaseProvider>
      );
    }

    const {container} = render(<TestCase />);
    const anchorElement = getByText(container, anchor);
    fireEvent.pointerEnter(anchorElement);
    await findByText(container, content);
  });
});
