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
