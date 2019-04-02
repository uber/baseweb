/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import {Block} from 'baseui/block';
import {Card, StyledBody, StyledAction} from 'baseui/card';
import {Button, KIND} from 'baseui/button';
import {styled} from 'baseui';
import posts from '../posts';

const MetaData = styled('h2', ({$theme}) => ({
  color: $theme.colors.mono700,
  fontFamily: $theme.typography.font100.fontFamily,
  fontSize: $theme.sizing.scale500,
  lineHeight: $theme.sizing.scale600,
  margin: 0,
  fontWeight: 300,
}));

const Index = () => {
  return (
    <Block display="flex" flexWrap="wrap">
      {posts && !posts.length && <h1>No posts to display</h1>}
      {posts &&
        posts.length > 0 &&
        posts.map((p, i) => {
          return (
            <Card
              key={`post--${i}`}
              href={p.path}
              title={p.title}
              headerImage={p.coverImage}
              overrides={{
                Root: {
                  style: {
                    boxSizing: 'border-box',
                    marginBottom: 0,
                    marginLeft: '10px',
                    marginRight: '10px',
                    marginTop: 0,
                    width: '300px',
                  },
                },
                HeaderImage: {
                  style: {
                    boxSizing: 'border-box',
                    maxWidth: '100%',
                    padding: '24px',
                  },
                },
              }}
            >
              <MetaData>{`${p.author} - ${p.date}`}</MetaData>
              <StyledBody />
              <StyledAction>
                <Button
                  kind={KIND.secondary}
                  $as="a"
                  href={p.path}
                  rel="noreferrer noopener"
                  overrides={{
                    BaseButton: {
                      style: {boxSizing: 'border-box', width: '100%'},
                    },
                  }}
                >
                  Read
                </Button>
              </StyledAction>
            </Card>
          );
        })}
    </Block>
  );
};

export default Index;
