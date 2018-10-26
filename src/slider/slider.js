/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {thumbWidth} from './constants';
import type {StatelessStateT, PropsT} from './types';
import {
  Root as StyledRoot,
  Axis as StyledAxis,
  AxisRange as StyledAxisRange,
  Tick as StyledTick,
  TickBar as StyledTickBar,
  Thumb as StyledThumb,
} from './styled-components';
import {getOverrides} from '../helpers/overrides';
/* global document */
/* global window */

class Slider extends React.Component<PropsT, StatelessStateT> {
  domNode: ?Element | Text;

  static defaultProps = {
    overrides: {},
    onChange: () => {},
    error: false,
    autoFocus: false,
    tabIndex: 0,
  };

  state = {
    isThumbMoving: false,
    currentThumb: -1,
    currentMove: 0,
    thumbRefs: this.props.value.map(() => React.createRef()),
  };

  componentDidMount() {
    /* eslint-disable-next-line react/no-find-dom-node */
    this.domNode = findDOMNode(this);
  }

  onThumbDown = (event: MouseEvent, thumbIndex: number) => {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onThumbUp);
    this.setState({
      isThumbMoving: true,
      currentThumb: thumbIndex,
    });
  };

  onThumbUp = (event: MouseEvent) => {
    const {isThumbMoving} = this.state;
    if (isThumbMoving) {
      this.setState({
        isThumbMoving: false,
        currentThumb: -1,
        currentMove: 0,
      });
    }
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onThumbUp);
  };

  onMouseMove = (event: MouseEvent) => {
    const {isThumbMoving} = this.state;
    if (isThumbMoving) {
      this.onMove(event.movementX, event);
    }
  };

  onMove(movementX: number, event: SyntheticEvent<HTMLElement> | MouseEvent) {
    const {currentThumb, currentMove} = this.state;
    let {onChange, step} = this.props;
    const {$value, $max, $min, $isRange} = this.getSharedProps();
    // add mouse move in pixels to already recorded move in progress
    const newMove = currentMove + movementX;
    // get move direction factor based on sign of new move
    const moveDirection = newMove / Math.abs(newMove);
    const value = $value.slice();
    const axisSizeInPixels = parseInt(
      window.getComputedStyle(this.domNode).width,
    );
    const axisSize = $max - $min;
    // scale step to be measured in pixels
    step = step ? Slider.scale(step, axisSize, axisSizeInPixels) : step;
    const scaledStep = step ? moveDirection * step : newMove;
    const isMoveThresholdPasssed =
      Math.abs(newMove) - Math.abs(scaledStep) >= 0;
    // if move detected is larger than step we can move to the next tick
    if (isMoveThresholdPasssed) {
      const scaledMove = Slider.scale(scaledStep, axisSizeInPixels, axisSize);
      // clamp max and min to avoid overlapping and cross of each other
      const max = !currentThumb && $isRange ? value[1] : $max;
      const min = currentThumb && $isRange ? value[0] : $min;
      value[currentThumb] = Slider.clampIt(
        value[currentThumb] + scaledMove,
        max,
        min,
      );
      this.setState({currentMove: 0});
    } else {
      // proceed to track the newMove of mouse
      this.setState({currentMove: newMove});
    }
    onChange({event, value});
  }

  onAxisClick(e: MouseEvent) {
    const {value} = this.props;
    const {thumbRefs} = this.state;
    // only for one thumb feature
    //$FlowFixMe
    if (value.length === 1 && e.currentTarget.parentNode) {
      const thumb = thumbRefs[0].current;
      const axisOffset = e.clientX - e.currentTarget.parentNode.offsetLeft;
      //$FlowFixMe
      const xPos = axisOffset - thumb.offsetLeft - thumbWidth;
      this.setState({currentThumb: 0}, () => {
        this.onMove(xPos, e);
      });
    }
  }

  getSharedProps() {
    const {range, value} = this.props;
    const {currentThumb} = this.state;
    return {
      $value: value,
      $range: range,
      $max: range[range.length - 1],
      $min: range[0],
      $currentThumb: currentThumb,
      $isRange: value.length % 2 === 0,
    };
  }

  static clampIt(value: number, max: number, min: number) {
    return Math.max(min, Math.min(value, max));
  }
  static scale(x: number, distanceX: number, distanceY: number) {
    return (x * distanceY) / distanceX;
  }

  render() {
    const {overrides = {}, range, value} = this.props;
    const {thumbRefs} = this.state;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [Axis, axisProps] = getOverrides(overrides.Axis, StyledAxis);
    const [AxisRange, axisRangeProps] = getOverrides(
      overrides.AxisRange,
      StyledAxisRange,
    );
    const [Thumb, thumbProps] = getOverrides(overrides.Thumb, StyledThumb);
    const [Tick, tickProps] = getOverrides(overrides.Tick, StyledTick);
    const [TickBar, tickBarProps] = getOverrides(
      overrides.TickBar,
      StyledTickBar,
    );
    const sharedProps = this.getSharedProps();
    return (
      <Root {...sharedProps} onClick={e => this.onAxisClick(e)} {...rootProps}>
        <Axis {...sharedProps} {...axisProps}>
          {value.map((thumb, $index) => (
            <React.Fragment key={$index}>
              <AxisRange $index={$index} {...sharedProps} {...axisRangeProps} />
              <Thumb
                $ref={thumbRefs[$index]}
                key={$index}
                $index={$index}
                onMouseDown={e => this.onThumbDown(e, $index)}
                {...sharedProps}
                {...thumbProps}
              />
            </React.Fragment>
          ))}
        </Axis>
        <TickBar {...sharedProps} {...tickBarProps}>
          {range.map((tick, $index) => (
            <Tick key={$index} $index={$index} {...sharedProps} {...tickProps}>
              {tick}
            </Tick>
          ))}
        </TickBar>
      </Root>
    );
  }
}

export default Slider;
