/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import { Button } from '../../button/index.js';
import { ListHeading } from '../index.js';

export function Scenario() {
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
        endEnhancerDescription="Description"
      />

      <ListHeading
        heading="Heading"
        subHeading="Sub heading"
        endEnhancer="Enhancer Text"
        endEnhancerDescription="Description"
      />

      {/* ---------------------------------------- */}

      <ListHeading
        heading="Overflow 1 line content is too long"
        endEnhancer="Enhancer Text"
        endEnhancerDescription="Description"
      />

      <ListHeading
        heading="Overflow 2 lines content is too long"
        endEnhancer="Enhancer Text"
        endEnhancerDescription="Description"
        maxLines={2}
      />

      <ListHeading
        heading="Overflow 1 line content is too long"
        subHeading="Sub heading"
        endEnhancer="Enhancer Text"
        endEnhancerDescription="Description"
      />

      <ListHeading
        heading="Overflow 2 lines content is too long shoo deee booo ooop"
        subHeading="Sub heading"
        endEnhancer="Enhancer Text"
        endEnhancerDescription="Description"
        maxLines={2}
      />

      <ListHeading
        heading="Overflow 2 lines content is far too long basically a full paragraph"
        subHeading="Sub heading content is also too long ya da da da doop be doo"
        endEnhancer="Enhancer Text is also too longer doo bee doo bee doo da doo"
        endEnhancerDescription="Description is also way too long"
        maxLines={2}
      />

      {/* ---------------------------------------- */}

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
        heading="Overflow 2 lines content is too long"
        subHeading="Sub heading"
        endEnhancer={() => (
          <Button size="compact" kind="secondary" shape="pill">
            Action
          </Button>
        )}
        maxLines={2}
      />

      <ListHeading
        heading="Overflow 2 lines content is too long"
        subHeading="Style overrides for endEnhancer"
        endEnhancer={() => (
          <Button size="compact" kind="secondary" shape="pill">
            Action
          </Button>
        )}
        maxLines={2}
        overrides={{
          EndEnhancerContainer: {
            style: {
              minWidth: '70px',
            },
          },
        }}
      />

      <ListHeading
        heading="Heading"
        subHeading="Description not rendered"
        endEnhancer={() => (
          <Button size="compact" kind="secondary" shape="pill">
            Action
          </Button>
        )}
        endEnhancerDescription="Description"
      />

      {/* ---------------------------------------- */}

      <ListHeading
        heading={<span>Heading in Span</span>}
        subHeading={<span>Sub heading in Span</span>}
        endEnhancer={
          <Button size="compact" kind="secondary" shape="pill">
            Action
          </Button>
        }
      />

      <ListHeading
        heading={() => <span>Heading component</span>}
        subHeading={() => <span>Sub heading component</span>}
      />

      <ListHeading
        heading="Short"
        subHeading="Short"
        endEnhancer="Very very very very loooooong way"
        endEnhancerDescription="Also Very very very long"
      />
    </div>
  );
}
