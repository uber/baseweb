/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable react/display-name*/
/* eslint-disable no-console*/

import * as React from 'react';
import {StatefulSelect, TYPE} from './index';
import {STATE_CHANGE_TYPE} from './constants';
import {styled} from '../styles/index';
import {SIZE} from '../input';
import COLORS from './examples-colors';
import tests from './examples-list';

export const suite = 'Select Test Suite';

const onTextInputChange = (e: SyntheticEvent<HTMLInputElement>) => {
  // eslint-disable-next-line no-console
  console.log('Text has changed to:' + e.target.value);
};

const onChange = (...args) => {
  // eslint-disable-next-line no-console
  console.log('Selected option: ', ...args);
};

const CustomValueWrapper = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
});
const CustomValueColor = styled('span', ({$color}) => ({
  display: 'inline-block',
  borderRadius: '50%',
  width: '10px',
  height: '10px',
  backgroundColor: $color,
  marginRight: '5px',
}));
function CustomOptionLabel({
  option,
  showRawColor = false,
}: {
  option: {id: string, color: string},
  showColor?: boolean,
}) {
  return (
    <CustomValueWrapper>
      {option.color ? <CustomValueColor $color={option.color} /> : null}
      {option.id}
      {showRawColor && ` (${option.color})`}
    </CustomValueWrapper>
  );
}

const options = {
  options: COLORS,
  labelKey: 'id',
  valueKey: 'color',
  onChange: onChange,
  placeholder: 'Choose a color',
};

export default {
  [tests.SELECT_NO_SEARCH]: () => {
    return (
      <StatefulSelect
        {...options}
        options={[
          {
            id: 'red',
            color: 'Red',
          },
          {
            id: 'orange',
            color: 'Orange',
            disabled: true,
          },
          {
            id: 'green',
            color: 'Green',
          },
          {
            id: 'blue',
            color: 'Blue',
            disabled: true,
          },
        ]}
        searchable={false}
      />
    );
  },
  [tests.SELECT]: () => {
    return <StatefulSelect {...options} maxDropdownHeight="300px" />;
  },
  [tests.SELECT_MULTI]: () => {
    return (
      <StatefulSelect
        {...options}
        initialState={{
          value: [{...COLORS[0], clearableValue: false}, COLORS[1], COLORS[3]],
        }}
        clearable={false}
        multi
      />
    );
  },
  [tests.SINGLE_SELECT_SEARCH]: () => {
    return (
      <StatefulSelect
        {...options}
        placeholder="Start searching"
        type={TYPE.search}
        onInputChange={onTextInputChange}
      />
    );
  },
  [tests.MULTI_SELECT_SEARCH]: () => {
    return (
      <StatefulSelect
        {...options}
        placeholder="Start searching"
        type={TYPE.search}
        multi
        onInputChange={onTextInputChange}
      />
    );
  },
  [tests.MULTI_SELECT_CUSTOM_LABELS]: () => {
    return (
      <StatefulSelect
        {...options}
        initialState={{
          value: [COLORS[2]],
        }}
        type={TYPE.search}
        multi
        onInputChange={onTextInputChange}
        getOptionLabel={({option}) => (
          <CustomOptionLabel option={option} showRawColor />
        )}
        getValueLabel={({option}) => <CustomOptionLabel option={option} />}
      />
    );
  },
  [tests.SELECT_STATE]: () => {
    return (
      <React.Fragment>
        <StatefulSelect
          {...options}
          placeholder="Autofocused compact search field"
          size={SIZE.compact}
          autoFocus
          type={TYPE.search}
        />
        <br />
        <StatefulSelect
          {...options}
          placeholder="Compact select control"
          searchable={false}
          size={SIZE.compact}
        />
        <br />
        <StatefulSelect
          {...options}
          placeholder="Compact multi select search field"
          size={SIZE.compact}
          multi
          type={TYPE.search}
        />
        <br />
        <StatefulSelect
          {...options}
          placeholder="Search with an error state"
          size={SIZE.compact}
          error
          multi
          type={TYPE.search}
        />
        <br />
        <StatefulSelect
          {...options}
          placeholder="Select with an error state"
          size={SIZE.compact}
          error
        />
        <br />
        <StatefulSelect
          {...options}
          placeholder="Disabled search"
          initialState={{
            value: [COLORS[2]],
          }}
          size={SIZE.compact}
          disabled
          type={TYPE.search}
        />
        <br />
        <StatefulSelect
          {...options}
          placeholder="Disabled empty select"
          size={SIZE.compact}
          disabled
        />
        <br />
        <StatefulSelect
          {...options}
          placeholder="Disabled select"
          initialState={{
            value: COLORS[2],
          }}
          size={SIZE.compact}
          disabled
        />
        <br />
        <StatefulSelect
          {...options}
          placeholder="Disabled multi select"
          initialState={{
            value: [COLORS[2]],
          }}
          size={SIZE.compact}
          disabled
          multi
        />
      </React.Fragment>
    );
  },
};
