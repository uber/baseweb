/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import {Button, KIND, SHAPE} from '../button/index.js';
import {getOverrides, withOverrides} from '../helpers/overrides.js';
import {useStyletron} from '../styles/index.js';

import {
  StyledRoot,
  StyledContent,
  StyledStartEnhancerContainer,
  StyledSpinner,
  StyledMessage,
  StyledWrapActionButtonContainer,
  StyledActionButtonContainer,
} from './styled-components.js';
import type {SnackbarElementPropsT} from './types.js';

const ActionButton = React.forwardRef(
  ({onClick, message, overrides = {}}, ref) => {
    const [, theme] = useStyletron();
    const [ActionButtonContainer, actionButtonContainerProps] = getOverrides(
      overrides.ActionButtonContainer,
      StyledActionButtonContainer,
    );
    return (
      <ActionButtonContainer {...actionButtonContainerProps}>
        <Button
          ref={ref}
          overrides={{
            BaseButton: {
              style: {
                color: theme.colors.contentInversePrimary,
                marginRight:
                  theme.direction === 'rtl' ? null : theme.sizing.scale100,
                marginLeft:
                  theme.direction === 'rtl' ? theme.sizing.scale100 : null,
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
  },
);

function SnackbarElement({
  actionMessage,
  actionOnClick,
  focus = true,
  message,
  overrides = {},
  progress,
  startEnhancer: StartEnhancer,
}: SnackbarElementPropsT) {
  const [css] = useStyletron();

  const rootRef = React.useRef(null);
  const [rootWidth, setRootWidth] = React.useState(0);
  React.useEffect(() => {
    if (__BROWSER__) {
      const observer = new window.ResizeObserver(([entry]) =>
        setRootWidth(entry.contentRect.width),
      );
      if (rootRef.current) {
        observer.observe(rootRef.current);
      }
      return () => observer.disconnect();
    }
  }, []);

  const actionMeasureRef = React.useRef(null);
  const [actionMeasureWidth, setActionMeasureWidth] = React.useState(0);
  React.useEffect(() => {
    if (__BROWSER__) {
      const observer = new window.ResizeObserver(([entry]) =>
        setActionMeasureWidth(entry.contentRect.width),
      );
      if (actionMeasureRef.current) {
        observer.observe(actionMeasureRef.current);
      }
      return () => observer.disconnect();
    }
  }, [actionMeasureRef.current]);

  const wrapActionButton = actionMeasureWidth > rootWidth / 2;

  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Content, contentProps] = getOverrides(
    overrides.Content,
    StyledContent,
  );
  const [StartEnhancerContainer, startEnhancerContainerProps] = getOverrides(
    overrides.StartEnhancerContainer,
    StyledStartEnhancerContainer,
  );
  const [Spinner, spinnerProps] = getOverrides(
    overrides.Spinner,
    StyledSpinner,
  );
  const [Message, messageProps] = getOverrides(
    overrides.Message,
    StyledMessage,
  );
  const [
    WrapActionButtonContainer,
    wrapActionButtonContainerProps,
  ] = getOverrides(
    overrides.WrapActionButtonContainer,
    StyledWrapActionButtonContainer,
  );

  const prevFocusRef = React.useRef(null);
  const actionButtonRef = React.useRef(null);
  React.useEffect(() => {
    if (__BROWSER__) {
      if (focus && actionButtonRef.current) {
        prevFocusRef.current = document.activeElement;
        // $FlowFixMe
        actionButtonRef.current.focus();
      }
      return () => {
        if (prevFocusRef.current) {
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

      <Root ref={rootRef} {...rootProps}>
        <Content {...contentProps}>
          {(Boolean(StartEnhancer) || progress) && (
            <StartEnhancerContainer {...startEnhancerContainerProps}>
              {StartEnhancer !== null && StartEnhancer !== undefined ? (
                <StartEnhancer size={24} />
              ) : (
                <Spinner $height={24} $width={24} {...spinnerProps} />
              )}
            </StartEnhancerContainer>
          )}

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

export default withOverrides(SnackbarElement, 'SnackbarElement');
