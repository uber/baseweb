import * as React from 'react';
import {StatefulSelect, TYPE} from 'baseui/select';

export default class Container extends React.Component<{}, {}> {
  render() {
    return (
      <StatefulSelect
        options={[
          {id: 'AliceBlue', color: '#F0F8FF'},
          {id: 'AntiqueWhite', color: '#FAEBD7'},
        ]}
        overrides={{
          MultiValue: {
            props: {
              color: '#4327F1',
              kind: 'custom',
              overrides: {
                Root: {
                  style: {
                    borderLeft: '1px solid black',
                  },
                },
              },
            },
          },
        }}
        labelKey="id"
        valueKey="color"
        type={TYPE.search}
        multi
        onChange={event => console.log(event)}
      />
    );
  }
}
