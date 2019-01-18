/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Block} from 'baseui/block';
import {StyledLink} from 'baseui/link';

type Props = {
  children: React.Node,
};

const Code = (props: Props) => (
  <Paragraph>
    <Block overrides={{Block: {style: {fontFamily: 'courier'}}}}>
      {props.children}
    </Block>
  </Paragraph>
);

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

const ListItem = (props: Props) => <Paragraph>- {props.children}</Paragraph>;

const Paragraph = (props: Props) => (
  <Block as="p" font="font300" style={{maxWidth: '50em', lineHeight: '2.0em'}}>
    {props.children}
  </Block>
);

const UnorderedList = (props: Props) => <Block>{props.children}</Block>;

export default {
  a: StyledLink,
  code: Code,
  h1: Title,
  h2: SubTitle,
  h3: Heading,
  li: ListItem,
  p: Paragraph,
  ul: UnorderedList,
};
