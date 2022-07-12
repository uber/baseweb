import { StyledDivider, SIZE } from 'baseui/divider';
import { PropTypes } from 'react-view';
import { TConfig } from '../types';

const DividerConfig: TConfig = {
  componentName: 'StyledDivider',
  imports: {
    'baseui/divider': {
      named: ['StyledDivider'],
    },
  },
  scope: { StyledDivider, SIZE },
  theme: [],
  props: {
    $size: {
      value: 'SIZE.section',
      defaultValue: 'SIZE.section',
      options: SIZE,
      type: PropTypes.Enum,
      description: 'Defines the height of the divider.',
      imports: {
        'baseui/divider': {
          named: ['SIZE'],
        },
      },
    },
  },
};

export default DividerConfig;
