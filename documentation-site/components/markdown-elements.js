/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable jsx-a11y/anchor-is-valid */
/* global process */
import * as React from 'react';

import Head from 'next/head';
import {Block} from 'baseui/block';
import {styled} from 'baseui/styles';
import Link from 'next/link';
import {StyledLink} from 'baseui/link';
import Anchor from './anchor';
import slugify from '../helpers/slugify';
import {useHover} from './hooks';
type Props = {
  children: string,
};

const getText = children => {
  let label = '';
  React.Children.forEach(children, child => {
    if (typeof child === 'string') {
      label += child;
    }
    if (child.props && child.props.children) {
      label += getText(child.props.children);
    }
  });
  return label;
};

export const cleanAnchor = (anchor: React.Node) => slugify(getText(anchor));

const Code = (props: Props) => <Block>{props.children}</Block>;

export const Heading = ({
  element,
  marginTop,
  fontType,
  children,
}: {
  element: string,
  fontType: string,
  children: React.Node,
}) => {
  const [hoverRef, isHovered] = useHover();
  const slug = cleanAnchor(children);
  return (
    <Block
      as={element}
      marginBottom="8px"
      font={fontType}
      $ref={hoverRef}
      id={slug}
      color="foreground"
    >
      <React.Fragment>
        {children}{' '}
        <Anchor isVisible={isHovered} slug={slug} element={element} />
      </React.Fragment>
    </Block>
  );
};

const ListItem = (props: Props) => (
  <Block as="li" font="font400">
    {props.children}
  </Block>
);

const Paragraph = (props: Props) => (
  <Block as="p" font="font400">
    {props.children}
  </Block>
);

const UnorderedList = (props: Props) => <ul>{props.children}</ul>;

const InlineCode = styled('code', {
  backgroundColor: 'rgba(27, 31, 35, 0.05)',
  borderRadiusTopLeft: '3px',
  borderRadiusTopRight: '3px',
  borderRadiusBottomRight: '3px',
  borderRadiusBottomLeft: '3px',
  fontSize: '85%',
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  marginBottom: 0,
  padding: '0.2em 0.4em',
  fontFamily:
    'SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace;',
});

const Blockquote = styled('blockquote', {
  backgroundColor: 'rgba(27, 31, 35, 0.03)',
  borderRadiusTopLeft: '3px',
  borderRadiusTopRight: '3px',
  borderRadiusBottomRight: '3px',
  borderRadiusBottomLeft: '3px',
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  marginBottom: 0,
  padding: '1em 3em',
});

export const DocLink = ({children, href}: {children: string, href: string}) => {
  const parts = href.split('#');
  const internal =
    (parts[0] === '' && parts[1] !== '') || !href.includes('http');
  return (
    <Link href={href} prefetch={internal}>
      <StyledLink href={href} {...(internal ? {} : {target: '_blank'})}>
        {children}
      </StyledLink>
    </Link>
  );
};

export const H1 = ({children}: {children: React.Node}) => (
  <React.Fragment>
    <Head>
      <title key="title">
        {process.env.WEBSITE_ENV !== 'production' ? '[DEV] ' : ''}
        Base Web - {children}
      </title>
    </Head>
    <Heading element="h1" fontType="font700">
      {children}
    </Heading>
  </React.Fragment>
);

export const H2 = ({children}: {children: React.Node}) => (
  <Heading element="h2" fontType="font600" marginTop="scale1000">
    {children}
  </Heading>
);

export const H3 = ({children}: {children: React.Node}) => (
  <Heading element="h3" fontType="font500">
    {children}
  </Heading>
);

export default {
  code: Code,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: ({children}: {children: React.Node}) => (
    <Heading element="h4" fontType="font400">
      {children}
    </Heading>
  ),
  h5: ({children}: {children: React.Node}) => (
    <Heading element="h5" fontType="font400">
      {children}
    </Heading>
  ),
  h6: ({children}: {children: React.Node}) => (
    <Heading element="h6" fontType="font300">
      {children}
    </Heading>
  ),
  li: ListItem,
  p: Paragraph,
  ul: UnorderedList,
  inlineCode: ({children}: Props) => <InlineCode>{children}</InlineCode>,
  blockquote: ({children}: Props) => <Blockquote>{children}</Blockquote>,
  a: DocLink,
};
