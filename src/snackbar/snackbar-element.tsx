/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';

import { Button, KIND, SHAPE } from '../button';
import { getOverrides } from '../helpers/overrides';
import { useStyletron } from '../styles';

import {
  StyledRoot,
  StyledContent,
  StyledStartEnhancerContainer,
  StyledSpinner,
  StyledMessage,
  StyledWrapActionButtonContainer,
  StyledActionButtonContainer,
} from './styled-components';
import type { SnackbarElementProps } from './types';

// todo(flow->ts): types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ActionButton = React.forwardRef<any, any>(({ onClick, message, overrides = {} }, ref) => {
  const [, theme] = useStyletron();
  const [ActionButtonContainer, actionButtonContainerProps] = getOverrides(
    overrides.ActionButtonContainer,
    StyledActionButtonContainer
  );
  return (
    // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
    <ActionButtonContainer {...actionButtonContainerProps}>
      <Button
        ref={ref}
        overrides={{
          BaseButton: {
            style: {
              color: theme.colors.contentInversePrimary,
              marginRight: theme.direction === 'rtl' ? null : theme.sizing.scale100,
              marginLeft: theme.direction === 'rtl' ? theme.sizing.scale100 : null,
              width: '100%',
              whiteSpace: 'nowrap',
              ':hover': {
                backgroundColor: theme.colors.borderInverseTransparent,
              },
              ':active': {
                backgroundColor: theme.colors.backgroundInverseSecondary,
              },
            },
          },
        }}
        kind={KIND.tertiary}
        onClick={onClick}
        shape={SHAPE.pill}
      >
        {message}
      </Button>
    </ActionButtonContainer>
  );
});
ActionButton.displayName = 'ActionButton';

export default function SnackbarElement({
  actionMessage,
  actionOnClick,
  focus = true,
  message,
  overrides = {},
  progress,
  startEnhancer: StartEnhancer,
}: SnackbarElementProps) {
  const [css] = useStyletron();

  const rootRef = React.useRef(null);
  const [rootWidth, setRootWidth] = React.useState(0);
  React.useEffect(() => {
    if (__BROWSER__) {
      if (window.ResizeObserver) {
        const observer = new window.ResizeObserver(([entry]) =>
          setRootWidth(entry.contentRect.width)
        );
        if (rootRef.current) {
          observer.observe(rootRef.current);
        }
        return () => observer.disconnect();
      }
    }
  }, []);

  const actionMeasureRef = React.useRef(null);
  const [actionMeasureWidth, setActionMeasureWidth] = React.useState(0);
  React.useEffect(() => {
    if (__BROWSER__) {
      if (window.ResizeObserver) {
        const observer = new window.ResizeObserver(([entry]) =>
          setActionMeasureWidth(entry.contentRect.width)
        );
        if (actionMeasureRef.current) {
          observer.observe(actionMeasureRef.current);
        }
        return () => observer.disconnect();
      }
    }
  }, [actionMeasureRef.current]);

  const wrapActionButton = actionMeasureWidth > rootWidth / 2;

  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Content, contentProps] = getOverrides(overrides.Content, StyledContent);
  const [StartEnhancerContainer, startEnhancerContainerProps] = getOverrides(
    overrides.StartEnhancerContainer,
    StyledStartEnhancerContainer
  );
  const [Spinner, spinnerProps] = getOverrides(overrides.Spinner, StyledSpinner);
  const [Message, messageProps] = getOverrides(overrides.Message, StyledMessage);
  const [WrapActionButtonContainer, wrapActionButtonContainerProps] = getOverrides(
    overrides.WrapActionButtonContainer,
    StyledWrapActionButtonContainer
  );

  const prevFocusRef = React.useRef(null);
  const actionButtonRef = React.useRef(null);
  React.useEffect(() => {
    if (__BROWSER__) {
      if (focus && actionButtonRef.current) {
        // @ts-ignore
        prevFocusRef.current = document.activeElement;
        // @ts-ignore
        actionButtonRef.current.focus();
      }
      return () => {
        if (prevFocusRef.current) {
          // @ts-ignore
          prevFocusRef.current.focus();
        }
      };
    }
  }, [focus]);

  return (
    <React.Fragment>
      {/* used to measure button width without flex causing text wrapping within the button */}
      {actionMessage && (
        <div
          className={css({
            position: 'absolute',
            left: '-10000px',
            top: '-10000px',
          })}
        >
          <ActionButton
            ref={actionMeasureRef}
            message={actionMessage}
            onClick={actionOnClick}
            overrides={overrides}
          />
        </div>
      )}

      {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
      <Root ref={rootRef} {...rootProps}>
        {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
        <Content {...contentProps}>
          {(Boolean(StartEnhancer) || progress) && (
            // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
            <StartEnhancerContainer {...startEnhancerContainerProps}>
              {StartEnhancer !== null && StartEnhancer !== undefined ? (
                // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
                <StartEnhancer size={24} />
              ) : (
                // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
                <Spinner $height={24} $width={24} {...spinnerProps} />
              )}
            </StartEnhancerContainer>
          )}

          {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
          <Message $hasSuffix={Boolean(actionMessage)} {...messageProps}>
            {message}
          </Message>

          {actionMessage && !wrapActionButton && (
            <ActionButton
              ref={actionButtonRef}
              message={actionMessage}
              onClick={actionOnClick}
              overrides={overrides}
            />
          )}
        </Content>

        {actionMessage && wrapActionButton && (
          // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
          <WrapActionButtonContainer {...wrapActionButtonContainerProps}>
            <ActionButton
              ref={actionButtonRef}
              message={actionMessage}
              onClick={actionOnClick}
              overrides={overrides}
            />
          </WrapActionButtonContainer>
        )}
      </Root>
    </React.Fragment>
  );
}
