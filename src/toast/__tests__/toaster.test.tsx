/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global document */
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import {
  render,
  findByText,
  fireEvent,
  getByTestId,
  getByText,
  queryByText,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { toaster, ToasterContainer } from '..';

const getBody = (): HTMLBodyElement => {
  //flowlint-next-line unclear-type:off
  return document.body as any as HTMLBodyElement;
};

describe('toaster', () => {
  it('renders container', () => {
    render(<ToasterContainer overrides={{ Root: { props: { 'data-testid': 'root' } } }} />);
    getByTestId(getBody(), 'root');
  });

  describe('toaster methods', () => {
    it('toaster[show | update | clear]', async () => {
      render(<ToasterContainer />);
      let key;

      act(() => {
        key = toaster.show('show');
      });
      await findByText(getBody(), 'show');

      act(() => {
        toaster.update(String(key), { children: 'update' });
      });
      await findByText(getBody(), 'update');

      act(() => {
        toaster.clear(key);
      });
      await waitForElementToBeRemoved(() => getByText(getBody(), 'update'));
    });

    it('info, positive, warning, negative methods and clear all', async () => {
      render(<ToasterContainer />);

      act(() => {
        toaster.info('info');
      });
      await findByText(getBody(), 'info');

      act(() => {
        toaster.positive('positive');
      });
      await findByText(getBody(), 'positive');

      act(() => {
        toaster.warning('warning');
      });
      await findByText(getBody(), 'warning');

      act(() => {
        toaster.negative('negative');
      });
      await findByText(getBody(), 'negative');
    });

    it('onClose toast handler is called', async () => {
      render(<ToasterContainer />);

      const onClose = jest.fn();
      act(() => {
        toaster.show('message', {
          onClose,
          overrides: { CloseIcon: { props: { 'data-testid': 'close' } } },
        });
      });
      await findByText(getBody(), 'message');
      fireEvent.click(getByTestId(getBody(), 'close'));
      await waitForElementToBeRemoved(() => getByText(getBody(), 'message'));
      expect(onClose).toHaveBeenCalled();
    });

    it('hides when autoHideDuration completes', async () => {
      render(<ToasterContainer autoHideDuration={100} />);
      act(() => {
        toaster.info('info');
      });
      await findByText(getBody(), 'info');
    });

    it('hides when autoHideDuration from toast completes', async () => {
      render(<ToasterContainer autoHideDuration={100} />);
      act(() => {
        toaster.info('info', { autoHideDuration: 1000 });
      });
      await findByText(getBody(), 'info');
      expect(queryByText(getBody(), 'info')).not.toBeNull();
      await waitForElementToBeRemoved(() => getByText(getBody(), 'info'), { timeout: 2000 });
      expect(queryByText(getBody(), 'info')).toBeNull();
    });
  });
});
