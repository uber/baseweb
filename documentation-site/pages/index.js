/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global process */

import * as React from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {StyledLink as Link} from 'baseui/link';
import {H1, H2} from '../components/markdown-elements';
import {Card, StyledBody, StyledAction} from 'baseui/card';
import {Tag} from 'baseui/tag';
import fetch from 'isomorphic-fetch';

import BlogPosts from '../posts.js';

import {HEADER_BREAKPOINT} from '../components/header-navigation';
import Layout from '../components/layout';
import Contributors from '../components/contributors';
import Markdown from '../components/markdown-elements';

type Contributor = {
  avatar_url: string,
  html_url: string,
  login: string,
  type: 'Bot' | 'User',
};

const cardOverrides = {
  Root: {
    style: ({$theme}) => ({
      marginLeft: $theme.sizing.scale600,
      marginRight: $theme.sizing.scale600,
      marginTop: $theme.sizing.scale500,
      width: '300px',
    }),
  },
};

const Index = (props: {
  toggleTheme: () => void,
  toggleDirection: () => void,
  contributors: Contributor[],
}) => (
  <Layout
    toggleDirection={props.toggleDirection}
    toggleTheme={props.toggleTheme}
  >
    <Block
      paddingTop={['scale100', 'scale400', 'scale800']}
      display="block"
      $as="a"
      href={BlogPosts[0].path}
      overrides={{
        Block: {
          style: {
            textDecoration: 'none',
          },
        },
      }}
    >
      <Tag kind="positive" closeable={false}>
        New
      </Tag>
      <Block color="mono900" display="inline-block" font="font350">
        {BlogPosts[0].title}
      </Block>
    </Block>
    <H1>Base Web React UI Framework</H1>
    <Markdown.p>
      Base Web is a foundation for initiating, evolving, and unifying web
      products.
    </Markdown.p>

    <Block
      display="flex"
      marginLeft="-16px"
      marginRight="-16px"
      overrides={{
        Block: {
          style: {
            flexWrap: 'wrap',
            [HEADER_BREAKPOINT]: {
              flexWrap: 'noWrap',
            },
          },
        },
      }}
    >
      <Card title="Installing Base Web" overrides={cardOverrides}>
        <StyledBody>
          Base Web is distributed as an npm package. As Base Web is built on top
          of a CSS-in-JS engine, all you need is the dependencies from npm.
        </StyledBody>
        <StyledAction>
          <Block
            $as="a"
            href="/getting-started/installation"
            $style={{textDecoration: 'none'}}
          >
            <Button style={{width: '100%'}}>Install Base Web</Button>
          </Block>
        </StyledAction>
      </Card>

      <Card title="Learning Base Web" overrides={cardOverrides}>
        <StyledBody>
          Probably the best way to learn Base Web is by start building an
          application using it. On this page, you
          {"'"}
          ll find a simple and a more complex app built using Base Web.
        </StyledBody>
        <StyledAction>
          <Block
            $as="a"
            href="/getting-started/learn"
            $style={{textDecoration: 'none'}}
          >
            <Button style={{width: '100%'}}>Learn more</Button>
          </Block>
        </StyledAction>
      </Card>
    </Block>
    <H2>Extensibility</H2>
    <Markdown.p>
      Through the{' '}
      <Link href="/theming/understanding-overrides/">Overrides API</Link> and{' '}
      <Link href="/theming/custom-themes">configurable Themes</Link>, Base Web
      provides you with an extreme level of customization. No matter if you want
      to modify a component in one place only, or you want to build your design
      system on top of Base Web, we have the options for you.
    </Markdown.p>
    <H2>Built-in Accessibility</H2>
    <Markdown.p>
      Base Web does the heavy lifting for you - components are built with
      accessibility being a first-class citizen.
    </Markdown.p>
    <H2>Performance</H2>
    <Markdown.p>
      Styletron is the CSS-in-JS engine powering Base Web. Based on{' '}
      <Link href="https://ryantsao.com/blog/virtual-css-with-styletron">
        our benchmarks
      </Link>
      , this is one of the fastest solution.
    </Markdown.p>
    <H2>Who is using Base Web?</H2>
    <Block>
      <Block
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        alignItems="center"
        justifyItems="center"
        backgroundColor="mono100"
      >
        <Block width="125px" $as="img" src="/static/images/uber-logo.png" />
        <Block width="125px" $as="img" src="/static/images/broadcom-logo.svg" />
      </Block>
      <Block
        $as="a"
        href="http://t.uber.com/base-web-adopters"
        $style={{textDecoration: 'none'}}
        display="block"
        paddingTop="scale800"
      >
        <Button size="compact" kind="secondary">
          Please let us know if you are using Base Web!
        </Button>
      </Block>
    </Block>
    <Contributors contributors={props.contributors} />
  </Layout>
);

Index.getInitialProps = async () => {
  const res = await fetch(
    `https://api.github.com/repos/uber-web/baseui/contributors?access_token=${process
      .env.GITHUB_AUTH_TOKEN || ''}`,
  );
  const contributors = await res.json();

  if (Array.isArray(contributors)) {
    return {contributors};
  }
  return {contributors: []};
};

export default Index;
