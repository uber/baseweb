/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

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

const isUser = user => user.type === 'User';

function Contributors(props: {contributors: Contributor[]}) {
  if (!props.contributors.length) {
    return null;
  }

  return (
    <React.Fragment>
      <H2>Thanks to our contributors</H2>
      <Block display="flex" flexWrap>
        {props.contributors.filter(isUser).map(contributor => (
          <Block
            as="a"
            href={contributor.html_url}
            target="_blank"
            marginRight="scale200"
            key={contributor.login}
            title={contributor.login}
          >
            <Avatar
              name={contributor.login}
              src={contributor.avatar_url}
              overrides={{
                Root: {
                  style: ({$theme}) => ({
                    ...$theme.borders.border300,
                    borderColor: $theme.colors.mono100,
                    ':hover': {
                      borderColor: $theme.colors.primary,
                      cursor: 'pointer',
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
