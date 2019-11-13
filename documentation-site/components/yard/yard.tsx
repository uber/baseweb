import React from 'react';
import {
  useStyletron,
  createTheme,
  lightThemePrimitives,
  darkThemePrimitives,
  ThemeProvider,
} from 'baseui';
import {Button, KIND, SIZE} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';
import copy from 'copy-to-clipboard';
import {trackEvent} from '../../helpers/ga';
import debounce from 'lodash/debounce';

import {
  MdContentCopy,
  MdFormatIndentIncrease,
  MdRotateRight,
} from 'react-icons/md';

// code sandbox stuff
//@ts-ignore
import CodeSandboxer from 'react-codesandboxer';
//@ts-ignore
import {version} from '../../../package.json';
//@ts-ignore
import {codesandboxIndexCode} from '../const';

// transformations, code generation
import {transformBeforeCompilation} from './ast';
import {getCode, formatCode} from './code-generator';
import {
  buildPropsObj,
  getComponentThemeFromContext,
  getThemeForCodeGenerator,
  countOverrides,
  countProps,
  countThemeValues,
} from './utils';
import PropsTooltip from './props-tooltip';
import {TYardProps, TPropValue, TError} from './types';

// tabs aka editing UIs
import Knobs from './knobs';
import Overrides from './overrides';
import ThemeEditor from './theme-editor';

// other UIs
import {YardTabs, YardTab} from './styled-components';
import PopupError from './popup-error';

// compiler
import Compiler from './compiler';
import Editor from './editor';
import Error from './error';

// actions that can be dispatched
import {
  reset,
  updateAll,
  updateCode,
  updateProps,
  updateUrl,
  updateThemeAndCode,
  updatePropsAndCode,
  updatePropsAndCodeNoRecompile,
} from './actions';
import reducer from './reducer';

const Yard: React.FC<
  TYardProps & {
    placeholderElement: React.FC;
    pathname: string;
    urlCode?: string;
    queryStringName?: string;
  }
> = ({
  componentName,
  props: propsConfig,
  theme: themeConfig,
  scope: scopeConfig,
  imports: importsConfig,
  mapTokensToProps,
  minHeight,
  placeholderElement,
  pathname,
  urlCode,
  queryStringName,
}) => {
  const [, theme] = useStyletron();
  const [hydrated, setHydrated] = React.useState(false);
  const [error, setError] = React.useState<TError>({where: '', msg: null});
  const initialThemeObj = getComponentThemeFromContext(theme, themeConfig);

  // initial state
  const [state, dispatch] = React.useReducer(reducer, {
    code:
      urlCode ||
      getCode(
        propsConfig,
        componentName,
        getThemeForCodeGenerator(themeConfig, {}, theme),
        importsConfig,
      ),
    codeNoRecompile: '',
    props: propsConfig,
    theme: initialThemeObj,
  });

  // initialize from the URL
  React.useEffect(() => {
    if (urlCode && !hydrated) {
      setHydrated(true);
      try {
        updateAll(dispatch, urlCode, componentName, propsConfig);
      } catch (e) {}
    }
  }, [urlCode]);

  //when theme (context) is switched, reset the theme state
  React.useEffect(() => {
    // don't make the reset if theme values were untouched
    // prevents the initial re-update
    const isIdentical = Object.keys(initialThemeObj).every(
      key => initialThemeObj[key] === state.theme[key],
    );
    if (!isIdentical) {
      const newCode = getCode(
        state.props,
        componentName,
        getThemeForCodeGenerator(themeConfig, {}, theme),
        importsConfig,
      );
      updateThemeAndCode(
        dispatch,
        newCode,
        getComponentThemeFromContext(theme, themeConfig),
      );
      if (state.code !== newCode) {
        updateUrl({pathname, code: newCode, queryStringName});
      }
    }
  }, [theme.name]);

  // this callback is secretely inserted into props marked with
  // "propHook" this way we can get notified when the internal
  // state of previewed component is changed by user
  const __yard_onChange = debounce(
    (propValue: TPropValue, propName: string) => {
      !hydrated && setHydrated(true);
      const newCode = getCode(
        buildPropsObj(state.props, {[propName]: propValue}),
        componentName,
        getThemeForCodeGenerator(themeConfig, state.theme, theme),
        importsConfig,
      );
      updatePropsAndCodeNoRecompile(dispatch, newCode, propName, propValue);
      updateUrl({pathname, code: newCode, queryStringName});
    },
    200,
  );

  const componentThemeDiff = getThemeForCodeGenerator(
    themeConfig,
    state.theme,
    theme,
  );

  const activeProps = countProps(state.props, propsConfig);
  const activeOverrides = countOverrides(state.props.overrides);
  const activeThemeValues = countThemeValues(componentThemeDiff);

  return (
    <React.Fragment>
      <Compiler
        code={state.code}
        setError={msg => setError({where: '__compiler', msg})}
        minHeight={minHeight}
        transformations={[
          code => transformBeforeCompilation(code, componentName, propsConfig),
        ]}
        scope={{
          ...scopeConfig,
          ThemeProvider,
          lightThemePrimitives,
          darkThemePrimitives,
          createTheme,
          __yard_onChange,
        }}
        PlaceholderElement={placeholderElement}
      />
      {(error.where === '__compiler' || error.where === 'overrides') &&
        error.msg && <PopupError error={error.msg} />}
      <YardTabs>
        <YardTab title={`Props${activeProps > 0 ? ` (${activeProps})` : ''}`}>
          <Knobs
            knobProps={state.props}
            error={error}
            set={(propValue: TPropValue, propName: string) => {
              try {
                trackEvent('yard', `${componentName}:knob_change_${propName}`);
                !hydrated && setHydrated(true);
                const newCode = getCode(
                  buildPropsObj(state.props, {[propName]: propValue}),
                  componentName,
                  componentThemeDiff,
                  importsConfig,
                );
                setError({where: '', msg: null});
                updatePropsAndCode(dispatch, newCode, propName, propValue);
                updateUrl({pathname, code: newCode, queryStringName});
              } catch (e) {
                updateProps(dispatch, propName, propValue);
                setError({where: propName, msg: e.toString()});
              }
            }}
          />
        </YardTab>
        {propsConfig.overrides.names && propsConfig.overrides.names.length > 0 && (
          <YardTab
            title={`Style Overrides${
              activeOverrides > 0 ? ` (${activeOverrides})` : ''
            }`}
          >
            <Overrides
              componentName={componentName}
              componentConfig={propsConfig}
              overrides={state.props.overrides}
              set={(propValue: TPropValue) => {
                const propName = 'overrides';
                try {
                  const newCode = getCode(
                    buildPropsObj(state.props, {[propName]: propValue}),
                    componentName,
                    componentThemeDiff,
                    importsConfig,
                  );
                  setError({where: '', msg: null});
                  updatePropsAndCode(dispatch, newCode, propName, propValue);
                  updateUrl({pathname, code: newCode, queryStringName});
                } catch (e) {
                  updateProps(dispatch, propName, propValue);
                  setError({where: propName, msg: e.toString()});
                }
              }}
            />
          </YardTab>
        )}
        {themeConfig.length > 0 && (
          <YardTab
            title={`Theme ${
              activeThemeValues > 0 ? `(${activeThemeValues})` : ''
            }`}
          >
            <ThemeEditor
              themeInit={initialThemeObj}
              theme={state.theme}
              componentName={componentName}
              set={(updatedThemeValues: {[key: string]: string}) => {
                const componentThemeDiff = getThemeForCodeGenerator(
                  themeConfig,
                  updatedThemeValues,
                  theme,
                );
                const newCode = getCode(
                  state.props,
                  componentName,
                  componentThemeDiff,
                  importsConfig,
                );
                updateThemeAndCode(dispatch, newCode, updatedThemeValues);
                updateUrl({pathname, code: newCode, queryStringName});
              }}
            />
          </YardTab>
        )}
      </YardTabs>
      <Editor
        code={state.codeNoRecompile !== '' ? state.codeNoRecompile : state.code}
        onChange={newCode => {
          try {
            updateAll(dispatch, newCode, componentName, propsConfig);
            updateUrl({pathname, code: newCode, queryStringName});
          } catch (e) {
            updateCode(dispatch, newCode);
          }
        }}
        transformToken={tokenProps => {
          const token = tokenProps.children.trim();
          if (mapTokensToProps && mapTokensToProps[token]) {
            return (
              <PropsTooltip
                {...tokenProps}
                typeDefinition={mapTokensToProps[token]}
              />
            );
          }
          return <span {...tokenProps} />;
        }}
      />
      <Error
        error={error.where === '__compiler' ? error.msg : null}
        code={state.code}
      />
      <ButtonGroup
        size={SIZE.compact}
        overrides={{
          Root: {
            style: ({$theme}) => ({
              flexWrap: 'wrap',
              marginTop: $theme.sizing.scale300,
            }),
          },
        }}
      >
        <Button
          kind={KIND.tertiary}
          onClick={() => {
            trackEvent('yard', `${componentName}:format_code`);
            updateCode(dispatch, formatCode(state.code));
          }}
        >
          <MdFormatIndentIncrease
            style={{paddingRight: theme.sizing.scale100}}
          />{' '}
          Format
        </Button>
        <Button
          kind={KIND.tertiary}
          onClick={() => {
            trackEvent('yard', `${componentName}:copy_code`);
            copy(state.code);
          }}
        >
          <MdContentCopy style={{paddingRight: theme.sizing.scale100}} /> Copy
        </Button>
        <Button
          kind={KIND.tertiary}
          onClick={() => {
            trackEvent('yard', `${componentName}:reset_code`);
            reset(
              dispatch,
              getCode(
                propsConfig,
                componentName,
                getThemeForCodeGenerator(themeConfig, {}, theme),
                importsConfig,
              ),
              propsConfig,
              initialThemeObj,
            );
            updateUrl({pathname});
          }}
        >
          <MdRotateRight style={{paddingRight: theme.sizing.scale100}} /> Reset
        </Button>
      </ButtonGroup>
      <ButtonGroup
        size={SIZE.compact}
        overrides={{
          Root: {
            style: ({$theme}) => ({
              flexWrap: 'wrap',
              marginTop: $theme.sizing.scale300,
            }),
          },
        }}
      >
        <Button
          kind={KIND.tertiary}
          onClick={() => {
            trackEvent('yard', `${componentName}:copy_url`);
            copy(window.location.href);
          }}
        >
          Copy URL
        </Button>
        <CodeSandboxer
          key="js"
          examplePath="/example.js"
          example={state.code}
          providedFiles={{
            'index.js': {
              content: codesandboxIndexCode,
            },
          }}
          template="create-react-app"
          name={componentName}
          dependencies={{
            baseui: version,
            react: '16.8.6',
            'react-dom': '16.8.6',
            'react-scripts': '3.0.1',
            'styletron-engine-atomic': '1.4.0',
            'styletron-react': '5.2.0',
          }}
          children={() => (
            <Button kind={KIND.secondary} size={SIZE.compact}>
              CodeSandbox
            </Button>
          )}
        />
        <Button
          overrides={{
            BaseButton: {
              props: {
                $as: 'a',
              },
            },
          }}
          href={`/cheat-sheet#${Object.keys(importsConfig)[0]
            .split('/')[1]
            .toLowerCase()}`}
          kind={KIND.tertiary}
        >
          API
        </Button>
      </ButtonGroup>
    </React.Fragment>
  );
};

export default Yard;
