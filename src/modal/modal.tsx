/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global document */

import * as React from 'react';
import FocusLock from 'react-focus-lock';

import { LocaleContext } from '../locale';
import { getOverrides } from '../helpers/overrides';
import { Layer } from '../layer';
import { SIZE, ROLE, CLOSE_SOURCE } from './constants';
import {
  Root as StyledRoot,
  Dialog as StyledDialog,
  DialogContainer as StyledDialogContainer,
  Close as StyledClose,
} from './styled-components';
import { CloseIcon } from './close-icon';

import type { ModalProps, ModalState, SharedStylePropsArg, CloseSource } from './types';
import { isFocusVisible, forkFocus, forkBlur } from '../utils/focusVisible';

import type { SyntheticEvent } from 'react';

class Modal extends React.Component<ModalProps, ModalState> {
  static defaultProps: Partial<ModalProps> = {
    animate: true,
    autoFocus: true,
    focusLock: true,
    returnFocus: true,
    closeable: true,
    name: 'dialog',
    isOpen: false,
    overrides: {},
    role: ROLE.dialog,
    size: SIZE.default,
  };

  animateOutTimer: ReturnType<typeof setTimeout> | undefined | null;
  animateStartTimer: ReturnType<typeof requestAnimationFrame> | undefined | null;
  dialogContainerRef = React.createRef<HTMLElement>();
  lastFocus: HTMLElement | undefined | null = null;
  lastMountNodeOverflowStyle: string | undefined | null = null;
  rootRef = React.createRef<HTMLElement>();

  state = {
    isVisible: false,
    mounted: false,
    isFocusVisible: false,
  };

  componentDidMount() {
    this.setState({ mounted: true });
    if (__DEV__) {
      // @ts-expect-error checking for property with incorrect name
      if (this.props.closable) {
        console.warn(
          'The property `closable` is not supported on the Modal. Did you mean `closeable`?'
        );
      }
    }
  }

  componentWillUnmount() {
    this.resetMountNodeScroll();
    this.clearTimers();
  }

  componentDidUpdate(prevProps: ModalProps, prevState: ModalState) {
    const { isOpen } = this.props;
    if (
      // If isOpen is changing *or* we just mounted and modal should be open
      isOpen !== prevProps.isOpen ||
      (isOpen && this.state.mounted && !prevState.mounted)
    ) {
      if (isOpen) {
        this.didOpen();
      } else {
        this.didClose();
      }
    }
  }

  handleFocus = (event: SyntheticEvent) => {
    if (isFocusVisible(event)) {
      this.setState({ isFocusVisible: true });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleBlur = (event: SyntheticEvent) => {
    if (this.state.isFocusVisible !== false) {
      this.setState({ isFocusVisible: false });
    }
  };

  disableMountNodeScroll() {
    const mountNode = this.getMountNode();
    this.lastMountNodeOverflowStyle = mountNode.style.overflow || '';
    mountNode.style.overflow = 'hidden';
  }

  resetMountNodeScroll() {
    const mountNode = this.getMountNode();
    const lastStyle = this.lastMountNodeOverflowStyle;
    if (mountNode && lastStyle !== null) {
      // If overflow is not 'hidden', something else has changed the
      // overflow style and we shouldn't try to reset it.
      if (mountNode.style.overflow === 'hidden') {
        mountNode.style.overflow = lastStyle || '';
      }
      this.lastMountNodeOverflowStyle = null;
    }
  }

  onEscape = () => {
    if (!this.props.closeable) {
      return;
    }
    this.triggerClose(CLOSE_SOURCE.escape);
  };

  onDocumentClick = (e: MouseEvent) => {
    if (
      e.target &&
      e.target instanceof HTMLElement &&
      e.target.contains(this.dialogContainerRef.current)
    ) {
      this.onBackdropClick();
    }
  };

  onBackdropClick = () => {
    if (!this.props.closeable) {
      return;
    }
    this.triggerClose(CLOSE_SOURCE.backdrop);
  };

  onCloseClick = () => {
    this.triggerClose(CLOSE_SOURCE.closeButton);
  };

  clearTimers() {
    if (this.animateOutTimer) {
      clearTimeout(this.animateOutTimer);
    }
    if (this.animateStartTimer) {
      cancelAnimationFrame(this.animateStartTimer);
    }
  }

  didOpen() {
    // Sometimes scroll starts past zero, possibly due to animation
    // Reset scroll to 0 (other libraries do this as well)
    const rootRef = this.rootRef.current;
    if (rootRef) {
      rootRef.scrollTop = 0;
    }

    // Clear any existing timers (like previous animateOutTimer)
    this.clearTimers();

    this.disableMountNodeScroll();

    this.animateStartTimer = requestAnimationFrame(() => {
      this.setState({ isVisible: true });
    });
  }

  didClose() {
    this.resetMountNodeScroll();
    this.animateOutTimer = setTimeout(this.animateOutComplete, 500);
  }

  triggerClose(source?: CloseSource) {
    // If there's no source, it just means the isOpen prop changed. No need to call onClose.
    if (this.props.onClose && source) {
      this.props.onClose({
        closeSource: source,
      });
    }
  }

  animateOutComplete = () => {
    this.setState({
      isVisible: false,
    });
  };

  getSharedProps(): Omit<SharedStylePropsArg, 'children'> {
    const { animate, isOpen, size, role, closeable } = this.props;
    return {
      // @ts-ignore
      $animate: animate,
      $isVisible: this.state.isVisible,
      $isOpen: !!isOpen,
      // @ts-ignore
      $size: size,
      // @ts-ignore
      $role: role,
      $closeable: !!closeable,
      $isFocusVisible: this.state.isFocusVisible,
    };
  }

  getMountNode(): HTMLElement {
    const { mountNode } = this.props;
    if (mountNode) {
      return mountNode;
    }
    // Flow thinks body could be null (cast through any)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return document.body as any as HTMLBodyElement;
  }

  getChildren() {
    const { children } = this.props;
    return typeof children === 'function' ? children() : children;
  }

  renderModal() {
    const { overrides = {}, closeable, role, autoFocus, focusLock, returnFocus } = this.props;

    const {
      Root: RootOverride,
      Dialog: DialogOverride,
      DialogContainer: DialogContainerOverride,
      Close: CloseOverride,
    } = overrides;

    const [Root, rootProps] = getOverrides(RootOverride, StyledRoot);
    const [DialogContainer, dialogContainerProps] = getOverrides(
      DialogContainerOverride,
      StyledDialogContainer
    );
    const [Dialog, dialogProps] = getOverrides(DialogOverride, StyledDialog);
    const [Close, closeProps] = getOverrides(CloseOverride, StyledClose);

    const sharedProps = this.getSharedProps();
    const children = this.getChildren();

    return (
      <LocaleContext.Consumer>
        {(locale) => (
          <FocusLock
            disabled={!focusLock}
            // Allow focus to escape when UI is within an iframe
            crossFrame={false}
            returnFocus={returnFocus}
            autoFocus={autoFocus}
          >
            {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
            <Root
              data-baseweb="modal"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ref={this.rootRef as any}
              {...sharedProps}
              {...rootProps}
            >
              {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
              <DialogContainer
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ref={this.dialogContainerRef as any}
                {...sharedProps}
                {...dialogContainerProps}
              >
                {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
                <Dialog
                  tabIndex={-1}
                  aria-modal
                  aria-label="dialog"
                  role={role}
                  {...sharedProps}
                  {...dialogProps}
                >
                  {children}
                  {closeable ? (
                    // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
                    <Close
                      aria-label={locale.modal.close}
                      onClick={this.onCloseClick}
                      {...sharedProps}
                      {...closeProps}
                      onFocus={forkFocus(closeProps, this.handleFocus)}
                      onBlur={forkBlur(closeProps, this.handleBlur)}
                    >
                      <CloseIcon />
                    </Close>
                  ) : null}
                </Dialog>
              </DialogContainer>
            </Root>
          </FocusLock>
        )}
      </LocaleContext.Consumer>
    );
  }

  render() {
    // Only render modal on the browser (portals aren't supported server-side)
    if (!this.state.mounted) {
      return null;
    }
    // Only render the modal if its isOpen is passed, or isVisible is true (still animating)
    if (!this.props.isOpen && !this.state.isVisible) {
      return null;
    }
    return (
      <Layer
        onEscape={this.onEscape}
        onDocumentClick={this.onDocumentClick}
        mountNode={this.props.mountNode}
      >
        {this.renderModal()}
      </Layer>
    );
  }
}

export default Modal;
