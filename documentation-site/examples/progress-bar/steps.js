// @flow
import * as React from 'react';
import {ProgressBar} from 'baseui/progress-bar';
import {Button, SIZE} from 'baseui/button';

export default function Example() {
  const STEPS = 5;
  const stepSize = 100 / STEPS;
  const [value, setValue] = React.useState(40);
  return (
    <div>
      <ProgressBar value={value} steps={5} />
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button
          onClick={() =>
            setValue((prevValue) => prevValue - stepSize)
          }
          size={SIZE.compact}
          disabled={value === 0 || value === 100}
          overrides={{
            BaseButton: {
              style: {width: '116px', marginRight: '20px'},
            },
          }}
        >
          Previous Step
        </Button>
        <Button
          onClick={() =>
            setValue((prevValue) => prevValue + stepSize)
          }
          size={SIZE.compact}
          disabled={value === 100}
          overrides={{BaseButton: {style: {width: '116px'}}}}
        >
          {value >= 80 ? 'Complete' : 'Next Step'}
        </Button>
      </div>
    </div>
  );
}
