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
              border: '3px solid #ccc',
              backgroundColor: '#fff',
            }),
          },
        }}
      />
    );
  }
}
