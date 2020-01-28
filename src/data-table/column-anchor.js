/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StyledLink} from '../link/index.js';
import {useStyletron} from '../styles/index.js';

import CellShell from './cell-shell.js';
import {COLUMNS} from './constants.js';
import type {ColumnT} from './types.js';

type ValueT = {content: string, href: string};

type OptionsT = {|
  elementAs?: React.Node,
  // eslint-disable-next-line flowtype/no-weak-types
  mapDataToValue: (data: any) => ValueT,
  maxWidth?: number,
  minWidth?: number,
  sortable?: boolean,
  title: string,
|};

type FilterParametersT = {};

type AnchorColumnT = ColumnT<ValueT, FilterParametersT>;

function StringFilter(props) {
  return <div>not implemented for anchor column</div>;
}

const AnchorCell = React.forwardRef<_, HTMLDivElement>((props, ref) => {
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
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        })}
      >
        <StyledLink $as={props.elementAs} href={props.value.href}>
          {props.value.content}
        </StyledLink>
      </div>
    </CellShell>
  );
});
AnchorCell.displayName = 'AnchorCell';

function AnchorColumn(options: OptionsT): AnchorColumnT {
  return {
    kind: COLUMNS.ANCHOR,
    buildFilter: function(params) {
      return function(data) {
        return true;
      };
    },
    filterable: false,
    mapDataToValue: options.mapDataToValue,
    maxWidth: options.maxWidth,
    minWidth: options.minWidth,
    renderCell: React.forwardRef((props, ref) => {
      return <AnchorCell {...props} ref={ref} elementAs={options.elementAs} />;
    }),
    renderFilter: StringFilter,
    sortable: options.sortable === undefined ? true : options.sortable,
    sortFn: function(a, b) {
      return a.content.localeCompare(b.content);
    },
    title: options.title,
  };
}

export default AnchorColumn;
