/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {Select as DefaultSelect, TYPE} from '../select';
import {StyledListItem} from '../menu';
import {SelectInput, SelectTag} from './styled-components';
import type {SelectMenuItemT} from './types';

const noop = () => {};

const getOptionLabel = item => item.label;

// This is used internally only, not meant to be exported

export default function Select({
  currentPage,
  options,
  ...restProps
}: {
  currentPage: number,
  options: Array<SelectMenuItemT>,
}) {
  return (
    <DefaultSelect
      // Required to re-initialize Select component so that selectedOptions work
      key={currentPage}
      options={options}
      selectedOptions={[options[currentPage - 1]]}
      rows={5}
      type={TYPE.select}
      getOptionLabel={getOptionLabel}
      overrides={{
        Input: SelectInput,
        Tag: SelectTag,
        DropDownItem: StyledListItem,
      }}
      // None of these props should be required
      filterOption={() => false}
      filterable={false}
      multiple={false}
      error={false}
      textValue={''}
      onBlur={noop}
      onFocus={noop}
      onMouseEnter={noop}
      onMouseLeave={noop}
      onMouseDown={noop}
      onMouseUp={noop}
      {...restProps}
    />
  );
}
