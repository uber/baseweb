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

import {Action} from './const';
import {getCode, formatCode} from './code-generator';
import Knobs from './knobs';
import reducer from './reducer';
import {transformBeforeCompilation, parseCode, parseOverrides} from './ast';
import {buildPropsObj, getComponentThemeFromContext, updateUrl} from './utils';
import Overrides from './overrides';
import ThemeEditor from './theme-editor';
import PopupError from './popup-error';
import {TYardProps, TError} from './types';

import Compiler from './compiler';
import Editor from './editor';
import Error from './error';
import {Beta, YardTabs, YardTab} from './styled-components';

import {trackEvent} from '../../helpers/ga';

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
          {
            themeValues: {},
            themeName: theme.name,
          },
          extraImports,
        ),
      codeNoRecompile: '',
      props: propsConfig,
      theme: initialThemeObj,
    });

    React.useEffect(() => {
      // initialize from the URL
      if (router.query.code && !hydrated) {
        setHydrated(true);
        try {
          const propValues: {[key: string]: any} = {};
          const {parsedProps, parsedTheme} = parseCode(
            router.query.code as string,
            componentName,
          );
          Object.keys(propsConfig).forEach(name => {
            //@ts-ignore
            propValues[name] = propsConfig[name].value;
            if (name === 'overrides') {
              // overrides need a special treatment since the value needs to
              // be further analyzed and parsed
              propValues[name] = parseOverrides(
                parsedProps[name],
                propsConfig.overrides && propsConfig.overrides.meta
                  ? propsConfig.overrides.meta.names || []
                  : [],
              );
            } else {
              propValues[name] = parsedProps[name];
            }
          });
          dispatch({
            type: Action.Update,
            payload: {
              code: router.query.code,
              updatedPropValues: propValues,
              theme: parsedTheme,
            },
          });
        } catch (e) {
          console.log(e);
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
          {
            themeValues: {},
            themeName: theme.name,
          },
          extraImports,
        );
        dispatch({
          type: Action.UpdateThemeAndCode,
          payload: {
            code: newCode,
            theme: getComponentThemeFromContext(theme, themeConfig),
          },
        });
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
        {
          themeValues: {},
          themeName: '',
        },
        extraImports,
      );
      dispatch({
        type: Action.UpdatePropsAndCodeNoRecompile,
        payload: {
          codeNoRecompile: newCode,
          updatedPropValues: {[propName]: propValue},
        },
      });
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

    const componentThemeValueDiff: any = {};
    themeConfig.forEach(key => {
      if ((theme.colors as any)[key] !== state.theme[key]) {
        componentThemeValueDiff[key] = state.theme[key];
      }
    });

    const componentThemeDiff: any = {};
    if (Object.keys(componentThemeValueDiff).length > 0) {
      componentThemeDiff.themeValues = componentThemeValueDiff;
      componentThemeDiff.themeName = theme.name;
    }

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
              set={(value: any, name: string) => {
                try {
                  trackEvent('yard', `${componentName}:knob_change_${name}`);
                  !hydrated && setHydrated(true);
                  const newCode = getCode(
                    buildPropsObj(state.props, {[name]: value}),
                    componentName,
                    componentThemeDiff,
                    extraImports,
                  );
                  if (error.msg !== null) setError({where: '', msg: null});
                  dispatch({
                    type: Action.UpdatePropsAndCode,
                    payload: {
                      code: newCode,
                      updatedPropValues: {[name]: value},
                    },
                  });
                  updateUrl(router.pathname, newCode);
                } catch (e) {
                  dispatch({
                    type: Action.UpdateProps,
                    payload: {[name]: value},
                  });
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
              set={(value: any) => {
                try {
                  const newCode = getCode(
                    buildPropsObj(state.props, {overrides: value}),
                    componentName,
                    componentThemeDiff,
                    extraImports,
                  );
                  if (error.msg !== null) {
                    setError({where: '', msg: null});
                  }
                  dispatch({
                    type: Action.UpdatePropsAndCode,
                    payload: {
                      code: newCode,
                      updatedPropValues: {overrides: value},
                    },
                  });
                  updateUrl(router.pathname, newCode);
                } catch (e) {
                  dispatch({
                    type: Action.UpdateProps,
                    payload: {overrides: value},
                  });
                  setError({where: `overrides`, msg: e.toString()});
                }
              }}
            />
          </YardTab>
          <YardTab
            title={`Theme ${
              Object.keys(componentThemeValueDiff).length > 0
                ? `(${Object.keys(componentThemeValueDiff).length})`
                : ''
            }`}
          >
            <ThemeEditor
              themeInit={initialThemeObj}
              theme={state.theme}
              componentName={componentName}
              set={(value: any) => {
                const componentThemeValueDiff: any = {};
                themeConfig.forEach(key => {
                  if ((theme.colors as any)[key] !== value[key]) {
                    componentThemeValueDiff[key] = value[key];
                  }
                });
                const componentThemeDiff: any = {
                  themeValues: {},
                  themeName: '',
                };
                if (Object.keys(componentThemeValueDiff).length > 0) {
                  componentThemeDiff.themeValues = componentThemeValueDiff;
                  componentThemeDiff.themeName = theme.name;
                }
                const newCode = getCode(
                  state.props,
                  componentName,
                  componentThemeDiff,
                  extraImports,
                );
                dispatch({
                  type: Action.UpdateThemeAndCode,
                  payload: {
                    code: newCode,
                    theme: value,
                  },
                });
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
            const propValues: any = {};
            try {
              const {parsedProps, parsedTheme} = parseCode(
                newCode,
                componentName,
              );
              Object.keys(state.props).forEach(name => {
                propValues[name] =
                  //@ts-ignore
                  propsConfig[name].value;
                if (name === 'overrides') {
                  // overrides need a special treatment since the value needs to
                  // be further analyzed and parsed
                  propValues[name] = parseOverrides(
                    parsedProps[name],
                    propsConfig.overrides && propsConfig.overrides.meta
                      ? propsConfig.overrides.meta.names || []
                      : [],
                  );
                } else {
                  propValues[name] = parsedProps[name];
                }
              });

              dispatch({
                type: Action.Update,
                payload: {
                  code: newCode,
                  updatedPropValues: propValues,
                  theme: parsedTheme,
                },
              });
              updateUrl(router.pathname, newCode);
            } catch (e) {
              dispatch({
                type: Action.UpdateCode,
                payload: newCode,
              });
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
              dispatch({
                type: Action.UpdateCode,
                payload: formatCode(state.code),
              });
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
              dispatch({
                type: Action.Reset,
                payload: {
                  code: getCode(
                    propsConfig,
                    componentName,
                    {
                      themeValues: {},
                      themeName: '',
                    } as any,
                    extraImports,
                  ),
                  props: propsConfig,
                  theme: initialThemeObj,
                },
              });
              trackEvent('yard', `${componentName}:reset_code`);
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
