/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {Button} from '../../button/index.js';
import {StatefulSelect} from '../index.js';

export const name = 'select-sizes';

export const component = () => (
  <>
    <div style={{display: 'flex', justifyContent: 'middle'}}>
      <div style={{flexGrow: '1', marginRight: '8px'}}>
        <StatefulSelect
          aria-label="Select a color"
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
          size="compact"
        />
      </div>
      <Button size="compact">Click me</Button>
    </div>
    <br />
    <div style={{display: 'flex', justifyContent: 'middle'}}>
      <div style={{flexGrow: '1', marginRight: '8px'}}>
        <StatefulSelect
          aria-label="Select a color"
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
          size="default"
        />
      </div>
      <Button size="default">Click me</Button>
    </div>
    <br />
    <div style={{display: 'flex', justifyContent: 'middle'}}>
      <div style={{flexGrow: '1', marginRight: '8px'}}>
        <StatefulSelect
          aria-label="Select a color"
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
          size="large"
        />
      </div>
      <Button size="large">Click me</Button>
    </div>
  </>
);
