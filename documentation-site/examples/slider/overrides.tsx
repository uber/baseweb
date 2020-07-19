import * as React from 'react';
import {Slider} from 'baseui/slider';
import {
  expandBorderRadiusStyles,
  expandBorderStyles,
} from 'baseui/styles';

export default () => {
  const [value, setValue] = React.useState([70]);
  return (
    <Slider
      value={value}
      onChange={({value}) => setValue(value)}
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
            ...expandBorderRadiusStyles('36px'),
            ...expandBorderStyles({
              borderWidth: '3px',
              borderStyle: 'solid',
              borderColor: '#ccc',
            }),
            backgroundColor: '#fff',
          }),
        },
      }}
    />
  );
};
