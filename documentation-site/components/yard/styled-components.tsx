import * as React from 'react';
import {useStyletron} from 'baseui';
import {StatefulTabs, Tab} from 'baseui/tabs';

export const YardTabs: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [, theme] = useStyletron();
  return (
    <StatefulTabs
      initialState={{activeKey: '0'}}
      overrides={{
        Root: {
          style: {
            marginBottom: theme.sizing.scale400,
          },
        },
        TabBar: {
          style: {backgroundColor: 'transparent', paddingLeft: 0},
        },
        TabContent: {style: {paddingLeft: 0, paddingRight: 0}},
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
        Tab: {
          style: ({$theme}) =>
            ({
              marginLeft: 0,
              ...$theme.typography.font450,
            } as any),
        },
      }}
    />
  );
};
