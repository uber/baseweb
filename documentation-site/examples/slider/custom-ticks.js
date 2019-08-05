// @flow
import * as React from 'react';
import {Slider} from 'baseui/slider';
import {useStyletron} from 'baseui';

const mToKm = value => `${(value / 1000).toFixed(1)}km`;

export function Basic() {
  const [value, setValue] = React.useState<number[]>([4500]);
  const [useCss, theme] = useStyletron();
  return (
    <Slider
      value={value}
      min={1000}
      max={8000}
      step={100}
      onChange={params => {
        if (params.value) {
          setValue(params.value);
        } else {
          setValue([]);
        }
      }}
      overrides={{
        ThumbValue: ({$value}) => (
          <div
            className={useCss({
              position: 'absolute',
              top: `-${theme.sizing.scale800}`,
              ...theme.typography.font300,
              backgroundColor: 'transparent',
            })}
          >
            {$value}m
          </div>
        ),
        TickBar: ({$min, $max}) => (
          <div
            className={useCss({
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingRight: theme.sizing.scale600,
              paddingLeft: theme.sizing.scale600,
              paddingBottom: theme.sizing.scale400,
            })}
          >
            <div>{mToKm($min)}</div>
            <div>{mToKm(2400)}</div>
            <div>{mToKm(3800)}</div>
            <div>{mToKm(5200)}</div>
            <div>{mToKm(6600)}</div>
            <div>{mToKm($max)}</div>
          </div>
        ),
      }}
    />
  );
}
