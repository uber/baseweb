/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render, getByText } from '@testing-library/react';

import { TetherBehavior } from '..';

describe('TetherBehavior', () => {
  it('renders tether content', () => {
    const onPopperUpdate = jest.fn();
    function TestCase() {
      const anchorRef = React.useRef();
      const popperRef = React.useRef();
      return (
        <React.Fragment>
          {/* @ts-ignore */}
          <div ref={anchorRef}>This is anchor</div>
          <TetherBehavior
            anchorRef={anchorRef.current}
            popperRef={popperRef.current}
            onPopperUpdate={onPopperUpdate}
          >
            {/* @ts-ignore */}
            <div ref={popperRef}>This is popper</div>
          </TetherBehavior>
        </React.Fragment>
      );
    }
    const { container } = render(<TestCase />);
    getByText(container, 'This is anchor');
    getByText(container, 'This is popper');
  });
});
