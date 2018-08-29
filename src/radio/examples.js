/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// @flow

/* eslint-disable react/display-name*/
import * as React from 'react';
import {withStyle} from 'styletron-react';
import {StyledRadio, StyledLabel, StatefulRadioGroup} from './index';

export const suite = 'Radio Group Test Suite';
export const tests = {
  SIMPLE_EXAMPLE: 'Radio Group example',
  WITH_ERROR: 'RadioGroup with an error',
  DISABLED: 'RadioGroup disabled',
  HORIZONTAL_ALIGN: 'RadioGroup horizontal',
  VERTICAL_ALIGN: 'RadioGroup vertical',
  STYLES_OVERRIDES: 'RadioGroup with style overrides',
  COMPONENTS_OVERRIDES: 'RadioGroup with override components',
  EXTRA_PROPS: 'RadioGroup with extra props',
};

export default {
  [tests.SIMPLE_EXAMPLE]: () => {
    return (
      <StatefulRadioGroup initialState={{value: '2'}}>
        <StyledRadio value="1">First</StyledRadio>
        <StyledRadio value="2">Second</StyledRadio>
        <StyledRadio value="3">Third</StyledRadio>
      </StatefulRadioGroup>
    );
  },
  [tests.HORIZONTAL_ALIGN]: () => {
    return (
      <StatefulRadioGroup align="horizontal" initialState={{value: '3'}}>
        <StyledRadio value="1">First</StyledRadio>
        <StyledRadio value="2">Second</StyledRadio>
        <StyledRadio value="3">Third</StyledRadio>
      </StatefulRadioGroup>
    );
  },
  [tests.COMPONENTS_OVERRIDES]: () => {
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
  [tests.STYLES_OVERRIDES]: () => {
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
  [tests.WITH_ERROR]: () => {
    return (
      <StatefulRadioGroup isError={true} initialState={{value: '3'}}>
        <StyledRadio value="1">First</StyledRadio>
        <StyledRadio value="2">Second</StyledRadio>
        <StyledRadio value="3">Third</StyledRadio>
      </StatefulRadioGroup>
    );
  },
};
