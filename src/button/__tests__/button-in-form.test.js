/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable */
import React from 'react';
import {render, fireEvent} from '@testing-library/react';

import Button from '../button.js';

test('Clicking a button should work', () => {
  const onClick = jest.fn();
  const utils = render(
    <Button data-testid="button" onClick={onClick}>
      Submit
    </Button>,
  );
  const button = utils.getByTestId('button');
  fireEvent.click(button);
  expect(onClick).toHaveBeenCalled();
});

test('Form should submit normally', () => {
  const consoleError = console.error;
  console.error = jest.fn();

  const onSubmit = jest.fn();
  const utils = render(
    <form onSubmit={onSubmit}>
      <Button data-testid="button">Submit</Button>
    </form>,
  );

  const button = utils.getByTestId('button');
  fireEvent.click(button);
  expect(onSubmit).toHaveBeenCalled();

  // JSDOM logs an error due to form submit being not implemented
  // asserting that it only logs one error here so that we will know
  // if additional errors come up in the future
  expect(console.error.mock.calls.length).toBe(1);
  console.error = consoleError;
});

test('Form should not submit when button is loading', () => {
  const onSubmit = jest.fn();
  const utils = render(
    <form onSubmit={onSubmit}>
      <Button data-testid="button" isLoading>
        Submit
      </Button>
    </form>,
  );
  const button = utils.getByTestId('button');
  fireEvent.click(button);
  expect(onSubmit).not.toHaveBeenCalled();
});
