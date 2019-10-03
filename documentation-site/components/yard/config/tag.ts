import {Tag, KIND, VARIANT} from 'baseui/tag';
import {PropTypes} from '../const';
import {TConfig} from '../types';

const TagConfig: TConfig = {
  imports: {
    'baseui/tag': {
      named: ['Tag'],
    },
  },
  scope: {
    Tag,
    KIND,
    VARIANT,
  },
  theme: [],
  props: {
    children: {
      value: 'label',
      type: PropTypes.ReactNode,
      description: `Visible label.`,
    },
    onClick: {
      value: undefined,
      placeholder: '() => alert("click")',
      type: PropTypes.Function,
      description: `onClick handler for the tag. Passing an onClick handler also makes the tag clickable.`,
    },
    onActionClick: {
      value: undefined,
      placeholder: '() => alert("click")',
      type: PropTypes.Function,
      description: `onClick handler for the action button element.`,
    },
    closeable: {
      value: undefined,
      renderFalseValue: true,
      type: PropTypes.Boolean,
      description: `Include or exclude the "x" button and click action.`,
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: `Disable the tag from being changed.`,
    },
    kind: {
      value: undefined,
      options: KIND,
      type: PropTypes.Enum,
      description:
        'Defines tags look by purpose. Set it to one of KIND[key] values. Defaults to KIND.primary.',
      imports: {
        'baseui/tag': {
          named: ['KIND'],
        },
      },
    },
    color: {
      value: undefined,
      type: PropTypes.String,
      description: `The color theme to be applied to a Tag. Default is KIND.primary.`,
    },
    variant: {
      value: undefined,
      options: VARIANT,
      type: PropTypes.Enum,
      description:
        'Defines tags look. Set it to one of VARIANT[key] values. Defaults to VARIANT.light.',
      imports: {
        'baseui/tag': {
          named: ['VARIANT'],
        },
      },
    },
    isFocused: {
      value: false,
      type: PropTypes.Boolean,
      description: `Is tag focused.`,
    },
    isHovered: {
      value: false,
      type: PropTypes.Boolean,
      description: `Is tag hovered.`,
    },
    title: {
      value: 'label',
      type: PropTypes.String,
      description: `Text to display in native OS tooltip on long hover.`,
      hidden: true,
    },
    onKeyDown: {
      value: undefined,
      placeholder: '() => alert("click")',
      type: PropTypes.Function,
      description: `onkeydown handler for the tag.`,
      hidden: true,
    },
    onActionKeyDown: {
      value: undefined,
      placeholder: '() => alert("click")',
      type: PropTypes.Function,
      description: `keydown handler for the action button element.`,
      hidden: true,
    },
    overrides: {
      value: undefined,
      type: PropTypes.Overrides,
      description: 'Lets you customize all aspects of the component.',
      names: [
        'BaseButton',
        'EndEnhancer',
        'LoadingSpinner',
        'LoadingSpinnerContainer',
        'StartEnhancer',
      ],
      sharedProps: {
        $kind: 'kind',
        $isSelected: 'isSelected',
        $shape: 'shape',
        $size: 'size',
        $isLoading: 'isLoading',
        $disabled: 'disabled',
      },
    },
  },
};

export default TagConfig;
