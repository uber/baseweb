// @flow
import * as React from 'react';
import {Datepicker} from 'baseui/datepicker';

export default () => {
  const [singleDate, setSingleDate] = React.useState();
  return (
    <Datepicker
      value={singleDate || null}
      onChange={({date}) => setSingleDate(date)}
      overrides={{
        // MonthYearSelectStatefulMenu is a Menu component
        // We can use any overrides available to Menu
        MonthYearSelectStatefulMenu: {
          props: {
            overrides: {
              ListItem: {
                style: ({$isHighlighted}) => {
                  if ($isHighlighted) {
                    return {
                      color: 'white',
                      backgroundColor: 'salmon',
                    };
                  }
                },
              },
            },
          },
        },
        // Input override is the MaskedInput Base Web component.
        // We can use any overrides available to MaskedInput
        Input: {
          props: {
            overrides: {
              Input: {
                props: {
                  readonly: 'readonly',
                },
              },
            },
          },
        },
      }}
    />
  );
};
