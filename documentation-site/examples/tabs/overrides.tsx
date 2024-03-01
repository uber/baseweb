import * as React from "react";
import { StatefulTabs, Tab, StyledTab } from "baseui/tabs";
import { LabelMedium } from "baseui/typography";
import { StyleObject } from "styletron-react";

function TabOverride({ children, ...rest }: any) {
  return (
    <StyledTab {...rest}>
      <LabelMedium
        overrides={{
          Block: {
            style: { color: "inherit", ":hover": { color: "inherit" } },
          },
        }}
      >
        {children}
      </LabelMedium>
    </StyledTab>
  );
}

const tabStyle = ({ $active, $disabled, $theme }: any) => ({
  outlineColor: $theme.colors.white,
  color: $active ? $theme.colors.mono100 : $theme.colors.mono300,
  ":hover": $disabled
    ? {}
    : {
        color: $theme.colors.mono100,
      },
  ":focus": $disabled
    ? {}
    : {
        color: $theme.colors.mono100,
      },
});

const tabBarStyle = ({ $theme }: any) => ({
  backgroundColor: $theme.colors.mono600,
});

const tabContentStyle = ({ $theme }: any): StyleObject => ({
  borderLeftWidth: "2px",
  borderRightWidth: "2px",
  borderBottomWidth: "2px",
  borderTopWidth: "0",
  borderLeftStyle: "dashed",
  borderRightStyle: "dashed",
  borderTopStyle: "dashed",
  borderBottomStyle: "dashed",
  borderLeftColor: $theme.colors.mono600,
  borderRightColor: $theme.colors.mono600,
  borderTopColor: $theme.colors.mono600,
  borderBottomColor: $theme.colors.mono600,
});

const content = ["Tab Content 1", "Tab Content 2", "Tab Content 3"];

export default function Example() {
  const [activeKey, setActiveKey] = React.useState<string | number>("0");
  return (
    <StatefulTabs
      initialState={{ activeKey: activeKey }}
      onChange={({ activeKey }) => {
        setActiveKey(activeKey);
      }}
      overrides={{
        TabBar: {
          style: tabBarStyle,
        },
        TabContent: {
          style: tabContentStyle,
        },
        Tab: { component: TabOverride, style: tabStyle },
      }}
    >
      <Tab title="Tab Link 1">
        <div>{content[Number(activeKey)]}</div>
      </Tab>
      <Tab title="Tab Link 2">
        <div>{content[Number(activeKey)]}</div>
      </Tab>
      <Tab title="Tab Link 3">
        <div>{content[Number(activeKey)]}</div>
      </Tab>
    </StatefulTabs>
  );
}
