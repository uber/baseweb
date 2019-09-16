// @flow
import * as React from 'react';
import {StatefulCalendar} from 'baseui/datepicker';

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
      MonthYearSelectButton: {
        style: ({$theme}) => ({
          ':focus': {
            backgroundColor: $theme.colors.positive500,
            outline: 'none',
          },
        }),
      },
      PrevButton: {
        style: arrowBtnOverrides,
      },
      NextButton: {
        style: arrowBtnOverrides,
      },
      Day: {
        style: ({
          $theme,
          $selected,
          $isHovered,
          $isHighlighted,
        }) => ({
          color: $selected
            ? $theme.colors.white
            : $theme.colors.calendarForeground,
          ':after': {
            backgroundColor: $selected
              ? $isHovered || $isHighlighted
                ? $theme.colors.positive500
                : $theme.colors.positive
              : $isHovered || $isHighlighted
              ? $theme.colors.positive200
              : 'transparent',
          },
        }),
      },
    }}
  />
);
