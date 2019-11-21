import * as React from 'react';

// baseui imports
import {Button, KIND, SIZE, SHAPE} from 'baseui/button';
import {
  useStyletron,
  createTheme,
  lightThemePrimitives,
  darkThemePrimitives,
  ThemeProvider,
} from 'baseui';
import {Card} from 'baseui/card';
//import {Spinner} from 'baseui/spinner';
import {withRouter} from 'next/router';

// base yard
import {getProvider, getThemeFromContext, TProviderValue} from './provider';
import {customProps, TCustomPropFields} from './custom-props';
import ThemeEditor from './theme-editor';
import Overrides from './overrides';
import Editor from './editor';
import ActionButtons from './action-buttons';
import Knobs from './knobs';
import {YardTabs, YardTab} from './styled-components';
import {countProps, countOverrides, countThemeValues} from './utils';

import {useView, Compiler, Error, Placeholder, PropTypes} from 'react-view';

// type TYardProps = {

// };

const ButtonConfig = {
  imports: {
    'baseui/button': {
      named: ['Button'],
    },
  },
  scope: {
    Button,
    KIND,
    SIZE,
    SHAPE,
    createTheme,
    lightThemePrimitives,
    darkThemePrimitives,
    ThemeProvider,
  },
  theme: [
    'buttonPrimaryFill',
    'buttonPrimaryText',
    'buttonPrimaryHover',
    'buttonPrimaryActive',
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
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Indicates that the button is disabled',
    },
    kind: {
      value: 'KIND.primary',
      defaultValue: 'KIND.primary',
      options: KIND,
      type: PropTypes.Enum,
      description: 'Defines the kind (purpose) of a button.',
      imports: {
        'baseui/button': {
          named: ['KIND'],
        },
      },
    },
    shape: {
      value: 'SHAPE.default',
      defaultValue: 'SHAPE.default',
      options: SHAPE,
      type: PropTypes.Enum,
      description: 'Defines the shape of the button.',
      imports: {
        'baseui/button': {
          named: ['SHAPE'],
        },
      },
    },
    size: {
      value: 'SIZE.default',
      defaultValue: 'SIZE.default',
      options: SIZE,
      type: PropTypes.Enum,
      description: 'Defines the size of the button.',
      imports: {
        'baseui/button': {
          named: ['SIZE'],
        },
      },
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
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
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
};

const YardWrapper = () => {
  // theme provider prep
  const [, theme] = useStyletron();
  const componentTheme = getThemeFromContext(theme, ButtonConfig.theme);
  const themePrimitives =
    theme.name && theme.name.startsWith('dark-theme')
      ? 'darkThemePrimitives'
      : 'lightThemePrimitives';
  const provider = getProvider(componentTheme, themePrimitives);

  const params = useView<TProviderValue, TCustomPropFields>({
    componentName: 'Button',
    props: ButtonConfig.props,
    scope: ButtonConfig.scope,
    imports: ButtonConfig.imports,
    provider,
    customProps,
  });

  const activeProps = countProps(params.knobProps.state, ButtonConfig.props);
  const activeOverrides = countOverrides(params.knobProps.state.overrides);
  const activeThemeValues = countThemeValues(params.providerValue);

  return (
    <Card overrides={{Root: {style: {maxWidth: '600px', margin: '0px auto'}}}}>
      <Compiler
        {...params.compilerProps}
        minHeight={48}
        placeholder={Placeholder}
      />
      <Error msg={params.errorProps.msg} isPopup />
      <YardTabs>
        <YardTab title={`Props${activeProps > 0 ? ` (${activeProps})` : ''}`}>
          <Knobs {...params.knobProps} />
        </YardTab>
        {ButtonConfig.props.overrides.custom.names &&
          ButtonConfig.props.overrides.custom.names.length > 0 && (
            <YardTab
              title={`Style Overrides${
                activeOverrides > 0 ? ` (${activeOverrides})` : ''
              }`}
            >
              <Overrides
                componentName="Button"
                componentConfig={ButtonConfig.props}
                overrides={params.knobProps.state.overrides}
                set={(propValue: any) => {
                  params.knobProps.set(propValue, 'overrides');
                }}
              />
            </YardTab>
          )}
        {ButtonConfig.theme.length > 0 && (
          <YardTab
            title={`Theme ${
              activeThemeValues > 0 ? `(${activeThemeValues})` : ''
            }`}
          >
            <ThemeEditor
              theme={params.providerValue || {}}
              themeInit={componentTheme}
              set={params.actions.updateProvider}
              componentName="Button"
            />
          </YardTab>
        )}
      </YardTabs>
      <Editor {...params.editorProps} />
      <Error {...params.errorProps} />
      <ActionButtons
        {...params.actions}
        code={params.editorProps.code}
        componentName="Button"
        importsConfig={ButtonConfig.imports}
      />
    </Card>
  );
};

// const YardWrapper: React.FC<
//   TYardProps & {placeholderHeight: number; queryStringName: string; router: any}
// > = ({router, placeholderHeight, queryStringName, ...restProps}) => {
//   const [useCss] = useStyletron();
//   const placeholderCx = useCss({
//     height: `${placeholderHeight}px`,
//     width: '100%',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   });

//   return (
//     <Card>
//       <Yard
//         minHeight={placeholderHeight}
//         pathname={router.pathname}
//         urlCode={
//           typeof queryStringName !== 'undefined'
//             ? router.query[queryStringName]
//             : router.query.code
//         }
//         queryStringName={queryStringName}
//         placeholderElement={() => {
//           if (!placeholderHeight) return null;

//           return (
//             <div className={placeholderCx}>
//               <Spinner size={placeholderHeight > 50 ? 50 : placeholderHeight} />
//             </div>
//           );
//         }}
//         {...restProps}
//       />
//     </Card>
//   );
// };

export default withRouter(YardWrapper);
