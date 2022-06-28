import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';
import { NormalizedOffsets, PopperDataObject, TetherPlacement } from '../layer';

export declare const ACCESSIBILITY_TYPE: {
  none: 'none';
  menu: 'menu';
  tooltip: 'tooltip';
};
export declare const PLACEMENT: {
  auto: 'auto';
  topLeft: 'topLeft';
  top: 'top';
  topRight: 'topRight';
  rightTop: 'rightTop';
  right: 'right';
  rightBottom: 'rightBottom';
  bottomRight: 'bottomRight';
  bottom: 'bottom';
  bottomLeft: 'bottomLeft';
  leftBottom: 'leftBottom';
  left: 'left';
  leftTop: 'leftTop';
};
export declare const TRIGGER_TYPE: {
  click: 'click';
  hover: 'hover';
};
export declare const STATE_CHANGE_TYPE: {
  open: 'open';
  close: 'close';
};

export const ANIMATE_IN_TIME = 20;
export const ANIMATE_OUT_TIME = 0;

export type StateReducer = (
  stateChangeType: typeof STATE_CHANGE_TYPE[keyof typeof STATE_CHANGE_TYPE],
  nextState: State,
  currentState: State
) => State;

export type StatefulPopoverProps = BasePopoverProps & {
  children?: React.ReactNode;
  content?: React.ReactNode | ((args: { close: () => void }) => React.ReactNode);
  dismissOnClickOutside?: boolean;
  dismissOnEsc?: boolean;
  initialState?: State;
  onClose?: () => any;
  onOpen?: () => any;
  stateReducer?: StateReducer;
};
export declare const StatefulPopover: React.FC<StatefulPopoverProps>;

export type StatefulPopoverContainerProps = StatefulPopoverProps & {
  children: (props: PopoverProps & { children: never }) => React.ReactNode;
};
export interface State {
  isOpen: boolean;
}
export class StatefulContainer extends React.Component<StatefulPopoverContainerProps, State> {
  onBlur(): void;
  onClick(): void;
  onClickOutside(): void;
  onEsc(): void;
  onFocus(): void;
  onMouseEnter(): void;
  onMouseLeave(): void;
  onContentClose(): void;
  open(): void;
  close(): void;
  internalSetState(
    type: typeof STATE_CHANGE_TYPE[keyof typeof STATE_CHANGE_TYPE],
    changes: State
  ): void;
}

export interface SharedStylePropsArg {
  $arrowOffset?: Offset;
  $isAnimating?: boolean;
  $isOpen?: boolean;
  $popoverOffset?: Offset;
  $placement?: TetherPlacement[keyof TetherPlacement];
  $showArrow?: boolean;
  $popoverMargin?: number;
}
export interface PopoverOverrides {
  Body?: Override<SharedStylePropsArg>;
  Arrow?: Override<SharedStylePropsArg>;
  Inner?: Override<SharedStylePropsArg>;
}
export interface BasePopoverProps {
  accessibilityType?: typeof ACCESSIBILITY_TYPE[keyof typeof ACCESSIBILITY_TYPE];
  focusLock?: boolean;
  autoFocus?: boolean;
  focusOptions?: FocusOptions;
  returnFocus?: boolean | FocusOptions | ((returnTo: Element) => boolean | FocusOptions);
  'data-baseweb'?: string;
  id?: string;
  ignoreBoundary?: boolean;
  onMouseEnterDelay?: number;
  onMouseLeaveDelay?: number;
  overrides?: PopoverOverrides;
  placement?: TetherPlacement[keyof TetherPlacement];
  showArrow?: boolean;
  triggerType?: typeof TRIGGER_TYPE[keyof typeof TRIGGER_TYPE];
  mountNode?: HTMLElement;
  animateOutTime?: number;
  popperOptions?: any;
  renderAll?: boolean;
  popoverMargin?: number;
}
export type PopoverProps = BasePopoverProps & {
  children: React.ReactNode;
  content: React.ReactNode | (() => React.ReactNode);
  isOpen: boolean;
  onBlur?: () => any;
  onClick?: (e: Event) => any;
  onClickOutside?: (event: MouseEvent) => any;
  onEsc?: () => any;
  onFocus?: () => any;
  onMouseEnter?: () => any;
  onMouseLeave?: () => any;
};

export interface Offset {
  top: number;
  left: number;
}
export interface PopoverPrivateState {
  isAnimating: boolean;
  arrowOffset: Offset;
  popoverOffset: Offset;
  placement: TetherPlacement[keyof TetherPlacement];
  isLayerMounted: boolean;
  isMounted: boolean;
}
export class Popover extends React.Component<PopoverProps, PopoverPrivateState> {
  init(prevProps: PopoverProps, prevState: PopoverPrivateState): void;
  getDefaultState(props: PopoverProps): {
    isAnimating: false;
    arrowOffset: { left: 0; top: 0 };
    popoverOffset: { left: 0; top: 0 };
    placement: typeof PLACEMENT[keyof typeof PLACEMENT];
    isMounted: false;
    isLayerMounted: false;
  };
  animateIn(): void;
  animateOut(): void;
  clearTimers(): void;
  onAnchorClick(e: Event): void;
  onAnchorMouseEnter(): void;
  onAnchorMouseLeave(): void;
  onPopoverMouseEnter(): void;
  onPopoverMouseLeave(): void;
  onKeyPress(evt: KeyboardEvent): void;
  onPopperUpdate(normalizedOffsets: NormalizedOffsets, data: PopperDataObject): void;
  triggerOnMouseLeaveWithDelay(): void;
  triggerOnMouseLeave(): void;
  triggerOnMouseEnterWithDelay(): void;
  triggerOnMouseEnter(): void;
  addDomEvents(): void;
  removeDomEvents(): void;
  onDocumentClick(evt: MouseEvent): void;
  isClickTrigger(): boolean;
  isHoverTrigger(): boolean;
  isAccessibilityTypeMenu(): boolean;
  isAccessibilityTypeTooltip(): boolean;
  getAnchorIdAttr(): string | null;
  getPopoverIdAttr(): string | null;
  getAnchorProps(): object;
  getPopoverBodyProps(): object;
  getSharedProps(): SharedStylePropsArg & { children?: React.ReactNode };
  getAnchorFromChildren(): React.ReactNode;
  renderAnchor(): React.ReactNode;
  renderPopover(): React.ReactNode;
}

export declare const StyledArrow: StyletronComponent<any, any>;
export declare const StyledBody: StyletronComponent<any, any>;
export declare const StyledInner: StyletronComponent<any, any>;
export declare const StyledPadding: StyletronComponent<any, any>;

export declare const POPOVER_MARGIN: 8;
export declare const ARROW_SIZE: 6;
export declare const ARROW_WIDTH: number;
