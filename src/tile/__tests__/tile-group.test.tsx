/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Tile, TileGroup, TILE_KIND, TILE_GROUP_KIND, type TileGroupProps } from '..';

const renderTileGroup = (props: Partial<TileGroupProps>) =>
  render(
    <TileGroup {...props}>
      <Tile tileKind={TILE_KIND.selection} label="Tile 1" />
      <Tile tileKind={TILE_KIND.selection} label="Tile 2" />
      <Tile tileKind={TILE_KIND.selection} label="Tile 3" />
    </TileGroup>
  );

describe('TileGroup', () => {
  it('should trigger parent handler when child is clicked', () => {
    const onClick = jest.fn();
    const { container } = renderTileGroup({ kind: TILE_GROUP_KIND.singleSelect, onClick });

    const tiles = Array.from(container.querySelectorAll('button'));
    tiles.forEach((tile) => fireEvent.click(tile));

    expect(onClick.mock.calls.length).toBe(3);
  });

  it('should set appropriate children as selected if selected prop is null', () => {
    const { container } = renderTileGroup({});
    const tiles = Array.from(container.querySelectorAll('button'));
    tiles.forEach((tile) => expect(tile.getAttribute('aria-checked')).toBe('false'));
  });

  it('should set appropriate children as selected if selected prop is a number', () => {
    const selectedValue = 2;
    const { container } = renderTileGroup({ selected: selectedValue });
    const tiles = Array.from(container.querySelectorAll('button'));
    tiles.forEach((tile, index) =>
      expect(tile.getAttribute('aria-checked')).toBe(index === selectedValue ? 'true' : 'false')
    );
  });

  it('should set appropriate children as selected if selected prop is an array of values', () => {
    const selectedValues = [0, 2];
    const { container } = renderTileGroup({ selected: selectedValues });
    const tiles = container.querySelectorAll('button');
    tiles.forEach((tile, index) =>
      expect(tile.getAttribute('aria-checked')).toBe(
        selectedValues.includes(index) ? 'true' : 'false'
      )
    );
  });

  it('should call child onClick event handler if provided', () => {
    const parentOnClick = jest.fn();
    const childOnClick = jest.fn();

    const { container } = render(
      <TileGroup kind={TILE_GROUP_KIND.multiSelectBatch} onClick={parentOnClick}>
        <Tile tileKind={TILE_KIND.selection} label="Tile 1" onClick={childOnClick} />
      </TileGroup>
    );

    const tiles = Array.from(container.querySelectorAll('button'));
    tiles.forEach((tile) => fireEvent.click(tile));

    expect(parentOnClick).toHaveBeenCalledTimes(1);
    expect(childOnClick).toHaveBeenCalledTimes(1);
  });
});
