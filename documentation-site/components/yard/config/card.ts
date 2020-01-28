import {Card, StyledBody, StyledAction} from 'baseui/card';
import {Button} from 'baseui/button';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const cardProps = require('!!extract-react-types-loader!../../../../src/card/card.js');
const buttonProps = require('!!extract-react-types-loader!../../../../src/button/button.js');

const CardConfig: TConfig = {
  imports: {
    'baseui/card': {named: ['Card']},
  },
  scope: {
    Card,
    StyledBody,
    StyledAction,
    Button,
  },
  theme: [],
  props: {
    children: {
      value: `<StyledBody>
  Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla
  ornare faucibus ex, non facilisis nisl. Proin ut dui sed metus
  pharetra hend rerit vel non mi. Nulla
  ornare faucibus ex, non facilisis nisl.
</StyledBody>
<StyledAction>
<Button overrides={{BaseButton: {style: {width: '100%'}}}}>
  Button Label
</Button>
</StyledAction>`,
      type: PropTypes.ReactNode,
      description: `An array of Tab components.`,
      imports: {
        'baseui/card': {named: ['StyledBody', 'StyledAction']},
        'baseui/button': {named: ['Button']},
      },
    },
    title: {
      value: undefined,
      placeholder: 'I am a card',
      type: PropTypes.String,
      description: 'Title to be displayed in the card.',
    },
    headerImage: {
      value: undefined,
      placeholder: 'https://source.unsplash.com/user/erondu/700x400',
      type: PropTypes.String,
      description:
        'Image to be displayed in the card. Can also be an object with img attributes.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          'Action',
          'Body',
          'Contents',
          'HeaderImage',
          'Root',
          'Thumbnail',
          'Title',
          'Wrapper',
        ],
        sharedProps: {},
      },
    },
  },
  mapTokensToProps: {
    Button: buttonProps,
    Card: cardProps,
  },
};

export default CardConfig;
