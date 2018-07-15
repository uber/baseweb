// @flow
/* global module */
import {storiesOf} from '@storybook/react';
import examples from './examples';

storiesOf('Popover', module)
  .add('stateless popover', () => examples[0])
  .add('stateful popover (click)', () => examples[1])
  .add('stateful popover (hover)', () => examples[2])
  .add('popover placements', () => examples[3])
  .add('popover w/ arrow', () => examples[4]);
