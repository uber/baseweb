/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React, { useEffect, useRef, isValidElement } from 'react';
import type { ReactNode, ComponentType } from 'react';
import FocusLock from 'react-focus-lock';

import { Layer } from '../layer';
import { getOverrides } from '../helpers/overrides';
import { ButtonDock as BaseButtonDock } from '../button-dock';
import { Button, KIND, SHAPE } from '../button';
import { Delete } from '../icon';
import {
  StyledHeading,
  StyledBody,
  StyledRoot,
  StyledScrollContainer,
  StyledOverlay,
} from './styled-components';
import { PLACEMENT, SIZE, CLOSE_SOURCE } from './constants';
import type { DialogProps, Artwork } from './types';

function renderArtwork(artwork?: Artwork): ReactNode {
  if (isValidElement(artwork)) {
    return artwork;
  } else if (typeof artwork === 'function') {
    const ArtworkComponent = artwork as ComponentType;
    return <ArtworkComponent />;
  }
  return null;
}

const DefaultDismissButton = (props) => {
  const overrides = {
    ...props.overrides,
    BaseButton: {
      ...props.overrides?.BaseButton,
      style: {
        position: 'absolute',
        top: '16px',
        right: '8px',
        // this will be tokenized in the future
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        zIndex: 1,
        ...props.overrides?.BaseButton?.style,
      },
    },
  };
  return (
    <Button kind={KIND.secondary} shape={SHAPE.circle} {...props} overrides={overrides}>
      <Delete size={36} />
    </Button>
  );
};

const Dialog = ({
  artwork,
  buttonDock,
  children,
  onDismiss,
  showDismissButton = true,
  hasOverlay = true,
  heading,
  isOpen,
  overrides = {},
  placement = PLACEMENT.center,
  numHeadingLines = 2,
  size = SIZE.xSmall,
  autoFocus = true,
}: DialogProps) => {
  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [ScrollContainer, scrollContainerProps] = getOverrides(
    overrides.ScrollContainer,
    StyledScrollContainer
  );
  const [Heading, headingProps] = getOverrides(overrides.Heading, StyledHeading);
  const [Overlay, overlayProps] = getOverrides(overrides.Overlay, StyledOverlay);
  const [Body, bodyProps] = getOverrides(overrides.Body, StyledBody);
  const [ButtonDock, buttonDockProps] = getOverrides(overrides.ButtonDock, BaseButtonDock);
  const [DismissButton, dismissButtonProps] = getOverrides(
    overrides.DismissButton,
    DefaultDismissButton
  );
  const overlayRef = useRef<HTMLDialogElement>(null);

  // prevents background scrolling when the dialog is open and has an overlay
  const originalOverflowRef = useRef<string>(
    typeof document !== 'undefined' ? document?.body?.style?.overflow : ''
  );
  useEffect(() => {
    const originalOverflow = originalOverflowRef.current;
    if (isOpen && hasOverlay) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow;
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, hasOverlay]);

  function handleOutsideClick(e) {
    if (
      e.target &&
      e.target instanceof HTMLElement &&
      e.target.contains(overlayRef.current) &&
      onDismiss
    ) {
      onDismiss({ closeSource: CLOSE_SOURCE.backdrop });
    }
  }

  function handleEscape() {
    onDismiss && onDismiss({ closeSource: CLOSE_SOURCE.escape });
  }

  return isOpen ? (
    <Layer onDocumentClick={handleOutsideClick} onEscape={handleEscape}>
      {hasOverlay && <Overlay ref={overlayRef} {...overlayProps} />}

      <FocusLock returnFocus={true} autoFocus={autoFocus}>
        <Root
          $size={size}
          $placement={placement}
          role="dialog"
          aria-labelledby="dialog-title"
          {...rootProps}
        >
          {onDismiss && showDismissButton && (
            <DismissButton
              onClick={() => onDismiss({ closeSource: CLOSE_SOURCE.dismissButton })}
              {...dismissButtonProps}
            />
          )}

          <ScrollContainer {...scrollContainerProps} tabIndex={0}>
            {renderArtwork(artwork)}
            <Heading
              $numHeadingLines={numHeadingLines}
              $shiftLeft={showDismissButton}
              id="dialog-title"
              {...headingProps}
            >
              {heading}
            </Heading>
            <Body {...bodyProps}>{children}</Body>
          </ScrollContainer>

          {buttonDock && <ButtonDock {...buttonDock} {...buttonDockProps} />}
        </Root>
      </FocusLock>
    </Layer>
  ) : null;
};
export default Dialog;
