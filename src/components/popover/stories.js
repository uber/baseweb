// @flow
/* global module */
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';
import examples from './examples';

//$FlowFixMe
import PopoverReadme from '../../../rfcs/popover-component.md';

examples.forEach(({description, example}) =>
  storiesOf('Popover', module)
    .addDecorator(withReadme(PopoverReadme))
    .add(description, example),
);
