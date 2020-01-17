/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {format} from 'date-fns';

import {Button, SIZE} from '../button/index.js';
import {ButtonGroup, MODE} from '../button-group/index.js';
import {Input, SIZE as INPUT_SIZE} from '../input/index.js';
import {useStyletron} from '../styles/index.js';
import {Paragraph4} from '../typography/index.js';

import CellShell from './cell-shell.js';
import {COLUMNS} from './constants.js';
import FilterShell from './filter-shell.js';
import type {ColumnT} from './types.js';

type OptionsT = {|
  filterable?: boolean,
  formatString?: string,
  // eslint-disable-next-line flowtype/no-weak-types
  mapDataToValue: (data: any) => Date,
  maxWidth?: number,
  minWidth?: number,
  sortable?: boolean,
  title: string,
|};

type FilterParametersT = {|
  // comparisons: Array<{|
  //   value: number,
  //   operation: NumericalOperations,
  // |}>,
  description: string,
  exclude: boolean,
|};

type DatetimeColumnT = ColumnT<Date, FilterParametersT>;

function DatetimeFilter(props) {
  const [css, theme] = useStyletron();
  const [exclude, setExclude] = React.useState(props.filterParams.exclude);
  const [comparatorIndex, setComparatorIndex] = React.useState(0);

  const isRange = comparatorIndex === 0;

  return (
    <FilterShell
      exclude={exclude}
      onExcludeChange={() => setExclude(!exclude)}
      onApply={() => {
        // setFilter({});
        props.close();
      }}
    >
      <ButtonGroup
        size={SIZE.compact}
        mode={MODE.radio}
        selected={comparatorIndex}
        onClick={(_, index) => console.log(index)}
        overrides={{
          Root: {
            style: ({$theme}) => ({marginBottom: $theme.sizing.scale300}),
          },
        }}
      >
        <Button
          type="button"
          overrides={{BaseButton: {style: {width: '100%'}}}}
        >
          Range
        </Button>
        <Button
          type="button"
          overrides={{BaseButton: {style: {width: '100%'}}}}
        >
          Categorical
        </Button>
      </ButtonGroup>

      {isRange ? (
        <div>
          <p>range</p>
        </div>
      ) : (
        <div>
          <p>categorical</p>
        </div>
      )}
    </FilterShell>
  );
}

const DatetimeCell = React.forwardRef<_, HTMLDivElement>((props, ref) => {
  const [css, theme] = useStyletron();

  return (
    <CellShell
      ref={ref}
      isMeasured={props.isMeasured}
      isSelected={props.isSelected}
      onSelect={props.onSelect}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'flex-end',
          fontFamily: `"Lucida Console", Monaco, monospace`,
          width: '100%',
        })}
      >
        {format(props.value, props.formatString)}
      </div>
    </CellShell>
  );
});
DatetimeCell.displayName = 'DatetimeCell';

const defaultOptions = {
  title: '',
  sortable: true,
  filterable: true,
  formatString: 'LL-MM-yyyy HH:mm ss:SS',
};

function DatetimeColumn(options: OptionsT): DatetimeColumnT {
  const normalizedOptions = {
    ...defaultOptions,
    ...options,
  };

  return {
    kind: COLUMNS.NUMERICAL,
    buildFilter: function(params) {
      return function(data) {
        const included = true;
        return params.exclude ? !included : included;
      };
    },
    filterable: normalizedOptions.filterable,
    mapDataToValue: options.mapDataToValue,
    maxWidth: options.maxWidth,
    minWidth: options.minWidth,
    renderCell: React.forwardRef((props, ref) => {
      return (
        <DatetimeCell
          ref={ref}
          isMeasured={props.isMeasured}
          isSelected={props.isSelected}
          onSelect={props.onSelect}
          value={props.value}
          formatString={normalizedOptions.formatString}
        />
      );
    }),
    renderFilter: function RenderDatetimeFilter(props) {
      return <DatetimeFilter {...props} options={normalizedOptions} />;
    },
    sortable: normalizedOptions.sortable,
    // initial sort should display largest values first
    sortFn: function(a, b) {
      return b - a;
    },
    title: options.title,
  };
}

export default DatetimeColumn;
