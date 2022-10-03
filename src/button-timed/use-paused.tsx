/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// https://www.joshwcomeau.com/snippets/react-hooks/use-interval/
function useInterval(callback, delay) {
  const intervalRef = React.useRef(null);
  const savedCallback = React.useRef(callback);
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  React.useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === 'number') {
      intervalRef.current = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);
  return intervalRef;
}

export function usePaused(timeRemaining: number) {
  const [paused, setPaused] = React.useState<boolean>(false);
  const prevTimeRemaining = usePrevious(timeRemaining);

  useInterval(() => {
    if (!paused && timeRemaining === prevTimeRemaining) {
      setPaused(true);
    }
  }, 1000);
  if (paused && timeRemaining !== prevTimeRemaining) {
    setPaused(false);
  }
  return paused;
}
