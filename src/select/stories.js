// @flow
/* global module */
import {storiesOf} from '@storybook/react';

// Styled elements
import examples from './examples';
import {withReadme} from 'storybook-readme';
//$FlowFixMe
import SelectReadme from '../../rfcs/select-component.md';

Object.entries(examples).forEach(([description, example]) =>
  storiesOf('Select', module)
    .addDecorator(withReadme(SelectReadme))
    // $FlowFixMe
    .add(description, example),
);
