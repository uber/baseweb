import {KIND, SIZE, SHAPE} from 'baseui/button';

export enum Action {
  Update,
  UpdateCode,
  UpdatePropsAndCode,
  UpdateThemeAndCode,
  Reset,
}

export enum PropTypes {
  String = 'string',
  ReactNode = 'react node',
  Boolean = 'boolean',
  Number = 'number',
  Enum = 'enum',
  Array = 'array',
  Object = 'object',
  Function = 'function',
  Overrides = 'overrides',
}

export const COMPONENTS = {
  Button: {
    theme: [
      'buttonPrimaryFill',
      'buttonPrimaryText',
      'buttonPrimaryHover',
      'buttonPrimaryActive',
      'buttonSecondaryFill',
      'buttonSecondaryText',
      'buttonSecondaryHover',
      'buttonSecondaryActive',
      'buttonTertiaryFill',
      'buttonTertiaryText',
      'buttonTertiaryHover',
      'buttonTertiaryActive',
      'buttonTertiarySelectedFill',
      'buttonTertiarySelectedText',
      'buttonMinimalFill',
      'buttonMinimalText',
      'buttonMinimalHover',
      'buttonMinimalActive',
      'buttonDisabledFill',
      'buttonDisabledText',
    ],
    props: {
      children: {
        value: 'Hello',
        type: PropTypes.ReactNode,
        description: `Visible label.`,
      },
      onClick: {
        value: '() => alert("click")',
        type: PropTypes.Function,
        description: `Function called when button is clicked.`,
      },
      startEnhancer: {
        value: undefined,
        placeholder: '() => <span>🦊</span>',
        type: PropTypes.Function,
        description: `A component rendered at the start of the button.`,
      },
      endEnhancer: {
        value: undefined,
        placeholder: '<i>world!</i>',
        type: PropTypes.Function,
        description: `A component rendered at the end of the button.`,
      },
      disabled: {
        value: false,
        type: PropTypes.Boolean,
        description: 'Indicates that the button is disabled',
      },
      kind: {
        value: undefined,
        options: KIND,
        type: PropTypes.Enum,
        description: 'Defines the kind (purpose) of a button.',
      },
      size: {
        value: undefined,
        options: SIZE,
        type: PropTypes.Enum,
        description: 'Defines the size of the button.',
      },
      shape: {
        value: undefined,
        options: SHAPE,
        type: PropTypes.Enum,
        description: 'Defines the shape of the button.',
      },
      isLoading: {
        value: false,
        type: PropTypes.Boolean,
        description: 'Show loading button style and spinner.',
      },
      isSelected: {
        value: false,
        type: PropTypes.Boolean,
        description: 'Indicates that the button is selected.',
      },
      overrides: {
        value: undefined,
        type: PropTypes.Overrides,
        description: 'Lets you customize all aspects of the component.',
        meta: {
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
    },
  },
};
