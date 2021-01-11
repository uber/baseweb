/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {useStyletron} from '../styles/index.js';

import HeaderCell from './header-cell.js';
import type {ColumnT, RowT} from './types.js';

// https://github.com/Swizec/useDimensions
function useDimensions() {
  const [dimensions, setDimensions] = React.useState({});
  const [node, setNode] = React.useState(null);

  const ref = React.useCallback(node => {
    setNode(node);
  }, []);

  React.useLayoutEffect(() => {
    if (__BROWSER__) {
      if (node) {
        window.requestAnimationFrame(() => {
          setDimensions(node.getBoundingClientRect());
        });
      }
    }
  }, [node]);

  return [ref, dimensions];
}

type ElementMeasurerPropsT = {
  onDimensionsChange: (dimensions: {width: number}) => void,
  // eslint-disable-next-line flowtype/no-weak-types
  item: React.Element<any>,
};

function ElementMeasurer(props: ElementMeasurerPropsT) {
  const {onDimensionsChange} = props;
  const [ref, dimensions] = useDimensions();

  React.useEffect(() => {
    onDimensionsChange(dimensions);
  }, [dimensions, onDimensionsChange]);

  return React.cloneElement(props.item, {ref});
}

type MeasureColumnWidthsPropsT = {
  columns: ColumnT<>[],
  // if selectable, measure the first column with checkbox included
  isSelectable: boolean,
  onWidthsChange: (number[]) => void,
  rows: RowT[],
  widths: number[],
};

// sample size could likely be generated based on row count, to have higher confidence
const MAX_SAMPLE_SIZE = 50;

function generateSampleIndices(inputMin, inputMax, maxSamples) {
  const indices = [];
  const queue = [[inputMin, inputMax]];

  while (queue.length > 0) {
    const [min, max] = queue.shift();
    if (indices.length < maxSamples) {
      const pivot = Math.floor((min + max) / 2);
      indices.push(pivot);
      const left = pivot - 1;
      const right = pivot + 1;
      if (left >= min) {
        queue.push([min, left]);
      }
      if (right <= max) {
        queue.push([right, max]);
      }
    }
  }

  return indices;
}

export default function MeasureColumnWidths({
  columns,
  rows,
  widths,
  isSelectable,
  onWidthsChange,
}: MeasureColumnWidthsPropsT) {
  const [css] = useStyletron();

  const measurementCount = React.useRef(0);
  const dimensionsCache = React.useRef(widths);

  const sampleSize =
    rows.length < MAX_SAMPLE_SIZE ? rows.length : MAX_SAMPLE_SIZE;
  const finishedMeasurementCount = (sampleSize + 1) * columns.length;

  const sampleRowIndicesByColumn = React.useMemo<number[][]>(() => {
    measurementCount.current = 0;
    dimensionsCache.current = widths;

    const indices = generateSampleIndices(0, rows.length - 1, sampleSize);
    return columns.map(() => indices);
  }, [columns, rows, widths, sampleSize]);

  const handleDimensionsChange = React.useCallback(
    (columnIndex, rowIndex, dimensions) => {
      if (dimensions.width === undefined) return;

      if (
        columns[columnIndex] === undefined ||
        dimensionsCache.current[columnIndex] === undefined
      ) {
        return;
      }

      measurementCount.current += 1;

      const nextWidth = Math.min(
        Math.max(
          columns[columnIndex].minWidth || 0,
          dimensionsCache.current[columnIndex],
          dimensions.width + 1,
        ),
        columns[columnIndex].maxWidth || Infinity,
      );

      if (nextWidth !== dimensionsCache.current[columnIndex]) {
        const nextWidths = [...dimensionsCache.current];
        nextWidths[columnIndex] = nextWidth;
        dimensionsCache.current = nextWidths;
      }

      if (measurementCount.current >= finishedMeasurementCount) {
        onWidthsChange(dimensionsCache.current);
      }
    },
    [columns, finishedMeasurementCount, onWidthsChange],
  );

  const hiddenStyle = css({
    position: 'absolute',
    overflow: 'hidden',
    height: 0,
  });

  if (measurementCount.current >= finishedMeasurementCount) {
    return null;
  }

  return (
    <div className={hiddenStyle} aria-hidden>
      {sampleRowIndicesByColumn.map((rowIndices, columnIndex) => {
        const Cell = columns[columnIndex].renderCell;
        return rowIndices.map(rowIndex => (
          <ElementMeasurer
            key={`measure-${columnIndex}-${rowIndex}`}
            onDimensionsChange={dimensions =>
              handleDimensionsChange(columnIndex, rowIndex, dimensions)
            }
            item={
              <Cell
                value={columns[columnIndex].mapDataToValue(rows[rowIndex].data)}
                isMeasured
                onSelect={
                  isSelectable && columnIndex === 0 ? () => {} : undefined
                }
                x={columnIndex}
                y={rowIndex}
              />
            }
          />
        ));
      })}
      {columns.map((column, columnIndex) => (
        <ElementMeasurer
          key={`measure-column-${columnIndex}`}
          onDimensionsChange={dimensions =>
            handleDimensionsChange(columnIndex, -1, dimensions)
          }
          item={
            <HeaderCell
              index={columnIndex}
              isHovered
              isMeasured
              isSelectable={isSelectable && columnIndex === 0}
              isSelectedAll={false}
              isSelectedIndeterminate={false}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
              onSelectAll={() => {}}
              onSelectNone={() => {}}
              onSort={i => {}}
              sortable={column.sortable}
              sortDirection={null}
              title={column.title}
            />
          }
        />
      ))}
    </div>
  );
}
