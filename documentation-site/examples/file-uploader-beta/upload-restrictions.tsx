import * as React from "react";
import { FileUploaderBeta, type FileRow } from "baseui/file-uploader-beta";

export default function Example() {
  // Upload files to test restrictions. For demo purposes,
  // artificially create an array of file rows with errors.
  const [fileRows, setFileRows] = React.useState<Array<FileRow>>([
    {
      file: new File(["test file 1"], "unaccepted-file-type.jpeg"),
      status: "error",
      errorMessage: "file type of img/jpeg is not accepted",
    },
    {
      file: new File(["test file 2"], "file-too-small.png"),
      status: "error",
      errorMessage: "file size must be greater than 20 KB",
    },
    {
      file: new File(["test file 3"], "file-too-big.png"),
      status: "error",
      errorMessage: "file size must be less than 100 KB",
    },
    {
      file: new File(["test file 4"], "file-count-too-many.png"),
      status: "error",
      errorMessage: "cannot process more than ${props.maxFiles} file(s)",
    },
  ]);

  const processFileOnDrop = (
    file: File,
  ): Promise<{ errorMessage: string | null; fileInfo?: any }> => {
    return new Promise((resolve) => {
      // Fake an upload process for 2 seconds
      // For a real-world scenario, replace this with application upload logic
      setTimeout(() => {
        let fileInfo = {
          file,
          objectID: "1234",
          uploadID: "1234",
          uploadStatus: "error",
        };
        resolve({ errorMessage: "Custom user error", fileInfo });
      }, 2000);
    });
  };

  return (
    <FileUploaderBeta
      accept={["image/png", "application/pdf"]}
      fileRows={fileRows}
      hint={
        'Try uploading files that break these conditions: 1. accept set to ["image/png", "application/pdf"], 2. minSize set to 20000 bytes (20 KB), 3. maxSize set to 100000 bytes (100 KB), 4. maxFiles set to 3'
      }
      maxFiles={3}
      maxSize={100000}
      minSize={20000}
      processFileOnDrop={processFileOnDrop}
      setFileRows={setFileRows}
    />
  );
}
