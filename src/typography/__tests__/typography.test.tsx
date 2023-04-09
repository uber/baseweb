/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { render, getByText } from '@testing-library/react';

import {
  ParagraphXSmall,
  LabelXSmall,
  DisplayLarge,
  HeadingXXLarge,
  HeadingXLarge,
  HeadingLarge,
  HeadingMedium,
  HeadingSmall,
  HeadingXSmall,
  LabelLarge,
  LabelMedium,
  ParagraphLarge,
  ParagraphMedium,
} from '..';

// @ts-ignore
function getStyle(element) {
  return JSON.parse(element.getAttribute('test-style') || '');
}

describe('Typography', () => {
  it('caption 1', () => {
    const { container } = render(<ParagraphXSmall color="primary">test</ParagraphXSmall>);
    const element = getByText(container, 'test');
    expect(getStyle(element)).toMatchInlineSnapshot(`
Object {
  "color": "$theme.colors.primary",
  "fontFamily": "$theme.typography.ParagraphXSmall.fontFamily",
  "fontSize": "$theme.typography.ParagraphXSmall.fontSize",
  "fontWeight": "$theme.typography.ParagraphXSmall.fontWeight",
  "lineHeight": "$theme.typography.ParagraphXSmall.lineHeight",
}
`);
  });

  it('caption 2', () => {
    const { container } = render(<LabelXSmall color="primary">test</LabelXSmall>);
    const element = getByText(container, 'test');
    expect(getStyle(element)).toMatchInlineSnapshot(`
Object {
  "color": "$theme.colors.primary",
  "fontFamily": "$theme.typography.LabelXSmall.fontFamily",
  "fontSize": "$theme.typography.LabelXSmall.fontSize",
  "fontWeight": "$theme.typography.LabelXSmall.fontWeight",
  "lineHeight": "$theme.typography.LabelXSmall.lineHeight",
}
`);
  });

  it('display', () => {
    const { container } = render(<DisplayLarge>test</DisplayLarge>);
    const element = getByText(container, 'test');
    expect(getStyle(element)).toMatchInlineSnapshot(`
Object {
  "color": "$theme.colors.contentPrimary",
  "fontFamily": "$theme.typography.DisplayLarge.fontFamily",
  "fontSize": "$theme.typography.DisplayLarge.fontSize",
  "fontWeight": "$theme.typography.DisplayLarge.fontWeight",
  "lineHeight": "$theme.typography.DisplayLarge.lineHeight",
}
`);
  });

  it('h1', () => {
    const { container } = render(<HeadingXXLarge>test</HeadingXXLarge>);
    const element = getByText(container, 'test');
    expect(getStyle(element)).toMatchInlineSnapshot(`
Object {
  "color": "$theme.colors.contentPrimary",
  "fontFamily": "$theme.typography.HeadingXXLarge.fontFamily",
  "fontSize": "$theme.typography.HeadingXXLarge.fontSize",
  "fontWeight": "$theme.typography.HeadingXXLarge.fontWeight",
  "lineHeight": "$theme.typography.HeadingXXLarge.lineHeight",
}
`);
  });

  it('h2', () => {
    const { container } = render(<HeadingXLarge>test</HeadingXLarge>);
    const element = getByText(container, 'test');
    expect(getStyle(element)).toMatchInlineSnapshot(`
Object {
  "color": "$theme.colors.contentPrimary",
  "fontFamily": "$theme.typography.HeadingXLarge.fontFamily",
  "fontSize": "$theme.typography.HeadingXLarge.fontSize",
  "fontWeight": "$theme.typography.HeadingXLarge.fontWeight",
  "lineHeight": "$theme.typography.HeadingXLarge.lineHeight",
}
`);
  });

  it('h3', () => {
    const { container } = render(<HeadingLarge>test</HeadingLarge>);
    const element = getByText(container, 'test');
    expect(getStyle(element)).toMatchInlineSnapshot(`
Object {
  "color": "$theme.colors.contentPrimary",
  "fontFamily": "$theme.typography.HeadingLarge.fontFamily",
  "fontSize": "$theme.typography.HeadingLarge.fontSize",
  "fontWeight": "$theme.typography.HeadingLarge.fontWeight",
  "lineHeight": "$theme.typography.HeadingLarge.lineHeight",
}
`);
  });

  it('h4', () => {
    const { container } = render(<HeadingMedium>test</HeadingMedium>);
    const element = getByText(container, 'test');
    expect(getStyle(element)).toMatchInlineSnapshot(`
Object {
  "color": "$theme.colors.contentPrimary",
  "fontFamily": "$theme.typography.HeadingMedium.fontFamily",
  "fontSize": "$theme.typography.HeadingMedium.fontSize",
  "fontWeight": "$theme.typography.HeadingMedium.fontWeight",
  "lineHeight": "$theme.typography.HeadingMedium.lineHeight",
}
`);
  });

  it('h5', () => {
    const { container } = render(<HeadingSmall>test</HeadingSmall>);
    const element = getByText(container, 'test');
    expect(getStyle(element)).toMatchInlineSnapshot(`
Object {
  "color": "$theme.colors.contentPrimary",
  "fontFamily": "$theme.typography.HeadingSmall.fontFamily",
  "fontSize": "$theme.typography.HeadingSmall.fontSize",
  "fontWeight": "$theme.typography.HeadingSmall.fontWeight",
  "lineHeight": "$theme.typography.HeadingSmall.lineHeight",
}
`);
  });

  it('h6', () => {
    const { container } = render(<HeadingXSmall>test</HeadingXSmall>);
    const element = getByText(container, 'test');
    expect(getStyle(element)).toMatchInlineSnapshot(`
Object {
  "color": "$theme.colors.contentPrimary",
  "fontFamily": "$theme.typography.HeadingXSmall.fontFamily",
  "fontSize": "$theme.typography.HeadingXSmall.fontSize",
  "fontWeight": "$theme.typography.HeadingXSmall.fontWeight",
  "lineHeight": "$theme.typography.HeadingXSmall.lineHeight",
}
`);
  });

  it('label 1', () => {
    const { container } = render(<LabelLarge>test</LabelLarge>);
    const element = getByText(container, 'test');
    expect(getStyle(element)).toMatchInlineSnapshot(`
Object {
  "color": "$theme.colors.contentPrimary",
  "fontFamily": "$theme.typography.LabelLarge.fontFamily",
  "fontSize": "$theme.typography.LabelLarge.fontSize",
  "fontWeight": "$theme.typography.LabelLarge.fontWeight",
  "lineHeight": "$theme.typography.LabelLarge.lineHeight",
}
`);
  });

  it('label 2', () => {
    const { container } = render(<LabelMedium>test</LabelMedium>);
    const element = getByText(container, 'test');
    expect(getStyle(element)).toMatchInlineSnapshot(`
Object {
  "color": "$theme.colors.contentPrimary",
  "fontFamily": "$theme.typography.LabelMedium.fontFamily",
  "fontSize": "$theme.typography.LabelMedium.fontSize",
  "fontWeight": "$theme.typography.LabelMedium.fontWeight",
  "lineHeight": "$theme.typography.LabelMedium.lineHeight",
}
`);
  });

  it('paragraph 1', () => {
    const { container } = render(<ParagraphLarge>test</ParagraphLarge>);
    const element = getByText(container, 'test');
    expect(getStyle(element)).toMatchInlineSnapshot(`
Object {
  "color": "$theme.colors.contentPrimary",
  "fontFamily": "$theme.typography.ParagraphLarge.fontFamily",
  "fontSize": "$theme.typography.ParagraphLarge.fontSize",
  "fontWeight": "$theme.typography.ParagraphLarge.fontWeight",
  "lineHeight": "$theme.typography.ParagraphLarge.lineHeight",
}
`);
  });

  it('paragraph 2', () => {
    const { container } = render(<ParagraphMedium>test</ParagraphMedium>);
    const element = getByText(container, 'test');
    expect(getStyle(element)).toMatchInlineSnapshot(`
Object {
  "color": "$theme.colors.contentPrimary",
  "fontFamily": "$theme.typography.ParagraphMedium.fontFamily",
  "fontSize": "$theme.typography.ParagraphMedium.fontSize",
  "fontWeight": "$theme.typography.ParagraphMedium.fontWeight",
  "lineHeight": "$theme.typography.ParagraphMedium.lineHeight",
}
`);
  });
});
