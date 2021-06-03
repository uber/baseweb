import * as React from 'react';

import {Button} from 'baseui/button';
import {Check} from 'baseui/icon';

import {
  SnackbarProvider,
  useSnackbar,
  DURATION,
} from 'baseui/snackbar';

function Child() {
  const {enqueue} = useSnackbar();

  return (
    <div>
      <Button
        onClick={() =>
          enqueue({
            message: 'Copied to clipboard',
            startEnhancer: ({size}) => <Check size={size} />,
          })
        }
      >
        one line
      </Button>

      <br />
      <br />

      <Button
        onClick={() =>
          enqueue(
            {
              message:
                '1455 Market Street San Francisco was set as your default work address',
              startEnhancer: ({size}) => <Check size={size} />,
            },
            DURATION.medium,
          )
        }
      >
        two lines
      </Button>

      <br />
      <br />

      <Button
        onClick={() =>
          enqueue(
            {
              message:
                'Perferendis dolorem quam velit. Numquam iusto nisi sit quisquam incidunt veritatis ex perspiciatis. Minima pariatur molestiae architecto. Doloremque beatae',
            },
            DURATION.long,
          )
        }
      >
        three lines
      </Button>
    </div>
  );
}

export default function Parent() {
  return (
    <SnackbarProvider>
      <Child />
    </SnackbarProvider>
  );
}
