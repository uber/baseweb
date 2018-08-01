// @flow
/* global module */
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';
//$FlowFixMe
import RadioGroupReadme from '../../../rfcs/radiogroup.md';
import examples from './examples';

//$FlowFixMe

Object.entries(examples).forEach(([description, example]) =>
  storiesOf('RadioGroup', module)
    .addDecorator(withReadme(RadioGroupReadme))
    // $FlowFixMe
    .add(description, example),
);
