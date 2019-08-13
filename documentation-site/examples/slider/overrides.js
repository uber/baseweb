// @flow
import * as React from 'react';
import {Slider} from 'baseui/slider';

export default () => {
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
            borderStyle: 'solid',
            borderWidth: '3px',
            borderColor: '#ccc',
            backgroundColor: '#fff',
          }),
        },
      }}
    />
  );
};
