/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {useStyletron} from '../styles/index.js';

import {COLUMNS} from './constants.js';
import type {ColumnT} from './types.js';

type StringCellPropsT = {
  isMeasured?: boolean,
  value: string,
};

export type OptionsT = {|
  title: string,
  sortable?: boolean,
|};

type FilterParametersT = {|
  exclude: boolean,
|};

type StringColumnT = ColumnT<string, FilterParametersT>;

function StringFilter(props) {
  return <div>not implemented for string column</div>;
}

const StringCell = React.forwardRef<StringCellPropsT, HTMLDivElement>(
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

function StringColumn(options: OptionsT): StringColumnT {
  return {
    kind: COLUMNS.STRING,
    title: options.title,
    sortable: options.sortable === undefined ? true : options.sortable,
    filterable: false,
    renderCell: StringCell,
    renderFilter: StringFilter,
    buildFilter: function(params) {
      return function(data) {
        return true;
      };
    },
    sortFn: function(a, b) {
      return a.localeCompare(b);
    },
  };
}

export default StringColumn;
