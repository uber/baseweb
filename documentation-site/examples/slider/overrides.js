// @flow
import * as React from 'react';
import {Slider} from 'baseui/slider';

export default function Example() {
  const [value, setValue] = React.useState([70]);
  return (
    <Slider
      value={value}
      onChange={({value}) => value && setValue(value)}
      overrides={{
        InnerThumb: ({$value, $thumbIndex}) => (
          <React.Fragment>{$value[$thumbIndex]}</React.Fragment>
        ),
        ThumbValue: () => null,
        Thumb: {
          style: () => ({
            height: '36px',
            width: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: '36px',
            borderTopRightRadius: '36px',
            borderBottomRightRadius: '36px',
            borderBottomLeftRadius: '36px',
            borderLeftStyle: 'solid',
            borderRightStyle: 'solid',
            borderTopStyle: 'solid',
            borderBottomStyle: 'solid',
            borderLeftWidth: '3px',
            borderRightWidth: '3px',
            borderTopWidth: '3px',
            borderBottomWidth: '3px',
            borderLeftColor: '#ccc',
            borderRightColor: '#ccc',
            borderTopColor: '#ccc',
            borderBottomColor: '#ccc',
            backgroundColor: '#fff',
          }),
        },
      }}
    />
  );
}
