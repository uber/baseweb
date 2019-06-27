/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Block} from 'baseui/block';
import {styled} from 'baseui';

const StyledFooter = styled<{}>(
  'footer',
  ({$theme: {typography, sizing, colors}}) => ({
    ...typography.font300,
    backgroundColor: colors.foreground,
    color: colors.background,
    marginTop: sizing.scale1400,
    paddingLeft: sizing.scale1000,
    paddingTop: sizing.scale1000,
    paddingRight: sizing.scale1000,
    paddingBottom: sizing.scale1000,
  }),
);

const StyledLink = styled('a', {
  textDecoration: 'none',
  color: 'inherit',
  display: 'inline-block',
  marginLeft: '32px',
  ':first-child': {
    marginLeft: '0',
  },
  ':hover': {
    textDecoration: 'underline',
  },
});

const StyledLinkHeader = styled('span', ({$theme: {typography}}) => ({
  ...typography.font450,
  display: 'inline-block',
  marginLeft: '32px',
  ':first-child': {
    marginLeft: '0',
  },
}));

export default () => (
  <StyledFooter>
    <Block alignItems="baseline" display="flex">
      <StyledLinkHeader>Help</StyledLinkHeader>
      <StyledLink href="https://github.com/uber-web/baseui" target="_blank">
        GitHub
      </StyledLink>
      <StyledLink
        href="https://join.slack.com/t/baseui/shared_invite/enQtNDI0NTgwMjU0NDUyLTk3YzM1NWY2MjY3NTVjNjk3NzY1MTE5OTI4Y2Q2ZmVkMTUyNDc1MTcwYjZhYjlhOWQ2M2NjOWJkZmQyNjFlYTA"
        target="_blank"
      >
        Slack Chat room
      </StyledLink>
      <StyledLink
        href="https://github.com/uber-web/baseui/releases"
        target="_blank"
      >
        Changelog
      </StyledLink>
    </Block>
    <Block alignItems="baseline" marginTop="32px" display="flex">
      <StyledLinkHeader>Community</StyledLinkHeader>
      <StyledLink href="/blog">Blog</StyledLink>
    </Block>
    <Block
      $as="hr"
      overrides={{
        Block: {
          style: {
            borderStyle: 'solid',
            borderColor: '#4D4D4D',
            marginTop: '32px',
            marginBottom: '32px',
          },
        },
      }}
    />
    <Block display="flex">
      <Block cursor="default" display="inline-block" flex="1" $as="span">
        Made with{' '}
        <span role="img" aria-label="love">
          ❤️
        </span>{' '}
        by Uber ️
      </Block>
    </Block>
  </StyledFooter>
);
