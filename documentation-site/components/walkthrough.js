/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
/* eslint-env browser, node */

import * as React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from 'baseui/modal';
import {StatefulTabs, Tab} from 'baseui/tabs';
import {withStyle, useStyletron} from 'baseui';
import {Button} from 'baseui/button';

import {Label3, Label4, Paragraph3} from 'baseui/typography';
import {StatefulTooltip} from 'baseui/tooltip';

import CookiesConstructor from 'universal-cookie';
const Cookies = new CookiesConstructor();

// always change this if a new annoucement is rolled out!
const CAMPAIGN_NAME = 'react-view';

const COOKIE_NAME = `baseweb-news-${CAMPAIGN_NAME}`;

export default () => {
  const cookie = Cookies.get(COOKIE_NAME);
  const [css, theme] = useStyletron();
  const [currentPage, setPage] = React.useState(0);
  let isComponentPage = false;
  // $FlowFixMe
  if (process.browser) {
    if (window.location.pathname.includes('/components')) {
      isComponentPage = true;
    }
  }
  const [isOpen, setIsOpen] = React.useState(!cookie && isComponentPage);
  React.useEffect(() => {
    if (!isComponentPage) {
      return;
    }
    const now = new Date();
    Cookies.set(COOKIE_NAME, now.getTime(), {
      // by default, cookies are session cookies, so without an expiration they are removed
      // when the browser window is closed.
      expires: new Date(now.getFullYear() + 10, now.getMonth()),
      path: '/',
    });
  }, []);
  return (
    <React.Fragment>
      <Modal
        onClose={() => setIsOpen(false)}
        closeable
        isOpen={isOpen}
        animate
        size={SIZE.default}
        role={ROLE.dialog}
      >
        <ModalHeader>
          New API Documentation{' '}
          <span role="img" aria-label="new feature">
            🎁
          </span>
        </ModalHeader>
        <MinHeightBody>{Content[currentPage]()}</MinHeightBody>
        <ModalFooter>
          <ModalButton
            disabled={!Content[currentPage - 1]}
            onClick={() => {
              setPage(currentPage - 1);
            }}
          >
            Previous
          </ModalButton>
          {Content[currentPage + 1] ? (
            <ModalButton
              onClick={() => {
                setPage(currentPage + 1);
              }}
            >
              Next
            </ModalButton>
          ) : (
            <ModalButton
              onClick={() => {
                setPage(0);
                setIsOpen(false);
              }}
            >
              Done
            </ModalButton>
          )}
        </ModalFooter>
      </Modal>
      <div
        onClick={() => {
          setIsOpen(true);
        }}
        onKeyPress={event => {
          if (event.key === 'Enter') {
            setIsOpen(true);
          }
        }}
        tabIndex={0}
        role="button"
        className={css({
          position: 'fixed',
          bottom: '0px',
          right: theme.sizing.scale4800,
          boxShadow: theme.lighting.shadow400,
          textAlign: 'center',
          padding: theme.sizing.scale400,
          backgroundColor: theme.colors.backgroundPrimary,
          display: 'none',
          [theme.mediaQuery.medium]: {
            display: 'block',
          },
        })}
      >
        <Label3
          overrides={{Block: {style: {fontSize: '20px', cursor: 'pointer'}}}}
        >
          <span role="img" aria-label="open announcement modal">
            🎁
          </span>
        </Label3>
      </div>
    </React.Fragment>
  );
};
const MinHeightBody = withStyle(ModalBody, {
  minHeight: '350px',
});
const Content = [
  () => {
    return (
      <React.Fragment>
        <Label3>
          We are happy to announce a new, interactive API documentation for Base
          Web!
        </Label3>
        <Paragraph3>
          We have removed the old, auto-generated API documentation from the
          site, in favour of a new, interactive documentation, that writes code
          for you!
        </Paragraph3>

        <Paragraph3>
          You will find the following user interface on every component pages -
          using these you can configure different aspects of each components:
          props, style overrides and the theme.
          <br />
          <br />
          <StatefulTabs>
            <Tab title="Props"></Tab>
            <Tab title="Style Overrides"></Tab>
            <Tab title="Theme"></Tab>
          </StatefulTabs>
        </Paragraph3>
        <Paragraph3>Hit the next button to learn more!</Paragraph3>
      </React.Fragment>
    );
  },
  () => {
    return (
      <React.Fragment>
        <Label3>Discovering Component Properties</Label3>
        <Paragraph3>
          On the properties tab, you can change property values, that will be
          instantly visible on the rendered component.
        </Paragraph3>
        <Paragraph3>
          To get more information on each of the properties, you can hover the
          mouse over the property names:
        </Paragraph3>
        <Paragraph3>
          <StatefulTooltip
            accessibilityType={'tooltip'}
            content="Defines the kind (purpose) of a button."
          >
            <Label4>kind</Label4>
          </StatefulTooltip>
        </Paragraph3>
        <Paragraph3>
          In some cases, not all the components are shown by default - to get
          the full list of components, you have to click the {'"'}Show all props
          {'"'}
          button:
        </Paragraph3>
        <Button size="compact" kind="minimal">
          Show all props
        </Button>
        <Paragraph3>
          Once you have configured the component, just grab the generated source
          code, and add it to your project!
        </Paragraph3>
      </React.Fragment>
    );
  },
  () => {
    return (
      <React.Fragment>
        <Label3>Style Overrides & Themes</Label3>
        <Paragraph3>
          Finally, on the Style Overrides and on the Themes tabs you can change
          the visuals of the components - using the overrides you can do one-off
          changes, using the theme you can make system-wide changes, applied to
          all instances of given component.
        </Paragraph3>
        <Label3>Try it out</Label3>
        <Paragraph3>
          To learn more about this new documentation feature, we recommend you
          to play around with it (let{"'"}s say, with the{' '}
          <a href="/components/button">Button component</a>) - once you have
          done that, please let us know in a{' '}
          <a href="https://github.com/uber/baseweb/issues/new/choose">
            GitHub issue
          </a>{' '}
          if you{"'"}d change anything around.
        </Paragraph3>
      </React.Fragment>
    );
  },
];
