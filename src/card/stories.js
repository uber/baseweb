/* @flow */
/*global module */
import {storiesOf} from '@storybook/react';
import {withReadme} from 'storybook-readme';

import examples from './examples';
//$FlowFixMe
import CardReadme from '../../rfcs/card-component.md';

Object.entries(examples).forEach(([description, example]) =>
  storiesOf('Card', module)
    .addDecorator(withReadme(CardReadme))
    // $FlowFixMe
    .add(description, example),
);
