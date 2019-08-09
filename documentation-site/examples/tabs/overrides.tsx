// @flow
import * as React from 'react';
import {StatefulTabs, Tab, StyledTab} from 'baseui/tabs';
import {Label2} from 'baseui/typography';

type StateT = {
  activeKey: string;
};

function TabOverride({children, ...rest}: {children?: any}) {
  return (
    <StyledTab {...rest}>
      <Label2
        overrides={{
          Block: {
            style: {color: 'inherit', ':hover': {color: 'inherit'}},
          },
        }}
      >
        {children}
      </Label2>
    </StyledTab>
  );
}

const tabStyle = ({
  $active,
  $disabled,
  $theme,
}: {
  $active?: boolean;
  $disabled?: boolean;
  $theme: any;
}) => ({
  outlineColor: $theme.colors.white,
  color: $active ? $theme.colors.mono100 : $theme.colors.mono300,
  ':hover': $disabled
    ? {}
    : {
        color: $theme.colors.mono100,
      },
  ':focus': $disabled
    ? {}
    : {
        color: $theme.colors.mono100,
      },
});

const tabBarStyle = ({$theme}: {$theme: any}) => ({
  backgroundColor: $theme.colors.mono600,
});

const tabContentStyle = ({$theme}: {$theme: any}) => ({
  borderLeftWidth: '2px',
  borderRightWidth: '2px',
  borderBottomWidth: '2px',
  borderTopWidth: '0',
  borderStyle: 'dashed',
  borderColor: $theme.colors.mono600,
});

class Example extends React.Component<{}, StateT> {
  state = {
    activeKey: '0',
  };

  onChange = (params: {activeKey: React.Key}) => {
    this.setState({activeKey: String(params.activeKey)});
  };

  render() {
    const content = [
      'Tab Content 1',
      'Tab Content 2',
      'Tab Content 3',
    ];
    return (
      <React.Fragment>
        <StatefulTabs
          initialState={{activeKey: this.state.activeKey}}
          onChange={this.onChange}
          overrides={{
            TabBar: {
              style: tabBarStyle,
            },
            TabContent: {
              style: tabContentStyle,
            },
          }}
        >
          <Tab
            overrides={{
              Tab: {component: TabOverride, style: tabStyle},
            }}
            title="Tab Link 1"
          >
            <div>{content[Number(this.state.activeKey)]}</div>
          </Tab>
          <Tab
            overrides={{
              Tab: {component: TabOverride, style: tabStyle},
            }}
            title="Tab Link 2"
          >
            <div>{content[Number(this.state.activeKey)]}</div>
          </Tab>
          <Tab
            overrides={{
              Tab: {component: TabOverride, style: tabStyle},
            }}
            title="Tab Link 3"
          >
            <div>{content[Number(this.state.activeKey)]}</div>
          </Tab>
        </StatefulTabs>
      </React.Fragment>
    );
  }
}

export default () => <Example />;
