/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button, SIZE as BUTTON_SIZE} from '../button/index.js';
import {Checkbox, StyledLabel, STYLE_TYPE} from '../checkbox/index.js';
import Search from '../icon/search.js';
import {Input, SIZE as INPUT_SIZE} from '../input/index.js';
import {useStyletron, withStyle} from '../styles/index.js';
import {Label3} from '../typography/index.js';

import {COLUMNS} from './constants.js';
import type {ColumnT} from './types.js';

type CellPropsT = {
  isMeasured?: boolean,
  value: string,
};

type OptionsT = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
|};

type FilterParametersT = {|
  selection: Set<string>,
  exclude: boolean,
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

function matchesQuery(category, query) {
  return category.toLowerCase().includes(query.toLowerCase());
}

function HighlightCheckboxLabel(props) {
  const {children, ...restProps} = props;

  if (!props.query) {
    return <StyledLabel {...restProps}>{children}</StyledLabel>;
  }

  return children.split(new RegExp(`(${props.query})`, 'i')).map((el, i) => {
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
  setFilter: (FilterParametersT, string) => void,
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
    <div
      className={useCss({
        backgroundColor: theme.colors.white,
        paddingTop: theme.sizing.scale600,
        paddingRight: theme.sizing.scale600,
        paddingBottom: theme.sizing.scale600,
        paddingLeft: theme.sizing.scale600,
        width: '320px',
      })}
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
          marginBottom: theme.sizing.scale600,
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
      <div
        className={useCss({
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
        })}
      >
        <Checkbox
          checked={exclude}
          onChange={() => setExclude(!exclude)}
          checkmarkType={STYLE_TYPE.toggle}
          labelPlacement="right"
        >
          Exclude
        </Checkbox>
        <Button
          size={BUTTON_SIZE.compact}
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

const CategoricalCell = React.forwardRef<CellPropsT, HTMLDivElement>(
  (props, ref) => {
    const [useCss, theme] = useStyletron();
    return (
      <div
        ref={ref}
        className={useCss({
          ...theme.typography.font200,
          display: props.isMeasured ? 'inline-block' : null,
          paddingLeft: theme.sizing.scale600,
          paddingRight: theme.sizing.scale600,
        })}
      >
        {props.value}
      </div>
    );
  },
);
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
  };
}

export default CategoricalColumn;
