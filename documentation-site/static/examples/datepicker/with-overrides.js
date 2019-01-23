import React from 'react';
import {Unstable_StatefulCalendar} from 'baseui/datepicker';

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

export default () => (
  <Unstable_StatefulCalendar
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
