/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import {Button, KIND, SHAPE} from '../button/index.js';
import {useStyletron} from '../styles/index.js';

type PropsT = {|
  actionMessage?: string,
  actionOnClick?: (SyntheticEvent<HTMLButtonElement>) => mixed,
  message: string,
  startEnhancer?: React.AbstractComponent<{|
    size: number,
  |}>,
|};

const ActionButton = React.forwardRef(({onClick, message}, ref) => {
  const [, theme] = useStyletron();
  return (
    <div>
      <Button
        ref={ref}
        overrides={{
          BaseButton: {
            style: {
              color: theme.colors.contentInversePrimary,
              marginRight: '4px',
              width: '100%',
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
    </div>
  );
});

export function Snackbar({
  actionMessage,
  actionOnClick,
  message,
  startEnhancer: StartEnhancer,
}: PropsT) {
  const [css, theme] = useStyletron();

  const rootRef = React.useRef(null);
  const [rootWidth, setRootWidth] = React.useState(0);
  React.useEffect(() => {
    function handleResize([entry]) {
      setRootWidth(entry.contentRect.width);
    }
    const observer = new ResizeObserver(handleResize);
    if (rootRef.current) {
      observer.observe(rootRef.current);
    }
    return function cleanup() {
      observer.disconnect();
    };
  }, []);

  const actionMeasureRef = React.useRef(null);
  const [actionMeasureWidth, setActionMeasureWidth] = React.useState(0);
  React.useEffect(() => {
    function handleResize([entry]) {
      setActionMeasureWidth(entry.contentRect.width);
    }
    const observer = new ResizeObserver(handleResize);
    if (actionMeasureRef.current) {
      observer.observe(actionMeasureRef.current);
    }
    return function cleanup() {
      observer.disconnect();
    };
  }, []);

  const wrapActionButton = actionMeasureWidth > rootWidth / 2;

  return (
    <React.Fragment>
      {/* used to measure button width without flex causing text wrapping within the button */}
      {actionMessage && (
        <div
          className={css({
            position: 'absolute',
            left: '-1000px',
            top: '-1000px',
          })}
        >
          <ActionButton
            ref={actionMeasureRef}
            message={actionMessage}
            onClick={actionOnClick}
          />
        </div>
      )}

      <div
        ref={rootRef}
        className={css({
          backgroundColor: theme.colors.backgroundInverseSecondary,
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          borderBottomRightRadius: '16px',
          borderBottomLeftRadius: '16px',
          boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.22)',
          color: theme.colors.contentInversePrimary,
          display: 'inline-block',
          maxWidth: '540px',
          minWidth: '320px',
        })}
      >
        <div
          className={css({
            alignItems: 'center',
            display: 'inline-flex',
          })}
        >
          {StartEnhancer !== null && StartEnhancer !== undefined && (
            <span
              className={css({
                alignItems: 'center',
                display: 'flex',
                paddingLeft: '16px',
              })}
            >
              <StartEnhancer size={24} />
            </span>
          )}

          <p
            // $FlowFixMe - suppressing due to webkit properties
            className={css({
              ...theme.typography.ParagraphMedium,
              '-webkit-box-orient': 'vertical',
              '-webkit-line-clamp': 3,
              display: '-webkit-box',
              marginTop: '16px',
              marginBottom: '16px',
              overflow: 'hidden',
              paddingRight: actionMessage ? '8px' : '16px',
              paddingLeft: '16px',
            })}
          >
            {message}
          </p>

          {actionMessage && !wrapActionButton && (
            <ActionButton message={actionMessage} onClick={actionOnClick} />
          )}
        </div>

        {actionMessage && wrapActionButton && (
          <div
            className={css({
              display: 'flex',
              flexDirection: 'row-reverse',
            })}
          >
            <ActionButton message={actionMessage} onClick={actionOnClick} />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
