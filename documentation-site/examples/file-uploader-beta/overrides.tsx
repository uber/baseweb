import * as React from "react";
import { FileUploaderBeta, type FileRow } from "baseui/file-uploader-beta";
import { useStyletron } from "baseui";

export default function Example() {
  const [fileRows, setFileRows] = React.useState<Array<FileRow>>([
    {
      file: new File(["test file 1"], "file-1.txt"),
      status: "processed",
      errorMessage: null,
    },
    {
      file: new File(["test file 2"], "file-2.txt"),
      status: "error",
      errorMessage: "Failed to upload",
    },
  ]);
  const [, theme] = useStyletron();
  return (
    <FileUploaderBeta
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
            borderLeftColor: theme.colors.warning,
            borderRightColor: theme.colors.warning,
            borderTopColor: theme.colors.warning,
            borderBottomColor: theme.colors.warning,
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
