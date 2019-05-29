import * as React from 'react';
import {StatefulCalendar} from 'baseui/datepicker';

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

const arrowBtnOverrides = ({$theme}) => {
  return {
    ':focus': {
      backgroundColor: $theme.colors.positive500,
    },
  };
};

export default () => (
  <StatefulCalendar
    initialState={{value: new Date()}}
    overrides={{
      CalendarHeader: {
        style: ({$theme}) => ({
          backgroundColor: $theme.colors.positive,
        }),
      },
      MonthHeader: {
        style: ({$theme}) => ({
          backgroundColor: $theme.colors.positive,
        }),
      },
      MonthYearSelect: {
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
