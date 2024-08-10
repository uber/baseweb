import * as React from "react";
import { FileUploader, type FileRow } from "baseui/file-uploader";
import { useStyletron } from "baseui";

export default function Example() {
  const [fileRows, setFileRows] = React.useState<Array<FileRow>>([
    {
      file: new File(["test file 1"], "file-1.txt"),
      id: "0",
      status: "processed",
      errorMessage: null,
    },
    {
      file: new File(["test file 2"], "file-2.txt"),
      id: "1",
      status: "error",
      errorMessage: "Failed to upload",
    },
  ]);
  const [, theme] = useStyletron();
  return (
    <FileUploader
      fileRows={fileRows}
      setFileRows={setFileRows}
      overrides={{
        ButtonComponent: {
          props: {
            overrides: {
              BaseButton: {
                style: {
                  outline: `${theme.colors.warning} solid`,
                },
              },
            },
          },
        },
        ContentMessage: {
          style: {
            color: theme.colors.warning,
          },
        },
        FileDragAndDrop: {
          style: {
            borderColor: theme.colors.warning,
            borderStyle: "dashed",
            borderWidth: theme.sizing.scale0,
          },
        },
        FileRows: {
          style: {
            marginLeft: theme.sizing.scale0,
            marginRight: theme.sizing.scale0,
            outline: `${theme.colors.warning} dashed`,
          },
        },
      }}
    />
  );
}
