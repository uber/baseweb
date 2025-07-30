/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { render, fireEvent, getByText, screen } from '@testing-library/react';
import { ArrowRight } from '../../icon';
import { Tile, TILE_KIND, StyledParagraph } from '..';
import '@testing-library/jest-dom';

describe('Tile Component', () => {
  it('basic render', () => {
    const { container } = render(
      <Tile tileKind={TILE_KIND.action} label="Label">
        <StyledParagraph>Paragraph</StyledParagraph>
      </Tile>
    );

    expect(getByText(container, 'Label')).toBeInTheDocument();
    expect(getByText(container, 'Paragraph')).toBeInTheDocument();
  });

  it('renders leading content', () => {
    const { container } = render(
      <Tile tileKind={TILE_KIND.action} leadingContent={ArrowRight} label="Label">
        <StyledParagraph>Paragraph</StyledParagraph>
      </Tile>
    );

    expect(getByText(container, 'Arrow Right')).toBeInTheDocument();
  });

  it('renders trailing content', () => {
    const { container } = render(
      <Tile tileKind={TILE_KIND.action} trailingContent={ArrowRight} label="Label">
        <StyledParagraph>Paragraph</StyledParagraph>
      </Tile>
    );

    expect(getByText(container, 'Arrow Right')).toBeInTheDocument();
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

  it('renders children appropriately', () => {
    const { container } = render(
      <Tile tileKind={TILE_KIND.action} label="Label">
        Paragraph
      </Tile>
    );

    expect(getByText(container, 'Paragraph')).toBeInTheDocument();
  });

  it('should render a Label that is not a string', () => {
    const LabelComponent = () => {
      return (
        <div>
          <p>Not a string</p>
        </div>
      );
    };
    const { container } = render(<Tile tileKind={TILE_KIND.action} label={LabelComponent} />);

    expect(getByText(container, 'Not a string')).toBeInTheDocument();
  });
});
