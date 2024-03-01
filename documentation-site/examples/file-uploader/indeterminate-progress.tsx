import * as React from "react";
import { FileUploader } from "baseui/file-uploader";

export default function Example() {
  const [isUploading, setIsUploading] = React.useState(false);
  const timeoutId = React.useRef<any>();

  function reset() {
    setIsUploading(false);
    clearTimeout(timeoutId.current);
  }

  // startProgress is only illustrative. Use the progress info returned
  // from your upload endpoint. This example shows how the file-uploader operates
  // if there is no progress info available.
  function startProgress() {
    setIsUploading(true);
    timeoutId.current = setTimeout(reset, 4000);
  }

  return (
    <FileUploader
      onCancel={reset}
      onDrop={(acceptedFiles, rejectedFiles) => {
        // handle file upload...
        console.log(acceptedFiles, rejectedFiles);
        startProgress();
      }}
      progressMessage={isUploading ? `Uploading... hang tight.` : ""}
    />
  );
}
