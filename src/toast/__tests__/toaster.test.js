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

import { toaster, ToasterContainer } from '../index.js';

const getBody = (): HTMLBodyElement => {
  //flowlint-next-line unclear-type:off
  return ((document.body: any): HTMLBodyElement);
};

const getBody = (): HTMLBodyElement => {
  //flowlint-next-line unclear-type:off
  return ((document.body: any): HTMLBodyElement);
};

function wait(ms) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

describe('toaster', () => {
  it('renders container', () => {
    render(<ToasterContainer overrides={{ Root: { props: { 'data-testid': 'root' } } }} />);
    getByTestId(getBody(), 'root');
  });

  describe('toaster methods', () => {
    it('toaster[show | update | clear]', async () => {
      render(<ToasterContainer />);

      const key = toaster.show('show');
      await findByText(getBody(), 'show');

      toaster.update(String(key), { children: 'update' });
      await findByText(getBody(), 'update');

      toaster.clear(key);
      await waitForElementToBeRemoved(() => getByText(getBody(), 'update'));
    });

    it('info, positive, warning, negative methods and clear all', async () => {
      render(<ToasterContainer />);

      toaster.info('info');
      await findByText(getBody(), 'info');

      toaster.positive('positive');
      await findByText(getBody(), 'positive');

      toaster.warning('warning');
      await findByText(getBody(), 'warning');

      toaster.negative('negative');
      await findByText(getBody(), 'negative');
    });

    it('onClose toast handler is called', async () => {
      render(<ToasterContainer />);

      const onClose = jest.fn();
      toaster.show('message', {
        onClose,
        overrides: { CloseIcon: { props: { 'data-testid': 'close' } } },
      });
      await findByText(getBody(), 'message');
      fireEvent.click(getByTestId(getBody(), 'close'));
      await waitForElementToBeRemoved(() => getByText(getBody(), 'message'));
      expect(onClose).toHaveBeenCalled();
    });

    it('hides when autoHideDuration completes', async () => {
      render(<ToasterContainer autoHideDuration={100} />);
      toaster.info('info');
      //flowlint-next-line unclear-type:off
      await findByText(((getBody(): any): HTMLBodyElement), 'info');
      await wait(100);
      await wait(600);
      expect(queryByText(getBody(), 'info')).toBeNull();
    });

    it('hides when autoHideDuration from toast completes', async () => {
      render(<ToasterContainer autoHideDuration={100} />);
      toaster.info('info', { autoHideDuration: 1000 });
      await findByText(getBody(), 'info');
      await wait(100);
      await wait(600);
      expect(queryByText(getBody(), 'info')).not.toBeNull();
      await waitForElementToBeRemoved(() => getByText(getBody(), 'info'));
      expect(queryByText(getBody(), 'info')).toBeNull();
    });
  });
});
