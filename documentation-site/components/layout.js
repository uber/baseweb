/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {styled} from 'baseui';
import {MDXProvider} from '@mdx-js/tag';
import {Block} from 'baseui/block';
import {Button, KIND, SIZE} from 'baseui/button';

import MarkdownElements from './markdown-elements';
import Sidebar from './sidebar';
import HeaderNavigation from './header-navigation';
import Footer from './footer';
import PencilIcon from './pencil-icon';
import Routes from '../routes';

const GH_URL =
  'https://github.com/uber-web/baseui/blob/master/documentation-site/pages';

function findByPath(o, path) {
  if (!path) return;
  if (o.itemId === path) {
    return o;
  }
  var result, p;
  for (p in o) {
    if (o[p] && typeof o[p] === 'object') {
      result = findByPath(o[p], path);
      if (result) {
        return result;
      }
    }
  }
  return result;
}

type PropsT = {
  children: React.Node,
  path?: string,
  toggleTheme: () => void,
  toggleDirection: () => void,
};

const SidebarWrapper = styled<{$isOpen: boolean}>(
  'div',
  ({$theme, $isOpen}) => ({
    display: $isOpen ? 'block' : 'none',
    paddingTop: $theme.sizing.scale700,
    marginLeft: $theme.sizing.scale800,
    marginRight: $theme.sizing.scale800,
    '@media screen and (min-width: 920px)': {
      display: 'block',
      maxWidth: '16em',
    },
  }),
);

const ContentWrapper = styled<{$isSidebarOpen: boolean}>(
  'div',
  ({$theme, $isSidebarOpen}) => ({
    position: 'relative',
    boxSizing: 'border-box',
    display: $isSidebarOpen ? 'none' : 'block',
    paddingLeft: $theme.sizing.scale800,
    paddingRight: $theme.sizing.scale800,
    width: '100%',
    maxWidth: '40em',
    flex: 2,
    '@media screen and (min-width: 920px)': {
      display: 'block',
      maxWidth: '40em',
    },
  }),
);

class Layout extends React.Component<PropsT, {sidebarOpen: boolean}> {
  constructor(props: PropsT) {
    super(props);
    this.state = {
      sidebarOpen: false,
    };
  }
  render() {
    const {sidebarOpen} = this.state;
    const {toggleTheme, toggleDirection, children} = this.props;
    let {path} = this.props;

    if (path && path.endsWith('/')) {
      path = path.slice(0, -1);
    }

    const route = findByPath(Routes, path);
    let isGitHubEditDisabled;
    let githubUrl;
    if (!path || !route) {
      isGitHubEditDisabled = true;
    } else {
      isGitHubEditDisabled = route.isGitHubEditDisabled;
      githubUrl = `${GH_URL}${path}.mdx`;
    }

    return (
      <React.Fragment>
        <HeaderNavigation
          toggleSidebar={() =>
            this.setState(prevState => ({sidebarOpen: !prevState.sidebarOpen}))
          }
          toggleTheme={toggleTheme}
          toggleDirection={toggleDirection}
        />
        <Block
          backgroundColor="background"
          color="foreground"
          marginTop="scale300"
          display="flex"
          paddingTop="scale400"
          justifyContent="center"
        >
          <SidebarWrapper
            $isOpen={sidebarOpen}
            onClick={() => sidebarOpen && this.setState({sidebarOpen: false})}
          >
            <Sidebar path={path} />
          </SidebarWrapper>
          <ContentWrapper
            id="docSearch-content"
            role="main"
            $isSidebarOpen={sidebarOpen}
          >
            {isGitHubEditDisabled ? null : (
              <Block
                display={['none', 'block']}
                position="absolute"
                right="0px"
                top="-10px"
              >
                <Button
                  startEnhancer={() => <PencilIcon size={16} color="#666666" />}
                  $as="a"
                  href={githubUrl}
                  target="_blank"
                  size={SIZE.compact}
                  kind={KIND.tertiary}
                >
                  Edit this page
                </Button>
              </Block>
            )}
            <MDXProvider components={MarkdownElements}>{children}</MDXProvider>
          </ContentWrapper>
        </Block>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Layout;
