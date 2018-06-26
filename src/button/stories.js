// @flow
import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';

import Button from './index';

storiesOf('Button', module).add('demo button', () => (
  <Button onClick={action('clicked')}>{text('Label', 'Hello Button')}</Button>
));
