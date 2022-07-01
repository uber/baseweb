/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Banner, ACTION_POSITION } from '../index';
import Delete from '../../icon/delete';
import DeleteAlt from '../../icon/delete-alt';

function override(color) {
  return {
    style: {
      border: `solid 2px ${color}`,
    },
  };
}

const overrides = {
  BelowContent: override('blue'),
  LeadingContent: override('green'),
  Message: override('pink'),
  MessageContent: override('purple'),
  Root: override('red'),
  Title: override('orange'),
  TrailingContent: override('yellow'),
  TrailingButtonContainer: override('blue'),
  TrailingIconButton: override('green'),
};

export function Scenario() {
  return (
    <div style={{ width: '400px' }}>
      <Banner
        overrides={overrides}
        title="Headline text"
        artwork={{ icon: ({ size }) => <DeleteAlt size={size} /> }}
        action={{
          label: 'Label',
          icon: ({ size }) => <Delete size={size} />,
          onClick: () => {},
        }}
      >
        Paragraph text
      </Banner>

      <Banner
        overrides={overrides}
        title="Headline text"
        artwork={{ icon: ({ size }) => <DeleteAlt size={size} /> }}
        action={{
          label: 'Label',
          onClick: () => {},
        }}
      >
        Paragraph text
      </Banner>

      <Banner
        overrides={overrides}
        title="Headline text"
        artwork={{ icon: ({ size }) => <DeleteAlt size={size} /> }}
        action={{
          label: 'Label',
          onClick: () => {},
          position: ACTION_POSITION.below,
        }}
      >
        Paragraph text
      </Banner>
    </div>
  );
}
