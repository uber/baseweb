/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import { StyledLink } from '../link/index.js';
import { useStyletron } from '../styles/index.js';

import Column from './column.js';
import { COLUMNS } from './constants.js';
import type { ColumnT, SharedColumnOptionsT } from './types.js';

type ValueT = { content: string, href: string };

type ReplacementElementAs = React.AbstractComponent<{|
  href: string,
  children: string,
|}>;

type OptionsT = {|
  ...SharedColumnOptionsT<ValueT>,
  elementAs?: ReplacementElementAs | string,
|};

type FilterParametersT = {};

type AnchorColumnT = ColumnT<ValueT, FilterParametersT>;

function AnchorFilter(props) {
  return <div>not implemented for anchor column</div>;
}

function AnchorCell(props) {
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
      <StyledLink $as={props.elementAs} href={props.value.href}>
        {props.value.content}
      </StyledLink>
    </div>
  );
}

function AnchorColumn(options: OptionsT): AnchorColumnT {
  return Column({
    kind: COLUMNS.ANCHOR,
    buildFilter: function (params) {
      return function (data) {
        return true;
      };
    },
    cellBlockAlign: options.cellBlockAlign,
    fillWidth: options.fillWidth,
    filterable: false,
    mapDataToValue: options.mapDataToValue,
    maxWidth: options.maxWidth,
    minWidth: options.minWidth,
    renderCell: function RenderAnchorCell(props) {
      return <AnchorCell {...props} elementAs={options.elementAs} />;
    },
    renderFilter: AnchorFilter,
    sortable: options.sortable === undefined ? true : options.sortable,
    sortFn: function (a, b) {
      return a.content.localeCompare(b.content);
    },
    title: options.title,
  });
}

export default AnchorColumn;
