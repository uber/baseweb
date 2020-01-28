import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import {Override} from '../overrides';

export interface SIZE {
  default: 'default';
  full: 'full';
  auto: 'auto';
}

export interface SIZE_DIMENSIONS {
  default: '500px';
  full: '100%';
  auto: 'auto';
}

export interface ANCHOR {
  left: 'left';
  right: 'right';
  top: 'top';
  bottom: 'bottom';
}

export interface CLOSE_SOURCE {
  closeButton: 'closeButton';
  backdrop: 'backdrop';
  escape: 'escape';
}

export interface SharedStylePropsArg {
  children?: React.ReactNode;
  $animating?: boolean;
  $isVisible?: boolean;
  $isOpen?: boolean;
  $size?: SIZE[keyof SIZE];
  $closeable?: boolean;
  $anchor?: ANCHOR[keyof ANCHOR];
}

export interface DrawerOverrides {
  Root?: Override<SharedStylePropsArg>;
  Backdrop?: Override<SharedStylePropsArg>;
  DrawerContainer?: Override<SharedStylePropsArg>;
  DrawerBody?: Override<SharedStylePropsArg>;
  Close?: Override<SharedStylePropsArg>;
}

export interface DrawerProps {
  animate?: boolean;
  children?: React.ReactNode;
  closeable?: boolean;
  autoFocus?: boolean;
  renderAll?: boolean;
  isOpen?: boolean;
  mountNode?: HTMLElement;
  onClose?: (args: {closeSource?: CLOSE_SOURCE[keyof CLOSE_SOURCE]}) => any;
  overrides?: DrawerOverrides;
  size?: SIZE[keyof SIZE] | string;
  anchor?: ANCHOR[keyof ANCHOR] | string;
  showBackdrop?: boolean;
  onBackdropClick?: (event: React.MouseEvent<HTMLElement>) => any;
  onEscapeKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => any;
}
export interface DrawerState {
  isVisible: boolean;
  mounted: boolean;
}
export class Drawer extends React.Component<DrawerProps, DrawerState> {
  addDomEvents(): void;
  removeDomEvents(): void;
  disableMountNodeScroll(): void;
  resentMountNodeScroll(): void;
  onDocumentKeyPress(event: KeyboardEvent): void;
  onBackdropClick(): void;
  onCloseClick(): void;
  clearTimers(): void;
  didOpen(): void;
  didClose(): void;
  triggerClose(source: CLOSE_SOURCE[keyof CLOSE_SOURCE]): void;
  animateOutComplete(): void;
  getSharedProps(): SharedStylePropsArg & {children: React.ReactNode};
  getChildren(): React.ReactNode;
  getRef(component: string): React.Ref<any>;
  renderDrawer(): React.ReactNode;
}

export const StyledRoot: StyletronComponent<any>;
export const StyledBackdrop: StyletronComponent<any>;
export const StyledDrawerContainer: StyletronComponent<any>;
export const StyledDrawerBody: StyletronComponent<any>;
export const StyledClose: StyletronComponent<any>;

export const SIZE: SIZE;
export const ANCHOR: ANCHOR;
export const SIZE_DIMENSIONS: SIZE_DIMENSIONS;
export const CLOSE_SOURCE: CLOSE_SOURCE;
