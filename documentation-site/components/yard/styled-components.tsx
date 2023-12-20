/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from "react";
import { useStyletron } from "baseui";
import { StatefulTabs, Tab } from "baseui/tabs-motion";

export const YardTabs: React.FC<{
  children: React.ReactNode;
  initialTab?: string;
}> = ({ children, initialTab = "0" }) => {
  const [, theme] = useStyletron();
  return (
    <StatefulTabs
      initialState={{ activeKey: initialTab }}
      overrides={{
        Root: {
          style: {
            marginBottom: theme.sizing.scale400,
            marginLeft: "-16px",
            marginRight: "-16px",
          },
        },
      }}
    >
      {children}
    </StatefulTabs>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const YardTab: React.FC<any> = (props) => {
  return (
    <Tab
      {...props}
      overrides={{
        Tab: { style: ({ $theme }) => $theme.typography.LabelLarge },
      }}
    />
  );
};
