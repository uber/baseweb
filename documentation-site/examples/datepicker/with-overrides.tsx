import * as React from 'react';
import {StatefulCalendar} from 'baseui/datepicker';

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
        style: ({$theme}) => {
          return {
            ':focus': {
              backgroundColor: $theme.colors.positive500,
            },
          };
        },
      },
      NextButton: {
        style: ({$theme}) => {
          return {
            ':focus': {
              backgroundColor: $theme.colors.positive500,
            },
          };
        },
      },
      Day: {
        style: ({
          $theme,
          $selected,
          $isHovered,
          $isHighlighted,
        }) => ({
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
