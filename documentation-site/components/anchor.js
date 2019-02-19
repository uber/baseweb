/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Block} from 'baseui/block';

type Props = {
  children: string,
};

const Anchor = (props: Props) => {
  const anchorValue = props.children.replace(/\s+/g, '-').toLowerCase();
  return (
    <Block
      overrides={{
        Block: {
          style: {
            textDecoration: 'none',
            color: 'inherit',
            ':hover': {
              textDecoration: 'underline',
            },
          },
        },
      }}
      as="a"
      href={`#${anchorValue}`}
      id={`${anchorValue}`}
    >
      {props.children}
    </Block>
  );
};

export default Anchor;
