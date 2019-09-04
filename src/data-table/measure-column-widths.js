/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {useStyletron} from '../styles/index.js';

import HeaderCell from './header-cell.js';
import type {ColumnT, Row} from './types.js';

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
  const [ref, dimensions] = useDimensions();
  const [initialied, setInitialized] = React.useState(false);
  React.useEffect(() => {
    // ignores the first callback with empty information
    if (initialied) {
      props.onDimensionsChange(dimensions);
    } else {
      setInitialized(true);
    }
  }, [dimensions]);
  return React.cloneElement(props.item, {ref});
}

type MeasureColumnWidthsPropsT = {
  columns: ColumnT<*, *>[],
  onWidthsChange: (number[]) => void,
  rows: Row[],
  widths: number[],
};

export default function MeasureColumnWidths(props: MeasureColumnWidthsPropsT) {
  const [useCss] = useStyletron();
  const sampleRowIndicesByColumn = React.useMemo<number[][]>(() => {
    // sample size could likely be generated based on row count, to have higher confidence
    const sampleSize = 10;

    return props.columns.map(() => {
      if (props.rows.length <= sampleSize) {
        return props.rows.map((_, i) => i);
      }

      const indices = [];
      for (let i = 0; i < sampleSize; i++) {
        indices.push(Math.floor(Math.random() * props.rows.length));
      }
      return indices;
    });
  }, [props.columns, props.rows]);

  function handleDimensionsChange(columnIndex, rowIndex, dimensions) {
    const nextWidth = Math.max(props.widths[columnIndex], dimensions.width);
    if (nextWidth !== props.widths[columnIndex]) {
      const nextWidths = [...props.widths];
      nextWidths[columnIndex] = nextWidth;
      props.onWidthsChange(nextWidths);
    }
  }

  return (
    <div
      className={useCss({
        position: 'absolute',
        overflow: 'hidden',
        height: 0,
      })}
      aria-hidden
    >
      {sampleRowIndicesByColumn.map((rowIndices, columnIndex) => {
        const Cell = props.columns[columnIndex].renderCell;
        return rowIndices.map(rowIndex => (
          <ElementMeasurer
            key={`measure-${columnIndex}-${rowIndex}`}
            onDimensionsChange={dimensions =>
              handleDimensionsChange(columnIndex, rowIndex, dimensions)
            }
            item={
              <Cell value={props.rows[rowIndex].data[columnIndex]} isMeasured />
            }
          />
        ));
      })}
      {props.columns.map((column, columnIndex) => (
        <ElementMeasurer
          key={`measure-column-${columnIndex}`}
          onDimensionsChange={dimensions =>
            handleDimensionsChange(columnIndex, -1, dimensions)
          }
          item={
            <HeaderCell
              filterable={column.filterable}
              filter={p => null}
              index={columnIndex}
              isHovered
              isMeasured
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
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
