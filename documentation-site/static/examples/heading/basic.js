import * as React from 'react';
import {Heading, HeadingLevel} from 'baseui/heading';

export default () => (
  <HeadingLevel>
    <Heading>Base Web [L1]</Heading>
    <HeadingLevel>
      <Heading>Introduction [L2]</Heading>
      <HeadingLevel>
        <Heading>Quotes [L3]</Heading>
        <HeadingLevel>
          <Heading>Subtitle [L4]</Heading>
          <HeadingLevel>
            <Heading>Subtitle [L5]</Heading>
            <HeadingLevel>
              <Heading>Subtitle [L6]</Heading>
            </HeadingLevel>
          </HeadingLevel>
        </HeadingLevel>
      </HeadingLevel>
      <Heading>Motivation [L2]</Heading>
    </HeadingLevel>
  </HeadingLevel>
);
