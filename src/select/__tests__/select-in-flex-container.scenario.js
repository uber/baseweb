/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {styled} from '../../styles/index.js';
import {Block} from '../../block/index.js';
import {StatefulSelect, SingleSelect, MultiSelect} from '../index.js';

export const name = 'select-in-flex-container';

const options = [
  {id: 'AliceBlue', color: '#F0F8FF'},
  {id: 'AntiqueWhite', color: '#FAEBD7'},
  {id: 'Aqua', color: '#00FFFF'},
  {id: 'Aquamarine', color: '#7FFFD4'},
  {id: 'Azure', color: '#F0FFFF'},
  {id: 'Beige', color: '#F5F5DC'},
];

export const component = () => {
  const Inner = styled('div', () => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  return (
    <Block display="grid" gridTemplateColumns="repeat(3,1fr)">
      <Inner>
        <StatefulSelect
          aria-label="Select a color"
          options={options}
          overrides={{ValueContainer: {props: {'data-id': 'selected'}}}}
          labelKey="id"
          valueKey="color"
        />
      </Inner>
      <Inner>
        <SingleSelect
          aria-label="Select a color"
          options={options}
          labelKey="id"
          valueKey="color"
          value={[{color: '#00FFFF'}]}
        />
      </Inner>
      <Inner>
        <MultiSelect
          aria-label="Select a color"
          options={options}
          labelKey="id"
          valueKey="color"
          value={[{color: '#00FFFF'}]}
        />
      </Inner>
    </Block>
  );
};
