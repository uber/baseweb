import {
  Button,
  KIND as Button_KIND,
  SIZE as Button_SIZE,
  SHAPE as Button_SHAPE,
} from 'baseui/button';
import {
  Input,
  ADJOINED as Input_ADJOINED,
  SIZE as Input_SIZE,
} from 'baseui/input';

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
  Ref = 'ref',
}

export const COMPONENTS = {
  Button: {
    scope: {
      Button,
      KIND: Button_KIND,
      SIZE: Button_SIZE,
      SHAPE: Button_SHAPE,
    },
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
        options: Button_KIND,
        type: PropTypes.Enum,
        description: 'Defines the kind (purpose) of a button.',
      },
      size: {
        value: undefined,
        options: Button_SIZE,
        type: PropTypes.Enum,
        description: 'Defines the size of the button.',
      },
      shape: {
        value: undefined,
        options: Button_SHAPE,
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
  Input: {
    scope: {
      Input,
      SIZE: Input_SIZE,
      ADJOINED: Input_ADJOINED,
    },
    theme: [
      'inputFill',
      'inputFillError',
      'inputFillDisabled',
      'inputFillActive',
      'inputFillPositive',
      'inputTextDisabled',
      'inputBorderError',
      'inputBorderPositive',
      'inputEnhancerFill',
      'inputEnhancerFillDisabled',
      'inputEnhancerTextDisabled',
    ],
    props: {
      value: {
        value: 'Hello',
        type: PropTypes.String,
        description: 'Input value attribute.',
      },
      onChange: {
        value: undefined,
        placeholder: 'e => console.log(e.target.value)',
        type: PropTypes.Function,
        description: 'Called when input value is changed.',
      },
      disabled: {
        value: false,
        type: PropTypes.Boolean,
        description: 'Renders component in disabled state.',
      },
      error: {
        value: false,
        type: PropTypes.Boolean,
        description: 'Renders component in error state.',
      },
      positive: {
        value: false,
        type: PropTypes.Boolean,
        description: 'Renders component in positive state.',
      },
      size: {
        value: undefined,
        options: Input_SIZE,
        type: PropTypes.Enum,
        description: 'Renders component in provided size.',
      },
      placeholder: {
        value: undefined,
        type: PropTypes.String,
        description: "Input's placeholder.",
      },
      type: {
        value: undefined,
        type: PropTypes.String,
        placeholder: 'password',
        description: 'Input type attribute.',
      },
      clearable: {
        value: false,
        type: PropTypes.Boolean,
        description:
          'If true, adds a clear value icon button to the end of the input container.',
      },
      startEnhancer: {
        value: undefined,
        placeholder: '() => <span>$</span>',
        type: PropTypes.Function,
        description:
          'An input helper rendered before and attached to the input field.',
      },
      endEnhancer: {
        value: undefined,
        type: PropTypes.Function,
        description:
          'An input helper rendered after and attached to the input field.',
      },
      inputMode: {
        value: undefined,
        type: PropTypes.String,
        description:
          'A hint as to the type of data that might be entered by the user while editing the element or its contents.',
        hidden: true,
      },
      'aria-label': {
        value: undefined,
        type: PropTypes.String,
        description: `Sets aria-label attribute.`,
        hidden: true,
      },
      'aria-labelledby': {
        value: undefined,
        type: PropTypes.String,
        description: `Sets aria-labelledby attribute.`,
        hidden: true,
      },
      'aria-describedby': {
        value: undefined,
        type: PropTypes.String,
        description: `Sets aria-describedby attribute.`,
        hidden: true,
      },
      adjoined: {
        value: undefined,
        options: Input_ADJOINED,
        type: PropTypes.Enum,
        description: `Defines styles for inputs that are grouped with other controls.`,
        hidden: true,
      },
      autoComplete: {
        value: undefined,
        type: PropTypes.String,
        description: 'Determines if browser should provide value suggestions.',
        hidden: true,
      },
      autoFocus: {
        value: false,
        type: PropTypes.Boolean,
        description: 'If true the input will be focused on the first mount.',
        hidden: true,
      },
      pattern: {
        value: undefined,
        type: PropTypes.String,
        description:
          'A regex that is used to validate the value of the input on form submission.',
        hidden: true,
      },
      id: {
        value: undefined,
        type: PropTypes.String,
        description:
          "Id attribute value to be added to the input element and as a label's for attribute value.",
        hidden: true,
      },
      inputRef: {
        value: undefined,
        type: PropTypes.Ref,
        description: 'A ref to access an input element.',
        hidden: true,
      },
      name: {
        value: undefined,
        type: PropTypes.String,
        description: 'Name attribute.',
        hidden: true,
      },
      onBlur: {
        value: undefined,
        type: PropTypes.Function,
        description: 'Called when input loses focus.',
        hidden: true,
      },

      onKeyDown: {
        value: undefined,
        type: PropTypes.Function,
        description: 'Called when a key is pressed down.',
        hidden: true,
      },
      onKeyPress: {
        value: undefined,
        type: PropTypes.Function,
        description: 'Called when a key is pressed.',
        hidden: true,
      },
      onKeyUp: {
        value: undefined,
        type: PropTypes.Function,
        description: 'Called when a key is released.',
        hidden: true,
      },
      onFocus: {
        value: undefined,
        type: PropTypes.Function,
        description: 'Called when input is focused.',
        hidden: true,
      },

      required: {
        value: false,
        type: PropTypes.Boolean,
        description: 'Renders component in required state.',
        hidden: true,
      },

      overrides: {
        value: undefined,
        type: PropTypes.Overrides,
        description: 'Lets you customize all aspects of the component.',
        meta: {
          names: [
            'Root',
            'Input',
            'InputContainer',
            'After',
            'Before',
            'ClearIcon',
            'ClearIconContainer',
            'EndEnhancer',
            'MaskToggleButton',
            'MaskToggleHideIcon',
            'MaskToggleShowIcon',
            'StartEnhancer',
          ],
          sharedProps: {
            $isFocused: {
              type: PropTypes.Boolean,
              description: 'True when the component is focused.',
            },
            $disabled: 'disabled',
            $error: 'error',
            $positive: 'positive',
            $adjoined: 'adjoined',
            $size: 'size',
            $required: 'required',
            $position: {
              type: PropTypes.Enum,
              description:
                'ADJOINED state. How is the input grouped with other controls.',
            },
          },
        },
      },
    },
  },
};
