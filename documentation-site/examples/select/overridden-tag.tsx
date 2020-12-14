import * as React from 'react';
import {Select, Value} from 'baseui/select';

export default function Example() {
  const [value, setValue] = React.useState<Value>([
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
                  borderRadius: '0px',
                  backgroundColor: 'slateblue',
                },
              },
              Action: {
                style: {
                  borderRadius: '0px',
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
