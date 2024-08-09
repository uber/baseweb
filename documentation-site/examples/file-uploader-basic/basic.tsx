import * as React from "react";
import { FileUploaderBasic } from "baseui/file-uploader-basic";

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback: any, delay: number | null) {
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

// useFakeProgress is an elaborate way to show a fake file transfer for illustrative purposes. You
// don't need this is your application. Use metadata from your upload destination if it's available,
// or don't provide progress.
function useFakeProgress(): [number, () => void, () => void] {
  const [fakeProgress, setFakeProgress] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);

  function stopFakeProgress() {
    setIsActive(false);
    setFakeProgress(0);
  }

  function startFakeProgress() {
    setIsActive(true);
  }

  useInterval(
    () => {
      if (fakeProgress >= 100) {
        stopFakeProgress();
      } else {
        setFakeProgress(fakeProgress + 10);
      }
    },
    isActive ? 500 : null,
  );

  return [fakeProgress, startFakeProgress, stopFakeProgress];
}

export default function Example() {
  const [progressAmount, startFakeProgress, stopFakeProgress] =
    useFakeProgress();

  return (
    <FileUploaderBasic
      onCancel={stopFakeProgress}
      onDrop={(acceptedFiles, rejectedFiles) => {
        // handle file upload...
        console.log(acceptedFiles, rejectedFiles);
        startFakeProgress();
      }}
      // progressAmount is a number from 0 - 100 which indicates the percent of file transfer completed
      progressAmount={progressAmount}
      progressMessage={
        progressAmount ? `Uploading... ${progressAmount}% of 100%` : ""
      }
    />
  );
}
