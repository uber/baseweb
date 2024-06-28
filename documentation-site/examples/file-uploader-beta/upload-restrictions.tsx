import * as React from "react";
import { FileUploaderBeta, type FileRow } from "baseui/file-uploader-beta";

export default function Example() {
  const [fileRows, setFileRows] = React.useState<Array<FileRow>>([]);

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
