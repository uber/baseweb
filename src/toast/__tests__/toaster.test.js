/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global document */
// @flow

import * as React from 'react';
import {
  render,
  findByText,
  fireEvent,
  getByTestId,
  getByText,
  queryByText,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import {toaster, ToasterContainer} from '../index.js';

jest.useFakeTimers();

describe('toaster', () => {
  it('renders container', () => {
    const {container} = render(
      <ToasterContainer overrides={{Root: {props: {'data-testid': 'root'}}}} />,
    );
    getByTestId(document.body, 'root');
  });

  describe('toaster methods', () => {
    it('toaster[show | update | clear]', async () => {
      render(<ToasterContainer />);

      const key = toaster.show('show');
      await findByText(document.body, 'show');

      toaster.update(String(key), {children: 'update'});
      await findByText(document.body, 'update');

      toaster.clear(key);
      waitForElementToBeRemoved(() => getByText(document.body, 'update'));
    });

    it('info, positive, warning, negative methods and clear all', async () => {
      render(<ToasterContainer />);

      toaster.info('info');
      await findByText(document.body, 'info');

      toaster.positive('positive');
      await findByText(document.body, 'positive');

      toaster.warning('warning');
      await findByText(document.body, 'warning');

      toaster.negative('negative');
      await findByText(document.body, 'negative');
    });

    it('onClose toast handler is called', async () => {
      render(<ToasterContainer />);

      const onClose = jest.fn();
      toaster.show('message', {
        onClose,
        overrides: {CloseIcon: {props: {'data-testid': 'close'}}},
      });
      await findByText(document.body, 'message');
      fireEvent.click(getByTestId(document.body, 'close'));
      waitForElementToBeRemoved(() => getByText(document.body, 'message'));
      jest.runAllTimers();
      expect(onClose).toHaveBeenCalled();
    });

    it('hides when autoHideDuration completes', async () => {
      render(<ToasterContainer autoHideDuration={100} />);
      toaster.info('info');
      await findByText(document.body, 'info');
      jest.advanceTimersByTime(100);
      jest.advanceTimersByTime(600);
      expect(queryByText(document.body, 'info')).toBeNull();
    });

    it('hides when autoHideDuration from toast completes', async () => {
      render(<ToasterContainer autoHideDuration={100} />);
      toaster.info('info', {autoHideDuration: 1000});
      await findByText(document.body, 'info');
      jest.advanceTimersByTime(100);
      jest.advanceTimersByTime(600);
      expect(queryByText(document.body, 'info')).not.toBeNull();
      jest.advanceTimersByTime(900);
      expect(queryByText(document.body, 'info')).toBeNull();
    });
  });
});
