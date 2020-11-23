import * as React from 'react';
import {Slider, SliderState} from 'baseui/slider';

export default () => {
  const [value, setValue] = React.useState<SliderState['value']>([
    70,
  ]);
  return (
    <Slider
      value={value}
      onChange={({value}) => setValue(value)}
      overrides={{
        InnerThumb: ({$value, $thumbIndex}) => (
          <React.Fragment>
            {Array.isArray($value) ? $value[$thumbIndex] : $value}
          </React.Fragment>
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
            borderTopWidth: '3px',
            borderRightWidth: '3px',
            borderBottomWidth: '3px',
            borderLeftColor: `#ccc`,
            borderTopColor: `#ccc`,
            borderRightColor: `#ccc`,
            borderBottomColor: `#ccc`,
            backgroundColor: '#fff',
          }),
        },
      }}
    />
  );
};
