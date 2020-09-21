/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';

import {Layer} from '../layer/index.js';
import {useStyletron} from '../styles/index.js';

import {DURATION, PLACEMENT} from './constants.js';
import {SnackbarElement} from './snackbar-element.js';
import type {
  SnackbarElementPropsT,
  SnackbarProviderPropsT,
  DurationT,
} from './types.js';

type ContextT = {|
  enqueue: (elementProps: SnackbarElementPropsT, duration?: DurationT) => void,
|};

export const SnackbarContext: React.Context<ContextT> = React.createContext({
  enqueue: () => {
    if (__DEV__) {
      console.warn('Snackbar context not found.');
    }
  },
});

export function useSnackbar() {
  const context = React.useContext(SnackbarContext);
  return {enqueue: context.enqueue};
}

function placementRules(placement) {
  switch (placement) {
    case PLACEMENT.topLeft:
      return {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        top: 0,
      };
    case PLACEMENT.topRight:
      return {
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        top: 0,
      };
    case PLACEMENT.bottom:
      return {
        alignItems: 'center',
        justifyContent: 'flex-end',
        bottom: 0,
      };
    case PLACEMENT.bottomLeft:
      return {
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        bottom: 0,
      };
    case PLACEMENT.bottomRight:
      return {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        bottom: 0,
      };
    case PLACEMENT.top:
    default:
      return {
        alignItems: 'center',
        justifyContent: 'flex-start',
        top: 0,
      };
  }
}

export function SnackbarProvider({
  children,
  overrides = {},
  placement,
}: SnackbarProviderPropsT) {
  const [css, theme] = useStyletron();

  const [snackbars, setSnackbars] = React.useState([]);
  const [animating, setAnimating] = React.useState(false);

  const timeoutRef = React.useRef(null);

  const [containerHeight, setContainerHeight] = React.useState(0);
  const containerRef = React.useRef(null);

  function enqueue(elementProps, duration = DURATION.short) {
    setSnackbars(prev => {
      if (prev.length === 0) {
        take(duration);
      }
      return [...prev, {elementProps, duration}];
    });
  }

  function dequeue() {
    setContainerHeight(0);

    setSnackbars(prev => {
      const next = prev.slice(1);
      if (next.length > 0) {
        take(next[0].duration);
      }
      return next;
    });
  }

  function take(duration) {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      display(duration);
    }, 500);
  }

  function display(duration) {
    timeoutRef.current = setTimeout(() => {
      setAnimating(true);
      setTimeout(() => {
        setAnimating(false);
        dequeue();
      }, 500);
    }, duration);
  }

  function handleMouseEnter() {
    clearTimeout(timeoutRef.current);
  }

  function handleMouseLeave(duration) {
    display(duration);
  }

  React.useEffect(() => {
    const observer = new ResizeObserver(([entry]) =>
      setContainerHeight(entry.contentRect.height),
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [snackbars.length, animating]);

  const translateHeight = React.useMemo(() => {
    const value = containerHeight * 2 + 24;
    if (
      !placement ||
      placement === PLACEMENT.top ||
      placement === PLACEMENT.topLeft ||
      placement === PLACEMENT.topRight
    ) {
      return -1 * value;
    }
    return value;
  }, [placement, containerHeight]);

  return (
    <SnackbarContext.Provider value={{enqueue}}>
      <div
        className={css({
          boxSizing: 'border-box',
          position: 'absolute',
          top: '-10000px',
          left: '-10000px',
        })}
        ref={containerRef}
      >
        {snackbars[0] && (
          <SnackbarElement
            overrides={overrides}
            {...snackbars[0].elementProps}
          />
        )}
      </div>

      {snackbars.length > 0 && containerHeight !== 0 && (
        <Layer>
          <div
            className={css({
              ...placementRules(placement),
              display: 'flex',
              flexDirection: 'column',
              pointerEvents: 'none',
              position: 'fixed',
              transform: animating ? `translateY(${translateHeight}px)` : null,
              transitionProperty: 'all',
              transitionTimingFunction: theme.animation.easeOutQuinticCurve,
              transitionDuration: theme.animation.timing1000,
              right: 0,
              left: 0,
              marginTop: '16px',
              marginRight: '8px',
              marginBottom: '16px',
              marginLeft: '8px',
            })}
          >
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={() => handleMouseLeave(snackbars[0].duration)}
              className={css({display: 'inline', pointerEvents: 'all'})}
            >
              <SnackbarElement
                overrides={overrides}
                {...snackbars[0].elementProps}
              />
            </div>
          </div>
        </Layer>
      )}

      {children}
    </SnackbarContext.Provider>
  );
}
