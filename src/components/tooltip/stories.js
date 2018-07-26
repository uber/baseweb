// @flow
/* global module */
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';
import examples from './examples';

//$FlowFixMe
import TooltipReadme from '../../../rfcs/tooltip-component.md';

examples.forEach(({description, example}) =>
  storiesOf('Tooltip', module)
    .addDecorator(withReadme(TooltipReadme))
    .add(description, example),
);
