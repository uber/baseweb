/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import FocusLock, { MoveFocusInside } from 'react-focus-lock';

import { getOverride, getOverrideProps } from '../helpers/overrides';
import {
  ACCESSIBILITY_TYPE,
  PLACEMENT,
  TRIGGER_TYPE,
  ANIMATE_OUT_TIME,
  ANIMATE_IN_TIME,
  POPOVER_MARGIN,
} from './constants';
import { Layer, TetherBehavior } from '../layer';
import {
  Arrow as StyledArrow,
  Body as StyledBody,
  Inner as StyledInner,
  Hidden,
} from './styled-components';
import { fromPopperPlacement } from './utils';
import defaultProps from './default-props';
import { useUID } from 'react-uid';

import type { AnchorProps, PopoverProps, PopoverPrivateState, SharedStylePropsArg } from './types';
import type { PopperDataObject, NormalizedOffsets } from '../layer/types';

class PopoverInner extends React.Component<PopoverProps, PopoverPrivateState> {
  static defaultProps: Partial<PopoverProps> = defaultProps;

  /* eslint-disable react/sort-comp */
  animateInTimer?: TimeoutID | undefined | null;
  animateOutTimer?: TimeoutID | undefined | null;
  animateOutCompleteTimer?: TimeoutID | undefined | null;
  onMouseEnterTimer?: TimeoutID | undefined | null;
  onMouseLeaveTimer?: TimeoutID | undefined | null;
  anchorRef = React.createRef<HTMLElement>();
  popperRef = React.createRef<HTMLElement>();
  arrowRef = React.createRef<HTMLElement>();
  /* eslint-enable react/sort-comp */

  /**
   * Yes our "Stateless" popover still has state. This is private state that
   * customers shouldn't have to manage themselves, such as positioning and
   * other internal flags for managing animation states.
   */
  state = this.getDefaultState(this.props);

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  componentDidUpdate(prevProps: PopoverProps, prevState: PopoverPrivateState) {
    this.init(prevProps, prevState);
    if (
      this.props.autoFocus &&
      !this.state.autoFocusAfterPositioning &&
      this.popperRef.current !== null &&
      this.popperRef.current.getBoundingClientRect().top > 0
    ) {
      this.setState({ autoFocusAfterPositioning: true });
    }

    if (__DEV__) {
      if (!this.anchorRef.current) {
        // eslint-disable-next-line no-console
        console.warn(
          `[baseui][Popover] ref has not been passed to the Popper's anchor element.
              See how to pass the ref to an anchor element in the Popover example
              http://baseui.design/components/popover#anchor-ref-handling-example`
        );
      }
    }
  }

  init(prevProps: PopoverProps, prevState: PopoverPrivateState) {
    if (
      this.props.isOpen !== prevProps.isOpen ||
      this.state.isMounted !== prevState.isMounted ||
      this.state.isLayerMounted !== prevState.isLayerMounted
    ) {
      // Transition from closed to open.
      if (this.props.isOpen && this.state.isLayerMounted) {
        // Clear any existing timers (like previous animateOutCompleteTimer)
        this.clearTimers();
        return;
      }

      // Transition from open to closed.
      if (!this.props.isOpen && prevProps.isOpen) {
        this.animateOutTimer = setTimeout(this.animateOut, 20);
        return;
      }
    }
  }

  componentWillUnmount() {
    this.clearTimers();
  }

  getDefaultState(props: PopoverProps) {
    return {
      isAnimating: false,
      arrowOffset: { left: 0, top: 0 },
      popoverOffset: { left: 0, top: 0 },
      placement: props.placement,
      isMounted: false,
      isLayerMounted: false,
      autoFocusAfterPositioning: false,
    };
  }

  animateIn = () => {
    if (this.props.isOpen) {
      this.setState({ isAnimating: true });
    }
  };

  animateOut = () => {
    if (!this.props.isOpen) {
      this.setState({ isAnimating: true });
      // Remove the popover from the DOM after animation finishes
      this.animateOutCompleteTimer = setTimeout(() => {
        this.setState({
          isAnimating: false,
          // Reset to ideal placement specified in props
          placement: this.props.placement,
        });
      }, this.props.animateOutTime || ANIMATE_OUT_TIME);
    }
  };

  clearTimers() {
    [
      this.animateInTimer,
      this.animateOutTimer,
      this.animateOutCompleteTimer,
      this.onMouseEnterTimer,
      this.onMouseLeaveTimer,
    ].forEach((timerId) => {
      if (timerId) {
        clearTimeout(timerId);
      }
    });
  }

  onAnchorClick = (e: React.MouseEvent) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  onAnchorMouseEnter = (e: React.MouseEvent) => {
    // First clear any existing close timers, this ensures that the user can
    // move their mouse from the popover back to anchor without it hiding
    if (this.onMouseLeaveTimer) {
      clearTimeout(this.onMouseLeaveTimer);
    }

    this.triggerOnMouseEnterWithDelay(e);
  };

  onAnchorMouseLeave = (e: React.MouseEvent) => {
    // Clear any existing open timer, otherwise popover could be stuck open
    if (this.onMouseEnterTimer) {
      clearTimeout(this.onMouseEnterTimer);
    }
    this.triggerOnMouseLeaveWithDelay(e);
  };

  onPopoverMouseEnter = () => {
    if (this.onMouseLeaveTimer) {
      clearTimeout(this.onMouseLeaveTimer);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPopoverMouseLeave = (e: React.MouseEvent<any>) => {
    this.triggerOnMouseLeaveWithDelay(e);
  };

  onPopperUpdate = (normalizedOffsets: NormalizedOffsets, data: PopperDataObject) => {
    const placement = fromPopperPlacement(data.placement) || PLACEMENT.top;
    this.setState({
      arrowOffset: normalizedOffsets.arrow,
      popoverOffset: normalizedOffsets.popper,
      placement,
    });

    // Now that element has been positioned, we can animate it in
    this.animateInTimer = setTimeout(this.animateIn, ANIMATE_IN_TIME);

    return data;
  };

  triggerOnMouseLeaveWithDelay(e: React.MouseEvent) {
    const { onMouseLeaveDelay } = this.props;
    if (onMouseLeaveDelay) {
      this.onMouseLeaveTimer = setTimeout(() => this.triggerOnMouseLeave(e), onMouseLeaveDelay);
      return;
    }
    this.triggerOnMouseLeave(e);
  }

  triggerOnMouseLeave = (e: React.MouseEvent) => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
  };

  triggerOnMouseEnterWithDelay(e: React.MouseEvent) {
    const { onMouseEnterDelay } = this.props;
    if (onMouseEnterDelay) {
      this.onMouseEnterTimer = setTimeout(() => this.triggerOnMouseEnter(e), onMouseEnterDelay);
      return;
    }
    this.triggerOnMouseEnter(e);
  }

  triggerOnMouseEnter = (e: React.MouseEvent) => {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }
  };

  onDocumentClick = (evt: MouseEvent) => {
    const target = evt.composedPath ? evt.composedPath()[0] : evt.target;
    const popper = this.popperRef.current;
    const anchor = this.anchorRef.current;
    // Ignore document click if it came from popover or anchor
    if (!popper || popper === target || (target instanceof Node && popper.contains(target))) {
      return;
    }
    if (!anchor || anchor === target || (target instanceof Node && popper.contains(target))) {
      return;
    }
    if (this.props.onClickOutside) {
      this.props.onClickOutside(evt);
    }
  };

  isClickTrigger() {
    return this.props.triggerType === TRIGGER_TYPE.click;
  }

  isHoverTrigger() {
    return this.props.triggerType === TRIGGER_TYPE.hover;
  }

  isAccessibilityTypeMenu() {
    return this.props.accessibilityType === ACCESSIBILITY_TYPE.menu;
  }

  isAccessibilityTypeTooltip() {
    return this.props.accessibilityType === ACCESSIBILITY_TYPE.tooltip;
  }

  getAnchorIdAttr() {
    const popoverId = this.getPopoverIdAttr();
    return popoverId ? `${popoverId}__anchor` : null;
  }

  getPopoverIdAttr() {
    return this.props.id || null;
  }

  getAnchorProps() {
    const { isOpen } = this.props;

    const anchorProps: AnchorProps = {
      'aria-haspopup': true,
      'aria-expanded': isOpen ? true : false,
      // @ts-expect-error todo(flow->ts): should it be here?
      key: 'popover-anchor',
      ref: this.anchorRef,
    };

    const popoverId = this.getPopoverIdAttr();
    if (this.isAccessibilityTypeMenu()) {
      const relationAttr = this.isClickTrigger() ? 'aria-controls' : 'aria-owns';
      anchorProps[relationAttr] = isOpen ? popoverId : null;
    } else if (this.isAccessibilityTypeTooltip()) {
      anchorProps.id = this.getAnchorIdAttr();
      anchorProps['aria-describedby'] = isOpen ? popoverId : null;
    }

    if (this.isHoverTrigger()) {
      anchorProps.onMouseEnter = this.onAnchorMouseEnter;
      anchorProps.onMouseLeave = this.onAnchorMouseLeave;

      // Make it focusable too
      anchorProps.onBlur = this.props.onBlur;
      anchorProps.onFocus = this.props.onFocus;
    } else {
      anchorProps.onClick = this.onAnchorClick;
    }
    return anchorProps;
  }

  getPopoverBodyProps() {
    const bodyProps: React.HTMLAttributes<'body'> = {};

    const popoverId = this.getPopoverIdAttr();
    if (this.isAccessibilityTypeMenu()) {
      bodyProps.id = popoverId;
    } else if (this.isAccessibilityTypeTooltip()) {
      bodyProps.id = popoverId;
      bodyProps.role = 'tooltip';
    }
    if (this.isHoverTrigger()) {
      bodyProps.onMouseEnter = this.onPopoverMouseEnter;
      bodyProps.onMouseLeave = this.onPopoverMouseLeave;
    }

    return bodyProps;
  }

  getSharedProps(): Omit<SharedStylePropsArg, 'children'> {
    const { isOpen, showArrow, popoverMargin = POPOVER_MARGIN } = this.props;
    const { isAnimating, arrowOffset, popoverOffset, placement } = this.state;
    return {
      $showArrow: !!showArrow,
      $arrowOffset: arrowOffset,
      $popoverOffset: popoverOffset,
      $placement: placement,
      $isAnimating: isAnimating,
      $animationDuration: this.props.animateOutTime || ANIMATE_OUT_TIME,
      $isOpen: isOpen,
      $popoverMargin: popoverMargin,
      $isHoverTrigger: this.isHoverTrigger(),
    };
  }

  getAnchorFromChildren() {
    const { children } = this.props;
    const childArray = React.Children.toArray(children);
    if (childArray.length !== 1) {
      // eslint-disable-next-line no-console
      console.error(
        `[baseui] Exactly 1 child must be passed to Popover/Tooltip, found ${childArray.length} children`
      );
    }
    return childArray[0];
  }

  renderAnchor() {
    const anchor = this.getAnchorFromChildren();
    if (!anchor) {
      return null;
    }

    const isValidElement = React.isValidElement(anchor);
    const anchorProps = this.getAnchorProps();

    if (typeof anchor === 'object' && isValidElement) {
      return React.cloneElement(anchor, anchorProps);
    }
    return <span {...anchorProps}>{anchor}</span>;
  }

  renderPopover(renderedContent: React.ReactNode) {
    const { showArrow, overrides = {} } = this.props;

    const { Arrow: ArrowOverride, Body: BodyOverride, Inner: InnerOverride } = overrides;

    const Arrow = getOverride(ArrowOverride) || StyledArrow;
    const Body = getOverride(BodyOverride) || StyledBody;
    const Inner = getOverride(InnerOverride) || StyledInner;

    const sharedProps = this.getSharedProps();
    const bodyProps = this.getPopoverBodyProps();

    return (
      <Body
        key="popover-body"
        ref={this.popperRef}
        data-baseweb={this.props['data-baseweb'] || 'popover'}
        {...bodyProps}
        {...sharedProps}
        {...getOverrideProps(BodyOverride)}
      >
        {showArrow ? (
          <Arrow
            key="popover-arrow"
            ref={this.arrowRef}
            {...sharedProps}
            {...getOverrideProps(ArrowOverride)}
          />
        ) : null}
        <Inner {...sharedProps} {...getOverrideProps(InnerOverride)}>
          {renderedContent}
        </Inner>
      </Body>
    );
  }

  renderContent() {
    const { content } = this.props;
    return typeof content === 'function' ? content() : content;
  }

  render() {
    const mountedAndOpen = this.state.isMounted && (this.props.isOpen || this.state.isAnimating);
    const rendered = [this.renderAnchor()];
    const renderedContent = mountedAndOpen || this.props.renderAll ? this.renderContent() : null;

    const defaultPopperOptions = {
      modifiers: {
        preventOverflow: { enabled: !this.props.ignoreBoundary, padding: 0 },
      },
    };
    // Only render popover on the browser (portals aren't supported server-side)
    if (renderedContent) {
      if (mountedAndOpen) {
        rendered.push(
          <Layer
            key="new-layer"
            mountNode={this.props.mountNode}
            onEscape={this.props.onEsc}
            onDocumentClick={this.isHoverTrigger() ? undefined : this.onDocumentClick}
            isHoverLayer={this.isHoverTrigger()}
            onMount={() => this.setState({ isLayerMounted: true })}
            onUnmount={() => this.setState({ isLayerMounted: false })}
          >
            <TetherBehavior
              anchorRef={this.anchorRef.current}
              arrowRef={this.arrowRef.current}
              popperRef={this.popperRef.current}
              // Remove the `ignoreBoundary` prop in the next major version
              // and have it replaced with the TetherBehavior props overrides
              popperOptions={{
                ...defaultPopperOptions,
                ...this.props.popperOptions,
              }}
              onPopperUpdate={this.onPopperUpdate}
              placement={this.state.placement}
            >
              {this.props.focusLock ? (
                <FocusLock
                  disabled={!this.props.focusLock}
                  noFocusGuards={false}
                  // see popover-focus-loop.scenario.js for why hover cannot return focus
                  returnFocus={!this.isHoverTrigger() && this.props.returnFocus}
                  autoFocus={this.state.autoFocusAfterPositioning}
                  // Allow focus to escape when UI is within an iframe
                  crossFrame={false}
                  focusOptions={this.props.focusOptions}
                >
                  {this.renderPopover(renderedContent)}
                </FocusLock>
              ) : (
                <MoveFocusInside
                  disabled={!this.props.autoFocus || !this.state.autoFocusAfterPositioning}
                >
                  {this.renderPopover(renderedContent)}
                </MoveFocusInside>
              )}
            </TetherBehavior>
          </Layer>
        );
      } else {
        rendered.push(<Hidden key="hidden-layer">{renderedContent}</Hidden>);
      }
    }
    return rendered;
  }
}

// Remove when Popover is converted to a functional component.
const Popover = (
  props: PopoverProps & {
    innerRef?: React.Ref<HTMLElement>;
  }
) => {
  const { innerRef } = props;
  const gID = useUID();
  return (
    <PopoverInner
      id={props.id || gID}
      // @ts-expect-error
      ref={innerRef}
      {...props}
    />
  );
};

Popover.defaultProps = defaultProps;

export default Popover;
/* eslint-enable react/no-find-dom-node */
