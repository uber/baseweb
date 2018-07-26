// @flow
/* global module */
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';
//$FlowFixMe
import CheckboxReadme from '../../../rfcs/checkbox.md';
import examples from './examples';

//$FlowFixMe

Object.entries(examples).forEach(([description, example]) =>
  storiesOf('Checkbox', module)
    .addDecorator(withReadme(CheckboxReadme))
    // $FlowFixMe
    .add(description, example),
);
