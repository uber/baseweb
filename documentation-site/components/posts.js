/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

import * as React from 'react';
import {Block} from 'baseui/block';
import Link from 'next/link';
import {Card, StyledBody, StyledAction, StyledTitle} from 'baseui/card';
import {Button, KIND} from 'baseui/button';
import {themedStyled} from '../pages/_app';
import posts from '../posts';

const MetaData = themedStyled('h2', ({$theme}) => ({
  color: $theme.colors.contentSecondary,
  fontFamily: $theme.typography.font100.fontFamily,
  fontSize: $theme.sizing.scale500,
  lineHeight: $theme.sizing.scale600,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  marginBottom: 0,
  fontWeight: 300,
}));

const Index = () => {
  return (
    <Block
      display="flex"
      flexWrap
      overrides={{
        Block: {
          style: ({$theme}) => ({
            justifyContent: 'center',
            [$theme.mediaQuery.small]: {
              justifyContent: 'flex-start',
            },
          }),
        },
      }}
    >
      {posts && !posts.length && <h1>No posts to display</h1>}
      {posts &&
        posts.length > 0 &&
        posts.map((p, i) => {
          return (
            <Card
              key={`post--${i}`}
              href={p.path}
              headerImage={p.coverImage}
              overrides={{
                Root: {
                  style: {
                    boxSizing: 'border-box',
                    marginBottom: '10px',
                    marginRight: '10px',
                    marginTop: 0,
                    width: '275px',
                  },
                },
                HeaderImage: {
                  style: {
                    boxSizing: 'border-box',
                    height: '220px',
                    width: '100%',
                    objectFit: 'cover',
                  },
                },
              }}
            >
              <StyledAction>
                <Link href={p.path}>
                  <Button
                    kind={KIND.secondary}
                    $as="a"
                    rel="noreferrer noopener"
                    href={p.path}
                    overrides={{
                      BaseButton: {
                        style: {boxSizing: 'border-box', width: '100%'},
                      },
                    }}
                  >
                    Read
                  </Button>
                </Link>
              </StyledAction>
              <StyledTitle $style={{marginTop: '1em'}}>{p.title}</StyledTitle>
              <MetaData>{`${p.author} - ${p.date}`}</MetaData>
              <StyledBody />
            </Card>
          );
        })}
    </Block>
  );
};

export default Index;
