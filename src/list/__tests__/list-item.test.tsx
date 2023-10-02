/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render } from '@testing-library/react';

import ListItem from '../list-item';
import { Button } from '../../button';
import ListItemLabel from '../list-item-label';

describe('ListItem component', function () {
  it('renders correctly and has accessibility name given', function () {
    const { container } = render(
      <ListItem
        aria-label="manual aria-label"
        endEnhancer={() => (
          <Button size="compact" kind="secondary" shape="pill">
            Action
          </Button>
        )}
      >
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>
    );
    const listItem = container.querySelector('li');
    expect(listItem).not.toBeNull();
    expect(listItem?.getAttribute('aria-label')).toBe('manual aria-label');
  });
});

describe('ListItem component', function () {
  it('Has default aria-label since there are no nested components', function () {
    const { container } = render(
      // @ts-expect-error
      <ListItem onChange={jest.fn()} />
    );
    const listItem = container.querySelector('li');
    expect(listItem?.getAttribute('aria-label')).toBe('List item');
  });
});

describe('ListItem component', function () {
  it('Has automatic aria-label with children components', function () {
    const { container } = render(
      <ListItem
        endEnhancer={() => (
          <Button size="compact" kind="secondary" shape="pill">
            Action
          </Button>
        )}
      >
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>
    );
    const listItem = container.querySelector('li');
    expect(listItem?.getAttribute('aria-label')).toBe('Label');
  });
});

describe('ListItem component with presentation role', function () {
  it('Does not have aria-label when given aria role presentation', function () {
    const { container } = render(
      <ListItem aria-label="manual aria-label" role="presentation">
        <ListItemLabel>Label</ListItemLabel>
      </ListItem>
    );
    const listItem = container.querySelector('li');
    expect(listItem?.getAttribute('aria-label')).toBeNull();
  });
});
