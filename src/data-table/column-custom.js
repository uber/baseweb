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

// I could not re-use the ColumnT type to build this.. tried to spread the ColumnT
// and define renderFilter, etc. to optional, but required status was maintained.
type OptionsT<ValueT, FilterParamsT> = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  renderCell: React.ComponentType<{value: ValueT, isMeasured?: boolean}>,
  renderFilter?: React.ComponentType<{|
    data: ValueT[],
    close: () => void,
    setFilter: (filterParams: FilterParamsT, description: string) => void,
  |}>,
  buildFilter?: FilterParamsT => ValueT => boolean,
  sortFn?: (ValueT, ValueT) => number,
|};

function CustomFilter(props) {
  return <div>not implemented for custom column</div>;
}

const CustomCell = React.forwardRef<
  {isMeasured?: boolean, children: React.Node},
  HTMLDivElement,
>((props, ref) => {
  const [useCss, theme] = useStyletron();
  return (
    <div
      ref={ref}
      className={useCss({
        display: props.isMeasured ? 'inline-block' : null,
        paddingLeft: theme.sizing.scale600,
        paddingRight: theme.sizing.scale600,
      })}
    >
      {props.children}
    </div>
  );
});

function CustomColumn<ValueT, FilterParamsT>(
  options: OptionsT<ValueT, FilterParamsT>,
): ColumnT<ValueT, FilterParamsT> {
  return {
    kind: COLUMNS.CUSTOM,
    title: options.title,
    sortable: options.sortable,
    filterable: options.filterable,
    renderCell: props => {
      const ProvidedCell = options.renderCell;
      return (
        <CustomCell {...props}>
          <ProvidedCell value={props.value} />
        </CustomCell>
      );
    },
    renderFilter: options.renderFilter || (() => null),
    buildFilter: options.buildFilter || (() => () => true),
    sortFn: options.sortFn || (() => 0),
  };
}

export default CustomColumn;
