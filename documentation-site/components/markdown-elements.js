/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Block} from 'baseui/block';

type Props = {
  children: React.Node,
};

const Code = (props: Props) => <Block>{props.children}</Block>;

const Title = (props: Props) => (
  <Block as="h1" font="font700">
    {props.children}
  </Block>
);

const SubTitle = (props: Props) => (
  <Block as="h2" font="font600">
    {props.children}
  </Block>
);

const Heading = (props: Props) => (
  <Block as="h3" font="font500">
    {props.children}
  </Block>
);

const ListItem = (props: Props) => (
  <Block as="li" font="font400" style={{maxWidth: '50em'}}>
    {props.children}
  </Block>
);

const Paragraph = (props: Props) => (
  <Block as="p" font="font400" style={{maxWidth: '50em'}}>
    {props.children}
  </Block>
);

const UnorderedList = (props: Props) => <ul>{props.children}</ul>;

export default {
  code: Code,
  h1: Title,
  h2: SubTitle,
  h3: Heading,
  li: ListItem,
  p: Paragraph,
  ul: UnorderedList,
};
