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

class Contributors extends React.Component {
  state = {contributors: []};
  async componentDidMount() {
    const res = await fetch(
      'https://api.github.com/repos/uber-web/baseui/contributors',
    );
    const contributors = await res.json();
    this.setState({contributors});
  }

  render() {
    return (
      <Block display="flex" flexWrap="wrap" maxWidth="768px">
        {this.state.contributors.filter(isUser).map(contributor => (
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
    );
  }
}

export default Contributors;
