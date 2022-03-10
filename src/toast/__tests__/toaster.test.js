/*
Copyright (c) Uber Technologies, Inc.

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

function wait(ms) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

describe('toaster', () => {
  it('renders container', () => {
    render(
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
      await waitForElementToBeRemoved(() => getByText(document.body, 'update'));
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
      await waitForElementToBeRemoved(() =>
        getByText(document.body, 'message'),
      );
      expect(onClose).toHaveBeenCalled();
    });

    it('hides when autoHideDuration completes', async () => {
      render(<ToasterContainer autoHideDuration={100} />);
      toaster.info('info');
      await findByText(document.body, 'info');
      await wait(100);
      await wait(600);
      expect(queryByText(document.body, 'info')).toBeNull();
    });

    it('hides when autoHideDuration from toast completes', async () => {
      render(<ToasterContainer autoHideDuration={100} />);
      toaster.info('info', {autoHideDuration: 1000});
      await findByText(document.body, 'info');
      await wait(100);
      await wait(600);
      expect(queryByText(document.body, 'info')).not.toBeNull();
      await waitForElementToBeRemoved(() => getByText(document.body, 'info'));
      expect(queryByText(document.body, 'info')).toBeNull();
    });
  });
});
