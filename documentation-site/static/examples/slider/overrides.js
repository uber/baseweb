import * as React from 'react';
import {Slider} from 'baseui/slider';

export default class Basic extends React.Component {
  state = {value: [70]};

  render() {
    return (
      <Slider
        value={this.state.value}
        onChange={({value}) => this.setState({value})}
        overrides={{
          InnerThumb: ({$value, $thumbIndex}) => $value[$thumbIndex],
          ThumbValue: () => null,
          Thumb: {
            style: ({$value, $thumbIndex, $min, $max}) => ({
              height: '36px',
              width: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadiusTopLeft: '36px',
              borderRadiusTopRight: '36px',
              borderRadiusBottomRight: '36px',
              borderRadiusBottomLeft: '36px',
              border: '3px solid #ccc',
              backgroundColor: '#fff',
            }),
          },
        }}
      />
    );
  }
}
