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

export default {
  [tests.SELECT]: () => {
    return (
      <StatefulSelect
        options={COLORS}
        getOptionLabel={option => option.id}
        maxDropdownHeight="300px"
        placeholder="Choose a color"
        onChange={onChange}
      />
    );
  },
  [tests.SELECT_DISABLED_OPTIONS]: () => {
    return (
      <StatefulSelect
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
        placeholder="Choose a color"
        onChange={onChange}
      />
    );
  },
  [tests.MULTI_SELECT]: () => {
    return (
      <StatefulSelect
        placeholder="Select options"
        options={COLORS}
        getOptionLabel={option => option.id}
        multi
        // value={[COLORS[0], COLORS[1], COLORS[3]]}
        initialState={{
          value: [COLORS[0], COLORS[1], COLORS[3]],
        }}
        onChange={onChange}
        valueKey={'color'}
        labelKey={'id'}
        onChange={args => {
          console.log('value: ', args);
        }}
      />
    );
  },
  [tests.MULTI_SELECT_SEARCH]: () => {
    return (
      <StatefulSelect
        type={TYPE.search}
        options={COLORS}
        getOptionLabel={option => option.id}
        rows={8}
        multi
        filterable
        placeholder="Start searching"
        onInputChange={onTextInputChange}
        onChange={onChange}
        valueKey={'color'}
        labelKey={'id'}
        onChange={(...args) => {
          console.log('value: ', ...args);
        }}
      />
    );
  },
  [tests.MULTI_SELECT_CUSTOM_LABELS]: () => {
    function CustomOptionLabel({
      option,
      showColor = false,
    }: {
      option: {id: string, color: string},
      showColor?: boolean,
    }) {
      return (
        <div style={{display: 'inline-flex', alignItems: 'center'}}>
          <div
            style={{
              borderRadius: '100%',
              width: '10px',
              height: '10px',
              backgroundColor: option.color,
              marginRight: '5px',
            }}
          />
          <div>
            {option.id}
            {showColor && ` (${option.color})`}
          </div>
        </div>
      );
    }

    return (
      <StatefulSelect
        options={COLORS}
        getOptionLabel={option => (
          <CustomOptionLabel option={option} showColor />
        )}
        getSelectedOptionLabel={option => <CustomOptionLabel option={option} />}
        initialState={{
          value: [COLORS[2]],
        }}
        rows={8}
        multiple
        onInputChange={onTextInputChange}
        onChange={onChange}
      />
    );
  },
};
