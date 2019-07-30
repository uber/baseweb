import * as React from 'react';
import {StatefulSelect} from 'baseui/select';

export default class Container extends React.Component<{}, {}> {
  render() {
    return (
      <StatefulSelect
        overrides={{
          MultiValue: {
            props: {
              overrides: {
                Root: {
                  style: {
                    borderRadius: '0px',
                    backgroundColor: 'pink',
                  },
                },
                Action: {
                  style: {
                    borderRadius: '0px',
                    ':hover': {
                      backgroundColor: 'salmon',
                    },
                    ':focus': {
                      backgroundColor: 'salmon',
                    },
                  },
                },
                Text: {
                  style: {
                    color: '#fff',
                  },
                },
                ActionIcon: {
                  props: {
                    color: '#fff',
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
