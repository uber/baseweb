// @flow
import * as React from 'react';
import {Button} from 'baseui/button';
import {ProgressBarRounded} from 'baseui/progress-bar';
import {useStyletron} from 'baseui';

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = React.useRef(() => {});

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function Example() {
  const [progress, setProgress] = React.useState(0);

  useInterval(() => {
    if (progress < 1) {
      setProgress(progress + 0.1);
    } else {
      setProgress(0);
    }
  }, 1000);

  return <ProgressBarRounded progress={progress} />;
}
