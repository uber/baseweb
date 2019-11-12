/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {useStyletron} from '../styles/index.js';

import CellShell from './cell-shell.js';
import {COLUMNS} from './constants.js';
import {HighlightCellText} from './text-search.js';
import type {ColumnT} from './types.js';

type OptionsT = {|
  title: string,
  sortable?: boolean,
  maxWidth?: number,
  minWidth?: number,
  lineClamp?: number,
|};

type FilterParametersT = {|
  description: string,
  exclude: boolean,
|};

type StringColumnT = ColumnT<string, FilterParametersT>;

function StringFilter(props) {
  return <div>not implemented for string column</div>;
}

const StringCell = React.forwardRef<_, HTMLDivElement>((props, ref) => {
  const [css] = useStyletron();
  return (
    <CellShell
      ref={ref}
      isMeasured={props.isMeasured}
      isSelected={props.isSelected}
      onSelect={props.onSelect}
    >
      <div
        className={css({
          display: '-webkit-box',
          WebkitLineClamp: props.lineClamp || 1,
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
    </CellShell>
  );
});
StringCell.displayName = 'StringCell';

function StringColumn(options: OptionsT): StringColumnT {
  return {
    kind: COLUMNS.STRING,
    title: options.title,
    sortable: options.sortable === undefined ? true : options.sortable,
    filterable: false,
    renderCell: React.forwardRef((props, ref) => {
      return <StringCell {...props} ref={ref} lineClamp={options.lineClamp} />;
    }),
    renderFilter: StringFilter,
    buildFilter: function(params) {
      return function(data) {
        return true;
      };
    },
    sortFn: function(a, b) {
      return a.localeCompare(b);
    },
    maxWidth: options.maxWidth,
    minWidth: options.minWidth,
  };
}

export default StringColumn;
