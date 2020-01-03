/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {MDXProvider} from '@mdx-js/tag';
import {Block} from 'baseui/block';
import {Button, KIND, SIZE} from 'baseui/button';

import TableOfContents from './table-of-contents';
import {themedStyled} from '../pages/_app';
import MarkdownElements from './markdown-elements';
import Sidebar from './sidebar';
import HeaderNavigation from './header-navigation';
import Footer from './footer';
import PencilIcon from './pencil-icon';
import Routes from '../routes';
import DirectionContext from '../components/direction-context';
import ComponentSizes from '../../component-sizes.json';
import Help from './help';
import Walkthrough from './walkthrough';

const GH_URL =
  'https://github.com/uber/baseweb/edit/master/documentation-site/pages';

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
  hideSideNavigation?: boolean,
  maxContentWidth?: string,
};

const TOCWrapper = themedStyled<{}>('div', ({$theme}) => ({
  display: 'none',
  '@media screen and (min-width: 1340px)': {
    display: 'block',
    maxWidth: '16em',
  },
}));

const SidebarWrapper = themedStyled<{
  $isOpen: boolean,
  $hideSideNavigation: boolean,
}>('div', ({$theme, $isOpen, $hideSideNavigation}) => ({
  display: $isOpen ? 'block' : 'none',
  paddingTop: $theme.sizing.scale700,
  marginLeft: $theme.sizing.scale800,
  marginRight: $theme.sizing.scale800,
  [$theme.mediaQuery.medium]: {
    display: $hideSideNavigation ? 'none' : 'block',
    maxWidth: '16em',
  },
}));

const ContentWrapper = themedStyled<{
  $isSidebarOpen: boolean,
  $maxWidth?: string,
}>('div', ({$theme, $isSidebarOpen, $maxWidth}) => ({
  position: 'relative',
  boxSizing: 'border-box',
  display: $isSidebarOpen ? 'none' : 'block',
  paddingLeft: $theme.sizing.scale800,
  paddingRight: $theme.sizing.scale800,
  width: '100%',
  maxWidth: $maxWidth ? $maxWidth : '40em',
  [$theme.mediaQuery.medium]: {
    display: 'block',
    maxWidth: $maxWidth ? $maxWidth : '40em',
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
    const {toggleTheme, toggleDirection, children} = this.props;
    let {path = ''} = this.props;
    let component;

    // strip the query string
    path = path.split('?')[0];

    if (path && path.endsWith('/')) {
      path = path.slice(0, -1);
    }

    if (path.includes('/components')) {
      component = path.replace('/components/', '');
    }
    const componentStats = ComponentSizes[component] || {};
    const componentSizeKb = Math.floor(componentStats.gzip / 1000);

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
      <DirectionContext.Consumer>
        {direction => (
          <React.Fragment>
            <HeaderNavigation
              toggleSidebar={() =>
                this.setState(prevState => ({
                  sidebarOpen: !prevState.sidebarOpen,
                }))
              }
              toggleTheme={toggleTheme}
              toggleDirection={toggleDirection}
            />
            <Block
              backgroundColor="backgroundPrimary"
              color="contentPrimary"
              marginTop="scale300"
              display="flex"
              paddingTop="scale400"
              justifyContent="center"
            >
              <SidebarWrapper
                $isOpen={sidebarOpen}
                $hideSideNavigation={!!this.props.hideSideNavigation}
                onClick={() =>
                  sidebarOpen && this.setState({sidebarOpen: false})
                }
              >
                <Sidebar path={path} />
              </SidebarWrapper>
              <ContentWrapper
                id="docSearch-content"
                role="main"
                $isSidebarOpen={sidebarOpen}
                $maxWidth={this.props.maxContentWidth}
              >
                {isGitHubEditDisabled ? null : (
                  <Block
                    display={['none', 'block']}
                    position="absolute"
                    top="-10px"
                    overrides={{
                      Block: {
                        style: {
                          [direction === 'rtl' ? 'left' : 'right']: 0,
                          [direction === 'rtl' ? 'right' : 'left']: 'auto',
                        },
                      },
                    }}
                  >
                    <Button
                      startEnhancer={() => (
                        <PencilIcon size={16} color="#666666" />
                      )}
                      $as="a"
                      href={githubUrl}
                      target="_blank"
                      size={SIZE.compact}
                      kind={KIND.minimal}
                    >
                      Edit this page
                    </Button>
                  </Block>
                )}
                {componentSizeKb ? (
                  <Block font="font100">
                    Component size, gzipped: {componentSizeKb}kb
                  </Block>
                ) : null}
                <MDXProvider components={MarkdownElements}>
                  {children}
                </MDXProvider>
              </ContentWrapper>
              <TOCWrapper>
                <TableOfContents content={React.Children.toArray(children)} />
              </TOCWrapper>
            </Block>
            <Footer />
            <Walkthrough />
            <Help />
          </React.Fragment>
        )}
      </DirectionContext.Consumer>
    );
  }
}

export default Layout;
