/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Checkbox, StyledLabel} from '../checkbox/index.js';
import Search from '../icon/search.js';
import {Input, SIZE as INPUT_SIZE} from '../input/index.js';
import {useStyletron, withStyle} from '../styles/index.js';
import {Label3} from '../typography/index.js';

import CellShell from './cell-shell.js';
import {COLUMNS} from './constants.js';
import type {ColumnT} from './types.js';
import FilterShell from './filter-shell.js';
import {matchesQuery, splitByQuery, HighlightCellText} from './text-search.js';

type OptionsT = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  minWidth?: number,
|};

type FilterParametersT = {|
  description: string,
  exclude: boolean,
  selection: Set<string>,
|};

type CategoricalColumnT = ColumnT<string, FilterParametersT>;

function InputBefore() {
  const [useCss, theme] = useStyletron();
  return (
    <div
      className={useCss({
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.sizing.scale500,
      })}
    >
      <Search size="18px" />
    </div>
  );
}

function FilterQuickControls(props: {
  onSelectAll: () => void,
  onClearSelection: () => void,
}) {
  const [useCss, theme] = useStyletron();
  return (
    <React.Fragment>
      <button
        type="button"
        className={useCss({
          ...theme.typography.font100,
          borderTop: 0,
          borderRight: 0,
          borderBottom: 0,
          borderLeft: 0,
          cursor: 'pointer',
        })}
        onClick={props.onSelectAll}
      >
        Select All
      </button>
      <span className={useCss({...theme.typography.font100})}> | </span>
      <button
        type="button"
        className={useCss({
          ...theme.typography.font100,
          borderTop: 0,
          borderRight: 0,
          borderBottom: 0,
          borderLeft: 0,
          cursor: 'pointer',
        })}
        onClick={props.onClearSelection}
      >
        Clear
      </button>
    </React.Fragment>
  );
}

const StyledHighlightLabel = withStyle(StyledLabel, props => {
  const style = {
    whiteSpace: 'pre',
    color: props.$isActive
      ? props.$theme.colors.black
      : props.$theme.colors.mono600,
  };

  if (!props.$isFirst) {
    // $FlowFixMe
    style.paddingLeft = null;
  }

  return style;
});

function HighlightCheckboxLabel(props) {
  const {children, ...restProps} = props;

  if (!props.query) {
    return <StyledLabel {...restProps}>{children}</StyledLabel>;
  }

  return splitByQuery(children, props.query).map((el, i) => {
    if (matchesQuery(el, props.query)) {
      return (
        <StyledHighlightLabel {...restProps} key={i} $isFirst={!i} $isActive>
          {el}
        </StyledHighlightLabel>
      );
    }
    return (
      <StyledHighlightLabel {...restProps} key={i} $isFirst={!i}>
        {el}
      </StyledHighlightLabel>
    );
  });
}

type CategoricalFilterProps = {
  data: string[],
  close: () => void,
  setFilter: FilterParametersT => void,
};

export function CategoricalFilter(props: CategoricalFilterProps) {
  const [useCss, theme] = useStyletron();
  const [selection, setSelection] = React.useState<Set<string>>(new Set());
  const [exclude, setExclude] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const categories = React.useMemo(() => {
    return props.data.reduce((set, category) => set.add(category), new Set());
  }, [props.data]);

  const checkboxStyles = useCss({marginBottom: theme.sizing.scale200});

  const showQuery = Boolean(categories.size >= 10);
  const filteredCategories = Array.from(categories, c => c).filter(c =>
    matchesQuery(c, query),
  );

  return (
    <FilterShell
      exclude={exclude}
      onExcludeChange={() => setExclude(!exclude)}
      onApply={() => {
        props.setFilter({
          description: Array.from(selection).join(', '),
          exclude,
          selection,
        });
        props.close();
      }}
    >
      {showQuery && (
        <Input
          size={INPUT_SIZE.compact}
          overrides={{Before: InputBefore}}
          value={query}
          onChange={event => setQuery(event.target.value)}
          clearable
        />
      )}

      {!query && (
        <div
          style={{
            marginTop: showQuery ? theme.sizing.scale600 : null,
          }}
        >
          <FilterQuickControls
            onSelectAll={() => {
              categories.forEach(c => selection.add(c));
              setSelection(new Set(selection));
            }}
            onClearSelection={() => {
              setSelection(new Set());
            }}
          />
        </div>
      )}

      <div
        className={useCss({
          maxHeight: '256px',
          overflowY: 'auto',
          marginTop: theme.sizing.scale600,
        })}
      >
        {!filteredCategories.length && <Label3>No Categories Found</Label3>}

        {Boolean(filteredCategories.length) &&
          filteredCategories.map((category, i) => (
            <div className={checkboxStyles} key={i}>
              <Checkbox
                checked={selection.has(category)}
                onChange={() => {
                  if (selection.has(category)) {
                    selection.delete(category);
                  } else {
                    selection.add(category);
                  }
                  setSelection(new Set(selection));
                }}
                overrides={{
                  Label: {component: HighlightCheckboxLabel, props: {query}},
                }}
              >
                {category}
              </Checkbox>
            </div>
          ))}
      </div>
    </FilterShell>
  );
}

const CategoricalCell = React.forwardRef<_, HTMLDivElement>((props, ref) => {
  return (
    <CellShell
      ref={ref}
      isMeasured={props.isMeasured}
      isSelected={props.isSelected}
      onSelect={props.onSelect}
    >
      {props.textQuery ? (
        <HighlightCellText text={props.value} query={props.textQuery} />
      ) : (
        props.value
      )}
    </CellShell>
  );
});
CategoricalCell.displayName = 'CategoricalCell';

function CategoricalColumn(options: OptionsT): CategoricalColumnT {
  return {
    kind: COLUMNS.CATEGORICAL,
    title: options.title,
    sortable: options.sortable === undefined ? true : options.sortable,
    filterable: options.filterable === undefined ? true : options.filterable,
    renderCell: CategoricalCell,
    renderFilter: CategoricalFilter,
    buildFilter: function(params) {
      return function(data) {
        const included = params.selection.has(data);
        return params.exclude ? !included : included;
      };
    },
    sortFn: function(a, b) {
      return a.localeCompare(b);
    },
    minWidth: options.minWidth,
  };
}

export default CategoricalColumn;
