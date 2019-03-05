import React from 'react';
import {styled} from 'baseui';
import {Layout, Header, Content, Sidebar} from 'baseui/layout';

const MyHeader = styled('div', ({$theme}) => ({
  alignItems: 'center',
  backgroundColor: $theme.colors.mono400,
  display: 'flex',
  height: '80px',
  justifyContent: 'center',
}));

const MyContent = styled('div', ({$theme}) => ({
  alignItems: 'center',
  backgroundColor: $theme.colors.mono200,
  display: 'flex',
  height: '200px',
  justifyContent: 'center',
}));

const MySidebar = styled('div', ({$theme}) => ({
  alignItems: 'center',
  backgroundColor: $theme.colors.mono600,
  display: 'flex',
  width: '200px',
  height: '100%',
  justifyContent: 'center',
}));

export default class SidebarCollapse extends React.Component {
  state = {isSidebarCollapsed: false};

  render() {
    return (
      <Layout>
        <Header>
          <MyHeader>
            <button
              onClick={() =>
                this.setState(prev => ({
                  isSidebarCollapsed: !prev.isSidebarCollapsed,
                }))
              }
            >
              Toggle Sidebar
            </button>
          </MyHeader>
        </Header>
        <Layout>
          <Sidebar
            breakpoint="medium"
            isCollapsed={this.state.isSidebarCollapsed}
            onCollapse={() => this.setState({isSidebarCollapsed: true})}
          >
            <MySidebar>shrink smaller than 600px</MySidebar>
          </Sidebar>
          <Content>
            <MyContent>content</MyContent>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
