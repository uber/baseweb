/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import Link from 'next/link';
import {Block} from 'baseui/block';
import {Card} from 'baseui/card';
import {Button, KIND} from 'baseui/button';
import TriangleDown from 'baseui/icon/triangle-down';
import {StatefulPopover} from 'baseui/popover';

import NavLink from './nav-link';

import Routes from '../routes';

function Column(props) {
  return (
    <Block minWidth="160px" color="black">
      <Block font="font350" paddingBottom="scale400">
        {props.text}
      </Block>
      {props.components &&
        props.components.map((component, index) => (
          <Block key={index} font="font300" paddingBottom="scale300">
            <Link passHref={true} href={component.path} prefetch>
              <NavLink tabIndex="0">{component.text}</NavLink>
            </Link>
          </Block>
        ))}
    </Block>
  );
}

const categories = Routes.find(r => r.components);
export default () => (
  <StatefulPopover
    placement="bottom"
    content={({close}) => (
      <Card>
        <Block display="flex">
          {categories.children.map((category, index) => (
            <Column
              key={index}
              text={category.text}
              components={category.children}
            />
          ))}
        </Block>
      </Card>
    )}
  >
    <Button
      kind={KIND.secondary}
      endEnhancer={() => <TriangleDown />}
      $style={{height: '40px'}}
    >
      Components
    </Button>
  </StatefulPopover>
);
