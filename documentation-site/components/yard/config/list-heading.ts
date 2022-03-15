import { ListHeading } from 'baseui/list';
import { Button, SIZE, SHAPE } from 'baseui/button';
import { PropTypes } from 'react-view';
import { TConfig } from '../types';

const listHeadingProps = require('!!extract-react-types-loader!../../../../src/list/list-heading.js');

const ListHeadingConfig: TConfig = {
  componentName: 'ListHeading',
  imports: {
    'baseui/list': {
      named: ['ListHeading'],
    },
  },
  scope: {
    ListHeading,
    Button,
    SIZE,
    SHAPE,
  },
  theme: [],
  props: {
    heading: {
      value: '"Heading"',
      type: PropTypes.ReactNode,
      description: 'Heading content, upper-left side of the container',
    },
    subHeading: {
      value: '"Sub-heading"',
      type: PropTypes.ReactNode,
      description: 'Sub-heading content, lower-left side of the container',
    },
    endEnhancer: {
      value: '() => <Button size={SIZE.compact} shape={SHAPE.pill}>Action</Button>',
      type: PropTypes.ReactNode,
      description: 'Content to be rendered in the upper-right side of the container',
      imports: {
        'baseui/button': {
          named: ['Button', 'SIZE'],
        },
      },
    },
    endEnhancerDescription: {
      value: undefined,
      placeholder: '"Description"',
      type: PropTypes.ReactNode,
      description: 'Content to be rendered in the lower-right side of the container',
    },
    maxLines: {
      value: 1,
      type: PropTypes.Number,
      description: 'The maximum number of lines for Header and Subheader (limited to 1 or 2)',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          'Root',
          'Content',
          'HeadingContainer',
          'SubHeadingContainer',
          'EndEnhancerContainer',
          'EndEnhancerDescriptionContainer',
        ],
        sharedProps: {
          $maxLines: {
            type: PropTypes.Number,
            description: 'The maximum number of lines for Header and Subheader (limited to 1 or 2)',
          },
        },
      },
    },
  },
  mapTokensToProps: {
    ListHeading: listHeadingProps,
  },
};

export default ListHeadingConfig;
