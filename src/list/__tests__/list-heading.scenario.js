/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button} from '../../button/index.js';
import {ListHeading} from '../index.js';

export default function Scenario() {
  return (
    <div
      style={{
        display: 'grid',
        gridColumnGap: '36px',
        gridRowGap: '28px',
        gridTemplateColumns: 'repeat(1, 325px)',
        padding: '24px',
      }}
    >
      {/* ---------------------------------------- */}

      <ListHeading heading="Heading" />
      <ListHeading heading="Heading" subHeading="Sub heading" />
      <ListHeading
        heading="Heading"
        endEnhancer="Enhancer Text"
        endEnhancerDescription="Paragraph"
      />
      <ListHeading
        heading="Heading"
        subHeading="Sub heading"
        endEnhancer="Enhancer Text"
        endEnhancerDescription="Paragraph"
      />

      {/* ---------------------------------------- */}

      <ListHeading
        heading="Overflow 1 line content that is too long"
        endEnhancer="Enhancer Text"
        endEnhancerDescription="Paragraph"
      />
      <ListHeading
        heading="Overflow 2 line content that is too long"
        endEnhancer="Enhancer Text"
        endEnhancerDescription="Paragraph"
        maxLines={2}
      />
      <ListHeading
        heading="Overflow 1 line content that is too long"
        subHeading="Sub heading"
        endEnhancer="Enhancer Text"
        endEnhancerDescription="Paragraph"
      />
      <ListHeading
        heading="Overflow 2 line content that is too long"
        subHeading="Sub heading"
        endEnhancer="Enhancer Text"
        endEnhancerDescription="Paragraph"
        maxLines={2}
      />

      {/* ---------------------------------------- */}

      <ListHeading
        heading="Overflow 2 line content that is too long"
        subHeading="Sub heading"
        endEnhancer={() => (
          <Button size="compact" kind="secondary" shape="pill">
            Action
          </Button>
        )}
        maxLines={2}
      />

      <ListHeading
        heading="Heading"
        subHeading="Sub heading"
        endEnhancer={() => (
          <Button size="compact" kind="secondary" shape="pill">
            Action
          </Button>
        )}
      />
      <ListHeading
        heading="Heading"
        subHeading="Sub heading"
        endEnhancer={() => (
          <Button size="compact" kind="secondary" shape="pill">
            Action
          </Button>
        )}
        endEnhancerDescription="Paragraph"
      />
    </div>
  );
}
