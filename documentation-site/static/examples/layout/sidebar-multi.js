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

const MySidebarDark = styled(MySidebar, ({$theme}) => ({
  backgroundColor: $theme.colors.mono700,
}));

export default () => (
  <Layout>
    <Header>
      <MyHeader>header</MyHeader>
    </Header>
    <Layout>
      <Sidebar>
        <MySidebar>sidebar</MySidebar>
      </Sidebar>
      <Sidebar>
        <MySidebarDark>sidebar</MySidebarDark>
      </Sidebar>
      <Content>
        <MyContent>content</MyContent>
      </Content>
    </Layout>
  </Layout>
);
