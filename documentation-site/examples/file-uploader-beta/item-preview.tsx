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
  return (
    <FileUploaderBeta
      fileRows={fileRows}
      hint={
        "Try uploading a file to see the item preview. Image files will show a thumbnail."
      }
      itemPreview
      setFileRows={setFileRows}
    />
  );
}
