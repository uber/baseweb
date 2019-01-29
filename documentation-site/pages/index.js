/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global process */

import React from 'react';
import {Block} from 'baseui/block';
import fetch from 'isomorphic-fetch';

import Layout from '../components/layout';
import Contributors from '../components/contributors';
import Markdown from '../components/markdown-elements';

type Contributor = {
  avatar_url: string,
  html_url: string,
  login: string,
  type: 'Bot' | 'User',
};

const Index = (props: {contributors: Contributor[]}) => (
  <Layout>
    <Markdown.h1>Welcome</Markdown.h1>
    <Markdown.p>
      Base UI is a foundation, a basis for initiating, evolving, and unifying
      web products across Uber.
    </Markdown.p>

    <Markdown.p>
      The system is designed to be fully responsive and device agnostic
      providing designers with a unique catalog of components.
    </Markdown.p>
    <a href="https://github.com/uber-web/baseui">
      <img
        alt="base ui repository"
        src="https://img.shields.io/badge/Source%20Code-On%20GitHub-blue.svg"
      />
    </a>
    <a href="https://join.slack.com/t/baseui/shared_invite/enQtNDI0NTgwMjU0NDUyLTk3YzM1NWY2MjY3NTVjNjk3NzY1MTE5OTI4Y2Q2ZmVkMTUyNDc1MTcwYjZhYjlhOWQ2M2NjOWJkZmQyNjFlYTA">
      <img
        alt="base ui slack"
        src="https://img.shields.io/badge/Join%20us%20on-Slack-e01563.svg"
      />
    </a>
    <a href="https://buildkite.com/uberopensource/baseui">
      <img
        alt="base ui buildkite"
        src="https://badge.buildkite.com/92a7500cd98f619621c4801833d8b358c2fd79efc9b98f1b98.svg?branch=master"
      />
    </a>
    <Markdown.p>
      To get started with Base UI, read through the{' '}
      <Block as="span" font="font350">
        Introduction
      </Block>{' '}
      and{' '}
      <Block as="span" font="font350">
        Theming
      </Block>{' '}
      section by selecting them in the sidebar menu.
    </Markdown.p>
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
