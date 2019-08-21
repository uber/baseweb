import * as React from 'react';
import {ProgressBar} from 'baseui/progress-bar';

const SUCCESS_VALUE = 100;

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

export default () => {
  const [value, setValue] = React.useState(0);
  useInterval(() => {
    if (value < SUCCESS_VALUE) {
      setValue(value + 10);
    } else {
      setValue(0);
    }
  }, 1000);

  return (
    <ProgressBar
      value={value}
      successValue={SUCCESS_VALUE}
      overrides={{
        BarProgress: {
          style: ({$theme, $value}) => {
            return {
              ...$theme.typography.font450,
              backgroundColor: $theme.colors.positive,
              color: $theme.colors.mono200,
              position: 'relative',
              ':after': {
                position: 'absolute',
                content: $value > 5 ? `"${$value}%"` : '',
                right: '10px',
              },
            };
          },
        },
        Bar: {
          style: ({$theme}) => ({
            height: $theme.sizing.scale800,
          }),
        },
      }}
    />
  );
};
