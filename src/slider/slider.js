/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {Range, useThumbOverlap} from 'react-range';
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
import {ThemeContext} from '../styles/theme-provider.js';

// value.length should not be bigger than two
// because our design doesn't support more than
// two thumbs
const limitValue = (value: number[]) => {
  if (value.length > 2 || value.length === 0) {
    throw new Error(
      'the value prop represents positions of thumbs, so its length can be only one or two',
    );
  }
  return value;
};

const ThumbLabel = ({index, values, rangeRef, Component, ...props}) => {
  const [labelValue, style] = useThumbOverlap(rangeRef, values, index);
  return (
    <Component {...props} style={style}>
      {labelValue}
    </Component>
  );
};

class Slider extends React.Component<PropsT> {
  static defaultProps = {
    overrides: {},
    disabled: false,
    onChange: () => {},
    onFinalChange: () => {},
    min: 0,
    max: 100,
    step: 1,
  };
  rangeRef = React.createRef<Range>();
  getSharedProps() {
    const {disabled, step, min, max, value}: PropsT = this.props;
    return {
      $disabled: disabled,
      $step: step,
      $min: min,
      $max: max,
      $value: limitValue(value),
    };
  }

  render() {
    const {
      overrides = {},
      min,
      max,
      step,
      onChange,
      onFinalChange,
      disabled,
    } = this.props;
    const value = limitValue(this.props.value);
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
      <ThemeContext.Consumer>
        {theme => (
          <Root data-baseweb="slider" {...sharedProps} {...rootProps}>
            <Range
              step={step}
              min={min}
              max={max}
              values={value}
              disabled={disabled}
              onChange={value => onChange({value})}
              onFinalChange={value => onFinalChange({value})}
              ref={this.rangeRef}
              rtl={theme.direction === 'rtl'}
              renderTrack={({props, children, isDragged}) => (
                <Track
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  $isDragged={isDragged}
                  {...sharedProps}
                  {...trackProps}
                >
                  <InnerTrack
                    $isDragged={isDragged}
                    ref={props.ref}
                    {...sharedProps}
                    {...innerTrackProps}
                  >
                    {children}
                  </InnerTrack>
                </Track>
              )}
              renderThumb={({props, index, isDragged}) => (
                <Thumb
                  {...props}
                  $thumbIndex={index}
                  $isDragged={isDragged}
                  style={{
                    ...props.style,
                  }}
                  {...sharedProps}
                  {...thumbProps}
                >
                  <ThumbLabel
                    Component={ThumbValue}
                    values={value}
                    index={index}
                    rangeRef={this.rangeRef.current}
                    $thumbIndex={index}
                    $isDragged={isDragged}
                    {...sharedProps}
                    {...thumbValueProps}
                  />
                  <InnerThumb
                    $thumbIndex={index}
                    $isDragged={isDragged}
                    {...sharedProps}
                    {...innerThumbProps}
                  />
                </Thumb>
              )}
            />
            <TickBar {...sharedProps} {...tickBarProps}>
              <Tick {...sharedProps} {...tickProps}>
                {min}
              </Tick>
              <Tick {...sharedProps} {...tickProps}>
                {max}
              </Tick>
            </TickBar>
          </Root>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Slider;
