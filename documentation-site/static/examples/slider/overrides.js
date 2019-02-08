import React from 'react';
import {Slider} from 'baseui/slider';

export default class Basic extends React.Component {
  state = {values: [70]};

  render() {
    return (
      <Slider
        values={this.state.values}
        onChange={({values}) => this.setState({values})}
        overrides={{
          Thumb: ({$values, $thumbIndex}) => (
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
              {$values[$thumbIndex]}
            </div>
          ),
        }}
      />
    );
  }
}
