/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {Avatar} from 'baseui/avatar';
import {Block} from 'baseui/block';
import {H2} from './markdown-elements';

type Contributor = {
  avatar_url: string,
  html_url: string,
  login: string,
  type: 'Bot' | 'User',
};

const isUser = (user) => user.type === 'User';

function Contributors(props: {contributors: Contributor[]}) {
  if (!props.contributors.length) {
    return null;
  }

  const users = props.contributors.filter(isUser);

  return (
    <React.Fragment>
      <H2>Thanks to our {users.length} contributors</H2>
      <Block display="flex" flexWrap>
        {users.map((contributor) => (
          <Block
            as="a"
            href={contributor.html_url}
            target="_blank"
            marginRight="scale200"
            key={contributor.login}
            title={contributor.login}
            overrides={{
              Block: {
                style: ({$theme}) => ({
                  ':focus > div > img': {
                    boxShadow: `0 0 0 3px ${$theme.colors.accent}`,
                    outline: 'none',
                  },
                  ':focus': {
                    outline: 'none',
                  },
                }),
              },
            }}
          >
            <Avatar
              name={contributor.login}
              // GH supports downloading smaller images using the s query string
              // https://styleguide.github.com/primer/components/avatars/#small-avatars
              src={`${contributor.avatar_url}&s=64`}
              overrides={{
                Root: {
                  style: ({$theme}) => ({
                    margin: $theme.sizing.scale100,
                    transitionProperty: 'all',
                    transitionDuration: $theme.animation.timing200,
                    transitionTimingFunction: $theme.animation.easeInOutCurve,
                    ':hover': {
                      transform: 'scale(1.2)',
                    },
                  }),
                },
              }}
            />
          </Block>
        ))}
      </Block>
    </React.Fragment>
  );
}

export default Contributors;
