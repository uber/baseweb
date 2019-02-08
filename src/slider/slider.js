/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {Range} from 'react-range';
import type {PropsT} from './types.js';
import {
  Root as StyledRoot,
  Track as StyledTrack,
  InnerTrack as StyledInnerTrack,
  Tick as StyledTick,
  TickBar as StyledTickBar,
  Thumb as StyledThumb,
  InnerThumb as StyledInnerThumb,
  ThumbValue as StyledThumbValue,
} from './styled-components.js';
import {getOverrides} from '../helpers/overrides.js';

// function getTickValue(tick: number | {value: number}): number {
//   if (typeof tick === 'object') {
//     return tick.value;
//   }
//   return tick;
// }

function getTickLabel(tick: number | {label: React.Node}): React.Node {
  if (typeof tick === 'object') {
    return tick.label;
  }
  return tick;
}

class Slider extends React.Component<PropsT> {
  static defaultProps = {
    overrides: {},
    onChange: () => {},
    error: false,
    tabIndex: 0,
  };

  getSharedProps() {
    return {};
  }

  render() {
    const {overrides = {}, range, value, step, onChange} = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [Track, trackProps] = getOverrides(overrides.Track, StyledTrack);
    const [InnerTrack, innerTrackProps] = getOverrides(
      overrides.InnerTrack,
      StyledInnerTrack,
    );
    const [Thumb, thumbProps] = getOverrides(overrides.Thumb, StyledThumb);
    const [InnerThumb, innerThumbProps] = getOverrides(
      overrides.InnerThumb,
      StyledInnerThumb,
    );
    const [ThumbValue, thumbValueProps] = getOverrides(
      overrides.ThumbValue,
      StyledThumbValue,
    );
    const [Tick, tickProps] = getOverrides(overrides.Tick, StyledTick);
    const [TickBar, tickBarProps] = getOverrides(
      overrides.TickBar,
      StyledTickBar,
    );
    const sharedProps = this.getSharedProps();
    return (
      <Root {...sharedProps} {...rootProps}>
        <Range
          step={step}
          min={range[0]}
          max={range[1]}
          values={value}
          onChange={value => onChange({value})}
          renderTrack={({props, children}) => (
            <Track
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={props.style}
              {...trackProps}
            >
              <InnerTrack
                $ref={props.ref}
                $value={value}
                $min={range[0]}
                $max={range[1]}
                {...innerTrackProps}
              >
                {children}
              </InnerTrack>
            </Track>
          )}
          renderThumb={({props, value, index, isDragged}) => (
            <Thumb
              {...props}
              $isLeft={this.props.value.length === 2 && index === 0}
              $isRight={this.props.value.length === 2 && index === 1}
              style={{
                ...props.style,
              }}
              {...thumbProps}
            >
              <ThumbValue {...thumbValueProps}>{value}</ThumbValue>
              <InnerThumb {...innerThumbProps} $isDragged={isDragged} />
            </Thumb>
          )}
        />
        <TickBar {...sharedProps} {...tickBarProps}>
          {range.map((tick, $index) => (
            <Tick key={$index} $index={$index} {...sharedProps} {...tickProps}>
              {getTickLabel(tick)}
            </Tick>
          ))}
        </TickBar>
      </Root>
    );
  }
}

export default Slider;
