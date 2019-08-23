/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';

import {Card, StyledBody, StyledAction} from 'baseui/card';
import {Button, KIND} from 'baseui/button';
import {Block} from 'baseui/block';

import InputExample from '../examples/input/basic-controlled.js';
import AccordionExample from '../examples/accordion/basic.js';
import AvatarExample from '../examples/avatar/sizes.js';
import BreadcrumbExample from '../examples/breadcrumbs/basic.js';

const data = [
  {
    title: 'Accordion',
    example: <AccordionExample />,
  },
  {
    title: 'Avatar',
    example: <AvatarExample />,
  },
  {
    title: 'Breadcrumbs',
    example: <BreadcrumbExample />,
  },
  {
    title: 'Input',
    example: <InputExample />,
  },
];

function Components() {
  const cards = data.map(d => (
    <Block key={d.title}>
      <Card title={d.title}>
        <Block marginTop="scale800" marginBottom="scale800">
          <StyledBody>{d.example}</StyledBody>
        </Block>
        <StyledAction>
          <Button
            $as="a"
            href={`/components/${d.title.toLowerCase()}`}
            kind={KIND.tertiary}
          >
            Learn more
          </Button>
        </StyledAction>
      </Card>
    </Block>
  ));
  return (
    <Block
      gridGap="10px"
      gridTemplateColumns="repeat(auto-fill, minmax(350px,1fr))"
      display="grid"
    >
      {cards}
    </Block>
  );
}

export default Components;
