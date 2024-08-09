/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { FileUploaderBasic } from '../file-uploader-basic';
import { Button, KIND, SHAPE, SIZE } from '../button';
import { ProgressBar, SIZE as PROGRESS_BAR_SIZE } from '../progress-bar';
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
} from './styled-components';
import { ARIA_LIVE_ELEMENT_ID, FILE_STATUS, FILE_STATUS_TO_COLOR_MAP } from './constants';
import { destructureStyleOverride, formatBytes, handleAriaLiveUpdates } from './utils';
import CircleCheckFilledIconComponent from '../icon/circle-check-filled';
import CircleExclamationPointFilled from '../icon/circle-exclamation-point-filled';
import PaperclipFilledIconComponent from '../icon/paperclip-filled';
import TrashCanFilledIconComponent from '../icon/trash-can-filled';
import Upload from '../icon/upload';
import { useStyletron } from '../styles';
import { LocaleContext } from '../locale';
import { uid } from 'react-uid';

import type { FileRow, FileUploaderProps } from './types';

export default function FileUploader(props: FileUploaderProps) {
  if (props['onDrop']) {
    console.error('onDrop is not a prop for FileUploader.');
  }
  if (props['onDropAccepted']) {
    console.error('onDropAccepted is not a prop for FileUploader.');
  }
  if (props['onDropRejected']) {
    console.error('onDropRejected is not a prop for FileUploader.');
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
    // Overrides for FileUploader
    CircleCheckFilledIcon: OverridesCircleCheckFilledIcon,
    CircleExclamationPointFilledIcon: OverridesCircleExclamationPointFilledIcon,
    DeleteButtonComponent: OverridesDeleteButtonComponent,
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

    // Overrides for FileUploaderBasic that are modified in this file
    ButtonComponent,
    ContentMessage,
    FileDragAndDrop,
    ...fileUploaderBasicOverrides
  } = overrides;

  const [css, theme] = useStyletron();

  // Prepare icon overrides
  const [CircleCheckFilledIcon, circleCheckFilledIconProps] = getOverrides(
    overrides.CircleCheckFilledIcon,
    CircleCheckFilledIconComponent
  );
  const [CircleExclamationPointFilledIcon, circleExclamationPointFilledIconProps] = getOverrides(
    OverridesCircleExclamationPointFilledIcon,
    CircleExclamationPointFilled
  );
  const [PaperclipFilledIcon, paperclipFilledIconProps] = getOverrides(
    OverridesPaperclipFilledIcon,
    PaperclipFilledIconComponent
  );
  const [TrashCanFilledIcon, trashCanFilledIconProps] = getOverrides(
    OverridesTrashCanFilledIcon,
    TrashCanFilledIconComponent
  );

  // Prepare baseui component overrides
  const [DeleteButtonComponent, deleteButtonProps] = getOverrides(
    OverridesDeleteButtonComponent,
    Button
  );
  const [ProgressBarComponent, progressBarProps] = getOverrides(overrides.ProgressBar, ProgressBar);

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
  const [ParentRoot, parentRootProps] = getOverrides(OverridesParentRoot, StyledParentRoot);

  const onDrop = React.useCallback(
    (acceptedFiles: Array<File>, rejectedFiles: Array<File>) => {
      const newFiles = acceptedFiles.concat(rejectedFiles);
      let newFileRows = [...props.fileRows];
      newFiles.forEach((file: File) => {
        newFileRows.push({
          errorMessage: null,
          file,
          id: uid(file),
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
            handleAriaLiveUpdates(
              ARIA_LIVE_ELEMENT_ID.ADDITION,
              `${newFileRows[index].file.name} added, upload failed: ${newFileRows[index].errorMessage}`
            );
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
              handleAriaLiveUpdates(
                ARIA_LIVE_ELEMENT_ID.ADDITION,
                `${newFileRows[index].file.name} added, upload failed: ${newFileRows[index].errorMessage}`
              );
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
              handleAriaLiveUpdates(
                ARIA_LIVE_ELEMENT_ID.ADDITION,
                `${newFileRows[index].file.name} added, upload failed: ${newFileRows[index].errorMessage}`
              );
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
              handleAriaLiveUpdates(
                ARIA_LIVE_ELEMENT_ID.ADDITION,
                `${newFileRows[index].file.name} added, upload failed: ${newFileRows[index].errorMessage}`
              );
              props.setFileRows([...newFileRows]);
            } else if (index >= newFileRows.length - rejectedFiles.length) {
              // If file was rejected by dropzone (e.g. wrong file type)
              newFileRows[index].errorMessage = fileRow.file.type
                ? `file type of ${fileRow.file.type} is not accepted`
                : 'file type is not accepted';
              newFileRows[index].status = FILE_STATUS.error;
              handleAriaLiveUpdates(
                ARIA_LIVE_ELEMENT_ID.ADDITION,
                `${newFileRows[index].file.name} added, upload failed: ${newFileRows[index].errorMessage}`
              );
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
                  handleAriaLiveUpdates(
                    ARIA_LIVE_ELEMENT_ID.ADDITION,
                    `${newFileRows[index].file.name} added, upload failed: ${newFileRows[index].errorMessage}`
                  );
                })
                .finally(() => {
                  props.setFileRows([...newFileRows]);
                });
            } else {
              // If no errors and no file process function
              newFileRows[index].status = FILE_STATUS.processed;
              handleAriaLiveUpdates(
                ARIA_LIVE_ELEMENT_ID.ADDITION,
                `${newFileRows[index].file.name} added, upload successful`
              );
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
    handleAriaLiveUpdates(
      ARIA_LIVE_ELEMENT_ID.REMOVAL,
      `${props.fileRows[indexOfFileRowToRemove].file.name} removed`
    );
    props.setFileRows([...props.fileRows.toSpliced(indexOfFileRowToRemove, 1)]);
    const label = document.querySelector('[data-baseweb="file-uploader-label"]') as HTMLElement;
    if (label) {
      label.focus();
    }
  };

  const noFilesAreLoading = React.useMemo(
    () => !props.fileRows.find((fileRow: FileRow) => fileRow.status === FILE_STATUS.added),
    [props.fileRows]
  );

  return (
    <LocaleContext.Consumer>
      {(locale) => (
        <ParentRoot data-baseweb="file-uploader-parent-root" {...parentRootProps}>
          <span
            aria-live="assertive"
            aria-relevant="additions"
            className={css({
              top: 0,
              left: '-4px',
              width: '1px',
              height: '1px',
              position: 'absolute',
              overflow: 'hidden',
            })}
            id={ARIA_LIVE_ELEMENT_ID.ADDITION}
          ></span>
          <span
            aria-live="polite"
            aria-relevant="additions"
            className={css({
              top: 0,
              left: '-2px',
              width: '1px',
              height: '1px',
              position: 'absolute',
              overflow: 'hidden',
            })}
            id={ARIA_LIVE_ELEMENT_ID.REMOVAL}
          ></span>
          {props.label && (
            <Label
              data-baseweb="file-uploader-label"
              tabIndex={-1}
              {...labelProps}
              $disabled={!!props.disabled}
            >
              {props.label}
            </Label>
          )}
          <FileUploaderBasic
            buttonIcon={() => <Upload />}
            buttonText={locale.fileuploader.buttonText}
            contentMessage={locale.fileuploader.contentMessage}
            overrides={{
              ButtonComponent: {
                props: {
                  'aria-label': `${locale.fileuploader.buttonText} ${props.hint || ''}`,
                  shape: SHAPE.default,
                  size: SIZE.default,
                  ...props.overrides?.ButtonComponent?.props,
                  style: {
                    marginTop: 0,
                    ...destructureStyleOverride(
                      // @ts-expect-error
                      props.overrides?.ButtonComponent?.props?.style,
                      theme
                    ),
                  },
                  overrides: {
                    // @ts-expect-error
                    ...props.overrides?.ButtonComponent?.props?.overrides,
                    BaseButton: {
                      // @ts-expect-error
                      ...props.overrides?.ButtonComponent?.props?.overrides?.BaseButton,
                      style: {
                        backgroundColor: theme.colors.backgroundPrimary,
                        height: theme.sizing.scale950,
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '8px',
                        ...theme.typography.LabelSmall,
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
                  ...theme.typography.ParagraphSmall,
                  color: theme.colors.contentTertiary,
                  ...destructureStyleOverride(props.overrides?.ContentMessage?.style, theme),
                },
              },
              FileDragAndDrop: {
                style: (fileDragAndDropProps) => ({
                  backgroundColor: fileDragAndDropProps.$theme.colors.fileUploaderBackgroundColor,
                  borderColor: fileDragAndDropProps.$isDragActive
                    ? fileDragAndDropProps.$theme.colors.borderSelected
                    : fileDragAndDropProps.$theme.colors.fileUploaderBorderColorDefault,
                  borderStyle: 'solid',
                  borderWidth: '3px',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: theme.sizing.scale300,
                  paddingBottom: theme.sizing.scale600,
                  paddingLeft: theme.sizing.scale600,
                  paddingRight: theme.sizing.scale600,
                  paddingTop: theme.sizing.scale600,
                  ...destructureStyleOverride(props.overrides?.FileDragAndDrop?.style, theme),
                }),
              },
              Root: {
                style: {
                  marginBottom: theme.sizing.scale300,
                  ...destructureStyleOverride(props.overrides?.Root?.style, theme),
                },
              },
              ...fileUploaderBasicOverrides,
            }}
            swapButtonAndMessage
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
            <FileRows data-baseweb="file-uploader-file-rows" {...fileRowsProps}>
              {props.fileRows.map((fileRow, index) => (
                <FileRow
                  id={`file-uploader-file-row-${index}`}
                  data-baseweb="file-uploader-file-row"
                  key={fileRow.id}
                  {...fileRowProps}
                >
                  {props.itemPreview && (
                    <ItemPreviewContainer
                      aria-hidden={'true'}
                      data-baseweb="file-uploader-item-preview-container"
                      {...itemPreviewContainerProps}
                    >
                      {fileRow.imagePreviewThumbnail ? (
                        <ImagePreviewThumbnail
                          alt={fileRow.file.name}
                          data-baseweb="file-uploader-image-preview-thumbnail"
                          src={fileRow.imagePreviewThumbnail}
                          {...imagePreviewThumbnailProps}
                        />
                      ) : (
                        <PaperclipFilledIcon
                          data-baseweb="file-uploader-paperclip-filled-icon"
                          color={theme.colors.contentSecondary}
                          {...paperclipFilledIconProps}
                        />
                      )}
                    </ItemPreviewContainer>
                  )}
                  <FileRowColumn
                    data-baseweb="file-uploader-file-row-column"
                    {...fileRowColumnProps}
                  >
                    <FileRowContent
                      data-baseweb="file-uploader-file-row-content"
                      {...fileRowContentProps}
                    >
                      <FileRowText data-baseweb="file-uploader-file-row-text" {...fileRowTextProps}>
                        <FileRowFileName
                          data-baseweb="file-uploader-file-row-file-name"
                          {...fileRowFileNameProps}
                        >
                          {fileRow.file.name}
                        </FileRowFileName>
                        <FileRowUploadMessage
                          data-baseweb="file-uploader-file-row-upload-message"
                          $color={FILE_STATUS_TO_COLOR_MAP(theme)[fileRow.status]}
                          {...fileRowUploadMessageProps}
                        >
                          {fileRow.status === FILE_STATUS.error && (
                            <>
                              <CircleExclamationPointFilledIcon
                                aria-hidden={'true'}
                                color={FILE_STATUS_TO_COLOR_MAP(theme)[fileRow.status]}
                                data-baseweb="file-uploader-circle-exclamation-point-filled-icon"
                                title={fileRow.status}
                                {...circleExclamationPointFilledIconProps}
                              />
                              <FileRowUploadText
                                aria-errormessage={fileRow.errorMessage}
                                data-baseweb="file-uploader-file-row-upload-message-text"
                                {...fileRowUploadTextProps}
                              >
                                {locale.fileuploader.error}
                                {fileRow.errorMessage}
                              </FileRowUploadText>
                            </>
                          )}
                          {fileRow.status === FILE_STATUS.processed && (
                            <>
                              <CircleCheckFilledIcon
                                aria-hidden={'true'}
                                color={FILE_STATUS_TO_COLOR_MAP(theme)[fileRow.status]}
                                data-baseweb="file-uploader-circle-check-filled-icon"
                                title={fileRow.status}
                                {...circleCheckFilledIconProps}
                              />
                              <FileRowUploadText
                                data-baseweb="file-uploader-file-row-upload-message-text"
                                {...fileRowUploadTextProps}
                              >
                                {locale.fileuploader.processed}
                              </FileRowUploadText>
                            </>
                          )}
                          {fileRow.status === FILE_STATUS.added && (
                            <FileRowUploadText
                              $color={theme.colors.contentTertiary}
                              data-baseweb="file-uploader-file-row-upload-message-text"
                              {...fileRowUploadTextProps}
                            >
                              {locale.fileuploader.added}
                            </FileRowUploadText>
                          )}
                        </FileRowUploadMessage>
                      </FileRowText>
                      {noFilesAreLoading && (
                        <DeleteButtonComponent
                          aria-label={`Remove ${fileRow.file.name}`}
                          data-baseweb="file-uploader-delete-button-component"
                          index={index}
                          onClick={removeFileRow}
                          kind={KIND.tertiary}
                          shape={SHAPE.circle}
                          size={SIZE.compact}
                          {...deleteButtonProps}
                        >
                          <TrashCanFilledIcon
                            aria-hidden={'true'}
                            data-baseweb="file-uploader-trash-can-filled-icon"
                            overrides={{ Svg: { style: { verticalAlign: 'middle' } } }}
                            size={theme.sizing.scale600}
                            title={'remove'}
                            {...trashCanFilledIconProps}
                          />
                        </DeleteButtonComponent>
                      )}
                    </FileRowContent>
                    <ProgressBarComponent
                      aria-hidden={'true'}
                      data-baseweb="file-uploader-progress-bar"
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
                      size={PROGRESS_BAR_SIZE.small}
                      value={fileRow.status === FILE_STATUS.processed ? 100 : 20}
                      {...progressBarProps}
                    />
                  </FileRowColumn>
                </FileRow>
              ))}
            </FileRows>
          )}
          {props.hint && (
            <Hint
              data-baseweb="file-uploader-hint"
              id="file-uploader-hint"
              $fileCount={props.fileRows.length}
              {...hintProps}
            >
              {props.hint}
            </Hint>
          )}
        </ParentRoot>
      )}
    </LocaleContext.Consumer>
  );
}

FileUploader.defaultProps = {
  fileRows: [],
  setFileRows: () => {},
};
