import * as React from "react";
import { Tabs, Tab } from "baseui/tabs-motion";
import { Check } from "baseui/icon";

export default function Example() {
  const [activeKey, setActiveKey] = React.useState<React.Key>(0);
  return (
    <Tabs
      activeKey={activeKey}
      onChange={({ activeKey }) => setActiveKey(activeKey)}
    >
      <Tab title="First" artwork={Check}>
        I must not fear.
      </Tab>
      <Tab title="Second" artwork={Check}>
        Fear is the mind-killer.
      </Tab>
      <Tab title="Third" artwork={Check}>
        Fear is the little-death that brings total obliteration.
      </Tab>
    </Tabs>
  );
}
