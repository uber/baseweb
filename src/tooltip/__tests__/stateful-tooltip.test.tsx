/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render, fireEvent, findByText, getByText } from '@testing-library/react';

import { TestBaseProvider } from '../../test/test-utils';
import { StatefulTooltip, PLACEMENT, TRIGGER_TYPE } from '..';

describe('StatefulTooltip', () => {
  it('basic render', async () => {
    const anchor = 'anchor';
    const content = 'content';

    const props = {
      content,
      initialState: {
        isOpen: true,
      },
      onMouseEnterDelay: 100,
      onMouseLeaveDelay: 200,
      onClose: jest.fn(),
      onOpen: jest.fn(),
      placement: PLACEMENT.topLeft,
      popoverMargin: 8,
      popperOptions: {},
      showArrow: true,
      stateReducer: jest.fn(),
      triggerType: TRIGGER_TYPE.hover,
    };

    const { container } = render(
      <TestBaseProvider>
        <StatefulTooltip {...props}>
          <span>{anchor}</span>
        </StatefulTooltip>
      </TestBaseProvider>
    );

    const anchorElement = getByText(container, anchor);
    fireEvent.mouseEnter(anchorElement);
    await findByText(container, content);
  });
});
