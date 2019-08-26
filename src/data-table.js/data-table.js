/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {VariableSizeGrid} from 'react-window';

import {Button} from '../button/index.js';
import {Checkbox, STYLE_TYPE} from '../checkbox/index.js';
import {StatefulPopover} from '../popover/index.js';
import {useStyletron} from '../styles/index.js';
import {Tag} from '../tag/index.js';

type CategoricalColumn = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  kind: 'CATEGORICAL',
|};

type CategoricalFilterParameters = {|
  selection: Set<string>,
  exclude: boolean,
|};

type NumericalColumn = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  kind: 'NUMERICAL',
  format: 'ACCOUNTING' | 'PERCENTAGE' | 'NONE',
  highlightNegative?: boolean,
  precision?: number,
|};

type BooleanColumn = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  kind: 'BOOLEAN',
|};

type StringColumn = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  kind: 'STRING',
|};

type CustomColumn = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  kind: 'CUSTOM',
  renderCell: React.ComponentType<{data: any}>,
  renderFilter?: React.ComponentType<{
    setFilter: (filterParams: any, description: string) => void,
    close: () => void,
  }>,
  buildFilter?: any => any => boolean,
  sortFn?: (any, any) => number,
|};

type Row = {
  data: any[],
};

type Columns =
  | CategoricalColumn
  | NumericalColumn
  | BooleanColumn
  | StringColumn
  | CustomColumn;

type Props = {
  columns: Array<Columns>,
  rows: Row[],
};

function buildCategoricalFilter(params: CategoricalFilterParameters) {
  return function(data: string) {
    const included = params.selection.has(data);
    return params.exclude ? !included : included;
  };
}

function sortFnByColumn(column: Columns) {
  switch (column.kind) {
    case 'CATEGORICAL':
    case 'STRING':
      return function sortCategories(a, b) {
        return a.localeCompare(b);
      };
    case 'NUMERICAL':
      return function sortNumbers(a, b) {
        return b - a;
      };
    case 'BOOLEAN':
      return function sortBooleans(a, b) {
        if (a === b) return 0;
        return a ? -1 : 1;
      };
    case 'CUSTOM':
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
    case 'CATEGORICAL':
      return buildCategoricalFilter;
    case 'STRING':
      return params => any => true;
    case 'NUMERICAL':
      return params => any => true;
    case 'BOOLEAN':
      return params => any => true;
    case 'CUSTOM':
      if (column.buildFilter) {
        return column.buildFilter;
      } else {
        return null;
      }
    default:
      return null;
  }
}

function CategoricalFilter(props: {
  data: string[],
  setFilter: (
    filterParams: CategoricalFilterParameters,
    description: string,
  ) => void,
  close: () => void,
}) {
  const [useCss] = useStyletron();
  const [selection, setSelection] = React.useState<Set<string>>(new Set());
  const [exclude, setExclude] = React.useState(false);

  const categories = React.useMemo(() => {
    return props.data.reduce((set, category) => set.add(category), new Set());
  }, [props.data]);

  return (
    <div>
      {Array.from(categories, (category, i) => (
        <Checkbox
          key={i}
          checked={selection.has(category)}
          onChange={() => {
            if (selection.has(category)) {
              selection.delete(category);
            } else {
              selection.add(category);
            }
            setSelection(new Set(selection));
          }}
        >
          {category}
        </Checkbox>
      ))}
      <div className={useCss({display: 'flex'})}>
        <Checkbox
          checked={exclude}
          onChange={() => setExclude(!exclude)}
          checkmarkType={STYLE_TYPE.toggle}
        >
          Exclude
        </Checkbox>
        <Button
          onClick={() => {
            props.setFilter(
              {selection, exclude},
              Array.from(selection).join(', '),
            );
            props.close();
          }}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}

export function DataTable(props: Props) {
  const [sortIndex, setSortIndex] = React.useState(-1);
  const [sortDirection, setSortDirection] = React.useState(null);
  const [filters, setFilters] = React.useState(new Map());

  React.useEffect(() => {
    const titles = props.columns.reduce(
      (set, column) => set.add(column.title),
      new Set(),
    );
    if (titles.size < props.columns.length) {
      console.warn(
        'Columns titles must be unique else will result in non-deterministic filtering.',
      );
    }
  }, [props.columns]);

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

  function Cell({columnIndex, rowIndex, style}) {
    if (rowIndex === 0) {
      const column = props.columns[columnIndex];
      return (
        <div style={style}>
          {column.title}
          <button
            style={{
              color: sortIndex === columnIndex ? 'pink' : 'unset',
            }}
            onClick={() => handleSort(columnIndex)}
          >
            sort
          </button>
          <StatefulPopover
            content={({close}) => (
              <CategoricalFilter
                setFilter={(filterParams, description) =>
                  addFilter(filterParams, column.title, description)
                }
                data={props.rows.map(r => r.data[columnIndex])}
                close={close}
              />
            )}
          >
            <button>filter</button>
          </StatefulPopover>
        </div>
      );
    }

    return (
      <div style={style}>{String(rows[rowIndex - 1].data[columnIndex])}</div>
    );
  }

  return (
    <>
      {Array.from(filters).map(([title, filter]) => (
        <Tag onActionClick={() => removeFilter(title)}>
          {title} | {filter.description}
        </Tag>
      ))}
      <VariableSizeGrid
        columnCount={props.columns.length}
        columnWidth={() => 200}
        height={900}
        rowCount={rows.length + 1}
        rowHeight={() => 28}
        width={1600}
      >
        {Cell}
      </VariableSizeGrid>
    </>
  );
}
