/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';

import { Layer } from '../layer';
import { getOverrides } from '../helpers/overrides';
import { useStyletron } from '../styles';

import { DURATION, PLACEMENT } from './constants';
import SnackbarElement from './snackbar-element';
import { StyledPlacementContainer } from './styled-components';
import type { SnackbarElementProps, SnackbarProviderProps, Duration } from './types';

export type Context = {
  enqueue: (elementProps: SnackbarElementProps, duration?: Duration) => void;
  dequeue: () => void;
};

function fallbackHandler() {
  if (__DEV__) {
    console.warn('Snackbar context not found.');
  }
}

// @ts-ignore
export const SnackbarContext: React.Context<Context> = React.createContext({
  enqueue: fallbackHandler,
  dequeue: fallbackHandler,
});

export function useSnackbar() {
  const { enqueue, dequeue } = React.useContext(SnackbarContext);
  /* We use an empty dependency array because `enquque` and `dequeue` never change.
     Ideally we'd memoize these functions and include them in the dependency array,
     but that would require us to memoize many more functions in the SnackbarProvider,
     and those functions depend on eachother in a circular way.
  */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useMemo(() => ({ enqueue, dequeue }), []);
}

// @ts-ignore
function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function SnackbarProvider({
  children,
  overrides = {},
  placement,
  defaultDuration = DURATION.short,
}: SnackbarProviderProps) {
  const [css] = useStyletron();

  const [snackbars, setSnackbars] = React.useState([]);
  const [animating, setAnimating] = React.useState(false);

  const timeoutRef = React.useRef(null);

  const [containerHeight, setContainerHeight] = React.useState(0);
  const containerRef = React.useRef(null);

  // @ts-ignore
  function enqueue(elementProps, duration = defaultDuration) {
    // @ts-ignore
    setSnackbars((prev) => {
      return [...prev, { elementProps, duration }];
    });
  }

  // @ts-ignore
  const prevSnackbars = usePrevious(snackbars) || [];
  React.useEffect(() => {
    if (prevSnackbars.length === 0 && snackbars.length >= 1) {
      // @ts-ignore
      enter(snackbars[0].duration);
    }
  }, [snackbars, prevSnackbars]);

  // @ts-ignore
  function enter(duration) {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      display(duration);
    }, 0);
  }

  function dequeue() {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      setContainerHeight(0);
      setSnackbars((prev) => {
        const next = prev.slice(1);
        if (next.length > 0) {
          // @ts-ignore
          enter(next[0].duration);
        }
        return next;
      });
    }, 1000);
  }

  // @ts-ignore
  function display(duration) {
    if (duration === DURATION.infinite) {
      return;
    }

    // @ts-ignore
    timeoutRef.current = setTimeout(() => {
      dequeue();
    }, duration);
  }

  function handleMouseEnter() {
    // @ts-ignore
    clearTimeout(timeoutRef.current);
  }

  // @ts-ignore
  function handleMouseLeave(duration) {
    display(duration);
  }

  function handleActionClick() {
    // @ts-ignore
    clearTimeout(timeoutRef.current);
    dequeue();
  }

  React.useEffect(() => {
    if (__BROWSER__) {
      if (window.ResizeObserver) {
        const observer = new window.ResizeObserver(([entry]) =>
          setContainerHeight(entry.contentRect.height)
        );
        if (containerRef.current) {
          observer.observe(containerRef.current);
        }
        return () => observer.disconnect();
      }
    }
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

  const { PlacementContainer: PlacementContainerOverrides, ...snackbarOverrides } = overrides;
  const [PlacementContainer, placementContainerProps] = getOverrides(
    PlacementContainerOverrides,
    StyledPlacementContainer
  );

  return (
    <SnackbarContext.Provider value={{ enqueue, dequeue }}>
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
            // @ts-ignore
            {...snackbars[0].elementProps}
            overrides={{
              ...snackbarOverrides,
              // @ts-ignore
              ...snackbars[0].elementProps.overrides,
            }}
            focus={false}
          />
        )}
      </div>

      {snackbars.length > 0 && containerHeight !== 0 && (
        <Layer>
          <PlacementContainer
            $animating={animating}
            $placement={placement}
            $translateHeight={translateHeight}
            {...placementContainerProps}
          >
            <div
              role="alert"
              onMouseEnter={handleMouseEnter}
              // @ts-ignore
              onMouseLeave={() => handleMouseLeave(snackbars[0].duration)}
              className={css({ display: 'inline', pointerEvents: 'all' })}
            >
              <SnackbarElement
                // @ts-ignore
                {...snackbars[0].elementProps}
                actionOnClick={(event) => {
                  // @ts-ignore
                  if (snackbars[0].elementProps.actionOnClick) {
                    // @ts-ignore
                    snackbars[0].elementProps.actionOnClick(event);
                  }
                  handleActionClick();
                }}
                overrides={{
                  ...snackbarOverrides,
                  // @ts-ignore
                  ...snackbars[0].elementProps.overrides,
                }}
              />
            </div>
          </PlacementContainer>
        </Layer>
      )}

      {children}
    </SnackbarContext.Provider>
  );
}
