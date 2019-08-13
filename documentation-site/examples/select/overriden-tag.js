// @flow
import * as React from 'react';
import {StatefulSelect} from 'baseui/select';

export default class Container extends React.Component<{}, {}> {
  render() {
    const borderRadius = {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    };
    return (
      <StatefulSelect
        overrides={{
          MultiValue: {
            props: {
              overrides: {
                Root: {
                  style: {
                    ...borderRadius,
                    backgroundColor: 'slateblue',
                  },
                },
                Action: {
                  style: {
                    ...borderRadius,
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
        initialState={{
          value: [{label: 'Atlanta', id: 'ATL'}],
        }}
      />
    );
  }
}
