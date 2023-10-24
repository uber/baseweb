/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { render, fireEvent, getByText } from '@testing-library/react';
import { ArrowRight } from '../../icon';

import { Tile, TILE_KIND, StyledParagraph } from '..';

describe('Tile Ciomponent', () => {
  it('basic render', () => {
    const { container } = render(
      <Tile tileKind={TILE_KIND.action} label="Label">
        <StyledParagraph>Paragraph</StyledParagraph>
      </Tile>
    );

    getByText(container, 'Label');
    getByText(container, 'Paragraph');
  });

  it('renders leading content', () => {
    const { container } = render(
      <Tile tileKind={TILE_KIND.action} leadingContent={ArrowRight} label="Label">
        <StyledParagraph>Paragraph</StyledParagraph>
      </Tile>
    );

    getByText(container, 'Arrow Right');
  });

  it('renders trailing content', () => {
    const { container } = render(
      <Tile tileKind={TILE_KIND.action} trailingContent={ArrowRight} label="Label">
        <StyledParagraph>Paragraph</StyledParagraph>
      </Tile>
    );

    getByText(container, 'Arrow Right');
  });

  it('renders with style overrides', () => {
    const { container } = render(
      <Tile
        tileKind={TILE_KIND.action}
        label="Label"
        overrides={{
          Root: {
            style: {
              backgroundColor: 'orange',
            },
          },
        }}
      />
    );

    const testStyle = container.querySelector('button')?.getAttribute('test-style');
    const style = JSON.parse(testStyle || '');
    expect(style.backgroundColor).toBe('orange');
  });

  it('onClick called with event', () => {
    const onClick = jest.fn();
    const { container } = render(
      <Tile tileKind={TILE_KIND.action} label="Label" onClick={onClick} />
    );
    const button = container.querySelector('button');
    if (button) fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
