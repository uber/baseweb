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
  paddingTop: $theme.sizing.scale800,
  marginLeft: $theme.sizing.scale1000,
  marginRight: $theme.sizing.scale800,
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

export default (props: PropsT) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return (
    <React.Fragment>
      <HeaderNavigation toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Block display="flex" paddingTop="scale400">
        <SidebarWrapper
          $isOpen={sidebarOpen}
          onClick={() => setSidebarOpen(false)}
        >
          <Sidebar path={props.path} />
        </SidebarWrapper>

        <ContentWrapper id="docSearch-content" $isSidebarOpen={sidebarOpen}>
          <MDXProvider components={MarkdownElements}>
            {props.children}
          </MDXProvider>
        </ContentWrapper>
      </Block>
    </React.Fragment>
  );
};
