/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {
  Root as StyledRoot,
  Axis as StyledAxis,
  Tick as StyledTick,
  TickBar as StyledTickBar,
  Thumb as StyledThumb,
} from './styled-components';
import {} from './constants';
import {getOverrideObject} from '../helpers/overrides';
import {STATE_CHANGE_TYPE} from './constants';
import type {ChangeActionT, StatelessStateT, PropsT} from './types';
/* global document */
/* global window */

class Slider extends React.Component<PropsT, StatelessStateT> {
  domNode: ?Element | Text;
  onMouseUpListener: ?MouseEventHandler;
  onMouseMoveListener: ?MouseEventHandler;
  static defaultProps = {
    overrides: {},
    onChange: () => {},
    onBlur: () => {},
    onFocus: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onMouseDown: () => {},
    onMouseUp: () => {},
    error: false,
    autoFocus: false,
    tabIndex: 0,
  };

  state = {
    isThumbMoving: false,
    currentThumb: -1,
    currentMove: 0,
  };

  constructor(props: PropsT) {
    super(props);
  }

  onFocus = (e: SyntheticEvent<HTMLInputElement>) => {};

  onBlur = (e: SyntheticEvent<HTMLInputElement>) => {};

  onMouseEnter = (e: SyntheticEvent<HTMLInputElement>) => {};

  onMouseLeave = (e: SyntheticEvent<HTMLInputElement>) => {};

  onChange = (e: SyntheticEvent<HTMLInputElement>, type: ChangeActionT) => {};

  componentDidMount() {
    /* eslint-disable-next-line react/no-find-dom-node */
    this.domNode = findDOMNode(this);
    this.addDocumentMouseEvents();
  }

  componentWillUnmount() {
    if (super.componentWillUnmount) super.componentWillUnmount();
    this.removeDocumentEvents();
  }

  onMouseDown = (e: MouseEvent, thumbIndex: number) => {
    this.setState({
      isThumbMoving: true,
      currentThumb: thumbIndex,
    });
  };

  onMouseUp = (e: MouseEvent) => {
    if (this.state.isThumbMoving) {
      this.setState({
        isThumbMoving: false,
        currentThumb: -1,
        currentMove: 0,
      });
    }
  };

  onMouseMove = (e: MouseEvent) => {
    if (this.state.isThumbMoving) {
      this.onMove(e);
    }
  };

  addDocumentMouseEvents() {
    if (__BROWSER__) {
      this.onMouseMoveListener = document.addEventListener(
        'mousemove',
        this.onMouseMove,
      );
      this.onMouseUpListener = document.addEventListener(
        'mouseup',
        this.onMouseUp,
      );
    }
  }

  removeDocumentEvents() {
    this.onMouseMoveListener && this.onMouseMoveListener.remove();
    this.onMouseUpListener && this.onMouseUpListener.remove();
  }

  render() {
    const {overrides = {}, range, value} = this.props;
    const {component: Root, props: rootProps} = getOverrideObject(
      overrides.Root,
      StyledRoot,
    );
    const {component: Axis, props: axisProps} = getOverrideObject(
      overrides.Axis,
      StyledAxis,
    );
    const {component: Thumb, props: thumbProps} = getOverrideObject(
      overrides.Thumb,
      StyledThumb,
    );
    const {component: Tick, props: tickProps} = getOverrideObject(
      overrides.Tick,
      StyledTick,
    );
    const {component: TickBar, props: tickBarProps} = getOverrideObject(
      overrides.TickBar,
      StyledTickBar,
    );
    const sharedProps = this.getSharedProps();
    return (
      <Root {...rootProps} {...sharedProps}>
        <Axis {...axisProps} {...sharedProps}>
          {value.map((thumb, $index) => (
            <Thumb
              key={$index}
              $index={$index}
              {...thumbProps}
              {...sharedProps}
              onMouseDown={e => this.onMouseDown(e, $index)}
            />
          ))}
        </Axis>
        <TickBar {...tickBarProps}>
          {range.map((tick, $index) => (
            <Tick key={$index} $index={$index} {...tickProps} {...sharedProps}>
              {tick}
            </Tick>
          ))}
        </TickBar>
      </Root>
    );
  }

  onMove(e: MouseEvent) {
    const {currentThumb, currentMove} = this.state;
    const move = currentMove + e.movementX;
    const {$value, $range, $max, $min} = this.getSharedProps();
    const value = $value.slice();
    let {onChange, step} = this.props;
    const axisSizeInPixels = parseInt(
      window.getComputedStyle(this.domNode).width,
    );
    const axisSize = $max - $min;
    step = step ? Slider.scale(step, axisSize, axisSizeInPixels) : step;
    if ($range.length <= 2) {
      const scaledStep = step ? (move >= 0 ? step : -step) : move;
      if (Math.abs(move) - Math.abs(scaledStep) >= 0) {
        const scaledMove = Slider.scale(scaledStep, axisSizeInPixels, axisSize);
        const max = !currentThumb ? value[1] : $max;
        const min = currentThumb ? value[0] : $min;
        value[currentThumb] = Slider.clampIt(
          value[currentThumb] + scaledMove,
          max,
          min,
        );
        this.setState({currentMove: 0});
      } else {
        this.setState({currentMove: move});
      }
    }
    onChange(e, {type: STATE_CHANGE_TYPE.value, value});
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
    };
  }

  static clampIt(value: number, max: number, min: number) {
    return Math.max(min, Math.min(value, max));
  }

  static scale(x: number, distanceX: number, distanceY: number) {
    return (x * distanceY) / distanceX;
  }
}

export default Slider;
