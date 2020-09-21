/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import {Button, KIND, SHAPE} from '../button/index.js';
import {useStyletron} from '../styles/index.js';

import {
  StyledRoot,
  StyledContent,
  StyledStartEnhancerContainer,
  StyledMessage,
  StyledWrapActionButtonContainer,
  StyledActionButtonContainer,
} from './styled-components.js';
import type {SnackbarElementPropsT} from './types.js';

const ActionButton = React.forwardRef(({onClick, message}, ref) => {
  const [, theme] = useStyletron();
  return (
    <StyledActionButtonContainer>
      <Button
        ref={ref}
        overrides={{
          BaseButton: {
            style: {
              color: theme.colors.contentInversePrimary,
              marginRight: '4px',
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
    </StyledActionButtonContainer>
  );
});

export function SnackbarElement({
  actionMessage,
  actionOnClick,
  message,
  overrides = {},
  startEnhancer: StartEnhancer,
}: SnackbarElementPropsT) {
  const [css, theme] = useStyletron();

  const rootRef = React.useRef(null);
  const [rootWidth, setRootWidth] = React.useState(0);
  React.useEffect(() => {
    const observer = new ResizeObserver(([entry]) =>
      setRootWidth(entry.contentRect.width),
    );
    if (rootRef.current) {
      observer.observe(rootRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const actionMeasureRef = React.useRef(null);
  const [actionMeasureWidth, setActionMeasureWidth] = React.useState(0);
  React.useEffect(() => {
    const observer = new ResizeObserver(([entry]) =>
      setActionMeasureWidth(entry.contentRect.width),
    );
    if (actionMeasureRef.current) {
      observer.observe(actionMeasureRef.current);
    }
    return () => observer.disconnect();
  }, [actionMeasureRef.current]);

  const wrapActionButton = actionMeasureWidth > rootWidth / 2;

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
          />
        </div>
      )}

      <StyledRoot ref={rootRef}>
        <StyledContent>
          {StartEnhancer !== null && StartEnhancer !== undefined && (
            <StyledStartEnhancerContainer>
              <StartEnhancer size={24} />
            </StyledStartEnhancerContainer>
          )}

          <StyledMessage $hasSuffix={Boolean(actionMessage)}>
            {message}
          </StyledMessage>

          {actionMessage && !wrapActionButton && (
            <ActionButton message={actionMessage} onClick={actionOnClick} />
          )}
        </StyledContent>

        {actionMessage && wrapActionButton && (
          <StyledWrapActionButtonContainer>
            <ActionButton message={actionMessage} onClick={actionOnClick} />
          </StyledWrapActionButtonContainer>
        )}
      </StyledRoot>
    </React.Fragment>
  );
}
