/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {VariableSizeGrid} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import {useStyletron} from '../styles/index.js';
import {Tag} from '../tag/index.js';

import CellForColumn from './cell-for-column.js';
import ColumnHeader from './column-header.js';
import {
  CategoricalFilter,
  buildCategoricalFilter,
} from './column-categorical.js';
import {COLUMNS} from './constants.js';
import MeasureColumnWidths from './measure-column-widths.js';
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

  // ignores the table header row
  if (rowIndex === 0) {
    return null;
  }

  const column = data.columns[columnIndex];
  // minus one to account for additional header row
  const value = data.rows[rowIndex - 1].data[columnIndex];
  return (
    <div
      className={useCss({
        ...theme.borders.border200,
        alignItems: 'center',
        backgroundColor: rowIndex % 2 ? null : theme.colors.mono200,
        borderTop: 'none',
        borderBottom: 'none',
        borderLeft: 'none',
        boxSizing: 'border-box',
        display: 'flex',
      })}
      style={style}
    >
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

// replaces the content of the virtualized window with contents. in this case,
// we are prepending a table header row before the table rows (children to the fn).
const InnerTableElement = React.forwardRef<
  {children: React.Node, widths: number[], columns: Columns[], style: any},
  HTMLDivElement,
>((props, ref) => {
  const [useCss] = useStyletron();
  return (
    <div ref={ref} style={props.style}>
      <div
        className={useCss({
          position: 'sticky',
          top: 0,
          left: 0,
          width: `${props.widths.reduce((sum, w) => sum + w, 0)}px`,
          height: '48px',
          backgroundColor: 'blue',
          display: 'flex',
          // this feels bad.. the absolutely positioned children elements
          // stack on top of this element with the layer component.
          zIndex: 2,
        })}
      >
        {props.columns.map((column, columnIndex) => {
          const width = props.widths[columnIndex];
          return (
            <div key={columnIndex} style={{width}}>
              <ColumnHeader
                title={column.title}
                index={columnIndex}
                onSort={i => console.log('sort', i)}

                // column={column}
                // columnIndex={columnIndex}
                // addFilter={addFilter}
                // handleSort={handleSort}
                // rows={props.rows}
              />
            </div>
          );
        })}
      </div>
      {props.children}
    </div>
  );
});
InnerTableElement.displayName = 'InnerTableElement';

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

  return (
    <React.Fragment>
      <MeasureColumnWidths
        columns={props.columns}
        rows={props.rows}
        widths={widths}
        onWidthsChange={nextWidths => {
          setWidths(nextWidths);
          if (gridRef.current) {
            // $FlowFixMe trigger react-window to layout the elements again
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
            innerElementType={innerProps => (
              <InnerTableElement
                {...innerProps}
                columns={props.columns}
                widths={widths}
              />
            )}
            columnCount={props.columns.length}
            columnWidth={columnIndex => widths[columnIndex]}
            height={height}
            // plus one to account for additional header row
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
