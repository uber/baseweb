/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {render, fireEvent, getByTestId} from '@testing-library/react';

import MultiValue from '../multi-value.js';

describe('Multi Value component', function() {
  it('renders tag by default', () => {
    const {container} = render(
      <MultiValue
        overrides={{
          Tag: {props: {overrides: {Root: {props: {'data-testid': 'tag'}}}}},
        }}
      >
        test
      </MultiValue>,
    );
    const tag = getByTestId(container, 'tag');
    expect(tag.textContent).toBe('testDelete');
  });

  it('clicking tag action calls removeValue', () => {
    const removeValue = jest.fn();
    const {container} = render(
      <MultiValue
        removeValue={removeValue}
        overrides={{
          Tag: {
            props: {overrides: {Action: {props: {'data-testid': 'action'}}}},
          },
        }}
      >
        test
      </MultiValue>,
    );
    const action = getByTestId(container, 'action');
    fireEvent.click(action);
    expect(removeValue).toHaveBeenCalledTimes(1);
  });
});
