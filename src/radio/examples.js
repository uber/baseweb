/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

/* eslint-disable react/display-name*/
import * as React from 'react';
import {withStyle} from 'styletron-react';
import {StyledLabel, StatefulRadioGroup, Radio} from './index.js';

export const suite = 'Radio Group Test Suite';
import examples from './examples-list.js';

export default {
  [examples.SIMPLE_EXAMPLE]: () => {
    return (
      <StatefulRadioGroup initialState={{value: '2'}}>
        <Radio value="1">First</Radio>
        <Radio value="2">Second</Radio>
        <Radio value="3">Third</Radio>
      </StatefulRadioGroup>
    );
  },
  [examples.HORIZONTAL_ALIGN]: () => {
    return (
      <StatefulRadioGroup align="horizontal" initialState={{value: '3'}}>
        <Radio value="1">First</Radio>
        <Radio value="2">Second</Radio>
        <Radio value="3">Third</Radio>
      </StatefulRadioGroup>
    );
  },
  [examples.STYLES_OVERRIDES]: () => {
    const overrides = {
      RadioMarkInner: {
        style: {backgroundColor: 'red'},
      },
      Label: withStyle(StyledLabel, () => {
        return {
          color: 'orange',
          fontSize: '25px',
        };
      }),
    };
    return (
      <StatefulRadioGroup
        overrides={{RadioGroupRoot: {style: {border: 'solid pink'}}}}
        initialState={{value: '3'}}
      >
        <Radio overrides={overrides} value="1">
          First
        </Radio>
        <Radio overrides={overrides} value="2">
          Second
        </Radio>
        <Radio overrides={overrides} value="3">
          Third
        </Radio>
      </StatefulRadioGroup>
    );
  },
  [examples.WITH_ERROR]: () => {
    return (
      <StatefulRadioGroup isError={true} initialState={{value: '3'}}>
        <Radio value="1">First</Radio>
        <Radio value="2">Second</Radio>
        <Radio value="3">Third</Radio>
      </StatefulRadioGroup>
    );
  },
};
