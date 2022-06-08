import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export declare const SIZE: {
  default: 'default';
  full: 'full';
  auto: 'auto';
};

export declare const SIZE_DIMENSIONS: {
  default: '500px';
  full: '100%';
  auto: 'auto';
};

export declare const ANCHOR: {
  left: 'left';
  right: 'right';
  top: 'top';
  bottom: 'bottom';
};

export declare const CLOSE_SOURCE: {
  closeButton: 'closeButton';
  backdrop: 'backdrop';
  escape: 'escape';
};

export interface SharedStylePropsArg {
  children?: React.ReactNode;
  $animating?: boolean;
  $isVisible?: boolean;
  $isOpen?: boolean;
  $size?: typeof SIZE[keyof typeof SIZE];
  $closeable?: boolean;
  $anchor?: typeof ANCHOR[keyof typeof ANCHOR];
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
  onClose?: (args: { closeSource?: typeof CLOSE_SOURCE[keyof typeof CLOSE_SOURCE] }) => any;
  overrides?: DrawerOverrides;
  size?: typeof SIZE[keyof typeof SIZE] | string;
  anchor?: typeof ANCHOR[keyof typeof ANCHOR] | string;
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
  triggerClose(source: typeof CLOSE_SOURCE[keyof typeof CLOSE_SOURCE]): void;
  animateOutComplete(): void;
  getSharedProps(): SharedStylePropsArg & { children: React.ReactNode };
  getChildren(): React.ReactNode;
  getRef(component: string): React.Ref<any>;
  renderDrawer(): React.ReactNode;
}

export declare const StyledRoot: StyletronComponent<any>;
export declare const StyledBackdrop: StyletronComponent<any>;
export declare const StyledDrawerContainer: StyletronComponent<any>;
export declare const StyledDrawerBody: StyletronComponent<any>;
export declare const StyledClose: StyletronComponent<any>;
