import * as React from 'react';
import {StatefulCalendar} from 'baseui/datepicker';

export default () => (
  <StatefulCalendar
    overrides={{
      // MonthYearSelectStatefulMenu is a Menu component
      // We can use any overrides available to Menu
      MonthYearSelectStatefulMenu: {
        props: {
          overrides: {
            ListItem: {
              style: ({
                $isHighlighted,
              }: {
                $isHighlighted: boolean;
              }) => {
                return $isHighlighted
                  ? {
                      color: 'white',
                      backgroundColor: 'salmon',
                    }
                  : null;
              },
            },
          },
        },
      },
    }}
  />
);
