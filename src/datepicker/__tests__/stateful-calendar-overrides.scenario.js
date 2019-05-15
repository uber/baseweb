/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulCalendar} from '../index.js';

export const name = 'Stateful calendar overrides';

const selectOverrides = {
  ControlContainer: {
    style: ({$theme, $isFocused, $isPseudoFocused}) => ({
      backgroundColor:
        $isFocused || $isPseudoFocused
          ? $theme.colors.positive500
          : $theme.colors.positive,
    }),
  },
  OptionContent: {
    style: ({$theme, $isHighlighted}) => ({
      color: $isHighlighted ? $theme.colors.positive : $theme.colors.foreground,
    }),
  },
};

const arrowBtnOverrides = ({$theme}) => ({
  ':focus': {
    backgroundColor: $theme.colors.positive500,
    borderRadius: $theme.borders.useRoundedCorners ? $theme.sizing.scale100 : 0,
  },
});

export const component = () => (
  <StatefulCalendar
    initialState={{value: new Date('2019-02-14T10:00:00Z')}}
    overrides={{
      CalendarHeader: {
        style: ({$theme}) => ({
          backgroundColor: $theme.colors.positive,
        }),
      },
      MonthSelect: {
        props: {overrides: selectOverrides},
      },
      YearSelect: {
        props: {overrides: selectOverrides},
      },
      PrevButton: {
        style: arrowBtnOverrides,
      },
      NextButton: {
        style: arrowBtnOverrides,
      },
      Day: {
        style: ({$theme, $selected, $isHovered, $isHighlighted}) => ({
          backgroundColor: $selected
            ? $theme.colors.positive
            : $isHovered || $isHighlighted
              ? $theme.colors.positive100
              : 'transparent',
        }),
      },
    }}
  />
);
