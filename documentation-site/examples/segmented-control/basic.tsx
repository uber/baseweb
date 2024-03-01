import * as React from "react";
import { SegmentedControl, Segment } from "baseui/segmented-control";

export default function Example() {
  const [activeKey, setActiveKey] = React.useState("1");
  return (
    <SegmentedControl
      activeKey={activeKey}
      onChange={({ activeKey }) => {
        setActiveKey(activeKey);
      }}
    >
      <Segment key="0" label="Label 1" />
      <Segment key="1" label="Label 2" />
      <Segment key="2" label="Label 3" />
    </SegmentedControl>
  );
}
