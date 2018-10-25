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

const emptyOption = {id: '', label: ''};

export const suite = 'Select Test Suite';
import tests from './examples-list';

const onTextInputChange = (e: SyntheticEvent<HTMLInputElement>) => {
  //$FlowFixMe
  console.log('Text has changed to:' + e.target.value);
};

const onChange = ({event, type, option = emptyOption}) => {
  if (type === STATE_CHANGE_TYPE.select) {
    // eslint-disable-next-line no-console
    console.log('Selected option:' + option.id);
  }
};

const onChangeMultiSelect = ({
  event,
  type,
  option = emptyOption,
  selectedOptions,
}) => {
  switch (type) {
    case STATE_CHANGE_TYPE.select:
      // eslint-disable-next-line no-console
      console.log('Selected id:' + option.id);
      break;
    case STATE_CHANGE_TYPE.unselect:
      // eslint-disable-next-line no-console
      console.log('Unselected id:' + option.id);
      break;
  }
};

export default {
  [tests.SELECT]: () => {
    return (
      <StatefulSelect
        options={COLORS}
        getOptionLabel={option => option.id}
        rows={10}
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
            label: 'Red',
          },
          {
            id: 'orange',
            label: 'Orange',
            disabled: true,
          },
          {
            id: 'green',
            label: 'Green',
          },
          {
            id: 'blue',
            label: 'Blue',
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
        options={COLORS}
        getOptionLabel={option => option.id}
        multiple
        initialState={{
          selectedOptions: [COLORS[1], COLORS[3]],
        }}
        onChange={onChange}
      />
    );
  },
  [tests.MULTI_SELECT_SEARCH]: () => {
    return (
      <StatefulSelect
        type={TYPE.search}
        options={() =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve(COLORS);
            }, 1000);
          })
        }
        getOptionLabel={option => option.id}
        rows={8}
        multiple
        filterable
        placeholder="Start searching"
        onTextInputChange={onTextInputChange}
        onChange={onChangeMultiSelect}
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
          selectedOptions: [COLORS[2]],
        }}
        rows={8}
        multiple
        onTextInputChange={onTextInputChange}
        onChange={onChangeMultiSelect}
      />
    );
  },
};
