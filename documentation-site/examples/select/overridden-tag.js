// @flow
import * as React from 'react';
import {Select} from 'baseui/select';

export default function Example() {
  const [value, setValue] = React.useState([
    {label: 'Atlanta', id: 'ATL'},
  ]);

  return (
    <Select
      overrides={{
        Tag: {
          props: {
            overrides: {
              Root: {
                style: {
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderBottomLeftRadius: 0,
                  backgroundColor: 'slateblue',
                },
              },
              Action: {
                style: {
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderBottomLeftRadius: 0,
                  ':hover': {
                    backgroundColor: 'mediumpurple',
                  },
                  ':focus': {
                    backgroundColor: 'mediumpurple',
                  },
                },
              },
              Text: {
                style: {
                  color: 'lavender',
                },
              },
              ActionIcon: {
                props: {
                  color: 'lavender',
                },
              },
            },
          },
        },
      }}
      multi
      type="search"
      options={[
        {label: 'Atlanta', id: 'ATL'},
        {label: 'Baltimore', id: 'BWI'},
        {label: 'Chicago', id: 'ORD'},
        {label: 'Denver', id: 'DEN'},
      ]}
      onChange={({value}) => setValue(value)}
      value={value}
    />
  );
}
