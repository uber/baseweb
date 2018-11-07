/* @flow */
/*global module */
import {storiesOf} from '@storybook/react';

import examples from './examples';

Object.entries(examples).forEach(([description, example]) =>
  storiesOf('Link', module)
    // $FlowFixMe
    .add(description, example),
);
