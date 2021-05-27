/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulSelect} from '../index.js';
import renderInWebComponent from '../../helpers/renderInWebComponent.js';

const options = [
  {id: 'AliceBlue', color: '#F0F8FF'},
  {id: 'AntiqueWhite', color: '#FAEBD7'},
  {id: 'Aqua', color: '#00FFFF'},
  {id: 'Aquamarine', color: '#7FFFD4'},
  {id: 'Azure', color: '#F0FFFF'},
  {id: 'Beige', color: '#F5F5DC'},
];

renderInWebComponent('select-scenario', () => {
  return (
    <StatefulSelect
      aria-label="Select a color"
      options={options}
      overrides={{ValueContainer: {props: {'data-id': 'selected'}}}}
      labelKey="id"
      valueKey="color"
    />
  );
});

export default function Scenario() {
  return (
    <>
      <div data-e2e="outside-select">
        Element outside of the select to click on
      </div>
      <select-scenario></select-scenario>
    </>
  );
}
