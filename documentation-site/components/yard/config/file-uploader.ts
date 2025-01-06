/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { FileUploader } from "baseui/file-uploader";
import { PropTypes } from "react-view";
import type { TConfig } from "../types";
import iconConfig from "./icon";

const changeHandlers = [
  "onClick",
  "onFocus",
  "onBlur",
  "onKeyDown",
  "onDragStart",
  "onDragEnter",
  "onDragOver",
  "onDragLeave",
  "onFileDialogCancel",
  "onCancel",
  "onRetry",
];

const FileUploaderConfig: TConfig = {
  componentName: "FileUploader",
  imports: {
    "baseui/file-uploader": { named: ["FileUploader"] },
  },
  scope: {
    FileUploader: FileUploader,
  },
  theme: [],
  props: {
    accept: {
      value: "",
      type: PropTypes.String,
      description:
        "Set accepted file types. See https://github.com/okonet/attr-accept for more information",
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: "Renders component in disabled state.",
    },
    fileRows: {
      value: "[]",
      type: PropTypes.Array,
      description: "Array of file objects.",
      stateful: true,
    },
    hint: {
      value: undefined,
      type: PropTypes.String,
      description: "Hint text to be displayed below the file rows.",
    },
    itemPreview: {
      value: false,
      type: PropTypes.Boolean,
      description:
        "Renders a file preview thumbnail. Works best with image files.",
    },
    label: {
      value: undefined,
      type: PropTypes.String,
      description: "Label text to be displayed above the file uploader.",
    },
    maxFiles: {
      value: undefined,
      type: PropTypes.Number,
      description: "Maximum number of files that can be uploaded.",
    },
    maxSize: {
      value: undefined,
      type: PropTypes.Number,
      description: "Maximum file size (in bytes).",
    },
    minSize: {
      value: undefined,
      type: PropTypes.Number,
      description: "Minimum file size (in bytes).",
    },
    processFileOnDrop: {
      value: undefined,
      type: PropTypes.Function,
      description:
        "Application defined callback function that runs on file drop. Takes a File as input and returns a Promise<{ errorMessage: string | null; fileInfo?: any }>.",
    },
    setFileRows: {
      value: "newFileRows => setFileRows(newFileRows)",
      type: PropTypes.Function,
      description: "Function to set file rows.",
    },
    multiple: {
      value: undefined,
      type: PropTypes.Boolean,
      description:
        "Allow drag n drop (or selection from the file dialog) of multiple files",
      hidden: true,
    },
    disableClick: {
      value: undefined,
      type: PropTypes.Boolean,
      description:
        "Disallow clicking on the dropzone container to open file dialog.",
      hidden: true,
    },
    errorMessage: {
      value: undefined,
      type: PropTypes.String,
      description: "Error message to be displayed.",
      hidden: true,
    },
    ...changeHandlers.reduce((acc, current) => {
      //@ts-ignore
      acc[current] = {
        value: undefined,
        type: PropTypes.Function,
        description: `Called when the ${current} event is triggered.`,
        hidden: true,
      };
      return acc;
    }, {}),
    name: {
      value: undefined,
      type: PropTypes.String,
      description: "Name attribute.",
      hidden: true,
    },
    ["aria-describedby"]: {
      value: undefined,
      type: PropTypes.String,
      description: `Sets aria-describedby attribute.`,
      hidden: true,
    },
    progressAmountStartValue: {
      value: undefined,
      type: PropTypes.Number,
      description:
        "Sets the progress amount the loading bar begins at. It is a number between 1 and 100. It is particularly useful for the 'Dynamic loading' example.",
      hidden: true,
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: "Lets you customize all aspects of the component.",
      custom: {
        names: [
          { ...iconConfig, componentName: "AlertIcon" },
          { ...iconConfig, componentName: "CircleCheckFilledIcon" },
          "FileRow",
          "FileRowColumn",
          "FileRowContent",
          "FileRowFileName",
          "FileRowText",
          "FileRowUploadMessage",
          "FileRowUploadText",
          "FileRows",
          "Hint",
          "ImagePreviewThumbnail",
          "ItemPreviewContainer",
          "Label",
          { ...iconConfig, componentName: "PaperclipFilledIcon" },
          "ParentRoot",
          { ...iconConfig, componentName: "TrashCanFilledIcon" },
          "TrashCanFilledIconContainer",
        ],
        sharedProps: {},
      },
    },
  },
};

export default FileUploaderConfig;
