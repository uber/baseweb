/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { StyledLink } from "baseui/link";
import { PropTypes } from "react-view";
import type { TConfig } from "../types";

const LinkConfig: TConfig = {
  componentName: "StyledLink",
  imports: {
    "baseui/link": {
      named: ["StyledLink"],
    },
  },
  scope: { StyledLink },
  theme: ["linkText", "linkVisited", "linkHover", "linkActive"],
  props: {
    children: {
      value: "Link to Base Web",
      type: PropTypes.ReactNode,
      description: `Link's content.`,
    },
    href: {
      value: "https://baseweb.design",
      type: PropTypes.String,
      description: "The URL that the hyperlink points to.",
    },
    animateUnderline: {
      value: false,
      type: PropTypes.Boolean,
      description: "Indicates that the link underline is animated.",
    },
  },
};

export default LinkConfig;
