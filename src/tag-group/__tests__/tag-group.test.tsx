/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render } from '@testing-library/react';

import { Tag } from '../../tag';
import { TagGroup } from '..';

// @ts-ignore
function getTagStyle(container) {
  const tag = container.querySelector('[data-baseweb="tag"]');
  return JSON.parse(tag.getAttribute('test-style'));
}

describe('TagGroup', () => {
  it('constrains tags to the container width when wrapping', () => {
    const { container } = render(
      <TagGroup>
        <Tag>content</Tag>
      </TagGroup>
    );
    expect(getTagStyle(container).maxWidth).toBe('100%');
  });

  it('keeps the wrap constraint when a child sets overrides.Root.props', () => {
    const { container } = render(
      <TagGroup>
        <Tag overrides={{ Root: { props: { 'data-testid': 'tag' } } }}>content</Tag>
      </TagGroup>
    );
    const tag = container.querySelector('[data-baseweb="tag"]');
    expect(tag?.getAttribute('data-testid')).toBe('tag');
    expect(getTagStyle(container).maxWidth).toBe('100%');
  });

  it('keeps the wrap constraint when a child sets an overrides.Root.style object', () => {
    const { container } = render(
      <TagGroup>
        <Tag overrides={{ Root: { style: { color: 'red' } } }}>content</Tag>
      </TagGroup>
    );
    const style = getTagStyle(container);
    expect(style.color).toBe('red');
    expect(style.maxWidth).toBe('100%');
  });

  it('keeps the wrap constraint when a child sets an overrides.Root.style function', () => {
    const { container } = render(
      <TagGroup>
        <Tag overrides={{ Root: { style: () => ({ color: 'red' }) } }}>content</Tag>
      </TagGroup>
    );
    const style = getTagStyle(container);
    expect(style.color).toBe('red');
    expect(style.maxWidth).toBe('100%');
  });

  it('lets a child override the injected maxWidth', () => {
    const { container } = render(
      <TagGroup>
        <Tag overrides={{ Root: { style: { maxWidth: '50px' } } }}>content</Tag>
      </TagGroup>
    );
    expect(getTagStyle(container).maxWidth).toBe('50px');
  });

  it('does not constrain tag width when wrap is false', () => {
    const { container } = render(
      <TagGroup wrap={false}>
        <Tag>content</Tag>
      </TagGroup>
    );
    expect(getTagStyle(container).maxWidth).toBeUndefined();
  });
});
