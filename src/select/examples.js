/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {action} from '@storybook/addon-actions';
import {boolean, radios} from '@storybook/addon-knobs';
import {StatefulSelect, TYPE} from './index';
import {SIZE} from './constants';
import {styled} from '../styles/index';
import COLORS from './examples-colors';
import tests from './examples-list';

const size = (defaultValue = SIZE.default) =>
  radios('size', {default: SIZE.default, compact: SIZE.compact}, defaultValue);
const type = (defaultValue = TYPE.select) =>
  radios('type', {select: TYPE.select, search: TYPE.search}, defaultValue);
const backspaceRemoves = (defaultValue = true) =>
  boolean('backspaceRemoves', defaultValue);
const clearable = (defaultValue = true) => boolean('clearable', defaultValue);
const closeOnSelect = (defaultValue = true) =>
  boolean('closeOnSelect', defaultValue);
const deleteRemoves = (defaultValue = true) =>
  boolean('deleteRemoves', defaultValue);
const disabled = (defaultValue = false) => boolean('disabled', defaultValue);
const error = (defaultValue = false) => boolean('error', defaultValue);
const escapeClearsValue = (defaultValue = true) =>
  boolean('escapeClearsValue', defaultValue);
const filterOutSelected = (defaultValue = true) =>
  boolean('filterOutSelected', defaultValue);
const isLoading = (defaultValue = false) => boolean('isLoading', defaultValue);
const multi = (defaultValue = false) => boolean('multi', defaultValue);
const onBlurResetsInput = (defaultValue = true) =>
  boolean('onBlurResetsInput', defaultValue);
const onCloseResetsInput = (defaultValue = true) =>
  boolean('onCloseResetsInput', defaultValue);
const onSelectResetsInput = (defaultValue = true) =>
  boolean('onSelectResetsInput', defaultValue);
const openOnClick = (defaultValue = true) =>
  boolean('openOnClick', defaultValue);
const required = (defaultValue = true) => boolean('required', defaultValue);
const searchable = (defaultValue = true) => boolean('searchable', defaultValue);

const onChange = (...args) => {
  // eslint-disable-next-line no-console
  console.log(...args);
};
const onChangeAction = action('select change');

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
  showColor = false,
}: {
  // eslint-disable-next-line flowtype/no-weak-types
  option: any,
  showColor?: boolean,
}) {
  return (
    <CustomValueWrapper>
      {option.color ? <CustomValueColor $color={option.color} /> : null}
      {option.id}
      {showColor && ` (${option.color})`}
    </CustomValueWrapper>
  );
}

const options = {
  options: COLORS,
  labelKey: 'id',
  valueKey: 'color',
  onChange: onChange,
  placeholder: 'Choose a color',
  maxDropdownHeight: '300px',
};

const optionsWithDisabled = [...COLORS];
optionsWithDisabled[1] = {...optionsWithDisabled[1], disabled: true};

export default {
  [tests.SELECT]: function Story1() {
    return (
      <StatefulSelect
        {...options}
        {...{
          backspaceRemoves: backspaceRemoves(),
          clearable: clearable(),
          closeOnSelect: closeOnSelect(),
          deleteRemoves: deleteRemoves(),
          disabled: disabled(),
          error: error(),
          escapeClearsValue: escapeClearsValue(),
          filterOutSelected: filterOutSelected(),
          isLoading: isLoading(),
          multi: multi(),
          onBlurResetsInput: onBlurResetsInput(),
          onCloseResetsInput: onCloseResetsInput(),
          onSelectResetsInput: onSelectResetsInput(),
          openOnClick: openOnClick(),
          required: required(),
          searchable: searchable(),
          size: size(),
          type: type(),
        }}
        onChange={onChangeAction}
        placeholder="Check out the `KNOBS` tab to toggle some props"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={false}
      />
    );
  },
  [tests.MULTI_SELECT]: function Story2() {
    return (
      <StatefulSelect
        {...options}
        initialState={{
          value: [{...COLORS[0], clearableValue: false}, COLORS[1], COLORS[3]],
        }}
        closeOnSelect={false}
        clearable={false}
        multi
        onChange={onChange}
      />
    );
  },
  [tests.SINGLE_SELECT_SEARCH]: function Story3() {
    return (
      <StatefulSelect
        {...options}
        options={optionsWithDisabled}
        placeholder="Start searching"
        type={TYPE.search}
        onChange={onChange}
      />
    );
  },
  [tests.MULTI_SELECT_SEARCH]: function Story4() {
    return (
      <StatefulSelect
        {...options}
        placeholder="Start searching"
        type={TYPE.search}
        multi
        onChange={onChange}
      />
    );
  },
  [tests.MULTI_SELECT_CUSTOM_LABELS]: function Story5() {
    return (
      <StatefulSelect
        {...options}
        initialState={{
          value: [COLORS[2]],
        }}
        type={TYPE.search}
        multi
        onChange={onChange}
        getOptionLabel={({option}) => (
          <CustomOptionLabel option={option} showColor />
        )}
        getValueLabel={({option}) => <CustomOptionLabel option={option} />}
      />
    );
  },
};
