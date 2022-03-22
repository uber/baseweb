import * as React from 'react';
import {Select, Value} from 'baseui/select';

export default function Example() {
  const [value, setValue] = React.useState<Value>([]);
  return (
    <Select
      options={[
        {id: 'AliceBlue', color: '#F0F8FF'},
        {id: 'AntiqueWhite', color: '#FAEBD7'},
        {id: 'Aqua', color: '#00FFFF'},
        {id: 'Aquamarine', color: '#7FFFD4'},
        {id: 'Azure', color: '#F0FFFF'},
        {id: 'Beige', color: '#F5F5DC'},
      ]}
      labelKey="id"
      valueKey="color"
      value={value}
      onChange={({value}) => setValue(value)}
      overrides={{
        StatefulMenu: {
          props: {
            stateReducer: (type: any, next: any, prev: any) => {
              // eslint-disable-next-line no-console
              console.log(type, prev, next);
              return next;
            },
          },
        },
      }}
    />
  );
}
