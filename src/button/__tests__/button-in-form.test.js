/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Button from '../button.js';

test('Clicking a button should work', () => {
  const onClick = jest.fn();
  const utils = render(
    <Button data-testid="button" onClick={onClick}>
      Submit
    </Button>
  );
  const button = utils.getByTestId('button');
  fireEvent.click(button);
  expect(onClick).toHaveBeenCalled();
});

test('Form should submit normally', () => {
  const onSubmit = jest.fn();
  const utils = render(
    <form onSubmit={onSubmit}>
      <Button data-testid="button">Submit</Button>
    </form>
  );

  const button = utils.getByTestId('button');
  fireEvent.submit(button);
  expect(onSubmit).toHaveBeenCalled();
});

test('Form should not submit when button is loading', () => {
  const onSubmit = jest.fn();
  const utils = render(
    <form onSubmit={onSubmit}>
      <Button data-testid="button" isLoading>
        Submit
      </Button>
    </form>
  );
  const button = utils.getByTestId('button');
  fireEvent.click(button);
  expect(onSubmit).not.toHaveBeenCalled();
});
