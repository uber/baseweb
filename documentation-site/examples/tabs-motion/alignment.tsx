import * as React from 'react';
import {
  Tabs,
  Tab,
  StyledTabList,
  StyledTabPanel,
} from 'baseui/tabs-motion';
import {Grid, Cell} from 'baseui/layout-grid';

const TabsOverrides = {
  TabList: {
    component: function TabsListOverride(props: any) {
      return (
        <Grid>
          <Cell span={12}>
            <StyledTabList {...props} />
          </Cell>
        </Grid>
      );
    },
  },
};

const TabOverrides = {
  TabPanel: {
    component: function TabPanelOverride(props: any) {
      return (
        <Grid>
          <Cell span={12}>
            <StyledTabPanel {...props} />
          </Cell>
        </Grid>
      );
    },
  },
};

export default function Example() {
  const [activeKey, setActiveKey] = React.useState<React.Key>(0);
  return (
    <Tabs
      activeKey={activeKey}
      onChange={({activeKey}) => setActiveKey(activeKey)}
      overrides={TabsOverrides}
    >
      <Tab title="First" overrides={TabOverrides}>
        I must not fear.
      </Tab>
      <Tab title="Second" overrides={TabOverrides}>
        Fear is the mind-killer.
      </Tab>
      <Tab title="Third" overrides={TabOverrides}>
        Fear is the little-death that brings total obliteration.
      </Tab>
    </Tabs>
  );
}
