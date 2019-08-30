/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import {VariableSizeGrid} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import {StatefulPopover} from '../popover/index.js';
import {useStyletron} from '../styles/index.js';
import {Tag} from '../tag/index.js';

import CellForColumn from './cell-for-column.js';
import {
  CategoricalFilter,
  buildCategoricalFilter,
} from './column-categorical.js';
import {COLUMNS} from './constants.js';
import type {Columns, CategoricalFilterParameters, Props} from './types.js';

function sortFnByColumn(column: Columns) {
  switch (column.kind) {
    case COLUMNS.CATEGORICAL:
    case COLUMNS.STRING:
      return function sortCategories(a, b) {
        return a.localeCompare(b);
      };
    case COLUMNS.NUMERICAL:
      return function sortNumbers(a, b) {
        return b - a;
      };
    case COLUMNS.BOOLEAN:
      return function sortBooleans(a, b) {
        if (a === b) return 0;
        return a ? -1 : 1;
      };
    case COLUMNS.CUSTOM:
      if (column.sortFn) {
        return column.sortFn;
      } else {
        return (a, b) => 0;
      }
    default:
      return (a, b) => 0;
  }
}

function buildFilterFnByColumn(column: Columns) {
  switch (column.kind) {
    case COLUMNS.CATEGORICAL:
      return buildCategoricalFilter;
    case COLUMNS.STRING:
      return params => any => true;
    case COLUMNS.NUMERICAL:
      return params => any => true;
    case COLUMNS.BOOLEAN:
      return params => any => true;
    case COLUMNS.CUSTOM:
      if (column.buildFilter) {
        return column.buildFilter;
      } else {
        return null;
      }
    default:
      return null;
  }
}

function CellPlacement({columnIndex, rowIndex, data, style}) {
  const [useCss, theme] = useStyletron();

  if (rowIndex === 0) {
    return null;
  }

  const column = data.columns[columnIndex];
  const value = data.rows[rowIndex - 1].data[columnIndex];
  const cellStyles = {
    ...theme.borders.border200,
    borderTop: 'none',
    // borderBottom: 'none',
    borderLeft: 'none',
    boxSizing: 'border-box',
  };
  return (
    <div className={useCss(cellStyles)} style={style}>
      <CellForColumn column={column} value={value} />
    </div>
  );
}

function useDuplicateColumnTitleWarning(columns: Columns[]) {
  React.useEffect(() => {
    const titles = columns.reduce(
      (set, column) => set.add(column.title),
      new Set(),
    );
    if (titles.size < columns.length) {
      console.warn(
        'Columns titles must be unique else will result in non-deterministic filtering.',
      );
    }
  }, [columns]);
}

function useSortParameters() {
  const [sortIndex, setSortIndex] = React.useState(-1);
  const [sortDirection, setSortDirection] = React.useState(null);

  function handleSort(columnIndex) {
    if (columnIndex === sortIndex) {
      if (sortDirection === 'ASC') {
        setSortIndex(-1);
        setSortDirection('DESC');
      } else {
        setSortDirection('ASC');
      }
    } else {
      setSortIndex(columnIndex);
      setSortDirection('DESC');
    }
  }

  return [sortIndex, sortDirection, handleSort];
}

const ColumnHeader = React.forwardRef((props, ref) => {
  const [useCss, theme] = useStyletron();
  return (
    <div
      ref={ref}
      className={useCss({
        ...theme.borders.border200,
        ...theme.typography.font200,
        borderTop: 'none',
        borderBottom: 'none',
        borderLeft: 'none',
        boxSizing: 'border-box',
        display: 'inline-block',
        paddingLeft: theme.sizing.scale600,
        paddingRight: theme.sizing.scale600,
      })}
    >
      {props.column.title}
      <button onClick={() => props.handleSort(props.columnIndex)}>sort</button>
      <StatefulPopover
        content={({close}) => (
          <CategoricalFilter
            setFilter={(filterParams, description) =>
              props.addFilter(filterParams, props.column.title, description)
            }
            data={props.rows.map(r => r.data[props.columnIndex])}
            close={close}
          />
        )}
      >
        <button>filter</button>
      </StatefulPopover>
    </div>
  );
});
ColumnHeader.displayName = 'ColumnHeader';

export function Unstable_DataTable(props: Props) {
  useDuplicateColumnTitleWarning(props.columns);
  const [sortIndex, sortDirection, handleSort] = useSortParameters();
  const [filters, setFilters] = React.useState(new Map());
  const [widths, setWidths] = React.useState(props.columns.map(() => 0));
  const gridRef = React.useRef<React.Ref<typeof VariableSizeGrid> | null>(null);

  function addFilter(filterParams, title, description) {
    filters.set(title, {filterParams, description});
    setFilters(new Map(filters));
  }

  function removeFilter(title) {
    filters.delete(title);
    setFilters(new Map(filters));
  }

  const sortedIndices = React.useMemo(() => {
    let toSort = props.rows.map((r, i) => [r, i]);

    if (sortIndex !== -1) {
      const sortFn = sortFnByColumn(props.columns[sortIndex]);
      if (sortDirection === 'DESC') {
        toSort.sort((a, b) =>
          sortFn(a[0].data[sortIndex], b[0].data[sortIndex]),
        );
      } else if (sortDirection === 'ASC') {
        toSort.sort((a, b) =>
          sortFn(b[0].data[sortIndex], a[0].data[sortIndex]),
        );
      }
    }

    return toSort.map(el => el[1]);
  }, [sortIndex, sortDirection, props.columns, props.rows]);

  const filteredIndices = React.useMemo(() => {
    const set = new Set(props.rows.map((_, idx) => idx));
    Array.from(filters, f => f).forEach(([title, filter]) => {
      const columnIndex = props.columns.findIndex(c => c.title === title);
      const column = props.columns[columnIndex];
      if (!column) {
        return;
      }

      const buildFilterFn = buildFilterFnByColumn(column);
      if (!buildFilterFn) {
        return;
      }

      const filterFn = buildFilterFn(filter.filterParams);
      Array.from(set).forEach(idx => {
        if (!filterFn(props.rows[idx].data[columnIndex])) {
          set.delete(idx);
        }
      });
    });

    return set;
  }, [filters, props.columns, props.rows]);

  const rows = React.useMemo(() => {
    return sortedIndices
      .filter(idx => filteredIndices.has(idx))
      .map(idx => props.rows[idx]);
  }, [sortedIndices, filteredIndices]);

  const InnerElementType = React.forwardRef(({children, ...rest}, ref) => {
    const [useCss] = useStyletron();
    return (
      <div ref={ref} {...rest}>
        <div
          className={useCss({
            position: 'sticky',
            top: 0,
            left: 0,
            width: `${widths.reduce((sum, w) => sum + w, 0)}px`,
            height: '48px',
            backgroundColor: 'blue',
            display: 'flex',
            // this feels bad.. the absolutely positioned children elements
            // stack on top of this element with the layer component.
            zIndex: 2,
          })}
        >
          {props.columns.map((column, columnIndex) => {
            const width = widths[columnIndex];
            return (
              <div key={columnIndex} style={{width}}>
                <ColumnHeader
                  column={column}
                  columnIndex={columnIndex}
                  addFilter={addFilter}
                  handleSort={handleSort}
                  rows={props.rows}
                />
              </div>
            );
          })}
        </div>
        {children}
      </div>
    );
  });
  InnerElementType.displayName = 'InnerElementType';

  return (
    <React.Fragment>
      <SampleColumnWidths
        columns={props.columns}
        rows={props.rows}
        widths={widths}
        onWidthsChange={nextWidths => {
          setWidths(nextWidths);
          if (gridRef.current) {
            // trigger react-window to layout the elements again
            // $FlowFixMe
            gridRef.current.resetAfterColumnIndex(0, true);
          }
        }}
      />
      {Array.from(filters).map(([title, filter]) => (
        <Tag key={title} onActionClick={() => removeFilter(title)}>
          {title} | {filter.description}
        </Tag>
      ))}
      <AutoSizer>
        {({height, width}) => (
          <VariableSizeGrid
            ref={(gridRef: any)}
            innerElementType={InnerElementType}
            columnCount={props.columns.length}
            columnWidth={columnIndex => widths[columnIndex]}
            height={height}
            rowCount={rows.length + 1}
            rowHeight={rowIndex => (rowIndex === 0 ? 48 : 40)}
            width={width}
            itemData={{
              columns: props.columns,
              rows,
            }}
          >
            {CellPlacement}
          </VariableSizeGrid>
        )}
      </AutoSizer>
    </React.Fragment>
  );
}

// https://github.com/Swizec/useDimensions
function useDimensions() {
  const [dimensions, setDimensions] = React.useState({});
  const [node, setNode] = React.useState(null);

  const ref = React.useCallback(node => {
    setNode(node);
  }, []);

  React.useLayoutEffect(() => {
    if (node) {
      window.requestAnimationFrame(() => {
        setDimensions(node.getBoundingClientRect());
      });
    }
  }, [node]);

  return [ref, dimensions];
}

function ElementMeasurer(props) {
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
  return (
    <div style={{maxWidth: '300px'}}>
      {React.cloneElement(props.item, {ref})}
    </div>
  );
}

function SampleColumnWidths(props) {
  const [useCss] = useStyletron();
  const sampleRowIndicesByColumn = React.useMemo<number[][]>(() => {
    // sample size could likely be generated based on row count, to have higher confidence
    const sampleSize = 15;

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
        return rowIndices.map(rowIndex => (
          <>
            <ElementMeasurer
              onDimensionsChange={dimensions =>
                handleDimensionsChange(columnIndex, rowIndex, dimensions)
              }
              item={
                <CellForColumn
                  column={props.columns[columnIndex]}
                  value={props.rows[rowIndex].data[columnIndex]}
                />
              }
            />
          </>
        ));
      })}
      {props.columns.map((column, columnIndex) => (
        <ElementMeasurer
          onDimensionsChange={dimensions =>
            handleDimensionsChange(columnIndex, -1, dimensions)
          }
          item={
            <ColumnHeader
              column={column}
              columnIndex={columnIndex}
              addFilter={(params, title, description) => {}}
              handleSort={idx => {}}
              rows={[]}
            />
          }
        />
      ))}
    </div>
  );
}
