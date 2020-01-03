/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import Popper from 'popper.js';
import type {Instance as PopperInstance} from 'popper.js';
import {toPopperPlacement, parsePopperOffset} from './utils.js';
import {TETHER_PLACEMENT} from './constants.js';
import type {TetherPropsT, TetherStateT, PopperDataObjectT} from './types.js';

class Tether extends React.Component<TetherPropsT, TetherStateT> {
  static defaultProps = {
    anchorRef: null,
    onPopperUpdate: () => null,
    placement: TETHER_PLACEMENT.auto,
    popperRef: null,
    popperOptions: {},
  };

  popper: ?PopperInstance;
  popperHeight = 0;

  state = {
    isMounted: false,
  };

  componentDidMount() {
    this.setState({isMounted: true});
  }

  componentDidUpdate(prevProps: TetherPropsT, prevState: TetherStateT) {
    // Handles the case where popover content changes size and creates a gap between the anchor and
    // the popover. Popper.js only schedules updates on resize and scroll events. In the case of
    // the Select component, when options were filtered in the dropdown menu it creates a gap
    // between it and the input element.
    if (this.props.popperRef) {
      const {height} = this.props.popperRef.getBoundingClientRect();
      if (this.popperHeight !== height) {
        this.popperHeight = height;
        this.popper && this.popper.scheduleUpdate();
      }
      if (this.state.isMounted !== prevState.isMounted) {
        if (!this.props.anchorRef) {
          if (__DEV__) {
            // eslint-disable-next-line no-console
            console.warn(
              `[baseui][TetherBehavior] ref has not been passed to the Popper's anchor element.
              See how to pass the ref to an anchor element in the Popover example
              http://baseui.design/components/popover#anchor-ref-handling-example`,
            );
          }
        } else {
          this.initializePopper();
        }
      }
    }
  }

  componentWillUnmount() {
    this.destroyPopover();
  }

  initializePopper() {
    const {placement, popperOptions} = this.props;
    const {modifiers, ...restOptions} = popperOptions;

    if (!this.props.anchorRef || !this.props.popperRef) return;

    this.popper = new Popper(this.props.anchorRef, this.props.popperRef, {
      // Recommended placement (popper may ignore if it causes a viewport overflow, etc)
      placement: toPopperPlacement(placement),
      modifiers: {
        // Passing the arrow ref will measure the arrow when calculating styles
        arrow: {
          element: this.props.arrowRef,
          enabled: !!this.props.arrowRef,
        },
        computeStyle: {
          // Make popper use top/left instead of transform translate, this is because
          // we use transform for animations and we dont want them to conflict
          gpuAcceleration: false,
        },
        applyStyle: {
          // Disable default styling modifier, we'll apply styles on our own
          enabled: false,
        },
        applyReactStyle: {
          enabled: true,
          fn: this.onPopperUpdate,
          order: 900,
        },
        preventOverflow: {enabled: true},
        ...modifiers,
      },
      ...restOptions,
    });
  }

  onPopperUpdate = (data: PopperDataObjectT) => {
    const normalizedOffsets = {
      popper: parsePopperOffset(data.offsets.popper),
      arrow: data.offsets.arrow
        ? parsePopperOffset(data.offsets.arrow)
        : {top: 0, left: 0},
    };
    this.props.onPopperUpdate(normalizedOffsets, data);
  };

  destroyPopover() {
    if (this.popper) {
      this.popper.destroy();
      delete this.popper;
    }
  }

  render() {
    return this.props.children || null;
  }
}

export default Tether;
