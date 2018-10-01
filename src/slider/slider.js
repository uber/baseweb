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
  AxisRange as StyledAxisRange,
  Tick as StyledTick,
  TickBar as StyledTickBar,
  Thumb as StyledThumb,
} from './styled-components';
import {getOverrides} from '../helpers/overrides';
/* global document */
/* global window */

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
    value: this.props.value,
    thumbRefs: this.props.value.map(() => React.createRef()),
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
    this.onMouseMoveListener = document.addEventListener(
      'mousemove',
      this.onMouseMove,
    );
    this.onMouseUpListener = document.addEventListener(
      'mouseup',
      this.onMouseUp,
    );
  }

  removeDocumentEvents() {
    this.onMouseMoveListener && this.onMouseMoveListener.remove();
    this.onMouseUpListener && this.onMouseUpListener.remove();
  }

  render() {
    const {overrides, range} = this.props;
    const {value, currentThumb, thumbRefs} = this.state;
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
    const sharedProps = {
      $value: value,
      $range: range,
      $max: range[range.length - 1],
      $min: range[0],
      $currentThumb: currentThumb,
      $isRange: value.length % 2 === 0,
    };
    return (
      <Root
        {...sharedProps}
        onMouseUp={e => this.onAxisClick(e)}
        {...rootProps}
      >
        <Axis {...sharedProps} {...axisProps}>
          {value.map((thumb, $index) => (
            <React.Fragment key={$index}>
              <AxisRange $index={$index} {...sharedProps} {...axisRangeProps} />
              <Thumb
                $ref={thumbRefs[$index]}
                key={$index}
                $index={$index}
                {...thumbProps}
                {...sharedProps}
                onMouseDown={e => this.onMouseDown(e, $index)}
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

  onMove(move) {
    const value = this.state.value.slice();
    const {range} = this.props;
    const $max = range[range.length - 1];
    const $min = range[0];
    const axisSizeInPixels = parseInt(
      window.getComputedStyle(this.domNode).width,
    );
    const axisSize = $max - $min;
    const scaledMove = (axisSize * move) / axisSizeInPixels;
    let newThumbValue = value[this.state.currentThumb] + scaledMove;
    newThumbValue =
      newThumbValue > $max ? $max : newThumbValue < $min ? $min : newThumbValue;
    value[this.state.currentThumb] = newThumbValue;
    this.setState({value});
  }

  onAxisClick(e) {
    const {value, thumbRefs} = this.state;
    // only for one thumb feature
    if (value.length === 1) {
      const thumb = thumbRefs[0].current;
      const thumbWidth = 32;
      const axisOffset = e.clientX - e.currentTarget.parentNode.offsetLeft;
      let xPos = axisOffset - thumb.offsetLeft - thumbWidth;
      this.setState({currentThumb: 0}, () => {
        this.onMove(xPos);
      });
    }
  }
}

export default Slider;
