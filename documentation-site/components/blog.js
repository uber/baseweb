/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

import * as React from 'react';
import {styled} from 'baseui';
import {Block} from 'baseui/block';

const Image = styled('img', props => ({
  display: 'block',
  margin: '0 auto',
  maxWidth: '100%',
  objectFit: 'cover',
  width: props.$full ? '100%' : 'auto',
}));

const Caption = styled('figcaption', ({$theme}) => ({
  color: $theme.colors.foregroundAlt,
  fontFamily: $theme.typography.font100.fontFamily,
  fontSize: $theme.sizing.scale500,
  fontWeight: 300,
  textAlign: 'right',
  padding: '4px 4px 0 0',
}));

export const BlogImage = ({full, caption, src, style}) => (
  <figure style={{margin: 0}}>
    <Image $full={full} src={src} style={style} />
    {caption && <Caption>{caption}</Caption>}
  </figure>
);

export const Demo = styled('iframe', {
  border: 0,
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
  borderBottomRightRadius: '4px',
  borderBottomLeftRadius: '4px',
  height: '500px',
  overflow: 'hidden',
  width: '100%',
});

const Title = styled('h1', ({$theme}) => ({
  fontFamily: $theme.typography.font100.fontFamily,
  fontSize: $theme.sizing.scale900,
  margin: `${$theme.sizing.scale1200} 0 0 0`,
}));

const Tagline = styled('h2', ({$theme}) => ({
  color: $theme.colors.foregroundAlt,
  fontFamily: $theme.typography.font100.fontFamily,
  fontSize: $theme.sizing.scale800,
  fontWeight: 300,
  margin: `${$theme.sizing.scale300} 0 0 0`,
}));

const AuthorLink = styled('a', ({$theme}) => ({
  color: $theme.colors.foregroundAlt,
  fontFamily: $theme.typography.font100.fontFamily,
  ':hover': {
    color: $theme.colors.foreground,
  },
}));

export const Meta = ({data: {title, tagline, author, authorLink, date}}) => (
  <Block
    overrides={{
      Block: {
        style: ({$theme}) => ({
          marginBottom: $theme.sizing.scale1400,
        }),
      },
    }}
  >
    <Title>{title}</Title>
    <Tagline>{tagline}</Tagline>
    <Block
      overrides={{
        Block: {
          style: ({$theme}) => ({
            color: $theme.colors.foregroundAlt,
            fontFamily: $theme.typography.font100.fontFamily,
            margin: `${$theme.sizing.scale400} 0`,
          }),
        },
      }}
    >
      <AuthorLink
        $as={authorLink ? 'a' : 'span'}
        rel="noopener noreferrer"
        target="_blank"
        href={authorLink ? authorLink : '/'}
      >
        {author}
      </AuthorLink>{' '}
      - <span>{date}</span>
    </Block>
  </Block>
);
