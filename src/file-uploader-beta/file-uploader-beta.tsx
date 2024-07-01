/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { FileUploader } from '../file-uploader';
import { SHAPE, SIZE } from '../button';
import { ProgressBar } from '../progress-bar';
import { getOverrides } from '../helpers/overrides';
import {
  StyledFileRow,
  StyledFileRowColumn,
  StyledFileRowContent,
  StyledFileRowFileName,
  StyledFileRowText,
  StyledFileRowUploadMessage,
  StyledFileRowUploadText,
  StyledFileRows,
  StyledHint,
  StyledImagePreviewThumbnail,
  StyledItemPreviewContainer,
  StyledLabel,
  StyledParentRoot,
  StyledTrashCanFilledIconContainer,
} from './styled-components';
import { FILE_STATUS, FILE_STATUS_TO_COLOR_MAP } from './constants';
import { destructureStyleOverride, formatBytes } from './utils';
import AlertIconComponent from '../icon/alert';
import CircleCheckFilledIconComponent from '../icon/circle-check-filled';
import PaperclipFilledIconComponent from '../icon/paperclip-filled';
import TrashCanFilledIconComponent from '../icon/trash-can-filled';
import { useStyletron } from '../styles';
import { LocaleContext } from '../locale';

import type { FileRow, FileUploaderBetaProps } from './types';

export default function FileUploaderBeta(props: FileUploaderBetaProps) {
  if (props['onDrop']) {
    console.error('onDrop is not a prop for FileUploaderBeta.');
  }
  if (props['onDropAccepted']) {
    console.error('onDropAccepted is not a prop for FileUploaderBeta.');
  }
  if (props['onDropRejected']) {
    console.error('onDropRejected is not a prop for FileUploaderBeta.');
  }

  // Isolate props that are not meant to be passed to FileUploaderBasic
  const {
    fileRows,
    hint,
    itemPreview,
    label,
    maxFiles,
    overrides = {},
    processFileOnDrop,
    setFileRows,
    ...fileUploaderBasicProps
  } = props;
  // Isolate styles that are not meant to be passed to FileUploaderBasic
  const {
    // Overrides for FileUploaderBeta
    AlertIcon: OverridesAlertIcon,
    CircleCheckFilledIcon: OverridesCircleCheckFilledIcon,
    FileRow: OverridesFileRow,
    FileRowColumn: OverridesFileRowColumn,
    FileRowContent: OverridesFileRowContent,
    FileRowFileName: OverridesFileRowFileName,
    FileRowText: OverridesFileRowText,
    FileRowUploadMessage: OverridesFileRowUploadMessage,
    FileRowUploadText: OverridesFileRowUploadText,
    FileRows: OverridesFileRows,
    Hint: OverridesHint,
    ImagePreviewThumbnail: OverridesImagePreviewThumbnail,
    ItemPreviewContainer: OverridesItemPreviewContainer,
    Label: OverridesLabel,
    PaperclipFilledIcon: OverridesPaperclipFilledIcon,
    ParentRoot: OverridesParentRoot,
    TrashCanFilledIcon: OverridesTrashCanFilledIcon,
    TrashCanFilledIconContainer: OverridesTrashCanFilledIconContainer,

    // Overrides for FileUploaderBasic that are modified in this file
    ButtonComponent,
    ContentMessage,
    FileDragAndDrop,
    ...fileUploaderBasicOverrides
  } = overrides;

  const [, theme] = useStyletron();

  // Prepare icon overrides
  const [AlertIcon, alertIconProps] = getOverrides(OverridesAlertIcon, AlertIconComponent);
  const [CircleCheckFilledIcon, circleCheckFilledIconProps] = getOverrides(
    overrides.CircleCheckFilledIcon,
    CircleCheckFilledIconComponent
  );
  const [PaperclipFilledIcon, paperclipFilledIconProps] = getOverrides(
    OverridesPaperclipFilledIcon,
    PaperclipFilledIconComponent
  );
  const [TrashCanFilledIcon, trashCanFilledIconProps] = getOverrides(
    OverridesTrashCanFilledIcon,
    TrashCanFilledIconComponent
  );

  // Prepare styled component overrides
  const [FileRow, fileRowProps] = getOverrides(OverridesFileRow, StyledFileRow);
  const [FileRowColumn, fileRowColumnProps] = getOverrides(
    OverridesFileRowColumn,
    StyledFileRowColumn
  );
  const [FileRowContent, fileRowContentProps] = getOverrides(
    OverridesFileRowContent,
    StyledFileRowContent
  );
  const [FileRowFileName, fileRowFileNameProps] = getOverrides(
    OverridesFileRowFileName,
    StyledFileRowFileName
  );
  const [FileRowText, fileRowTextProps] = getOverrides(OverridesFileRowText, StyledFileRowText);
  const [FileRowUploadMessage, fileRowUploadMessageProps] = getOverrides(
    OverridesFileRowUploadMessage,
    StyledFileRowUploadMessage
  );
  const [FileRowUploadText, fileRowUploadTextProps] = getOverrides(
    OverridesFileRowUploadText,
    StyledFileRowUploadText
  );
  const [FileRows, fileRowsProps] = getOverrides(OverridesFileRows, StyledFileRows);
  const [Hint, hintProps] = getOverrides(OverridesHint, StyledHint);
  const [ImagePreviewThumbnail, imagePreviewThumbnailProps] = getOverrides(
    OverridesImagePreviewThumbnail,
    StyledImagePreviewThumbnail
  );
  const [ItemPreviewContainer, itemPreviewContainerProps] = getOverrides(
    OverridesItemPreviewContainer,
    StyledItemPreviewContainer
  );
  const [Label, labelProps] = getOverrides(OverridesLabel, StyledLabel);
  const [ProgressBarComponent, progressBarProps] = getOverrides(overrides.ProgressBar, ProgressBar);
  const [ParentRoot, parentRootProps] = getOverrides(OverridesParentRoot, StyledParentRoot);
  const [TrashCanFilledIconContainer, trashCanFilledIconContainerProps] = getOverrides(
    OverridesTrashCanFilledIconContainer,
    StyledTrashCanFilledIconContainer
  );

  const onDrop = React.useCallback(
    (acceptedFiles: Array<File>, rejectedFiles: Array<File>) => {
      const newFiles = acceptedFiles.concat(rejectedFiles);
      let newFileRows = [...props.fileRows];
      newFiles.forEach((file: File) => {
        newFileRows.push({
          errorMessage: null,
          file,
          imagePreviewThumbnail: '',
          status: FILE_STATUS.added,
        });
        props.setFileRows([...newFileRows]);
      });

      newFileRows.forEach((fileRow: FileRow, index: number) => {
        if (fileRow.status === FILE_STATUS.added) {
          let reader = new FileReader();

          reader.onerror = () => {
            newFileRows[index].errorMessage = 'cannot read file';
            newFileRows[index].status = FILE_STATUS.error;
            props.setFileRows([...newFileRows]);
          };

          reader.onload = (event) => {
            if (newFileRows[index].file.type.startsWith('image/')) {
              newFileRows[index].imagePreviewThumbnail = event.target?.result;
              props.setFileRows([...newFileRows]);
            }
            if (
              props.maxFiles !== undefined &&
              Number.isInteger(props.maxFiles) &&
              index >= props.maxFiles
            ) {
              // If too many files
              newFileRows[
                index
              ].errorMessage = `cannot process more than ${props.maxFiles} file(s)`;
              newFileRows[index].status = FILE_STATUS.error;
              props.setFileRows([...newFileRows]);
            } else if (
              props.minSize !== undefined &&
              Number.isInteger(props.minSize) &&
              props.minSize > fileRow.file.size
            ) {
              // If file size is too small
              newFileRows[index].errorMessage = `file size must be greater than ${formatBytes(
                props.minSize
              )}`;
              newFileRows[index].status = FILE_STATUS.error;
              props.setFileRows([...newFileRows]);
            } else if (
              props.maxSize !== undefined &&
              Number.isInteger(props.maxSize) &&
              props.maxSize < fileRow.file.size
            ) {
              // If file size is too big
              newFileRows[index].errorMessage = `file size must be less than ${formatBytes(
                props.maxSize
              )}`;
              newFileRows[index].status = FILE_STATUS.error;
              props.setFileRows([...newFileRows]);
            } else if (index >= newFileRows.length - rejectedFiles.length) {
              // If file was rejected by dropzone (e.g. wrong file type)
              newFileRows[index].errorMessage = `file type of ${fileRow.file.type} is not accepted`;
              newFileRows[index].status = FILE_STATUS.error;
              props.setFileRows([...newFileRows]);
            } else if (props.processFileOnDrop) {
              // If caller passed in file process function
              props
                .processFileOnDrop(fileRow.file)
                .then(
                  ({ errorMessage, fileInfo }: { errorMessage: string | null; fileInfo?: any }) => {
                    if (fileInfo) {
                      newFileRows[index].fileInfo = fileInfo;
                    }
                    if (errorMessage) {
                      newFileRows[index].errorMessage = errorMessage;
                      newFileRows[index].status = FILE_STATUS.error;
                    } else {
                      newFileRows[index].status = FILE_STATUS.processed;
                    }
                  }
                )
                .catch((error) => {
                  console.error('error with processFileOnDrop', error);
                  newFileRows[index].errorMessage = 'unknown processing error';
                  newFileRows[index].status = FILE_STATUS.error;
                })
                .finally(() => {
                  props.setFileRows([...newFileRows]);
                });
            } else {
              // If no errors and no file process function
              newFileRows[index].status = FILE_STATUS.processed;
              props.setFileRows([...newFileRows]);
            }
          };

          reader.readAsDataURL(fileRow.file);
        }
      });
    },
    [props]
  );

  const removeFileRow = (event: React.MouseEvent) => {
    event.preventDefault();
    const indexOfFileRowToRemove = Number(event?.currentTarget?.getAttribute('index'));
    props.setFileRows([...props.fileRows.toSpliced(indexOfFileRowToRemove, 1)]);
  };

  return (
    <ParentRoot data-baseweb="file-uploader-beta-parent-root" {...parentRootProps}>
      {props.label && (
        <Label data-baseweb="file-uploader-beta-label" {...labelProps} $disabled={!!props.disabled}>
          {props.label}
        </Label>
      )}
      <FileUploader
        overrides={{
          ButtonComponent: {
            props: {
              shape: SHAPE.default,
              size: SIZE.default,
              ...props.overrides?.ButtonComponent?.props,
              style: {
                marginTop: 0,
                // @ts-expect-error
                ...destructureStyleOverride(props.overrides?.ButtonComponent?.props?.style, theme),
              },
              overrides: {
                // @ts-expect-error
                ...props.overrides?.ButtonComponent?.props?.overrides,
                BaseButton: {
                  // @ts-expect-error
                  ...props.overrides?.ButtonComponent?.props?.overrides?.BaseButton,
                  style: {
                    backgroundColor: theme.colors.backgroundPrimary,
                    ...destructureStyleOverride(
                      // @ts-expect-error
                      props.overrides?.ButtonComponent?.props?.overrides?.BaseButton?.style,
                      theme
                    ),
                  },
                },
              },
            },
          },
          ContentMessage: {
            style: {
              ...theme.typography.ParagraphMedium,
              color: theme.colors.contentTertiary,
              ...destructureStyleOverride(props.overrides?.ContentMessage?.style, theme),
            },
          },
          FileDragAndDrop: {
            style: {
              justifyContent: 'flex-end',
              flexDirection: 'row-reverse',
              flexWrap: 'wrap',
              gap: theme.sizing.scale300,
              paddingBottom: theme.sizing.scale600,
              paddingLeft: theme.sizing.scale600,
              paddingRight: theme.sizing.scale600,
              paddingTop: theme.sizing.scale600,
              ...destructureStyleOverride(props.overrides?.FileDragAndDrop?.style, theme),
            },
          },
          Root: {
            style: {
              zIndex: 1,
              ...destructureStyleOverride(props.overrides?.Root?.style, theme),
              ...props.overrides?.Root?.style,
            },
          },
        }}
        {...fileUploaderBasicOverrides}
        {...fileUploaderBasicProps}
        // Disable uploads while files are loading, even if application passes disabled as false
        disabled={
          !!props.disabled
            ? props.disabled
            : !!props.fileRows.find((fileRow: FileRow) => fileRow.status === FILE_STATUS.added)
        }
        // Implement or use no-op callbacks to prevent consumers from passing them in
        onDrop={onDrop}
        onDropAccepted={(_: Array<File>) => {}}
        onDropRejected={(_: Array<File>) => {}}
      />
      {props.fileRows.length > 0 && (
        <LocaleContext.Consumer>
          {(locale) => (
            <FileRows data-baseweb="file-uploader-beta-file-rows" {...fileRowsProps}>
              {props.fileRows.map((fileRow, index) => (
                <FileRow
                  id={`file-uploader-beta-file-row-${index}`}
                  data-baseweb="file-uploader-beta-file-row"
                  key={index}
                  {...fileRowProps}
                >
                  {props.itemPreview && (
                    <ItemPreviewContainer
                      data-baseweb="file-uploader-beta-item-preview-container"
                      {...itemPreviewContainerProps}
                    >
                      {fileRow.imagePreviewThumbnail ? (
                        <ImagePreviewThumbnail
                          alt={fileRow.file.name}
                          data-baseweb="file-uploader-beta-image-preview-thumbnail"
                          src={fileRow.imagePreviewThumbnail}
                          {...imagePreviewThumbnailProps}
                        />
                      ) : (
                        <PaperclipFilledIcon
                          data-baseweb="file-uploader-beta-paperclip-filled-icon"
                          color={theme.colors.contentSecondary}
                          {...paperclipFilledIconProps}
                        />
                      )}
                    </ItemPreviewContainer>
                  )}
                  <FileRowColumn
                    data-baseweb="file-uploader-beta-file-row-column"
                    {...fileRowColumnProps}
                  >
                    <FileRowContent
                      data-baseweb="file-uploader-beta-file-row-content"
                      {...fileRowContentProps}
                    >
                      <FileRowText
                        data-baseweb="file-uploader-beta-file-row-text"
                        {...fileRowTextProps}
                      >
                        <FileRowFileName
                          data-baseweb="file-uploader-beta-file-row-file-name"
                          {...fileRowFileNameProps}
                        >
                          {fileRow.file.name}
                        </FileRowFileName>
                        <FileRowUploadMessage
                          data-baseweb="file-uploader-beta-file-row-upload-message"
                          $color={FILE_STATUS_TO_COLOR_MAP(theme)[fileRow.status]}
                          {...fileRowUploadMessageProps}
                        >
                          {fileRow.status === FILE_STATUS.error && (
                            <>
                              <AlertIcon
                                color={FILE_STATUS_TO_COLOR_MAP(theme)[fileRow.status]}
                                data-baseweb="file-uploader-beta-alert-icon"
                                title={fileRow.status}
                                {...alertIconProps}
                              />
                              <FileRowUploadText
                                aria-errormessage={fileRow.errorMessage}
                                {...fileRowUploadTextProps}
                              >
                                {locale.fileuploaderbeta.error}
                                {fileRow.errorMessage}
                              </FileRowUploadText>
                            </>
                          )}
                          {fileRow.status === FILE_STATUS.processed && (
                            <>
                              <CircleCheckFilledIcon
                                color={FILE_STATUS_TO_COLOR_MAP(theme)[fileRow.status]}
                                data-baseweb="file-uploader-beta-circle-check-filled-icon"
                                title={fileRow.status}
                                {...circleCheckFilledIconProps}
                              />
                              <FileRowUploadText {...fileRowUploadTextProps}>
                                {locale.fileuploaderbeta.processed}
                              </FileRowUploadText>
                            </>
                          )}
                          {fileRow.status === FILE_STATUS.added && (
                            <FileRowUploadText {...fileRowUploadTextProps}>
                              {locale.fileuploaderbeta.added}
                            </FileRowUploadText>
                          )}
                        </FileRowUploadMessage>
                      </FileRowText>
                      {fileRow.status !== FILE_STATUS.added && (
                        <TrashCanFilledIconContainer
                          data-baseweb="file-uploader-beta-trash-can-filled-icon-container"
                          index={index}
                          onClick={removeFileRow}
                          {...trashCanFilledIconContainerProps}
                        >
                          <TrashCanFilledIcon
                            aria-controls={`file-uploader-beta-file-row-${index}`}
                            aria-describedby={props['aria-describedby']}
                            aria-label={'remove'}
                            data-baseweb="file-uploader-beta-trash-can-filled-icon"
                            overrides={{ Svg: { style: { verticalAlign: 'middle' } } }}
                            size={theme.sizing.scale600}
                            title={'remove'}
                            {...trashCanFilledIconProps}
                          />
                        </TrashCanFilledIconContainer>
                      )}
                    </FileRowContent>
                    <ProgressBarComponent
                      data-baseweb="file-uploader-beta-progress-bar"
                      overrides={{
                        Bar: {
                          style: {
                            marginTop: theme.sizing.scale0,
                            marginBottom: theme.sizing.scale0,
                            marginLeft: 0,
                            marginRight: 0,
                          },
                        },
                        BarContainer: {
                          style: {
                            marginTop: 0,
                            marginBottom: 0,
                            marginLeft: 0,
                            marginRight: 0,
                          },
                        },
                        BarProgress: {
                          // @ts-ignore
                          style: ({ $theme }) => ({
                            backgroundColor: FILE_STATUS_TO_COLOR_MAP($theme)[fileRow.status],
                          }),
                        },
                      }}
                      value={fileRow.status === FILE_STATUS.processed ? 100 : 20}
                      {...progressBarProps}
                    />
                  </FileRowColumn>
                </FileRow>
              ))}
            </FileRows>
          )}
        </LocaleContext.Consumer>
      )}
      {props.hint && (
        <Hint
          data-baseweb="file-uploader-beta-hint"
          $fileCount={props.fileRows.length}
          {...hintProps}
        >
          {props.hint}
        </Hint>
      )}
    </ParentRoot>
  );
}

FileUploaderBeta.defaultProps = {
  fileRows: [],
  setFileRows: () => {},
};
