/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {useStyletron} from '../styles/index.js';

import Column from './column.js';
import {COLUMNS} from './constants.js';
import {HighlightCellText} from './text-search.js';
import type {ColumnT, SharedColumnOptionsT} from './types.js';

type OptionsT = {|
  ...SharedColumnOptionsT<string>,
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

function StringCell(props) {
  const [css] = useStyletron();
  return (
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
  );
}

function StringColumn(options: OptionsT): StringColumnT {
  return Column({
    kind: COLUMNS.STRING,
    cellBlockAlign: options.cellBlockAlign,
    buildFilter: function(params) {
      return function(data) {
        return true;
      };
    },
    textQueryFilter: function(textQuery, data) {
      return data.toLowerCase().includes(textQuery.toLowerCase());
    },
    filterable: false,
    mapDataToValue: options.mapDataToValue,
    maxWidth: options.maxWidth,
    minWidth: options.minWidth,
    renderCell: function RenderStringCell(props) {
      return <StringCell {...props} lineClamp={options.lineClamp} />;
    },
    renderFilter: StringFilter,
    sortable: options.sortable === undefined ? true : options.sortable,
    sortFn: function(a, b) {
      return a.localeCompare(b);
    },
    title: options.title,
  });
}

export default StringColumn;
