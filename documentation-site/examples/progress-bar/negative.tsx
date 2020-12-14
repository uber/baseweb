import * as React from 'react';
import {ProgressBar} from 'baseui/progress-bar';

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = React.useRef(() => {});

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect((): any => {
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
  const [value, setValue] = React.useState(0);
  useInterval(() => {
    if (value < 100) {
      setValue(value + 10);
    } else {
      setValue(0);
    }
  }, 1000);

  return (
    <ProgressBar
      value={value}
      overrides={{
        BarProgress: {
          style: ({$theme}) => ({
            backgroundColor: $theme.colors.negative,
          }),
        },
      }}
    />
  );
}
