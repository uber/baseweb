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
import Search from '../icon/search.js';
import {Input, SIZE as INPUT_SIZES} from '../input/index.js';
import {useStyletron} from '../styles/index.js';
import {Tag} from '../tag/index.js';

import HeaderCell from './header-cell.js';
import {COLUMNS, SORT_DIRECTIONS} from './constants.js';
import MeasureColumnWidths from './measure-column-widths.js';
import type {ColumnT, Props, RowT, SortDirectionsT} from './types.js';

function CellPlacement({columnIndex, rowIndex, data, style}) {
  const [useCss, theme] = useStyletron();

  // ignores the table header row
  if (rowIndex === 0) {
    return null;
  }

  let backgroundColor = theme.colors.mono100;
  if (
    (rowIndex % 2 && columnIndex === data.headerHoverIndex) ||
    rowIndex === data.rowHoverIndex
  ) {
    backgroundColor = theme.colors.mono300;
  } else if (rowIndex % 2 || columnIndex === data.headerHoverIndex) {
    backgroundColor = theme.colors.mono200;
  }

  const Cell = data.columns[columnIndex].renderCell;
  return (
    <div
      className={useCss({
        ...theme.borders.border200,
        alignItems: 'center',
        backgroundColor,
        borderTop: 'none',
        borderBottom: 'none',
        borderLeft: 'none',
        boxSizing: 'border-box',
        display: 'flex',
      })}
      style={style}
      onMouseEnter={() => data.onRowHover(rowIndex)}
    >
      <Cell
        value={data.rows[rowIndex - 1].data[columnIndex]}
        onSelect={
          data.isSelectable && columnIndex === 0
            ? () => data.onSelect(data.rows[rowIndex - 1].id)
            : undefined
        }
        isSelected={data.isRowSelected(data.rows[rowIndex - 1].id)}
        textQuery={data.textQuery}
      />
    </div>
  );
}
function compareCellPlacement(prevProps, nextProps) {
  // no need to re-render column header cells on data changes
  if (prevProps.rowIndex === 0) {
    return true;
  }

  if (
    prevProps.data.columns !== nextProps.data.columns ||
    prevProps.data.rows !== nextProps.data.rows ||
    prevProps.style !== nextProps.style
  ) {
    return false;
  }

  if (
    prevProps.data.isSelectable === nextProps.data.isSelectable &&
    prevProps.data.headerHoverIndex === nextProps.data.headerHoverIndex &&
    prevProps.data.rowHoverIndex === nextProps.data.rowHoverIndex &&
    prevProps.data.textQuery === nextProps.data.textQuery &&
    prevProps.data.isRowSelected === nextProps.data.isRowSelected
  ) {
    return true;
  }

  // at this point we know that the rowHoverIndex or the columnHoverIndex has changed.
  // row does not need to re-render if not transitioning _from_ or _to_ highlighted
  // also ensures that all cells are invalidated on column-header hover
  if (
    prevProps.rowIndex !== prevProps.data.rowHoverIndex &&
    prevProps.rowIndex !== nextProps.data.rowHoverIndex &&
    prevProps.data.headerHoverIndex === nextProps.data.headerHoverIndex &&
    prevProps.data.isRowSelected === nextProps.data.isRowSelected
  ) {
    return true;
  }

  return false;
}
const CellPlacementMemo = React.memo<
  {
    columnIndex: number,
    rowIndex: number,
    style: {
      position: string,
      height: number,
      width: number,
      top: number,
      left: number,
    },
    data: {
      columns: ColumnT<>[],
      headerHoverIndex: number,
      isSelectable: boolean,
      isRowSelected: (string | number) => boolean,
      onRowHover: number => void,
      onSelect: (string | number) => void,
      rowHoverIndex: number,
      rows: RowT[],
      textQuery: string,
    },
  },
  mixed,
>(CellPlacement, compareCellPlacement);
CellPlacementMemo.displayName = 'CellPlacement';

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

function useResizeObserver(
  ref: {current: HTMLElement | null},
  callback: (ResizeObserverEntry[], ResizeObserver) => mixed,
) {
  React.useLayoutEffect(() => {
    if (__BROWSER__) {
      if (ref.current) {
        const observer = new ResizeObserver(callback);
        observer.observe(ref.current);
        return () => observer.disconnect();
      }
    }
  }, [ref]);
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
  onFilterOpen: number => void,
  onFilterClose: () => void,
  onMouseEnter: number => void,
  onMouseLeave: () => void,
  onSelectAll: () => void,
  onSelectNone: () => void,
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
  onFilterOpen: () => {},
  onFilterClose: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onSelectAll: () => {},
  onSelectNone: () => {},
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
            <div
              className={useCss({
                ...theme.borders.border200,
                backgroundColor: theme.colors.mono100,
                borderTop: 'none',
                borderLeft: 'none',
                boxSizing: 'border-box',
              })}
              key={columnIndex}
              style={{width}}
            >
              <HeaderCell
                index={columnIndex}
                filterable={column.filterable}
                sortable={column.sortable}
                isHovered={ctx.headerHoverIndex === columnIndex}
                isFilterOpen={ctx.filterOpenIndex === columnIndex}
                onFilterOpen={() => ctx.onFilterOpen(columnIndex)}
                onFilterClose={() => ctx.onFilterClose()}
                isSelectable={ctx.isSelectable && columnIndex === 0}
                isSelectedAll={ctx.isSelectedAll}
                isSelectedIndeterminate={ctx.isSelectedIndeterminate}
                onMouseEnter={() => ctx.onMouseEnter(columnIndex)}
                onMouseLeave={() => ctx.onMouseLeave()}
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
      {React.Children.toArray(props.children).length <= ctx.columns.length ? (
        <div
          className={useCss({
            ...theme.typography.font100,
            marginTop: theme.sizing.scale600,
            marginLeft: theme.sizing.scale600,
          })}
        >
          No rows match the filter criteria defined. Please remove one or more
          filters to view more data.
        </div>
      ) : (
        props.children
      )}
    </div>
  );
});
InnerTableElement.displayName = 'InnerTableElement';

function QueryInput(props) {
  const [css, theme] = useStyletron();
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    const timeout = setTimeout(() => props.onChange(value), 250);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className={css({width: '375px'})}>
      <Input
        aria-label="Search by text"
        overrides={{
          Before: function Before() {
            return (
              <div
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: theme.sizing.scale500,
                })}
              >
                <Search size="18px" />
              </div>
            );
          },
        }}
        size={INPUT_SIZES.compact}
        onChange={event => setValue(event.target.value)}
        value={value}
        clearable
      />
    </div>
  );
}

export function Unstable_DataTable(props: Props) {
  const [css, theme] = useStyletron();
  useDuplicateColumnTitleWarning(props.columns);
  const [sortIndex, sortDirection, handleSort] = useSortParameters();
  const [filters, setFilters] = React.useState(new Map());
  const [widths, setWidths] = React.useState(props.columns.map(() => 0));
  const gridRef = React.useRef<React.Ref<typeof VariableSizeGrid> | null>(null);

  const [rowHoverIndex, setRowHoverIndex] = React.useState(-1);
  const handleRowHover = React.useCallback(
    nextIndex => {
      if (nextIndex !== rowHoverIndex) {
        setRowHoverIndex(nextIndex);
      }
    },
    [rowHoverIndex],
  );

  const [filterOpenIndex, setFilterOpenIndex] = React.useState(-1);
  function handleFilterOpen(columnIndex) {
    if (filterOpenIndex === columnIndex) {
      setFilterOpenIndex(-1);
    } else {
      setFilterOpenIndex(columnIndex);
    }
  }
  function handleFilterClose() {
    setFilterOpenIndex(-1);
  }

  const [headerHoverIndex, setHeaderHoverIndex] = React.useState(-1);
  function handleColumnHeaderMouseEnter(columnIndex) {
    setHeaderHoverIndex(columnIndex);
    setRowHoverIndex(-1);
    if (columnIndex !== filterOpenIndex) {
      setFilterOpenIndex(-1);
    }
  }
  function handleColumnHeaderMouseLeave() {
    setHeaderHoverIndex(-1);
  }

  const [textQuery, setTextQuery] = React.useState('');

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

    if (textQuery) {
      const stringishColumnIndices = [];
      for (let i = 0; i < props.columns.length; i++) {
        if (
          props.columns[i].kind === COLUMNS.CATEGORICAL ||
          props.columns[i].kind === COLUMNS.STRING
        ) {
          stringishColumnIndices.push(i);
        }
      }
      Array.from(set).forEach(idx => {
        const matches = stringishColumnIndices.some(cdx => {
          return props.rows[idx].data[cdx].toLowerCase().includes(textQuery);
        });

        if (!matches) {
          set.delete(idx);
        }
      });
    }

    return set;
  }, [filters, textQuery, props.columns, props.rows]);

  const rows = React.useMemo(() => {
    return sortedIndices
      .filter(idx => filteredIndices.has(idx))
      .map(idx => props.rows[idx]);
  }, [sortedIndices, filteredIndices, props.rows]);

  function addFilter(filterParams, title, description) {
    filters.set(title, {filterParams, description});
    setFilters(new Map(filters));
  }
  function removeFilter(title) {
    filters.delete(title);
    setFilters(new Map(filters));
  }

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

  const handleRowSelect = React.useCallback(
    id => {
      if (selectedRows.has(id)) {
        selectedRows.delete(id);
      } else {
        selectedRows.add(id);
      }
      handleSelectChange(new Set(selectedRows));
    },
    [selectedRows],
  );
  const isRowSelected = React.useCallback(id => selectedRows.has(id), [
    selectedRows,
  ]);

  const itemData = React.useMemo(() => {
    return {
      headerHoverIndex,
      rowHoverIndex,
      isRowSelected,
      isSelectable,
      onRowHover: handleRowHover,
      onSelect: handleRowSelect,
      columns: props.columns,
      rows,
      textQuery,
    };
  }, [
    handleRowHover,
    handleRowSelect,
    headerHoverIndex,
    isRowSelected,
    isSelectable,
    props.columns,
    rowHoverIndex,
    rows,
    textQuery,
  ]);

  const headlineRef = React.useRef(null);
  const [headlineHeight, setHeadlineHeight] = React.useState(64);
  useResizeObserver(headlineRef, entries => {
    setHeadlineHeight(entries[0].contentRect.height);
  });

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

      <div className={css({height: `${headlineHeight}px`})}>
        <div ref={headlineRef}>
          {!selectedRows.size && (
            <div
              className={css({
                alignItems: 'baseline',
                display: 'flex',
                flexWrap: 'wrap',
                paddingTop: theme.sizing.scale500,
                paddingBottom: theme.sizing.scale500,
              })}
            >
              <QueryInput onChange={setTextQuery} />

              {Array.from(filters).map(([title, filter]) => (
                <Tag key={title} onActionClick={() => removeFilter(title)}>
                  <span
                    className={css({
                      ...theme.typography.font150,
                      color: theme.colors.mono1000,
                    })}
                  >
                    {title}
                  </span>
                  : {filter.description}
                </Tag>
              ))}
            </div>
          )}

          {Boolean(selectedRows.size) && props.batchActions && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingTop: theme.sizing.scale400,
                paddingBottom: theme.sizing.scale400,
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
        </div>
      </div>

      <AutoSizer>
        {({height, width}) => (
          <HeaderContext.Provider
            value={{
              columns: props.columns,
              rows: props.rows,
              addFilter,
              filterOpenIndex,
              handleSort,
              headerHoverIndex,
              isSelectable,
              isSelectedAll: !!rows.length && selectedRows.size >= rows.length,
              isSelectedIndeterminate:
                !!selectedRows.size && selectedRows.size < rows.length,
              onFilterOpen: handleFilterOpen,
              onFilterClose: handleFilterClose,
              onMouseEnter: handleColumnHeaderMouseEnter,
              onMouseLeave: handleColumnHeaderMouseLeave,
              onSelectAll: handleSelectAll,
              onSelectNone: handleSelectNone,
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
              height={height - headlineHeight}
              // plus one to account for additional header row
              rowCount={rows.length + 1}
              rowHeight={rowIndex => (rowIndex === 0 ? 48 : 36)}
              width={width}
              itemData={itemData}
              style={{
                ...theme.borders.border200,
                borderColor: theme.colors.mono500,
              }}
            >
              {CellPlacementMemo}
            </VariableSizeGrid>
          </HeaderContext.Provider>
        )}
      </AutoSizer>
    </React.Fragment>
  );
}
