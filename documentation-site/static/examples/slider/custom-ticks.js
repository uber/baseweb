import React from 'react';
import {Slider} from 'baseui/slider';
import {styled} from 'baseui';

const TickBar = styled('div', ({$theme}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingRight: $theme.sizing.scale600,
  paddingLeft: $theme.sizing.scale600,
  paddingBottom: $theme.sizing.scale400,
}));

const ThumbValue = styled('div', ({$theme}) => ({
  position: 'absolute',
  top: `-${$theme.sizing.scale800}`,
  ...$theme.typography.font300,
  backgroundColor: 'transparent',
}));

const mToKm = value => `${(value / 1000).toFixed(1)}km`;

export default class Basic extends React.Component {
  state = {value: [4500]};

  render() {
    return (
      <Slider
        value={this.state.value}
        min={1000}
        max={8000}
        step={100}
        onChange={({value}) => this.setState({value})}
        overrides={{
          ThumbValue: ({$value}) => <ThumbValue>{$value}m</ThumbValue>,
          TickBar: ({$min, $max}) => (
            <TickBar>
              <div>{mToKm($min)}</div>
              <div>{mToKm(2400)}</div>
              <div>{mToKm(3800)}</div>
              <div>{mToKm(5200)}</div>
              <div>{mToKm(6600)}</div>
              <div>{mToKm($max)}</div>
            </TickBar>
          ),
        }}
      />
    );
  }
}
