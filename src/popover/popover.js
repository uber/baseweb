// @flow
/* eslint-disable react/no-find-dom-node */
import * as React from 'react';
import ReactDOM from 'react-dom';
import document from 'global/document';
import Popper from 'popper.js';
import isBrowser from '../utils/is-browser';
import getBuiId from '../utils/get-bui-id';
import {ACCESSIBILITY_TYPE, PLACEMENT, TRIGGER_TYPE} from './constants';
import {
  Arrow as StyledArrow,
  Body as StyledBody,
  Inner as StyledInner,
} from './styled-components';
import {
  toPopperPlacement,
  fromPopperPlacement,
  prepareArrowPositionStyles,
  preparePopoverPositionStyles,
} from './utils';
import defaultProps from './default-props';

import type {
  AnchorPropsT,
  PopoverPropsT,
  PopoverPrivateStateT,
  PopperDataObjectT,
  ChildT,
} from './types';

class Popover extends React.Component<PopoverPropsT, PopoverPrivateStateT> {
  static defaultProps: $Shape<PopoverPropsT> = defaultProps;

  /* eslint-disable react/sort-comp */
  animateInTimer: ?TimeoutID;
  animateOutTimer: ?TimeoutID;
  animateOutCompleteTimer: ?TimeoutID;
  onMouseEnterTimer: ?TimeoutID;
  onMouseLeaveTimer: ?TimeoutID;
  generatedId: string = '';
  popper: ?Popper;
  anchorRef = React.createRef();
  popperRef = React.createRef();
  arrowRef = React.createRef();
  /* eslint-enable react/sort-comp */

  /**
   * Yes our "Stateless" popover still has state. This is private state that
   * customers shouldn't have to manage themselves, such as positioning and
   * other internal flags for managing animation states.
   */
  state = this.getDefaultState(this.props);

  componentDidMount() {
    if (this.props.isOpen) {
      this.initializePopper();
      this.addDomEvents();
    }
    this.generatedId = getBuiId();
  }

  componentDidUpdate(prevProps: PopoverPropsT) {
    if (this.props.isOpen !== prevProps.isOpen) {
      if (this.props.isOpen) {
        // Opening
        this.initializePopper();
        this.addDomEvents();
      } else {
        // Closing
        this.destroyPopover();
        this.removeDomEvents();
        this.animateOutTimer = setTimeout(this.animateOut, 20);
      }
    }
  }

  componentWillUnmount() {
    this.destroyPopover();
    this.removeDomEvents();
    this.clearTimers();
  }

  getDefaultState(props: PopoverPropsT) {
    return {
      isAnimating: false,
      arrowStyles: {left: '0px', top: '0px'},
      positionStyles: {left: '0px', top: '0px'},
      placement: props.placement,
    };
  }

  animateIn = () => {
    if (this.props.isOpen) {
      this.setState({isAnimating: true});
    }
  };

  animateOut = () => {
    if (!this.props.isOpen) {
      this.setState({isAnimating: true});
      // Remove the popover from the DOM after animation finishes
      this.animateOutCompleteTimer = setTimeout(() => {
        this.setState({isAnimating: false});
      }, 500);
    }
  };

  initializePopper() {
    const {placement} = this.state;
    this.popper = new Popper(this.anchorRef.current, this.popperRef.current, {
      // Recommended placement (popper may ignore if it causes a viewport overflow, etc)
      placement: toPopperPlacement(placement),
      modifiers: {
        // Passing the arrow ref will measure the arrow when calculating styles
        arrow: {
          element: this.arrowRef.current,
          enabled: this.props.showArrow,
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
      },
    });
  }

  clearTimers() {
    [
      this.animateInTimer,
      this.animateOutTimer,
      this.animateOutCompleteTimer,
      this.onMouseEnterTimer,
      this.onMouseLeaveTimer,
    ].forEach(timerId => {
      if (timerId) {
        clearTimeout(timerId);
      }
    });
  }

  onAnchorClick = (e: Event) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  onAnchorMouseEnter = () => {
    // First clear any existing close timers, this ensures that the user can
    // move their mouse from the popover back to anchor without it hiding
    if (this.onMouseLeaveTimer) {
      clearTimeout(this.onMouseLeaveTimer);
    }

    this.triggerOnMouseEnterWithDelay();
  };

  onAnchorMouseLeave = () => {
    this.triggerOnMouseLeaveWithDelay();
  };

  onPopoverMouseEnter = () => {
    if (this.onMouseLeaveTimer) {
      clearTimeout(this.onMouseLeaveTimer);
    }
  };

  onPopoverMouseLeave = () => {
    this.triggerOnMouseLeaveWithDelay();
  };

  onKeyPress = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape' && this.props.onEsc) {
      this.props.onEsc();
    }
  };

  onPopperUpdate = (data: PopperDataObjectT) => {
    const placement = fromPopperPlacement(data.placement) || PLACEMENT.top;
    this.setState({
      arrowStyles: prepareArrowPositionStyles(data.arrowStyles, placement),
      positionStyles: preparePopoverPositionStyles(data.styles),
      placement,
    });

    // Now that element has been positioned, we can animate it in
    this.animateInTimer = setTimeout(this.animateIn, 20);

    return data;
  };

  triggerOnMouseLeaveWithDelay() {
    const {onMouseLeaveDelay} = this.props;
    if (onMouseLeaveDelay) {
      this.onMouseLeaveTimer = setTimeout(
        this.triggerOnMouseLeave,
        onMouseLeaveDelay,
      );
      return;
    }
    this.triggerOnMouseLeave();
  }

  triggerOnMouseLeave = () => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave();
    }
  };

  triggerOnMouseEnterWithDelay() {
    const {onMouseEnterDelay} = this.props;
    if (onMouseEnterDelay) {
      this.onMouseEnterTimer = setTimeout(
        this.triggerOnMouseEnter,
        onMouseEnterDelay,
      );
      return;
    }
    this.triggerOnMouseEnter();
  }

  triggerOnMouseEnter = () => {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter();
    }
  };

  addDomEvents() {
    if (!isBrowser) {
      return;
    }
    document.addEventListener('mousedown', this.onDocumentClick);
    document.addEventListener('keyup', this.onKeyPress);
  }

  removeDomEvents() {
    if (!isBrowser) {
      return;
    }
    document.removeEventListener('mousedown', this.onDocumentClick);
    document.removeEventListener('keyup', this.onKeyPress);
  }

  onDocumentClick = (evt: MouseEvent) => {
    const target = evt.target;
    const popper = this.popperRef.current;
    const anchor = this.anchorRef.current;
    // Ignore document click if it came from popover or anchor
    if (!popper || popper === target || popper.contains(target)) {
      return;
    }
    if (!anchor || anchor === target || anchor.contains(target)) {
      return;
    }
    if (this.props.onClickOutside) {
      this.props.onClickOutside();
    }
  };

  destroyPopover() {
    if (this.popper) {
      this.popper.destroy();
      delete this.popper;
    }
    if (this.isClickTrigger()) {
      this.removeDomEvents();
    }
  }

  isClickTrigger() {
    return this.props.triggerType === TRIGGER_TYPE.click;
  }

  isHoverTrigger() {
    return this.props.triggerType === TRIGGER_TYPE.hover;
  }

  isAccessiblityTypeMenu() {
    return this.props.accessibilityType === ACCESSIBILITY_TYPE.menu;
  }

  isAccessiblityTypeTooltip() {
    return this.props.accessibilityType === ACCESSIBILITY_TYPE.tooltip;
  }

  getAnchorIdAttr() {
    const popoverId = this.getPopoverIdAttr();
    return popoverId ? `${popoverId}__anchor` : null;
  }

  getPopoverIdAttr() {
    return this.props.id || this.generatedId || null;
  }

  getAnchorProps(refKey: 'ref' | '$ref') {
    const {isOpen} = this.props;

    const anchorProps: AnchorPropsT = {
      key: 'popover-anchor',
      // TODO Once styletron gets forwardRef support, switch to always using ref
      // https://github.com/rtsao/styletron/issues/253
      [refKey]: this.anchorRef,
      // Always attach onClick–it's still useful to toggle via click
      // even if the anchor is hoverable
      onClick: this.onAnchorClick,
    };

    const anchorId = this.getAnchorIdAttr();
    const popoverId = this.getPopoverIdAttr();
    if (this.isAccessiblityTypeMenu()) {
      anchorProps['aria-haspopup'] = 'true';
      anchorProps['aria-expanded'] = isOpen ? 'true' : 'false';
      const relationAttr = this.isClickTrigger()
        ? 'aria-controls'
        : 'aria-owns';
      anchorProps[relationAttr] = isOpen ? popoverId : null;
    } else if (this.isAccessiblityTypeTooltip()) {
      anchorProps.id = anchorId;
      anchorProps['aria-describedby'] = isOpen ? popoverId : null;
    }

    if (this.isHoverTrigger()) {
      anchorProps.onMouseEnter = this.onAnchorMouseEnter;
      anchorProps.onMouseLeave = this.onAnchorMouseLeave;

      // Make it focusable too
      anchorProps.onBlur = this.props.onBlur;
      anchorProps.onFocus = this.props.onFocus;
    }
    return anchorProps;
  }

  getPopoverBodyProps() {
    const bodyProps = {};

    const popoverId = this.getPopoverIdAttr();
    if (this.isAccessiblityTypeMenu()) {
      bodyProps.id = popoverId;
    } else if (this.isAccessiblityTypeTooltip()) {
      bodyProps.id = popoverId;
      bodyProps.role = 'tooltip';
    }
    if (this.isHoverTrigger()) {
      bodyProps.onMouseEnter = this.onPopoverMouseEnter;
      bodyProps.onMouseLeave = this.onPopoverMouseLeave;
    }

    return bodyProps;
  }

  getSharedProps() {
    const {isOpen, showArrow} = this.props;
    const {isAnimating, arrowStyles, positionStyles, placement} = this.state;
    return {
      $showArrow: showArrow,
      $arrowStyles: arrowStyles,
      $positionStyles: positionStyles,
      $placement: placement,
      $isAnimating: isAnimating,
      $isOpen: isOpen,
    };
  }

  getAnchorFromChildren() {
    const {children} = this.props;
    const childArray: Array<ChildT> = React.Children.toArray(children);
    if (childArray.length !== 1) {
      // eslint-disable-next-line no-console
      console.error(
        `[baseui] Exactly 1 child must be passed to Popover/Tooltip, found ${
          childArray.length
        } children`,
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
    const isDomElement =
      typeof anchor === 'object' && typeof anchor.type === 'string';

    // Use $ref for complex components, ref for html elements
    const refKey = isValidElement && !isDomElement ? '$ref' : 'ref';

    const anchorProps = this.getAnchorProps(refKey);

    if (typeof anchor === 'object' && isValidElement) {
      return React.cloneElement(anchor, anchorProps);
    }
    return <span {...anchorProps}>{anchor}</span>;
  }

  renderPopover() {
    const {showArrow, components = {}, content} = this.props;
    const {
      Arrow = StyledArrow,
      Body = StyledBody,
      Inner = StyledInner,
    } = components;

    const sharedProps = this.getSharedProps();
    const bodyProps = this.getPopoverBodyProps();

    return (
      <Body
        key="popover-body"
        $ref={this.popperRef}
        {...bodyProps}
        {...sharedProps}
      >
        {showArrow ? (
          <Arrow key="popover-arrow" $ref={this.arrowRef} {...sharedProps} />
        ) : null}
        <Inner key="popover-inner" {...sharedProps}>
          {typeof content === 'function' ? content() : content}
        </Inner>
      </Body>
    );
  }

  render() {
    const rendered = [this.renderAnchor()];

    // Only render popover on the browser (portals aren't supported server-side)
    if (isBrowser && (this.props.isOpen || this.state.isAnimating)) {
      rendered.push(ReactDOM.createPortal(this.renderPopover(), document.body));
    }
    return rendered;
  }
}

export default Popover;
