import * as React from 'react';
import {useStyletron} from 'baseui';
import {StatefulTabs, Tab} from 'baseui/tabs-motion';

export const YardTabs: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [, theme] = useStyletron();
  return (
    <StatefulTabs
      initialState={{activeKey: '0'}}
      overrides={{
        Root: {
          style: {
            marginBottom: theme.sizing.scale400,
            marginLeft: '-16px',
            marginRight: '-16px',
          },
        },
      }}
    >
      {children}
    </StatefulTabs>
  );
};

export const YardTab: React.FC<any> = props => {
  return (
    <Tab
      {...props}
      overrides={{
        Tab: {style: ({$theme}) => $theme.typography.LabelLarge},
      }}
    />
  );
};
