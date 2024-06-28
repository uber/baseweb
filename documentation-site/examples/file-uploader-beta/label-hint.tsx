import * as React from "react";
import { FileUploaderBeta, type FileRow } from "baseui/file-uploader-beta";

export default function Example() {
  const [fileRows, setFileRows] = React.useState<Array<FileRow>>([]);
  return (
    <FileUploaderBeta
      fileRows={fileRows}
      hint={"Test hint"}
      label={"Test label"}
      setFileRows={setFileRows}
    />
  );
}
