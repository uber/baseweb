/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global fetch */

import React from 'react';
import {Avatar} from 'baseui/avatar';
import {Block} from 'baseui/block';

const isUser = user => user.type === 'User';

function Contributors(props) {
  if (!props.contributors.length) {
    return null;
  }

  return (
    <Block>
      <Block font="font450">Thank you to our contributors:</Block>
      <Block display="flex" flexWrap="wrap" maxWidth="768px">
        {props.contributors.filter(isUser).map(contributor => (
          <Block
            as="a"
            href={contributor.html_url}
            target="_blank"
            marginRight="scale200"
            key={contributor.login}
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
    </Block>
  );
}

export default Contributors;
