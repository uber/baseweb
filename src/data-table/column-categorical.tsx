/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Button, SIZE, KIND } from '../button';
import { ButtonGroup } from '../button-group';
import { Checkbox, StyledLabel } from '../checkbox';
import Search from '../icon/search';
import { Input, SIZE as INPUT_SIZE } from '../input';
import { useStyletron, withStyle } from '../styles';
import { LabelSmall } from '../typography';

import Column from './column';
import { COLUMNS } from './constants';
import type { ColumnOptions, SharedColumnOptions } from './types';
import { LocaleContext } from '../locale';
import FilterShell from './filter-shell';
import { matchesQuery, splitByQuery, HighlightCellText } from './text-search';
import type { StyleObject } from 'styletron-standard';

type Options = {} & SharedColumnOptions<string>;

type FilterParameters = {
  description: string;
  exclude: boolean;
  selection: Set<string>;
};

type CategoricalColumn = ColumnOptions<string, FilterParameters>;

function InputBefore() {
  const [css, theme] = useStyletron();
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
}

function FilterQuickControls(props: { onSelectAll: () => void; onClearSelection: () => void }) {
  const locale = React.useContext(LocaleContext);

  return (
    <ButtonGroup size={SIZE.mini} kind={KIND.tertiary}>
      <Button type="button" onClick={props.onSelectAll}>
        {locale.datatable.categoricalFilterSelectAll}
      </Button>
      <Button type="button" onClick={props.onClearSelection}>
        {locale.datatable.categoricalFilterSelectClear}
      </Button>
    </ButtonGroup>
  );
}

const StyledHighlightLabel = withStyle<
  typeof StyledLabel,
  { $isActive: boolean; $isFirst: boolean }
>(StyledLabel, (props) => {
  const style: StyleObject = {
    whiteSpace: 'pre',
    color: props.$isActive
      ? props.$theme.colors.contentPrimary
      : props.$theme.colors.contentSecondary,
  };

  if (!props.$isFirst) {
    // @ts-ignore
    style.paddingLeft = null;
  }

  return style;
});

// @ts-ignore
function HighlightCheckboxLabel(props) {
  const { children, ...restProps } = props;

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
  data: string[];
  close: () => void;
  setFilter: (a: FilterParameters) => void;
  filterParams?: FilterParameters;
};

export function CategoricalFilter(props: CategoricalFilterProps) {
  const [css, theme] = useStyletron();
  const locale = React.useContext(LocaleContext);
  const [selection, setSelection] = React.useState<Set<string>>(
    props.filterParams ? props.filterParams.selection : new Set()
  );
  const [exclude, setExclude] = React.useState(
    props.filterParams ? props.filterParams.exclude : false
  );
  const [query, setQuery] = React.useState('');
  const categories: Set<string> = React.useMemo(() => {
    return props.data.reduce((set, category) => set.add(category), new Set<string>());
  }, [props.data]);

  const checkboxStyles = css({ marginBottom: theme.sizing.scale200 });

  const showQuery = Boolean(categories.size >= 10);
  const filteredCategories = Array.from(categories, (c) => c).filter((c) => matchesQuery(c, query));

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
          aria-label={locale.datatable.categoricalFilterSearchLabel}
          size={INPUT_SIZE.compact}
          overrides={{ Before: InputBefore }}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          clearable
        />
      )}

      {!query && (
        <div
          style={{
            // @ts-ignore
            marginTop: showQuery ? theme.sizing.scale600 : null,
          }}
        >
          <FilterQuickControls
            onSelectAll={() => {
              categories.forEach((c) => selection.add(c));
              setSelection(new Set(selection));
            }}
            onClearSelection={() => {
              setSelection(new Set());
            }}
          />
        </div>
      )}

      <div
        className={css({
          maxHeight: '256px',
          overflowY: 'auto',
          marginTop: theme.sizing.scale600,
        })}
      >
        {!filteredCategories.length && (
          <LabelSmall>{locale.datatable.categoricalFilterEmpty}</LabelSmall>
        )}

        {Boolean(filteredCategories.length) &&
          filteredCategories.map((category, i) => (
            <div className={checkboxStyles} key={i}>
              {/* @ts-ignore */}
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
                  // @ts-ignore
                  Label: { component: HighlightCheckboxLabel, props: { query } },
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

// @ts-ignore
function CategoricalCell(props) {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      })}
    >
      {props.textQuery ? (
        <HighlightCellText text={props.value} query={props.textQuery} />
      ) : (
        props.value
      )}
    </div>
  );
}

function CategoricalColumn(options: Options): CategoricalColumn {
  return Column({
    kind: COLUMNS.CATEGORICAL,
    buildFilter: function (params) {
      return function (data) {
        const included = params.selection.has(data);
        return params.exclude ? !included : included;
      };
    },
    cellBlockAlign: options.cellBlockAlign,
    fillWidth: options.fillWidth,
    filterable: options.filterable === undefined ? true : options.filterable,
    mapDataToValue: options.mapDataToValue,
    maxWidth: options.maxWidth,
    minWidth: options.minWidth,
    renderCell: CategoricalCell,
    renderFilter: CategoricalFilter,
    sortable: options.sortable === undefined ? true : options.sortable,
    sortFn: function (a, b) {
      return a.localeCompare(b);
    },
    textQueryFilter: function (textQuery, data) {
      return data.toLowerCase().includes(textQuery.toLowerCase());
    },
    title: options.title,
  });
}

export default CategoricalColumn;
