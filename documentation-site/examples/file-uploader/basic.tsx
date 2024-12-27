import * as React from "react";
import { FileUploader, type FileRow } from "baseui/file-uploader";

export default function Example() {
  const [fileRows, setFileRows] = React.useState<Array<FileRow>>([
    {
      errorMessage: null,
      file: new File(["test file"], "file.txt"),
      id: "0",
      progressAmount: 100,
      status: "processed",
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
          uploadStatus: "success",
        };
        resolve({ errorMessage: null, fileInfo });
      }, 2000);
    });
  };

  return (
    <FileUploader
      fileRows={fileRows}
      processFileOnDrop={processFileOnDrop}
      setFileRows={setFileRows}
    />
  );
}
