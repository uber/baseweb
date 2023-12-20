/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { FileUploader } from "baseui/file-uploader";
import { PropTypes } from "react-view";
import type { TConfig } from "../types";
import buttonConfig from "./button";

const changeHandlers = [
  "onClick",
  "onFocus",
  "onBlur",
  "onKeyDown",
  "onDragStart",
  "onDragEnter",
  "onDragOver",
  "onDragLeave",
  "onDrop",
  "onDropAccepted",
  "onDropRejected",
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
    FileUploader,
  },
  theme: [],
  props: {
    accept: {
      value: "",
      type: PropTypes.String,
      description:
        "Set accepted file types. See https://github.com/okonet/attr-accept for more information",
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
    multiple: {
      value: undefined,
      type: PropTypes.Boolean,
      description:
        "Allow drag n drop (or selection from the file dialog) of multiple files",
    },
    disableClick: {
      value: undefined,
      type: PropTypes.Boolean,
      description:
        "Disallow clicking on the dropzone container to open file dialog.",
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: "Renders component in disabled state.",
    },
    errorMessage: {
      value: "",
      type: PropTypes.String,
      description: "Error message to be displayed.",
      stateful: true,
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
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: "Lets you customize all aspects of the component.",
      custom: {
        names: [
          { ...buttonConfig, componentName: "ButtonComponent" },
          { ...buttonConfig, componentName: "CancelButtonComponent" },
          { ...buttonConfig, componentName: "RetryButtonComponent" },
          "ContentMessage",
          "ErrorMessage",
          "FileDragAndDrop",
          "HiddenInput",
          "Spinner",
          "ProgressBar",
        ],
        sharedProps: {},
      },
    },
  },
};

export default FileUploaderConfig;
