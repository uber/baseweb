/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button} from '../button/index.js';
import {Checkbox, STYLE_TYPE} from '../checkbox/index.js';
import {useStyletron} from '../styles/index.js';

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

function CategoricalFilter(props) {
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
