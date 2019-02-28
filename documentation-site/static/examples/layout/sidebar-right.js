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

export default () => (
  <Layout>
    <Header>
      <MyHeader>header</MyHeader>
    </Header>
    <Layout>
      <Content>
        <MyContent>content</MyContent>
      </Content>
      <Sidebar>
        <MySidebar>sidebar</MySidebar>
      </Sidebar>
    </Layout>
  </Layout>
);
