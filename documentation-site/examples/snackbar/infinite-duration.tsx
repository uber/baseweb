import * as React from 'react';

import {Button} from 'baseui/button';
import {
  SnackbarProvider,
  useSnackbar,
  DURATION,
} from 'baseui/snackbar';

function Child() {
  const {enqueue, dequeue} = useSnackbar();
  const [downloadCountdown, setDownloadCountdown] = React.useState(
    -1,
  );

  function clearDownloadCountdown() {
    setDownloadCountdown(-1);
  }

  React.useEffect(() => {
    if (downloadCountdown === 0) {
      clearDownloadCountdown();
      dequeue();
      enqueue({message: 'Download complete'});
    } else if (downloadCountdown > 0) {
      setTimeout(() => {
        setDownloadCountdown(prev => prev - 1);
      }, 1000);
    }
  }, [downloadCountdown]);

  return (
    <div>
      <Button
        onClick={() => {
          if (downloadCountdown <= -1) {
            setDownloadCountdown(5);
            enqueue(
              {
                message: 'Downloading file to your device',
                progress: true,
                actionMessage: 'Cancel',
                actionOnClick: () => {
                  clearDownloadCountdown();
                  enqueue({message: 'Download canceled'});
                },
              },
              DURATION.infinite,
            );
          }
        }}
      >
        Download file
      </Button>

      {downloadCountdown > 0 && (
        <p>Download completing in {downloadCountdown}</p>
      )}
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
