import * as React from 'react';
import {Unstable_FileUploader} from 'baseui/file-uploader';

export default () => (
  <Unstable_FileUploader
    overrides={{
      FileDragAndDrop: {
        style: props => ({
          borderColor: props.$isDragActive
            ? props.$theme.colors.positive
            : props.$theme.colors.warning,
        }),
      },
      ContentMessage: {
        style: props => ({
          color: props.$theme.colors.warning,
        }),
      },
      ContentSeparator: {
        style: props => ({
          color: props.$theme.colors.warning,
        }),
      },
    }}
  />
);
