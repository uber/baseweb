import * as React from "react";
import { FileUploader, type FileRow } from "baseui/file-uploader";

export default function Example() {
  const [fileRows, setFileRows] = React.useState<Array<FileRow>>([]);
  return (
    <FileUploader
      fileRows={fileRows}
      hint={"Test hint"}
      label={"Test label"}
      setFileRows={setFileRows}
    />
  );
}
