/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { Breadcrumbs } from "baseui/breadcrumbs";
import { StyledLink } from "baseui/link";
import { PropTypes } from "react-view";
import type { TConfig } from "../types";
import iconConfig from "./icon";

const BreadcrumbsConfig: TConfig = {
  componentName: "Breadcrumbs",
  imports: {
    "baseui/breadcrumbs": {
      named: ["Breadcrumbs"],
    },
  },
  scope: { Breadcrumbs, StyledLink },
  theme: ["breadcrumbsText", "breadcrumbsSeparatorFill"],
  props: {
    children: {
      value: `<StyledLink href="#parent">
  Parent Page
</StyledLink>
<StyledLink href="#sub">
  Sub-Parent Page
</StyledLink>
<span>Current Page</span>
`,
      type: PropTypes.ReactNode,
      description: "Elements separated by divider",
      imports: {
        "baseui/link": { named: ["StyledLink"] },
      },
    },
    "aria-label": {
      value: undefined,
      description: "Aria-label attribute",
      type: PropTypes.String,
    },
    showTrailingSeparator: {
      value: false,
      type: PropTypes.Boolean,
      description:
        "Whether to show a trailing separator after the last breadcrumb.",
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: "Lets you customize all aspects of the component.",
      custom: {
        names: [
          "Root",
          "Separator",
          "List",
          "ListItem",
          { ...iconConfig, componentName: "Icon" },
        ],
        sharedProps: {},
      },
    },
  },
};

export default BreadcrumbsConfig;
