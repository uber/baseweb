/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {Select} from '../index.js';
// eslint-disable-next-line import/extensions
import Screener, {Steps} from 'screener-storybook/src/screener';

export const name = 'select-highlight';
export const component = () => {
  const [value, setValue] = React.useState([{id: 'Beige', color: '#F5F5DC'}]);
  const input = 'div[data-baseweb=select] > div:nth-child(1)';
  return (
    <Screener
      steps={new Steps()
        .wait(input)
        .click(input)
        .snapshot('Select - highlight selected option')
        .end()}
    >
      <Select
        options={[
          {id: 'AliceBlue', color: '#F0F8FF'},
          {id: 'AntiqueWhite', color: '#FAEBD7'},
          {id: 'Aqua', color: '#00FFFF'},
          {id: 'Aquamarine', color: '#7FFFD4'},
          {id: 'Azure', color: '#F0FFFF'},
          {id: 'Beige', color: '#F5F5DC'},
        ]}
        labelKey="id"
        valueKey="color"
        onChange={({value}) => setValue(value)}
        value={value}
      />
    </Screener>
  );
};
