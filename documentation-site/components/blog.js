/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

import * as React from 'react';
import {Block} from 'baseui/block';
import Head from 'next/head';
import {H1} from './markdown-elements';
import {themedStyled} from '../pages/_app';

const Image = themedStyled('img', props => ({
  display: 'block',
  margin: '0 auto',
  maxWidth: '100%',
  objectFit: 'cover',
  width: props.$full ? '100%' : 'auto',
}));

export const Caption = themedStyled<{}>('figcaption', ({$theme}) => ({
  color: $theme.colors.contentSecondary,
  fontFamily: $theme.typography.font100.fontFamily,
  fontSize: $theme.sizing.scale500,
  fontWeight: 300,
  textAlign: 'right',
  padding: '4px 4px 0 0',
}));

export const BlogImage = ({full, alt, caption, src, style}) => (
  <figure style={{margin: 0}}>
    <Image $full={full} src={src} alt={alt} style={style} />
    {caption && <Caption>{caption}</Caption>}
  </figure>
);

export const Demo = themedStyled('iframe', {
  border: 0,
  borderTopLeftRadius: '4px',
  borderTopRightRadius: '4px',
  borderBottomRightRadius: '4px',
  borderBottomLeftRadius: '4px',
  height: '500px',
  overflow: 'hidden',
  width: '100%',
});

const Tagline = themedStyled('span', ({$theme}) => ({
  color: $theme.colors.contentSecondary,
  fontFamily: $theme.typography.font100.fontFamily,
  fontSize: $theme.sizing.scale800,
  fontWeight: 300,
}));

const AuthorLink = themedStyled('a', ({$theme}) => ({
  color: $theme.colors.contentSecondary,
  fontFamily: $theme.typography.font100.fontFamily,
  ':hover': {
    color: $theme.colors.contentPrimary,
  },
}));

const ArticleDate = themedStyled('span', ({$theme}) => ({
  color: $theme.colors.contentSecondary,
}));

export const Meta = ({
  data: {
    title,
    tagline,
    author,
    authorLink,
    date,
    coverImage,
    coverImageWidth,
    coverImageHeight,
    keyWords = [],
  },
}) => (
  <React.Fragment>
    <Head>
      <meta property="og:title" content={title} name="title" />
      <meta property="og:type" content="article" />
      <meta
        property="og:description"
        content={tagline}
        key="description"
        name="description"
      />
      <meta property="article:author" content={author} name="author" />
      {keyWords.map(kw => (
        <meta property="article:tag" content={kw} key={`article:tag:${kw}`} />
      ))}
      <meta
        property="article:published_time"
        content={new Date(date).toISOString()}
      />
      <meta property="og:image" content={coverImage} />
      {/* Best practice to specify these, but will usually work regardless. Ideal dimensions are 1200x630. */}
      {coverImageWidth ? (
        <meta property="og:image:width" content={coverImageWidth} />
      ) : null}
      {coverImageHeight ? (
        <meta property="og:image:height" content={coverImageHeight} />
      ) : null}
    </Head>
    <Block
      overrides={{
        Block: {
          style: ({$theme}) => ({
            marginBottom: $theme.sizing.scale1400,
          }),
        },
      }}
    >
      <H1>{title}</H1>
      <Tagline>{tagline}</Tagline>
      <Block
        overrides={{
          Block: {
            style: ({$theme}) => ({
              color: $theme.colors.contentSecondary,
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
        <ArticleDate> - {date}</ArticleDate>
      </Block>
    </Block>
  </React.Fragment>
);
