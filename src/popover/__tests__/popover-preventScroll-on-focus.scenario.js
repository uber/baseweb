/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
//@flow

import * as React from 'react';
import {Button} from '../../button/index.js';
import {Block} from '../../block/index.js';
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from '../../header-navigation/index.js';
import {StatefulPopover} from '../index.js';

const Header = ({children}) => {
  return (
    <HeaderNavigation
      overrides={{
        Root: {
          style: {
            position: 'sticky',
            top: 0,
          },
        },
      }}
    >
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem>Uber</StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center}>
        <StyledNavigationItem>{children}</StyledNavigationItem>
      </StyledNavigationList>
    </HeaderNavigation>
  );
};

const Spacer = ({num}) => (
  <Block
    height="200px"
    display="flex"
    justifyContent="center"
    alignItems="center"
    backgroundColor={num & 1 ? 'lightgrey' : 'whitesmoke'}
    data-e2e-spacer={num}
  >
    <h2>{num}</h2>
  </Block>
);

const Instructions = () => {
  return (
    <Block
      display="flex"
      width="100%"
      alignItems="center"
      flexDirection="column"
      backgroundColor="whitesmoke"
    >
      <h3>
        It is only possible to reproduce this in preview mode where the entire
        page scrolls. Hence, the scenario component goes beyond the page
      </h3>
      <h3>
        Steps to Reproduce error if {'(focusOptions={{ preventScroll: true }})'}{' '}
        is not passed as a prop to Popover
      </h3>
      <ol>
        <li>Click on `Show Menu` on center</li>
        <li>Dismiss Popup Opened</li>
        <li>Scroll Down</li>
        <li>Click on `Show Menu` on center</li>
        <li>Notice the auto scroll of the page</li>
      </ol>
    </Block>
  );
};

export function Scenario() {
  return (
    <div>
      <Header>
        <StatefulPopover
          accessibilityType={'menu'}
          dismissOnEsc={true}
          dismissOnClickOutside={true}
          content={
            // Setting tabIndex to div so that we can focus on the div
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            <div data-e2e="content" tabIndex={0}>
              <h1>hello</h1>
            </div>
          }
          focusOptions={{preventScroll: true}}
          focusLock
          returnFocus
          autoFocus
          renderAll
        >
          <Button>Click Me</Button>
        </StatefulPopover>
      </Header>
      <Instructions />
      <Block height="100vh" width="100%" />
      <Spacer num={1} />
    </div>
  );
}
