import React from 'react';
import {styled} from 'baseui';
import {Layout, Header, Content} from 'baseui/layout';

const MyHeader = styled('div', ({$theme}) => ({
  alignItems: 'center',
  backgroundColor: $theme.colors.mono400,
  display: 'flex',
  height: '80px',
  justifyContent: 'center',
}));

const MySubheader = styled(MyHeader, ({$theme}) => ({
  backgroundColor: $theme.colors.mono600,
}));

const MyContent = styled('div', ({$theme}) => ({
  alignItems: 'center',
  backgroundColor: $theme.colors.mono200,
  display: 'flex',
  height: '200px',
  justifyContent: 'center',
}));

export default () => (
  <Layout>
    <Header>
      <MyHeader>header</MyHeader>
    </Header>
    <Header>
      <MySubheader>sub-header</MySubheader>
    </Header>
    <Content>
      <MyContent>content</MyContent>
    </Content>
  </Layout>
);
