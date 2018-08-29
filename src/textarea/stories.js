// @flow
/*global module */
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';
import examples from './examples';

//$FlowFixMe
import TextareaReadme from '../../../rfcs/textarea-component.md';

Object.entries(examples).forEach(([description, example]) =>
  storiesOf('Textarea', module)
    .addDecorator(withReadme(TextareaReadme))
    // $FlowFixMe
    .add(description, example),
);
