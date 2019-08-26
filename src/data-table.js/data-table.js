/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
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
    performance.mark('table-sort-start');
    let toSort = [].concat(props.rows.map((r, i) => [r, i]));

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

    performance.mark('table-sort-end');
    performance.measure('table-sort', 'table-sort-start', 'table-sort-end');

    return toSort.map(el => el[1]);
  }, [sortIndex, sortDirection, props.columns, props.rows]);

  const filteredIndices = React.useMemo(() => {
    performance.mark('table-filter-start');

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

    performance.mark('table-filter-end');
    performance.measure(
      'table-filter',
      'table-filter-start',
      'table-filter-end',
    );

    return set;
  }, [filters, props.columns, props.rows]);

  const rows = React.useMemo(() => {
    return sortedIndices
      .filter(idx => filteredIndices.has(idx))
      .map(idx => props.rows[idx]);
  }, [sortedIndices, filteredIndices]);

  // in this commented example, sorts happen on every generation of
  // calculating rows and therefore pays the perf cost more often than
  // just when sort action is taken. another option (uncommented code),
  // is to spend more cycles on sorting, but refrain from paying for
  // it over and over.
  //
  // one benefit here versus independently sorting is that, we can
  // apply the filter _before_ sorting. doing so has the potential to
  // drastically improve sort speed. conversely, the independent method
  // always sorts across all rows. In practice, the sorts and filtering
  // themselves are not noticable operations to an end user, but _updating_
  // the rows to the next state takes significantly longer.

  // const filteredIndices = React.useMemo(() => {
  //   performance.mark('table-filter-start');
  //   const set = new Set(props.rows.map((_, idx) => idx));
  //   Array.from(filters, f => f).forEach(([title, filter]) => {
  //     const columnIndex = props.columns.findIndex(c => c.title === title);
  //     const column = props.columns[columnIndex];
  //     if (!column) {
  //       return;
  //     }

  //     const buildFilterFn = buildFilterFnByColumn(column);
  //     if (!buildFilterFn) {
  //       return;
  //     }

  //     const filterFn = buildFilterFn(filter.filterParams);
  //     Array.from(set).forEach(idx => {
  //       if (!filterFn(props.rows[idx].data[columnIndex])) {
  //         set.delete(idx);
  //       }
  //     });
  //   });

  //   performance.mark('table-filter-end');
  //   performance.measure(
  //     'table-filter',
  //     'table-filter-start',
  //     'table-filter-end',
  //   );

  //   return set;
  // }, [filters, props.columns, props.rows]);

  // const rows = React.useMemo(() => {
  //   performance.mark('table-sort-start');
  //   const toSort = [].concat(
  //     props.rows.filter((_, idx) => filteredIndices.has(idx)),
  //   );

  //   if (sortIndex !== -1) {
  //     const sortFn = sortFnByColumn(props.columns[sortIndex]);
  //     if (sortDirection === 'DESC') {
  //       toSort.sort((a, b) => sortFn(a.data[sortIndex], b.data[sortIndex]));
  //     } else if (sortDirection === 'ASC') {
  //       toSort.sort((a, b) => sortFn(b.data[sortIndex], a.data[sortIndex]));
  //     }
  //   }

  //   performance.mark('table-sort-end');
  //   performance.measure('table-sort', 'table-sort-start', 'table-sort-end');

  //   return toSort;
  // }, [sortIndex, sortDirection, filteredIndices, props.columns, props.rows]);

  return (
    <React.Fragment>
      {Array.from(filters).map(([title, filter]) => (
        <Tag onActionClick={() => removeFilter(title)}>
          {title} | {filter.description}
        </Tag>
      ))}
      <table>
        <thead>
          <tr>
            {props.columns.map((column, i) => (
              <th key={i}>
                {column.title}
                <button
                  style={{
                    color: sortIndex === i ? 'pink' : 'unset',
                  }}
                  onClick={() => handleSort(i)}
                >
                  sort
                </button>
                <StatefulPopover
                  content={({close}) => (
                    <CategoricalFilter
                      setFilter={(filterParams, description) =>
                        addFilter(filterParams, column.title, description)
                      }
                      data={props.rows.map(r => r.data[i])}
                      close={close}
                    />
                  )}
                >
                  <button>filter</button>
                </StatefulPopover>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.data.map((d, i) => {
                const column = props.columns[i];
                if (column.kind === 'CATEGORICAL') {
                  return <td>{d}</td>;
                } else if (column.kind === 'NUMERICAL') {
                  return <td>{d}</td>;
                } else if (column.kind === 'BOOLEAN') {
                  return <td>{d ? 'T' : 'F'}</td>;
                } else if (column.kind === 'STRING') {
                  return <td>{d}</td>;
                } else if (column.kind === 'CUSTOM') {
                  const Cell = column.renderCell;
                  return (
                    <td>
                      <Cell data={d} />
                    </td>
                  );
                } else {
                  return null;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}
