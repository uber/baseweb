/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

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
import {Tooltip, PLACEMENT} from '../tooltip/index.js';

import {COLUMNS, SORT_DIRECTIONS} from './constants.js';
import HeaderCell from './header-cell.js';
import MeasureColumnWidths from './measure-column-widths.js';
import type {
  ColumnT,
  DataTablePropsT,
  RowT,
  SortDirectionsT,
  RowActionT,
} from './types.js';

// consider pulling this out to a prop if useful.
const HEADER_ROW_HEIGHT = 48;

type InnerTableElementProps = {|
  children: React.Node,
  style: {[string]: mixed},
|};

type HeaderContextT = {|
  columns: ColumnT<>[],
  columnHighlightIndex: number,
  filters: $PropertyType<DataTablePropsT, 'filters'>,
  isScrollingX: boolean,
  isSelectable: boolean,
  isSelectedAll: boolean,
  isSelectedIndeterminate: boolean,
  measuredWidths: number[],
  onMouseEnter: number => void,
  onMouseLeave: () => void,
  onResize: (columnIndex: number, delta: number) => void,
  onSelectMany: () => void,
  onSelectNone: () => void,
  onSort: number => void,
  rowActions: RowActionT[],
  rowHeight: number,
  rowHighlightIndex: number,
  rows: RowT[],
  scrollLeft: number,
  sortIndex: number,
  sortDirection: SortDirectionsT,
  tableHeight: number,
  widths: number[],
|};

type CellPlacementPropsT = {
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
    columnHighlightIndex: number,
    isSelectable: boolean,
    isRowSelected: (string | number) => boolean,
    onRowMouseEnter: (number, RowT) => void,
    onSelectOne: RowT => void,
    rowHighlightIndex: number,
    rows: RowT[],
    textQuery: string,
  },
};

function CellPlacement({columnIndex, rowIndex, data, style}) {
  const [css, theme] = useStyletron();

  // ignores the table header row
  if (rowIndex === 0) {
    return null;
  }

  let backgroundColor = theme.colors.mono100;
  if (
    (rowIndex % 2 && columnIndex === data.columnHighlightIndex) ||
    rowIndex === data.rowHighlightIndex
  ) {
    backgroundColor = theme.colors.mono300;
  } else if (rowIndex % 2 || columnIndex === data.columnHighlightIndex) {
    backgroundColor = theme.colors.mono200;
  }

  const Cell = data.columns[columnIndex].renderCell;
  const value = data.columns[columnIndex].mapDataToValue(
    data.rows[rowIndex - 1].data,
  );

  return (
    <div
      className={css({
        ...theme.borders.border200,
        backgroundColor,
        borderTop: 'none',
        borderBottom: 'none',
        borderLeft: 'none',
        boxSizing: 'border-box',
      })}
      style={style}
      onMouseEnter={() =>
        data.onRowMouseEnter(rowIndex, data.rows[rowIndex - 1])
      }
    >
      <Cell
        value={value}
        onSelect={
          data.isSelectable && columnIndex === 0
            ? () => data.onSelectOne(data.rows[rowIndex - 1])
            : undefined
        }
        isSelected={data.isRowSelected(data.rows[rowIndex - 1].id)}
        textQuery={data.textQuery}
      />
    </div>
  );
}
function compareCellPlacement(prevProps, nextProps) {
  // header cells are not rendered through this component
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
    prevProps.data.columnHighlightIndex ===
      nextProps.data.columnHighlightIndex &&
    prevProps.data.rowHighlightIndex === nextProps.data.rowHighlightIndex &&
    prevProps.data.textQuery === nextProps.data.textQuery &&
    prevProps.data.isRowSelected === nextProps.data.isRowSelected
  ) {
    return true;
  }

  // at this point we know that the rowHighlightIndex or the columnHighlightIndex has changed.
  // row does not need to re-render if not transitioning _from_ or _to_ highlighted
  // also ensures that all cells are invalidated on column-header hover
  if (
    prevProps.rowIndex !== prevProps.data.rowHighlightIndex &&
    prevProps.rowIndex !== nextProps.data.rowHighlightIndex &&
    prevProps.data.columnHighlightIndex ===
      nextProps.data.columnHighlightIndex &&
    prevProps.data.isRowSelected === nextProps.data.isRowSelected
  ) {
    return true;
  }

  // similar to the row highlight optimization, do not update the cell if not in the previously
  // highlighted column or next highlighted.
  if (
    prevProps.columnIndex !== prevProps.data.columnHighlightIndex &&
    prevProps.columnIndex !== nextProps.data.columnHighlightIndex &&
    prevProps.data.rowHighlightIndex === nextProps.data.rowHighlightIndex &&
    prevProps.data.isRowSelected === nextProps.data.isRowSelected
  ) {
    return true;
  }

  return false;
}
const CellPlacementMemo = React.memo<CellPlacementPropsT, mixed>(
  CellPlacement,
  compareCellPlacement,
);
CellPlacementMemo.displayName = 'CellPlacement';

const HeaderContext = React.createContext<HeaderContextT>({
  columns: [],
  columnHighlightIndex: -1,
  filters: new Map(),
  isScrollingX: false,
  isSelectable: false,
  isSelectedAll: false,
  isSelectedIndeterminate: false,
  measuredWidths: [],
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onResize: () => {},
  onSelectMany: () => {},
  onSelectNone: () => {},
  onSort: () => {},
  rowActions: [],
  rowHeight: 0,
  rowHighlightIndex: -1,
  rows: [],
  scrollLeft: 0,
  sortIndex: -1,
  sortDirection: null,
  tableHeight: 0,
  widths: [],
});
HeaderContext.displayName = 'HeaderContext';

type HeaderProps = {|
  columnTitle: string,
  hoverIndex: number,
  index: number,
  isSortable: boolean,
  isSelectable: boolean,
  isSelectedAll: boolean,
  isSelectedIndeterminate: boolean,
  onMouseEnter: number => void,
  onMouseLeave: () => void,
  onResize: (columnIndex: number, delta: number) => void,
  onResizeIndexChange: (columnIndex: number) => void,
  onSelectMany: () => void,
  onSelectNone: () => void,
  onSort: () => void,
  resizeIndex: number,
  resizeMaxWidth: number,
  resizeMinWidth: number,
  sortIndex: number,
  sortDirection: SortDirectionsT,
  tableHeight: number,
|};
function Header(props: HeaderProps) {
  const [css, theme] = useStyletron();
  const [startResizePos, setStartResizePos] = React.useState(0);
  const [endResizePos, setEndResizePos] = React.useState(0);
  // eslint-disable-next-line flowtype/no-weak-types
  const headerCellRef = React.useRef<any>(null);

  const RULER_OFFSET = 2;
  const isResizingThisColumn = props.resizeIndex === props.index;
  const isResizing = props.resizeIndex >= 0;

  function getPositionX(el) {
    if (__BROWSER__) {
      const rect = el.getBoundingClientRect();
      return rect.left + window.scrollX;
    }
    return 0;
  }

  React.useLayoutEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      if (isResizingThisColumn) {
        event.preventDefault();

        if (headerCellRef.current) {
          const left = getPositionX(headerCellRef.current);
          const width = event.clientX - left - 5;
          const max = Math.ceil(props.resizeMaxWidth);
          const min = Math.ceil(props.resizeMinWidth);

          if (min === max) {
            return;
          }

          if (width >= min && width <= max) {
            setEndResizePos(event.clientX - RULER_OFFSET);
          }
          if (width < min) {
            setEndResizePos(left + min - RULER_OFFSET);
          }
          if (width > max) {
            setEndResizePos(max - width - RULER_OFFSET);
          }
        }
      }
    }

    function handleMouseUp(event: MouseEvent) {
      props.onResize(props.index, endResizePos - startResizePos);
      props.onResizeIndexChange(-1);
      setStartResizePos(0);
      setEndResizePos(0);
    }

    if (__BROWSER__) {
      if (isResizingThisColumn) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }
    }
    return () => {
      if (__BROWSER__) {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, [
    isResizingThisColumn,
    setEndResizePos,
    setStartResizePos,
    setEndResizePos,
    props.onResize,
    props.onResizeIndexChange,
    props.index,
    endResizePos,
    startResizePos,
    headerCellRef.current,
  ]);

  return (
    <React.Fragment>
      <HeaderCell
        ref={headerCellRef}
        index={props.index}
        sortable={props.isSortable}
        isHovered={!isResizing && props.hoverIndex === props.index}
        isSelectable={props.isSelectable && props.index === 0}
        isSelectedAll={props.isSelectedAll}
        isSelectedIndeterminate={props.isSelectedIndeterminate}
        onMouseEnter={() => {
          if (!isResizing) {
            props.onMouseEnter(props.index);
          }
        }}
        onMouseLeave={() => {
          if (!isResizing) {
            props.onMouseLeave();
          }
        }}
        onSelectAll={props.onSelectMany}
        onSelectNone={props.onSelectNone}
        onSort={props.onSort}
        sortDirection={
          props.sortIndex === props.index ? props.sortDirection : null
        }
        title={props.columnTitle}
      />
      <div
        className={css({
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        })}
      >
        <div
          role="presentation"
          onMouseDown={event => {
            props.onResizeIndexChange(props.index);
            const x = getPositionX(event.target);
            setStartResizePos(x);
            setEndResizePos(x);
          }}
          className={css({
            backgroundColor: isResizingThisColumn ? theme.colors.primary : null,
            cursor: 'ew-resize',
            position: 'absolute',
            height: '100%',
            width: '3px',
            ':hover': {
              backgroundColor: theme.colors.primary,
            },
          })}
          style={{
            right: `${(RULER_OFFSET + endResizePos - startResizePos) * -1}px`,
          }}
        >
          {isResizingThisColumn && (
            <div
              className={css({
                backgroundColor: theme.colors.primary,
                position: 'absolute',
                height: `${props.tableHeight}px`,
                right: '1px',
                width: '1px',
              })}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

function Headers(props: {||}) {
  const [css, theme] = useStyletron();
  const ctx = React.useContext(HeaderContext);
  const [resizeIndex, setResizeIndex] = React.useState(-1);

  return (
    <div
      className={css({
        position: 'sticky',
        top: 0,
        left: 0,
        width: `${ctx.widths.reduce((sum, w) => sum + w, 0)}px`,
        height: `${HEADER_ROW_HEIGHT}px`,
        display: 'flex',
        // this feels bad.. the absolutely positioned children elements
        // stack on top of this element with the layer component.
        zIndex: 2,
      })}
    >
      {ctx.columns.map((column, columnIndex) => {
        const activeFilter = ctx.filters ? ctx.filters.get(column.title) : null;

        return (
          <React.Fragment key={columnIndex}>
            <Tooltip
              key={columnIndex}
              placement={PLACEMENT.bottomLeft}
              isOpen={
                ctx.columnHighlightIndex === columnIndex &&
                Boolean(activeFilter)
              }
              content={() => {
                return (
                  <div>
                    <p
                      className={css({
                        ...theme.typography.font100,
                        color: theme.colors.contentInversePrimary,
                      })}
                    >
                      filter applied to {column.title}
                    </p>
                    {activeFilter && (
                      <p
                        className={css({
                          ...theme.typography.font150,
                          color: theme.colors.contentInversePrimary,
                        })}
                      >
                        {activeFilter.description}
                      </p>
                    )}
                  </div>
                );
              }}
            >
              <div
                className={css({
                  ...theme.borders.border200,
                  backgroundColor: theme.colors.mono100,
                  borderTop: 'none',
                  borderLeft: 'none',
                  boxSizing: 'border-box',
                  display: 'flex',
                })}
                style={{width: ctx.widths[columnIndex]}}
              >
                <Header
                  columnTitle={column.title}
                  hoverIndex={ctx.columnHighlightIndex}
                  index={columnIndex}
                  isSortable={column.sortable}
                  isSelectable={ctx.isSelectable}
                  isSelectedAll={ctx.isSelectedAll}
                  isSelectedIndeterminate={ctx.isSelectedIndeterminate}
                  onMouseEnter={ctx.onMouseEnter}
                  onMouseLeave={ctx.onMouseLeave}
                  onResize={ctx.onResize}
                  onResizeIndexChange={setResizeIndex}
                  onSelectMany={ctx.onSelectMany}
                  onSelectNone={ctx.onSelectNone}
                  onSort={() => ctx.onSort(columnIndex)}
                  resizeIndex={resizeIndex}
                  resizeMinWidth={ctx.measuredWidths[columnIndex]}
                  resizeMaxWidth={column.maxWidth || Infinity}
                  sortIndex={ctx.sortIndex}
                  sortDirection={ctx.sortDirection}
                  tableHeight={ctx.tableHeight}
                />
              </div>
            </Tooltip>
          </React.Fragment>
        );
      })}
    </div>
  );
}

// replaces the content of the virtualized window with contents. in this case,
// we are prepending a table header row before the table rows (children to the fn).
const InnerTableElement = React.forwardRef<
  InnerTableElementProps,
  HTMLDivElement,
>((props, ref) => {
  const [css, theme] = useStyletron();
  const ctx = React.useContext(HeaderContext);

  // no need to render the cells until the columns have been measured
  if (!ctx.widths.filter(Boolean).length) {
    return null;
  }

  return (
    <div ref={ref} data-baseweb="data-table" style={props.style}>
      <Headers />
      {React.Children.toArray(props.children).length <= ctx.columns.length ? (
        <div
          className={css({
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

      {ctx.rowActions &&
        Boolean(ctx.rowActions.length) &&
        ctx.rowHighlightIndex > 0 &&
        !ctx.isScrollingX && (
          <div
            style={{
              alignItems: 'center',
              backgroundColor: 'rgba(238, 238, 238, 0.99)',
              display: 'flex',
              height: `${ctx.rowHeight}px`,
              padding: '0 16px',
              paddingLeft: theme.sizing.scale300,
              paddingRight: theme.sizing.scale300,
              position: 'absolute',
              right: 0 - ctx.scrollLeft,
              top:
                (ctx.rowHighlightIndex - 1) * ctx.rowHeight + HEADER_ROW_HEIGHT,
            }}
          >
            {ctx.rowActions.map(rowAction => {
              const RowActionIcon = rowAction.renderIcon;
              return (
                <Button
                  alt={rowAction.label}
                  key={rowAction.label}
                  onClick={event =>
                    rowAction.onClick({
                      event,
                      row: ctx.rows[ctx.rowHighlightIndex - 1],
                    })
                  }
                  size={BUTTON_SIZES.compact}
                  kind={BUTTON_KINDS.minimal}
                  shape={BUTTON_SHAPES.round}
                  overrides={{
                    BaseButton: {
                      style: {marginLeft: theme.sizing.scale300},
                    },
                  }}
                >
                  <RowActionIcon size={24} />
                </Button>
              );
            })}
          </div>
        )}
    </div>
  );
});
InnerTableElement.displayName = 'InnerTableElement';

export function Unstable_DataTable(props: DataTablePropsT) {
  const [, theme] = useStyletron();
  const rowHeight = props.rowHeight || 36;
  const gridRef = React.useRef<typeof VariableSizeGrid | null>(null);
  const [measuredWidths, setMeasuredWidths] = React.useState(
    props.columns.map(() => 0),
  );
  const [resizeDeltas, setResizeDeltas] = React.useState(
    props.columns.map(() => 0),
  );
  const resetAfterColumnIndex = React.useCallback(
    columnIndex => {
      if (gridRef.current) {
        // $FlowFixMe trigger react-window to layout the elements again
        gridRef.current.resetAfterColumnIndex(columnIndex, true);
      }
    },
    [gridRef.current],
  );
  const handleWidthsChange = React.useCallback(
    nextWidths => {
      setMeasuredWidths(nextWidths);
      resetAfterColumnIndex(0);
    },
    [setMeasuredWidths, resetAfterColumnIndex],
  );
  const handleColumnResize = React.useCallback(
    (columnIndex, delta) => {
      setResizeDeltas(prev => {
        prev[columnIndex] = Math.max(prev[columnIndex] + delta, 0);
        return [...prev];
      });
      resetAfterColumnIndex(columnIndex);
    },
    [setResizeDeltas, resetAfterColumnIndex],
  );
  const normalizedWidths = React.useMemo(() => {
    const sum = ns => ns.reduce((s, n) => s + n, 0);
    const resizedWidths = measuredWidths.map((w, i) => w + resizeDeltas[i]);
    if (gridRef.current) {
      // $FlowFixMe
      const domWidth = gridRef.current.props.width;
      const measuredWidth = sum(resizedWidths);
      // $FlowFixMe
      const offsetWidth = gridRef.current._outerRef.offsetWidth;
      // $FlowFixMe
      const clientWidth = gridRef.current._outerRef.clientWidth;
      // sub 2 for border width
      const scrollbar = offsetWidth - clientWidth - 2;

      const remainder = domWidth - measuredWidth - scrollbar;
      const padding = remainder / measuredWidths.length;
      if (padding > 0) {
        return resizedWidths.map(w => Math.ceil(w + padding));
      }
    }

    return resizedWidths;
  }, [measuredWidths, resizeDeltas]);

  const [scrollLeft, setScrollLeft] = React.useState(0);
  const [isScrollingX, setIsScrollingX] = React.useState(false);
  const [recentlyScrolledX, setRecentlyScrolledX] = React.useState(false);
  React.useLayoutEffect(() => {
    if (recentlyScrolledX !== isScrollingX) {
      setIsScrollingX(recentlyScrolledX);
    }

    if (recentlyScrolledX) {
      const timeout = setTimeout(() => {
        setRecentlyScrolledX(false);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [recentlyScrolledX]);
  const handleScroll = React.useCallback(
    params => {
      setScrollLeft(params.scrollLeft);
      if (params.scrollLeft !== scrollLeft) {
        setRecentlyScrolledX(true);
      }
    },
    [scrollLeft, setScrollLeft, setRecentlyScrolledX],
  );

  const sortedIndices = React.useMemo(() => {
    let toSort = props.rows.map((r, i) => [r, i]);
    const index = props.sortIndex;

    if (index !== null && index !== undefined && index !== -1) {
      const sortFn = props.columns[index].sortFn;
      const getValue = row => props.columns[index].mapDataToValue(row.data);
      if (props.sortDirection === SORT_DIRECTIONS.DESC) {
        toSort.sort((a, b) => sortFn(getValue(a[0]), getValue(b[0])));
      } else if (props.sortDirection === SORT_DIRECTIONS.ASC) {
        toSort.sort((a, b) => sortFn(getValue(b[0]), getValue(a[0])));
      }
    }

    return toSort.map(el => el[1]);
  }, [props.sortIndex, props.sortDirection, props.columns, props.rows]);

  const textQuery = React.useMemo(() => props.textQuery || '', [
    props.textQuery,
  ]);

  const filteredIndices = React.useMemo(() => {
    const set = new Set(props.rows.map((_, idx) => idx));
    Array.from(props.filters || new Set(), f => f).forEach(
      ([title, filter]) => {
        const columnIndex = props.columns.findIndex(c => c.title === title);
        const column = props.columns[columnIndex];
        if (!column) {
          return;
        }

        // start here after
        const filterFn = column.buildFilter(filter);
        Array.from(set).forEach(idx => {
          if (!filterFn(column.mapDataToValue(props.rows[idx].data))) {
            set.delete(idx);
          }
        });
      },
    );

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
          const column = props.columns[cdx];
          return column
            .mapDataToValue(props.rows[idx].data)
            .toLowerCase()
            .includes(textQuery.toLowerCase());
        });

        if (!matches) {
          set.delete(idx);
        }
      });
    }

    return set;
  }, [props.filters, textQuery, props.columns, props.rows]);

  const rows = React.useMemo(() => {
    return sortedIndices
      .filter(idx => filteredIndices.has(idx))
      .map(idx => props.rows[idx]);
  }, [sortedIndices, filteredIndices, props.rows]);

  const isSelectable = props.batchActions ? !!props.batchActions.length : false;
  const isSelectedAll = React.useMemo(() => {
    if (!props.selectedRowIds) {
      return false;
    }
    return !!rows.length && props.selectedRowIds.size >= rows.length;
  }, [props.selectedRowIds, rows.length]);
  const isSelectedIndeterminate = React.useMemo(() => {
    if (!props.selectedRowIds) {
      return false;
    }
    return (
      !!props.selectedRowIds.size && props.selectedRowIds.size < rows.length
    );
  }, [props.selectedRowIds, rows.length]);
  const isRowSelected = React.useCallback(
    id => {
      if (props.selectedRowIds) {
        return props.selectedRowIds.has(id);
      }
      return false;
    },
    [props.selectedRowIds],
  );
  const handleSelectMany = React.useCallback(() => {
    if (props.onSelectMany) {
      props.onSelectMany(rows);
    }
  }, [rows, props.onSelectMany]);
  const handleSelectNone = React.useCallback(() => {
    if (props.onSelectNone) {
      props.onSelectNone();
    }
  }, [props.onSelectNone]);
  const handleSelectOne = React.useCallback(
    row => {
      if (props.onSelectOne) {
        props.onSelectOne(row);
      }
    },
    [props.onSelectOne],
  );

  const handleSort = React.useCallback(
    columnIndex => {
      if (props.onSort) {
        props.onSort(columnIndex);
      }
    },
    [props.onSort],
  );

  const [columnHighlightIndex, setColumnHighlightIndex] = React.useState(-1);
  const [rowHighlightIndex, setRowHighlightIndex] = React.useState(-1);

  function handleRowHighlightIndexChange(nextIndex) {
    setRowHighlightIndex(nextIndex);
    if (gridRef.current) {
      if (nextIndex >= 0) {
        // $FlowFixMe - unable to get react-window types
        gridRef.current.scrollToItem({rowIndex: nextIndex});
      }
      if (props.onRowHighlightChange) {
        props.onRowHighlightChange(nextIndex, rows[nextIndex - 1]);
      }
    }
  }

  const handleRowMouseEnter = React.useCallback(
    nextIndex => {
      setColumnHighlightIndex(-1);
      if (nextIndex !== rowHighlightIndex) {
        handleRowHighlightIndexChange(nextIndex);
      }
    },
    [rowHighlightIndex],
  );
  function handleColumnHeaderMouseEnter(columnIndex) {
    setColumnHighlightIndex(columnIndex);
    handleRowHighlightIndexChange(-1);
  }
  function handleColumnHeaderMouseLeave() {
    setColumnHighlightIndex(-1);
  }

  React.useEffect(() => {
    if (typeof props.rowHighlightIndex === 'number') {
      handleRowHighlightIndexChange(props.rowHighlightIndex);
    }
  }, [props.rowHighlightIndex]);

  const itemData = React.useMemo(() => {
    return {
      columnHighlightIndex,
      rowHighlightIndex,
      isRowSelected,
      isSelectable,
      onRowMouseEnter: handleRowMouseEnter,
      onSelectOne: handleSelectOne,
      columns: props.columns,
      rows,
      textQuery,
    };
  }, [
    handleRowMouseEnter,
    columnHighlightIndex,
    isRowSelected,
    isSelectable,
    rowHighlightIndex,
    rows,
    props.columns,
    handleSelectOne,
    textQuery,
  ]);

  return (
    <React.Fragment>
      <MeasureColumnWidths
        columns={props.columns}
        rows={props.rows}
        widths={measuredWidths}
        isSelectable={isSelectable}
        onWidthsChange={handleWidthsChange}
      />
      <AutoSizer>
        {({height, width}) => (
          <HeaderContext.Provider
            value={{
              columns: props.columns,
              columnHighlightIndex,
              filters: props.filters,
              isScrollingX,
              isSelectable,
              isSelectedAll,
              isSelectedIndeterminate,
              measuredWidths,
              onMouseEnter: handleColumnHeaderMouseEnter,
              onMouseLeave: handleColumnHeaderMouseLeave,
              onResize: handleColumnResize,
              onSelectMany: handleSelectMany,
              onSelectNone: handleSelectNone,
              onSort: handleSort,
              rowActions: props.rowActions || [],
              rowHeight,
              rowHighlightIndex,
              rows,
              scrollLeft,
              sortDirection: props.sortDirection || null,
              sortIndex:
                typeof props.sortIndex === 'number' ? props.sortIndex : -1,
              tableHeight: height,
              widths: normalizedWidths,
            }}
          >
            <VariableSizeGrid
              // eslint-disable-next-line flowtype/no-weak-types
              ref={(gridRef: any)}
              overscanRowCount={10}
              innerElementType={InnerTableElement}
              columnCount={props.columns.length}
              columnWidth={columnIndex => normalizedWidths[columnIndex]}
              height={height}
              // plus one to account for additional header row
              rowCount={rows.length + 1}
              rowHeight={rowIndex =>
                rowIndex === 0 ? HEADER_ROW_HEIGHT : rowHeight
              }
              width={width}
              itemData={itemData}
              onScroll={handleScroll}
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
