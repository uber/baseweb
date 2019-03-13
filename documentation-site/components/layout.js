/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {styled} from 'baseui';
import {MDXProvider} from '@mdx-js/tag';
import {Block} from 'baseui/block';
import MarkdownElements from './markdown-elements';
import Sidebar from './sidebar';
import HeaderNavigation from './header-navigation';

type PropsT = {
  children: React.Node,
  path?: {},
};

const SidebarWrapper = styled('div', ({$theme, $isOpen}) => ({
  display: $isOpen ? 'block' : 'none',
  paddingTop: $theme.sizing.scale700,
  marginLeft: $theme.sizing.scale1000,
  marginRight: $theme.sizing.scale1000,
  '@media screen and (min-width: 820px)': {
    display: 'block',
    maxWidth: '14em',
  },
}));

const ContentWrapper = styled('div', ({$theme, $isSidebarOpen}) => ({
  display: $isSidebarOpen ? 'none' : 'block',
  paddingLeft: $theme.sizing.scale900,
  paddingRight: $theme.sizing.scale900,
  maxWidth: '40em',
  flex: 2,
  '@media screen and (min-width: 820px)': {
    display: 'block',
  },
}));

class Layout extends React.Component<PropsT, {sidebarOpen: boolean}> {
  constructor(props: PropsT) {
    super(props);
    this.state = {
      sidebarOpen: false,
    };
  }
  render() {
    const {sidebarOpen} = this.state;
    const {path, children} = this.props;
    return (
      <React.Fragment>
        <HeaderNavigation
          toggleSidebar={() =>
            this.setState(prevState => ({sidebarOpen: !prevState.sidebarOpen}))
          }
        />
        <Block
          overrides={{
            Block: {
              style: ({$theme}) => ({
                backgroundColor: $theme.colors.background,
                color: $theme.colors.foreground,
                marginTop: '8px',
              }),
            },
          }}
          display="flex"
          paddingTop="scale400"
        >
          <SidebarWrapper
            $isOpen={sidebarOpen}
            onClick={() => sidebarOpen && this.setState({sidebarOpen: false})}
          >
            <Sidebar path={path} />
          </SidebarWrapper>
          <ContentWrapper id="docSearch-content" $isSidebarOpen={sidebarOpen}>
            <MDXProvider components={MarkdownElements}>{children}</MDXProvider>
          </ContentWrapper>
        </Block>
      </React.Fragment>
    );
  }
}

export default Layout;
