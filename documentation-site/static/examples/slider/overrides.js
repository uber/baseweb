import React from 'react';
import {Slider} from 'baseui/slider';

export default class Basic extends React.Component {
  state = {value: [70]};

  render() {
    return (
      <Slider
        value={this.state.value}
        onChange={({value}) => this.setState({value})}
        overrides={{
          Thumb: ({$value, $thumbIndex}) => (
            <div
              style={{
                height: '36px',
                width: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '36px',
                border: '3px solid #ccc',
                backgroundColor: '#fff',
              }}
            >
              {$value[$thumbIndex]}
            </div>
          ),
        }}
      />
    );
  }
}
