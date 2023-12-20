/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { SegmentedControl, Segment } from "baseui/segmented-control";
import { PropTypes } from "react-view";
import type { TConfig } from "../types";

const SegmentedControlConfig: TConfig = {
  componentName: "SegmentedControl",
  imports: {
    "baseui/segmented-control": { named: ["SegmentedControl"] },
  },
  scope: { SegmentedControl, Segment },
  theme: [
    "accent",
    "borderOpaque",
    "borderSelected",
    "contentPrimary",
    "backgroundPrimary",
    "contentStateDisabled",
  ],
  props: {
    activeKey: {
      value: "0",
      type: PropTypes.String,
      description: "Key of the the tab to be selected.",
      stateful: true,
    },
    children: {
      value: `<Segment 
  artwork={() => "🤖"} 
  label="Label 1" 
  description="paragraph 1" 
  badge="2"
/>
<Segment 
  artwork={() => "😍"} 
  label="Label 2" 
  description="paragraph 2" 
/>
<Segment 
  artwork={() => "🤠"} 
  label="Label 3" 
  description="paragraph 3" 
  badgeHint={true}
/>`,
      type: PropTypes.ReactNode,
      description: `An array of Segment components.`,
      imports: {
        "baseui/segmented-control": { named: ["Segment"] },
      },
    },
    onChange: {
      value: "({ activeKey }) => {\n  setActiveKey(activeKey);\n}",
      type: PropTypes.Function,
      description: `Change handler that is called every time a new tab is selected.`,
      propHook: {
        what: "activeKey",
        into: "activeKey",
      },
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: "Disable all non-active tabs.",
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: "Lets you customize all aspects of the component.",
      custom: {
        names: ["Root", "SegmentList", "Active"],
        sharedProps: {},
      },
    },
  },
};

export default SegmentedControlConfig;
