/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulSelect} from '../index.js';

export const name = 'select-states';

export const component = () => (
  <>
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
      overrides={{ValueContainer: {props: {'data-id': 'selected'}}}}
      labelKey="id"
      valueKey="color"
    />
    <br />
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
      overrides={{ValueContainer: {props: {'data-id': 'selected'}}}}
      labelKey="id"
      valueKey="color"
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus
    />
    <br />
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
      overrides={{ValueContainer: {props: {'data-id': 'selected'}}}}
      labelKey="id"
      valueKey="color"
      positive
    />
    <br />
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
      overrides={{ValueContainer: {props: {'data-id': 'selected'}}}}
      labelKey="id"
      valueKey="color"
      error
    />
    <br />
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
      overrides={{ValueContainer: {props: {'data-id': 'selected'}}}}
      labelKey="id"
      valueKey="color"
      disabled
    />
  </>
);
