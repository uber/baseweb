import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { ButtonProps } from '../button';
import { Override } from '../overrides';

export declare const SIZE: {
  default: 'default';
  full: 'full';
  auto: 'auto';
};

export declare const SIZE_WIDTHS: {
  default: '500px';
  full: '100%';
  auto: 'auto';
};
export declare const ROLE: {
  dialog: 'dialog';
  alertdialog: 'alertdialog';
};
export declare const CLOSE_SOURCE: {
  closeButton: 'closeButton';
  backdrop: 'backdrop';
  escape: 'escape';
};

export interface SharedStylePropsArg {
  children?: React.ReactNode;
  $animate?: boolean;
  $isVisible?: boolean;
  $isOpen?: boolean;
  $size?: typeof SIZE[keyof typeof SIZE];
  $role?: typeof ROLE[keyof typeof ROLE];
  $closeable?: boolean;
}

export interface ModalOverrides {
  Root?: Override<SharedStylePropsArg>;
  Dialog?: Override<SharedStylePropsArg>;
  DialogContainer?: Override<SharedStylePropsArg>;
  Close?: Override<SharedStylePropsArg>;
}
export interface ModalProps {
  animate?: boolean;
  autoFocus?: boolean;
  focusLock?: boolean;
  returnFocus?: boolean | FocusOptions | ((returnTo: Element) => boolean | FocusOptions);
  children?: React.ReactNode;
  closeable?: boolean;
  isOpen?: boolean;
  mountNode?: HTMLElement;
  onClose?: (args: { closeSource?: typeof CLOSE_SOURCE[keyof typeof CLOSE_SOURCE] }) => any;
  overrides?: ModalOverrides;
  role?: typeof ROLE[keyof typeof ROLE];
  size?: typeof SIZE[keyof typeof SIZE];
}
export interface ModalState {
  isVisible: boolean;
  mounted: boolean;
}
export class Modal extends React.Component<ModalProps, ModalState> {
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
  captureLastFocus(): void;
  restoreLastFocus(): void;
  autoFocus(): void;
  animateOutComplete(): void;
  getSharedProps(): SharedStylePropsArg & { children: React.ReactNode };
  getMountNode(): HTMLElement;
  getChildren(): React.ReactNode;
  getRef(component: string): React.Ref<any>;
  renderModal(): React.ReactNode;
}

export class ModalButton extends React.Component<ButtonProps & { autoFocus?: boolean }> {}

export class FocusOnce extends React.Component<{ children: React.ReactNode }> {}

export declare const StyledRoot: StyletronComponent<any>;
export declare const StyledDialog: StyletronComponent<any>;
export declare const StyledDialogContainer: StyletronComponent<any>;
export declare const StyledClose: StyletronComponent<any>;
export declare const ModalHeader: StyletronComponent<any>;
export declare const ModalBody: StyletronComponent<any>;
export declare const ModalFooter: StyletronComponent<any>;
