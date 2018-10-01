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

class Slider extends React.Component<PropsT, StatelessStateT> {
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
    value: this.props.value
  };

  constructor(props: PropsT) {
    super(props);
  }

  onFocus = (e: SyntheticEvent<HTMLInputElement>) => {};

  onBlur = (e: SyntheticEvent<HTMLInputElement>) => {};

  onMouseEnter = (e: SyntheticEvent<HTMLInputElement>) => {};

  onMouseLeave = (e: SyntheticEvent<HTMLInputElement>) => {};

  onChange = (
    e: SyntheticEvent<HTMLInputElement>,
    type: ChangeActionT,
  ) => {
  };

  componentDidMount() {
    this.domNode = findDOMNode(this);
    this.addDocumentMouseEvents();
  }

  componentWillUnmount() {
    if (super.componentWillUnmount) super.componentWillUnmount();
    this.removeDocumentEvents();
  }

  onMouseDown = (e, thumbIndex) => {
    this.setState({
      isThumbMoving: true,
      currentThumb: thumbIndex,
    });
  };

  onMouseUp = e => {
    if (this.state.isThumbMoving) {
      this.setState({
        isThumbMoving: false,
        currentThumb: -1,
      });
    }
  };

  onMouseMove = e => {
    if (this.state.isThumbMoving) {
      this.onMove(e.movementX);
    }
  };

  addDocumentMouseEvents() {
    this.onMouseMoveListener = document.addEventListener('mousemove', this.onMouseMove);
    this.onMouseUpListener = document.addEventListener('mouseup', this.onMouseUp);
  }

  removeDocumentEvents() {
    this.onMouseMoveListener && this.onMouseMoveListener.remove();
    this.onMouseUpListener && this.onMouseUpListener.remove();
  }

  render() {
    const {overrides, range} = this.props;
    const {value, currentThumb} = this.state;
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
    const sharedProps = {
      $value: value,
      $range: range,
      $max: range[range.length - 1],
      $min: range[0],
      $currentThumb: currentThumb,
    };
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
            <Tick key={$index} $index={$index}{...tickProps} {...sharedProps} >
              {tick}
            </Tick>
          ))}
        </TickBar>
      </Root>
    );
  }

  onMove(move) {
    const value = this.state.value.slice();
    const {range} = this.props;
    const $max = range[range.length - 1];
    const $min = range[0];
    const axisSizeInPixels = parseInt(window.getComputedStyle(this.domNode).width);
    const axisSize = $max - $min;
    const scaledMove = (axisSize * move) / axisSizeInPixels;
    let newThumbValue = value[this.state.currentThumb] + scaledMove;
    newThumbValue = newThumbValue > $max ? $max : (newThumbValue < $min ? $min : newThumbValue);
    value[this.state.currentThumb] = newThumbValue;
    this.setState({value});
  }
}

export default Slider;
