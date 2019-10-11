/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {VariableSizeGrid} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import {
  Button,
  SHAPE as BUTTON_SHAPES,
  SIZE as BUTTON_SIZES,
  KIND as BUTTON_KINDS,
} from '../button/index.js';
import {useStyletron} from '../styles/index.js';
import {Tag} from '../tag/index.js';

import HeaderCell from './header-cell.js';
import {SORT_DIRECTIONS} from './constants.js';
import MeasureColumnWidths from './measure-column-widths.js';
import type {ColumnT, Props, RowT, SortDirectionsT} from './types.js';

function CellPlacement({columnIndex, rowIndex, data, style}) {
  const [useCss, theme] = useStyletron();

  // ignores the table header row
  if (rowIndex === 0) {
    return null;
  }

  const column = data.columns[columnIndex];
  const Cell = column.renderCell;
  // minus one to account for additional header row
  const row = data.rows[rowIndex - 1];
  const isExpanded = data.isRowExpanded(row.id);

  return (
    <div
      className={useCss({
        ...theme.borders.border200,
        backgroundColor: rowIndex % 2 ? null : theme.colors.mono200,
        borderTop: 'none',
        borderBottom: 'none',
        borderLeft: 'none',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      })}
      style={style}
    >
      <div
        className={useCss({
          alignItems: 'center',
          display: 'flex',
        })}
        style={{height: 40}}
      >
        <Cell
          value={row.data[columnIndex]}
          onExpand={
            row.children && columnIndex === 0
              ? () => data.onExpand(row.id)
              : undefined
          }
          onSelect={
            data.isSelectable && columnIndex === 0
              ? () => data.onSelect(row.id)
              : undefined
          }
          isExpanded={isExpanded}
          isSelected={data.isRowSelected(row.id)}
        />
      </div>
      {isExpanded &&
        row.children &&
        row.children.map(child => {
          return (
            <div
              key={child.id}
              className={useCss({
                alignItems: 'center',
                display: 'flex',
              })}
              style={{height: 40}}
            >
              <Cell value={child.data[columnIndex]} />
            </div>
          );
        })}
    </div>
  );
}

function useDuplicateColumnTitleWarning(columns: ColumnT<>[]) {
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
      if (sortDirection === SORT_DIRECTIONS.ASC) {
        setSortIndex(-1);
        setSortDirection(SORT_DIRECTIONS.DESC);
      } else {
        setSortDirection(SORT_DIRECTIONS.ASC);
      }
    } else {
      setSortIndex(columnIndex);
      setSortDirection(SORT_DIRECTIONS.DESC);
    }
  }

  return [sortIndex, sortDirection, handleSort];
}

const HeaderContext = React.createContext<{
  addFilter: (mixed, string, string) => void,
  columns: ColumnT<>[],
  filterOpenIndex: number,
  handleSort: number => void,
  headerHoverIndex: number,
  isSelectable: boolean,
  isSelectedAll: boolean,
  isSelectedIndeterminate: boolean,
  onSelectAll: () => void,
  onSelectNone: () => void,
  setFilterOpenIndex: number => void,
  setHeaderHoverIndex: number => void,
  rows: RowT[],
  sortIndex: number,
  sortDirection: SortDirectionsT,
  widths: number[],
}>({
  addFilter: () => {},
  columns: [],
  filterOpenIndex: -1,
  handleSort: () => {},
  headerHoverIndex: -1,
  isSelectable: false,
  isSelectedAll: false,
  isSelectedIndeterminate: false,
  onSelectAll: () => {},
  onSelectNone: () => {},
  setFilterOpenIndex: () => {},
  setHeaderHoverIndex: () => {},
  rows: [],
  sortIndex: -1,
  sortDirection: null,
  widths: [],
});
HeaderContext.displayName = 'HeaderContext';

// replaces the content of the virtualized window with contents. in this case,
// we are prepending a table header row before the table rows (children to the fn).
const InnerTableElement = React.forwardRef<
  {
    children: React.Node,
    style: {
      [string]: mixed,
    },
  },
  HTMLDivElement,
>((props, ref) => {
  const [useCss, theme] = useStyletron();
  const ctx = React.useContext(HeaderContext);

  // no need to render the cells until the columns have been measured
  if (!ctx.widths.filter(Boolean).length) {
    return null;
  }

  const headerStyle = useCss({
    ...theme.borders.border200,
    backgroundColor: theme.colors.mono100,
    borderTop: 'none',
    borderLeft: 'none',
    boxSizing: 'border-box',
  });

  return (
    <div ref={ref} data-baseweb="data-table" style={props.style}>
      <div
        className={useCss({
          position: 'sticky',
          top: 0,
          left: 0,
          width: `${ctx.widths.reduce((sum, w) => sum + w, 0)}px`,
          height: '48px',
          display: 'flex',
          // this feels bad.. the absolutely positioned children elements
          // stack on top of this element with the layer component.
          zIndex: 2,
        })}
      >
        {ctx.columns.map((column, columnIndex) => {
          const width = ctx.widths[columnIndex];
          return (
            <div className={headerStyle} key={columnIndex} style={{width}}>
              <HeaderCell
                index={columnIndex}
                filterable={column.filterable}
                sortable={column.sortable}
                isHovered={ctx.headerHoverIndex === columnIndex}
                isFilterOpen={ctx.filterOpenIndex === columnIndex}
                onFilterOpen={() => {
                  if (ctx.filterOpenIndex === columnIndex) {
                    ctx.setFilterOpenIndex(-1);
                  } else {
                    ctx.setFilterOpenIndex(columnIndex);
                  }
                }}
                onFilterClose={() => ctx.setFilterOpenIndex(-1)}
                isSelectable={ctx.isSelectable && columnIndex === 0}
                isSelectedAll={ctx.isSelectedAll}
                isSelectedIndeterminate={ctx.isSelectedIndeterminate}
                onMouseEnter={() => {
                  ctx.setHeaderHoverIndex(columnIndex);
                  if (columnIndex !== ctx.filterOpenIndex) {
                    ctx.setFilterOpenIndex(-1);
                  }
                }}
                onMouseLeave={() => ctx.setHeaderHoverIndex(-1)}
                onSelectAll={ctx.onSelectAll}
                onSelectNone={ctx.onSelectNone}
                onSort={ctx.handleSort}
                filter={({close}) => {
                  const Filter = column.renderFilter;
                  return (
                    <Filter
                      setFilter={(filterParams, description) => {
                        ctx.addFilter(filterParams, column.title, description);
                      }}
                      data={ctx.rows.map(r => r.data[columnIndex])}
                      close={close}
                    />
                  );
                }}
                sortDirection={
                  ctx.sortIndex === columnIndex ? ctx.sortDirection : null
                }
                title={column.title}
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
  const [, theme] = useStyletron();
  useDuplicateColumnTitleWarning(props.columns);
  const [sortIndex, sortDirection, handleSort] = useSortParameters();
  const [filters, setFilters] = React.useState(new Map());
  const [widths, setWidths] = React.useState(props.columns.map(() => 0));
  const gridRef = React.useRef<React.Ref<typeof VariableSizeGrid> | null>(null);
  // indicates which header cell is currently hovered
  const [headerHoverIndex, setHeaderHoverIndex] = React.useState(-1);
  // filter open state tracked outside of header cell so that mouse-leave from the header
  // does not cause the popover to close.
  const [filterOpenIndex, setFilterOpenIndex] = React.useState(-1);

  const sortedIndices = React.useMemo(() => {
    let toSort = props.rows.map((r, i) => [r, i]);

    if (sortIndex !== -1) {
      const sortFn = props.columns[sortIndex].sortFn;
      if (sortDirection === SORT_DIRECTIONS.DESC) {
        toSort.sort((a, b) =>
          sortFn(a[0].data[sortIndex], b[0].data[sortIndex]),
        );
      } else if (sortDirection === SORT_DIRECTIONS.ASC) {
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

      const filterFn = column.buildFilter(filter.filterParams);
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
  }, [sortedIndices, filteredIndices, props.rows]);

  const [selectedRows, setSelectedRows] = React.useState(new Set());
  const isSelectable = props.batchActions ? !!props.batchActions.length : false;
  function handleSelectAll() {
    // only adds rows that are visible in the table
    handleSelectChange(new Set([...selectedRows, ...rows.map(r => r.id)]));
  }
  function handleSelectNone() {
    handleSelectChange(new Set());
  }
  function handleSelectChange(next) {
    setSelectedRows(next);

    const selectionCallback = props.onSelectionChange;
    if (selectionCallback) {
      selectionCallback(rows.filter(r => next.has(r.id)));
    }
  }

  const [expandedRows, setExpandedRows] = React.useState(new Set());
  function resetRowHeights() {
    if (gridRef.current) {
      // trigger react-window to layout the rows again this could be optimized by
      // supplying an accurate row index to begin resetting, but not sure of best option.
      // $FlowFixMe
      gridRef.current.resetAfterRowIndex(1, true);
    }
  }

  function addFilter(filterParams, title, description) {
    filters.set(title, {filterParams, description});
    setFilters(new Map(filters));
    resetRowHeights();
  }
  function removeFilter(title) {
    filters.delete(title);
    setFilters(new Map(filters));
    resetRowHeights();
  }

  return (
    <React.Fragment>
      <MeasureColumnWidths
        columns={props.columns}
        rows={props.rows}
        widths={widths}
        isSelectable={isSelectable}
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

      {Boolean(selectedRows.size) && props.batchActions && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: theme.sizing.scale300,
          }}
        >
          {props.batchActions.map(action => {
            function onClick(event) {
              action.onClick({
                clearSelection: handleSelectNone,
                event,
                selection: rows.filter(r => selectedRows.has(r.id)),
              });
            }

            if (action.renderIcon) {
              const Icon = action.renderIcon;
              return (
                <Button
                  key={action.label}
                  overrides={{
                    BaseButton: {props: {'aria-label': action.label}},
                  }}
                  onClick={onClick}
                  kind={BUTTON_KINDS.tertiary}
                  shape={BUTTON_SHAPES.round}
                >
                  <Icon size={16} />
                </Button>
              );
            }

            return (
              <Button
                key={action.label}
                onClick={onClick}
                kind={BUTTON_KINDS.secondary}
                size={BUTTON_SIZES.compact}
              >
                {action.label}
              </Button>
            );
          })}
        </div>
      )}

      <AutoSizer>
        {({height, width}) => (
          <HeaderContext.Provider
            value={{
              columns: props.columns,
              rows: props.rows,
              addFilter,
              filterOpenIndex,
              setFilterOpenIndex,
              handleSort: index => {
                handleSort(index);
                resetRowHeights();
              },
              headerHoverIndex,
              isSelectable,
              isSelectedAll: !!rows.length && selectedRows.size >= rows.length,
              isSelectedIndeterminate:
                !!selectedRows.size && selectedRows.size < rows.length,
              onSelectAll: handleSelectAll,
              onSelectNone: handleSelectNone,
              setHeaderHoverIndex,
              sortDirection,
              sortIndex,
              widths,
            }}
          >
            <VariableSizeGrid
              // eslint-disable-next-line flowtype/no-weak-types
              ref={(gridRef: any)}
              overscanRowCount={10}
              innerElementType={InnerTableElement}
              columnCount={props.columns.length}
              columnWidth={columnIndex => widths[columnIndex]}
              height={height}
              // plus one to account for additional header row
              rowCount={rows.length + 1}
              rowHeight={rowIndex => {
                if (rowIndex === 0) {
                  return 48;
                }

                if (
                  expandedRows.has(rows[rowIndex - 1].id) &&
                  rows[rowIndex - 1].children
                ) {
                  // already checked that children is defined. want to refrain from initializing
                  // a new variable in a somewhat common code path.
                  // $FlowFixMe
                  return rows[rowIndex - 1].children.length * 40 + 40;
                }

                return 40;
              }}
              width={width}
              itemData={{
                isRowExpanded: id => expandedRows.has(id),
                onExpand: id => {
                  if (expandedRows.has(id)) {
                    expandedRows.delete(id);
                  } else {
                    expandedRows.add(id);
                  }

                  setExpandedRows(new Set(expandedRows));
                  resetRowHeights();
                },
                isSelectable,
                isRowSelected: id => selectedRows.has(id),
                onSelect: id => {
                  if (selectedRows.has(id)) {
                    selectedRows.delete(id);
                  } else {
                    selectedRows.add(id);
                  }
                  handleSelectChange(new Set(selectedRows));
                },
                columns: props.columns,
                rows,
              }}
            >
              {CellPlacement}
            </VariableSizeGrid>
          </HeaderContext.Provider>
        )}
      </AutoSizer>
    </React.Fragment>
  );
}
