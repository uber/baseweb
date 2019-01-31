/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {
  Unstable_Calendar as Calendar,
  Unstable_StatefulCalendar as StatefulCalendar,
  Unstable_StatefulDatepicker as StatefulDatepicker,
} from './index.js';
import {addDays} from './utils/index.js';
import tests from './examples-list.js';

export const suite = 'Component Test Suite';

export default {
  [tests.SIMPLE_EXAMPLE]: function Story1() {
    return <Calendar />;
  },
  [tests.STATEFUL_EXAMPLE]: function Story2() {
    return <StatefulCalendar />;
  },
  [tests.STATEFUL_IN_POPOVER]: function Story3() {
    return <StatefulDatepicker />;
  },
  [tests.STATEFUL_RANGE_IN_POPOVER]: function Story3() {
    return <StatefulDatepicker isRange initialState={{value: []}} />;
  },
  [tests.STATEFUL_RANGE_QUICK_SELECT]: function QuickSelect() {
    return <StatefulCalendar isRange enableQuickSelect />;
  },
  [tests.STATEFUL_DATEPICKER_QUICK_SELECT]: function QuickSelect() {
    return (
      <StatefulDatepicker
        isRange
        initialState={{value: [new Date(), addDays(new Date(), 3)]}}
        enableQuickSelect
      />
    );
  },
  [tests.WITH_OVERRIDES]: function Story3() {
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
          color: $isHighlighted
            ? $theme.colors.positive
            : $theme.colors.foreground,
        }),
      },
    };
    return (
      <StatefulCalendar
        initialState={{value: new Date()}}
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
  },
};
