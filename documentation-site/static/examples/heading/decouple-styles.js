import * as React from 'react';
import {Heading, HeadingLevel} from 'baseui/heading';

export default () => (
  <HeadingLevel>
    <Heading styleLevel={4}>Base Web [L1 styled as L4]</Heading>
    <HeadingLevel>
      <Heading styleLevel={5}>Introduction [L2 styled as L5]</Heading>
      <HeadingLevel>
        <Heading styleLevel={6}>Quotes [L3 styled as L6]</Heading>
      </HeadingLevel>
      <Heading styleLevel={5}>Motivation [L2 styled as L5]</Heading>
    </HeadingLevel>
  </HeadingLevel>
);
