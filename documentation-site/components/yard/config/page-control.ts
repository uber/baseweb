/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { PageControl, KIND } from "baseui/page-control";
import { PropTypes } from "react-view";
import type { TConfig } from "../types";

const PageControlConfig: TConfig = {
  componentName: "PageControl",
  imports: {
    "baseui/page-control": {
      named: ["PageControl"],
    },
  },
  scope: { PageControl, KIND },
  theme: [],
  props: {
    currentPage: {
      value: 2,
      type: PropTypes.Number,
      description: "The currently active page.",
      stateful: true,
    },
    numPages: {
      value: 5,
      type: PropTypes.Number,
      description: "The total number of pages.",
    },
    onPageChange: {
      value:
        "({nextPage}) => setCurrentPage(Math.min(Math.max(nextPage, 1), 5))",
      type: PropTypes.Function,
      description: `Change handler that is called every time a new page is selected.`,
      propHook: {
        what: "Math.min(Math.max(nextPage, 1), 5)",
        into: "currentPage",
      },
    },
    kind: {
      value: "KIND.default",
      type: PropTypes.Enum,
      description: "Defines the look of the component",
      options: KIND,
      imports: {
        "baseui/page-control": {
          named: ["KIND"],
        },
      },
    },
    disabled: {
      value: undefined,
      defaultValue: false,
      type: PropTypes.Boolean,
      description: "Indicates that the page control is disabled.",
    },
    "aria-label": {
      value: "label",
      type: PropTypes.String,
      description: `Sets the aria-label attribute.`,
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: "Lets you customize all aspects of the component.",
      custom: {
        names: ["Root", "Dot"],
        sharedProps: [],
      },
    },
  },
};

export default PageControlConfig;
