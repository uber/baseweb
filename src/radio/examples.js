/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

/* eslint-disable react/display-name*/
import * as React from 'react';
import {withStyle} from 'styletron-react';
import {StyledRadio, StyledLabel, StatefulRadioGroup} from './index';

export const suite = 'Radio Group Test Suite';
import examples from './examples-list';

export default {
  [examples.SIMPLE_EXAMPLE]: () => {
    return (
      <StatefulRadioGroup initialState={{value: '2'}}>
        <StyledRadio value="1">First</StyledRadio>
        <StyledRadio value="2">Second</StyledRadio>
        <StyledRadio value="3">Third</StyledRadio>
      </StatefulRadioGroup>
    );
  },
  [examples.HORIZONTAL_ALIGN]: () => {
    return (
      <StatefulRadioGroup align="horizontal" initialState={{value: '3'}}>
        <StyledRadio value="1">First</StyledRadio>
        <StyledRadio value="2">Second</StyledRadio>
        <StyledRadio value="3">Third</StyledRadio>
      </StatefulRadioGroup>
    );
  },
  [examples.COMPONENTS_OVERRIDES]: () => {
    const overrides = {
      Label: (props: {$value: string}) => (
        <div>Custom Label for value {props.$value}</div>
      ),
    };
    return (
      <StatefulRadioGroup overrides={overrides} initialState={{value: '3'}}>
        <StyledRadio value="1">First</StyledRadio>
        <StyledRadio value="2">Second</StyledRadio>
        <StyledRadio value="3">Third</StyledRadio>
      </StatefulRadioGroup>
    );
  },
  [examples.STYLES_OVERRIDES]: () => {
    const overrides = {
      RadioMark: {
        style: {borderColor: 'red'},
      },
      Label: withStyle(StyledLabel, () => {
        return {
          color: 'orange',
          fontSize: '25px',
        };
      }),
    };
    return (
      <StatefulRadioGroup overrides={overrides} initialState={{value: '3'}}>
        <StyledRadio value="1">First</StyledRadio>
        <StyledRadio value="2">Second</StyledRadio>
        <StyledRadio value="3">Third</StyledRadio>
      </StatefulRadioGroup>
    );
  },
  [examples.WITH_ERROR]: () => {
    return (
      <StatefulRadioGroup isError={true} initialState={{value: '3'}}>
        <StyledRadio value="1">First</StyledRadio>
        <StyledRadio value="2">Second</StyledRadio>
        <StyledRadio value="3">Third</StyledRadio>
      </StatefulRadioGroup>
    );
  },
};
