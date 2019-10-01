import * as React from 'react';
import {useStyletron} from 'baseui';
import {StatefulTooltip} from 'baseui/tooltip';
import {Tag, VARIANT} from 'baseui/tag';
import {StatefulTabs, Tab} from 'baseui/tabs';

export const Beta = () => {
  const [css] = useStyletron();
  return (
    <div className={css({display: 'flex', justifyContent: 'flex-end'})}>
      <Tag closeable={false} variant={VARIANT.outlined} kind="warning">
        <StatefulTooltip
          accessibilityType="tooltip"
          placement="bottomLeft"
          content="This is a new experimental component playground. Please use GitHub issues to report any feedback and bugs. Thank you!"
        >
          Beta
        </StatefulTooltip>
      </Tag>
    </div>
  );
};

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
