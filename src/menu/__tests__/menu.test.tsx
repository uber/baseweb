/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { getAllByTestId, render, waitFor } from '@testing-library/react';
import * as React from 'react';
import { act } from 'react';

import Menu from '../menu';
import locale from '../locale';

const mockItems = [{ label: 'item1' }, { label: 'item2' }];

function getSharedProps() {
  return {
    items: mockItems,
    // @ts-ignore
    getItemLabel: (item) => item.label,
    rootRef: React.createRef(),
  };
}

describe('Menu Stateless Component', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders basic menu', () => {
    // @ts-expect-error todo(flow->ts)
    const { container } = render(<Menu {...getSharedProps()} />);

    const list = container.querySelector('ul');
    expect(list).not.toBeNull();

    const items = container.querySelectorAll('li');
    expect(items.length).toBe(2);
  });

  it('renders with components overrides', () => {
    const NewOption = () => <div data-testid="option" />;
    const props = {
      ...getSharedProps(),
      overrides: {
        Option: {
          component: NewOption,
        },
      },
    };
    // @ts-expect-error todo(flow->ts)
    const { container } = render(<Menu {...props} />);
    const options = getAllByTestId(container, 'option');
    expect(options.length).toBe(2);
  });

  it('renders dividers without react key warning', () => {
    const original = console.error;
    console.error = jest.fn();
    const itemsWithDivider = [{ label: 'item1' }, { divider: true }, { label: 'item2' }];
    // @ts-expect-error todo(flow->ts)
    render(<Menu {...getSharedProps()} items={itemsWithDivider} />);
    expect(console.error).not.toHaveBeenCalledWith(
      expect.stringContaining('Each child in a list should have a unique "key" prop.'),
      expect.anything(),
      expect.anything(),
      expect.anything()
    );
    console.error = original;
  });

  describe('Timer for accessibility announcements', () => {
    // Helper function to advance timers and wait for status update
    const advanceTimersAndGetStatus = async (container: Element, timeMs: number) => {
      await act(async () => {
        jest.advanceTimersByTime(timeMs);
      });

      await waitFor(() => {
        const statusEl = container.querySelector('[role="status"]');
        expect(statusEl).not.toBeNull();
      });

      return container.querySelector('[role="status"]')?.textContent || '';
    };

    // Helper function to render menu with items
    const renderMenuWithItems = (items: any[], noResultsMsg?: string) => {
      const props = { ...getSharedProps(), items, ...(noResultsMsg && { noResultsMsg }) };
      // @ts-expect-error todo(flow->ts)
      return render(<Menu {...props} />);
    };

    it('delays status message by 100ms', async () => {
      const { container } = renderMenuWithItems(mockItems);

      // Initially empty
      const statusEl = container.querySelector('[role="status"]');
      expect(statusEl?.textContent).toBe('');

      // Still empty after 50ms
      await act(async () => jest.advanceTimersByTime(50));
      expect(statusEl?.textContent).toBe('');

      // Message appears after full 100ms
      const status = await advanceTimersAndGetStatus(container, 50);
      expect(status).toBe(locale.itemsAvailableStatus(mockItems.length));
    });

    it('announces singular vs plural correctly', async () => {
      // Single item
      const { container: singleContainer } = renderMenuWithItems([{ label: 'single' }]);
      const singleStatus = await advanceTimersAndGetStatus(singleContainer, 100);
      expect(singleStatus).toBe(locale.itemsAvailableStatus(1));

      // Multiple items
      const { container: multiContainer } = renderMenuWithItems(mockItems);
      const multiStatus = await advanceTimersAndGetStatus(multiContainer, 100);
      expect(multiStatus).toBe(locale.itemsAvailableStatus(mockItems.length));
    });

    it('announces empty state correctly', async () => {
      const { container } = renderMenuWithItems([], 'No results found');
      const status = await advanceTimersAndGetStatus(container, 100);
      expect(status).toBe('No results found');
    });

    it('cleans up timer on unmount', () => {
      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
      const { unmount } = renderMenuWithItems(mockItems);

      unmount();

      expect(clearTimeoutSpy).toHaveBeenCalled();
      clearTimeoutSpy.mockRestore();
    });

    it('resets timer when items change', async () => {
      const { container, rerender } = renderMenuWithItems([{ label: 'item1' }]);

      // Advance partially, then change items
      await act(async () => jest.advanceTimersByTime(50));

      // @ts-expect-error todo(flow->ts)
      rerender(<Menu {...getSharedProps()} items={mockItems} />);

      // Timer should reset - still empty after another 50ms (total 100ms from first render)
      await act(async () => jest.advanceTimersByTime(50));
      const statusEl = container.querySelector('[role="status"]');
      expect(statusEl?.textContent).toBe('');

      // Message appears after completing the new timer (another 50ms)
      const status = await advanceTimersAndGetStatus(container, 50);
      expect(status).toBe(locale.itemsAvailableStatus(mockItems.length));
    });

    it('has correct accessibility attributes', () => {
      const { container } = renderMenuWithItems(mockItems);
      const statusEl = container.querySelector('[role="status"]');

      expect(statusEl).not.toBeNull();
      expect(statusEl?.getAttribute('aria-live')).toBe('polite');
      expect(statusEl?.getAttribute('aria-atomic')).toBe('true');
    });
  });
});
