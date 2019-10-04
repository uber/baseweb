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
import {TYardProps, TPropValue, TError} from './types';

// tabs aka editing UIs
import Knobs from './knobs';
import Overrides from './overrides';
import ThemeEditor from './theme-editor';

// other UIs
import {Beta, YardTabs, YardTab} from './styled-components';
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
  }
> = ({
  componentName,
  props: propsConfig,
  theme: themeConfig,
  scope: scopeConfig,
  imports: importsConfig,
  minHeight,
  placeholderElement,
  pathname,
  urlCode,
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
        updateUrl(pathname, newCode);
      }
    }
  }, [theme.name]);

  // this callback is secretely inserted into props marked with
  // "propHook" this way we can get notified when the internal
  // state of previewed component is changed by user
  const __yard_onChange = debounce(
    (componentName: string, propName: string, propValue: TPropValue) => {
      !hydrated && setHydrated(true);
      const newCode = getCode(
        buildPropsObj(state.props, {[propName]: propValue}),
        componentName,
        getThemeForCodeGenerator(themeConfig, state.theme, theme),
        importsConfig,
      );
      updatePropsAndCodeNoRecompile(dispatch, newCode, propName, propValue);
      updateUrl(pathname, newCode);
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
                updateUrl(pathname, newCode);
              } catch (e) {
                updateProps(dispatch, propName, propValue);
                setError({where: propName, msg: e.toString()});
              }
            }}
          />
        </YardTab>
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
                updateUrl(pathname, newCode);
              } catch (e) {
                updateProps(dispatch, propName, propValue);
                setError({where: propName, msg: e.toString()});
              }
            }}
          />
        </YardTab>
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
              updateUrl(pathname, newCode);
            }}
          />
        </YardTab>
      </YardTabs>
      <Editor
        code={state.codeNoRecompile !== '' ? state.codeNoRecompile : state.code}
        onChange={newCode => {
          try {
            updateAll(dispatch, newCode, componentName, propsConfig);
            updateUrl(pathname, newCode);
          } catch (e) {
            updateCode(dispatch, newCode);
          }
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
          Format
        </Button>
        <Button
          kind={KIND.tertiary}
          onClick={() => {
            trackEvent('yard', `${componentName}:copy_code`);
            copy(state.code);
          }}
        >
          Copy code
        </Button>
        <Button
          kind={KIND.tertiary}
          onClick={() => {
            trackEvent('yard', `${componentName}:copy_url`);
            copy(window.location.href);
          }}
        >
          Copy URL
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
            updateUrl(pathname);
          }}
        >
          Reset
        </Button>
      </ButtonGroup>
      <Beta />
    </React.Fragment>
  );
};

export default Yard;
