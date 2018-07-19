// @flow
/* global module */
import {storiesOf} from '@storybook/react';
import examples from './examples';

examples.forEach(({description, example}) =>
  storiesOf('Popover', module).add(description, example),
);
