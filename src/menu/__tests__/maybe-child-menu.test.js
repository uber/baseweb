/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {render, getByTestId, getByText} from '@testing-library/react';

import {TestBaseProvider} from '../../test/test-utils.js';

import MaybeChildMenu from '../maybe-child-menu.js';

describe('MaybeChildMenu', () => {
  it('does not render popover if getChildMenu is undefined', () => {
    const content = 'content';
    const {container} = render(
      <MaybeChildMenu
        isOpen={true}
        getChildMenu={null}
        item={{label: 'item'}}
        resetParentMenu={() => {}}
      >
        {content}
      </MaybeChildMenu>,
    );
    expect(getByText(container, content).tagName).toBe('DIV');
  });

  it('renders popover if getChildMenu is provided', () => {
    const {container} = render(
      <TestBaseProvider>
        <MaybeChildMenu
          isOpen={true}
          getChildMenu={() => <button>child menu</button>}
          item={{label: 'item'}}
          resetParentMenu={() => {}}
          overrides={{
            ChildMenuPopover: {
              props: {
                overrides: {
                  Body: {props: {'data-testid': 'child-menu-popover'}},
                },
              },
            },
          }}
        >
          <div>child</div>
        </MaybeChildMenu>
      </TestBaseProvider>,
    );
    getByTestId(container, 'child-menu-popover');
  });
});
