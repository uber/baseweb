/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

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
const MAX_SAMPLE_SIZE = 10;

export default function MeasureColumnWidths(props: MeasureColumnWidthsPropsT) {
  const [useCss] = useStyletron();

  const measurementCount = React.useRef(0);
  const sampleSize = React.useMemo(() => {
    if (props.rows.length < MAX_SAMPLE_SIZE) {
      return props.rows.length;
    }
    return MAX_SAMPLE_SIZE;
  }, [props.rows.length]);
  const finishedMeasurementCount = React.useMemo(
    () => (sampleSize + 1) * props.columns.length,
    [props.columns, sampleSize],
  );
  const dimensionsCache = React.useRef(props.widths);

  const sampleRowIndicesByColumn = React.useMemo<number[][]>(() => {
    measurementCount.current = 0;
    dimensionsCache.current = props.widths;

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
  }, [props.columns, props.rows, props.widths, sampleSize]);

  function handleDimensionsChange(columnIndex, rowIndex, dimensions) {
    if (dimensions.width === undefined) return;

    measurementCount.current += 1;

    const nextWidth = Math.max(
      props.columns[columnIndex].minWidth || 0,
      dimensionsCache.current[columnIndex],
      dimensions.width,
    );

    if (nextWidth !== dimensionsCache.current[columnIndex]) {
      const nextWidths = [...dimensionsCache.current];
      nextWidths[columnIndex] = nextWidth;
      dimensionsCache.current = nextWidths;
    }

    if (measurementCount.current >= finishedMeasurementCount) {
      props.onWidthsChange(dimensionsCache.current);
    }
  }

  const hiddenStyle = useCss({
    position: 'absolute',
    overflow: 'hidden',
    height: 0,
  });

  const [shouldMeasure, setShouldMeasure] = React.useState(true);
  React.useEffect(() => {
    if (measurementCount.current >= finishedMeasurementCount) {
      setShouldMeasure(false);
    } else {
      if (!shouldMeasure) {
        setShouldMeasure(true);
      }
    }
  }, [measurementCount.current, finishedMeasurementCount]);

  if (!shouldMeasure) {
    return null;
  }

  return (
    <div className={hiddenStyle} aria-hidden>
      {sampleRowIndicesByColumn.map((rowIndices, columnIndex) => {
        const Cell = props.columns[columnIndex].renderCell;
        return rowIndices.map(rowIndex => (
          <ElementMeasurer
            key={`measure-${columnIndex}-${rowIndex}`}
            onDimensionsChange={dimensions =>
              handleDimensionsChange(columnIndex, rowIndex, dimensions)
            }
            item={
              <Cell
                value={props.rows[rowIndex].data[columnIndex]}
                isMeasured
                onSelect={
                  props.isSelectable && columnIndex === 0 ? () => {} : undefined
                }
              />
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
              isFilterOpen={false}
              isHovered
              isMeasured
              isSelectable={props.isSelectable && columnIndex === 0}
              isSelectedAll={false}
              isSelectedIndeterminate={false}
              onFilterOpen={() => {}}
              onFilterClose={() => {}}
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
