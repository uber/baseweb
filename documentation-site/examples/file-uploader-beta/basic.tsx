import * as React from "react";
import { FileUploaderBeta, type FileRow } from "baseui/file-uploader-beta";

export default function Example() {
  const [fileRows, setFileRows] = React.useState<Array<FileRow>>([
    {
      file: new File(["test file"], "file.txt"),
      status: "processed",
      errorMessage: null,
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
    <FileUploaderBeta
      fileRows={fileRows}
      itemPreview
      maxFiles={5}
      processFileOnDrop={processFileOnDrop}
      setFileRows={setFileRows}
    />
  );
}
