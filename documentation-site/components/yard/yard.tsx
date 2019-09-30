import React from 'react';
import {
  useStyletron,
  createTheme,
  lightThemePrimitives,
  darkThemePrimitives,
  ThemeProvider,
} from 'baseui';
import {withRouter} from 'next/router';
import {Button, KIND, SIZE} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';
import copy from 'copy-to-clipboard';
import {trackEvent} from '../../helpers/ga';

// transformations, code generation
import {transformBeforeCompilation} from './ast';
import {getCode, formatCode} from './code-generator';
import {
  buildPropsObj,
  getComponentThemeFromContext,
  getThemeForCodeGenerator,
} from './utils';
import {TYardProps, TError} from './types';

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

export default withRouter(
  ({
    router,
    componentName,
    propsConfig,
    themeConfig,
    scopeConfig,
    extraImports,
    minHeight,
    placeholderElement,
  }: TYardProps & {
    router: any;
    placeholderElement: React.FC;
  }) => {
    const [, theme] = useStyletron();
    const [hydrated, setHydrated] = React.useState(false);
    const [error, setError] = React.useState<TError>({where: '', msg: null});
    const initialThemeObj = getComponentThemeFromContext(theme, themeConfig);
    const [state, dispatch] = React.useReducer(reducer, {
      code:
        router.query.code ||
        getCode(
          propsConfig,
          componentName,
          getThemeForCodeGenerator(themeConfig, {}, theme),
          extraImports,
        ),
      codeNoRecompile: '',
      props: propsConfig,
      theme: initialThemeObj,
    });

    // initialize from the URL
    React.useEffect(() => {
      if (router.query.code && !hydrated) {
        setHydrated(true);
        try {
          updateAll(dispatch, router.query.code, componentName, propsConfig);
        } catch (e) {
          console.warn(e);
        }
      }
    }, [router.query.code]);

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
          extraImports,
        );
        updateThemeAndCode(
          dispatch,
          newCode,
          getComponentThemeFromContext(theme, themeConfig),
        );
        if (state.code !== newCode) {
          updateUrl(router.pathname, newCode);
        }
      }
    }, [theme.name]);

    const __yard_onChange = (
      componentName: string,
      propName: string,
      propValue: any,
    ) => {
      !hydrated && setHydrated(true);
      const newCode = getCode(
        buildPropsObj(state.props, {[propName]: propValue}),
        componentName,
        getThemeForCodeGenerator(themeConfig, {}, theme),
        extraImports,
      );
      updatePropsAndCodeNoRecompile(dispatch, newCode, propName, propValue);
      updateUrl(router.pathname, newCode);
    };

    let changedProps = 0;
    Object.keys(state.props).forEach(prop => {
      if (
        prop !== 'overrides' &&
        state.props[prop].value !== '' &&
        typeof state.props[prop].value !== 'undefined' &&
        //@ts-ignore
        state.props[prop].value !== propsConfig[prop].value
      ) {
        changedProps++;
      }
    });

    const componentThemeDiff = getThemeForCodeGenerator(
      themeConfig,
      state.theme,
      theme,
    );

    const existingOverrides = state.props.overrides.value
      ? Object.keys(state.props.overrides.value)
      : [];
    const activeOverrides = existingOverrides.filter(
      key => state.props.overrides.value[key].active,
    ).length;

    return (
      <React.Fragment>
        <Compiler
          code={state.code}
          setError={msg => setError({where: '__compiler', msg})}
          minHeight={minHeight}
          transformations={[
            code =>
              transformBeforeCompilation(code, componentName, propsConfig),
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
          <YardTab
            title={`Props${changedProps > 0 ? ` (${changedProps})` : ''}`}
          >
            <Knobs
              knobProps={state.props}
              error={error}
              set={(propValue: any, propName: string) => {
                try {
                  trackEvent(
                    'yard',
                    `${componentName}:knob_change_${propName}`,
                  );
                  !hydrated && setHydrated(true);
                  const newCode = getCode(
                    buildPropsObj(state.props, {[propName]: propValue}),
                    componentName,
                    componentThemeDiff,
                    extraImports,
                  );
                  if (error.msg !== null) setError({where: '', msg: null});
                  updatePropsAndCode(dispatch, newCode, propName, propValue);
                  updateUrl(router.pathname, newCode);
                } catch (e) {
                  updateProps(dispatch, propName, propValue);
                  setError({where: name, msg: e.toString()});
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
              set={(propValue: any) => {
                const propName = 'overrides';
                try {
                  const newCode = getCode(
                    buildPropsObj(state.props, {[propName]: propValue}),
                    componentName,
                    componentThemeDiff,
                    extraImports,
                  );
                  if (error.msg !== null) {
                    setError({where: '', msg: null});
                  }
                  updatePropsAndCode(dispatch, newCode, propName, propValue);
                  updateUrl(router.pathname, newCode);
                } catch (e) {
                  updateProps(dispatch, propName, propValue);
                  setError({where: propName, msg: e.toString()});
                }
              }}
            />
          </YardTab>
          <YardTab
            title={`Theme ${
              Object.keys(componentThemeDiff.themeValues).length > 0
                ? `(${Object.keys(componentThemeDiff.themeValues).length})`
                : ''
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
                  extraImports,
                );
                updateThemeAndCode(dispatch, newCode, updatedThemeValues);
                updateUrl(router.pathname, newCode);
              }}
            />
          </YardTab>
        </YardTabs>
        <Editor
          code={
            state.codeNoRecompile !== '' ? state.codeNoRecompile : state.code
          }
          onChange={newCode => {
            try {
              updateAll(dispatch, newCode, componentName, propsConfig);
              updateUrl(router.pathname, newCode);
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
                  extraImports,
                ),
                propsConfig,
                initialThemeObj,
              );
              updateUrl(router.pathname);
            }}
          >
            Reset
          </Button>
        </ButtonGroup>
        <Beta />
      </React.Fragment>
    );
  },
);
