import React from 'react';
import {
  useStyletron,
  createTheme,
  lightThemePrimitives,
  darkThemePrimitives,
  ThemeProvider,
} from 'baseui';
import {Theme} from 'baseui/theme';
import Router, {withRouter} from 'next/router';
import {Button, KIND, SIZE} from 'baseui/button';
import {StatefulTabs, Tab} from 'baseui/tabs';
import {ButtonGroup} from 'baseui/button-group';
import copy from 'copy-to-clipboard';
import {StatefulTooltip} from 'baseui/tooltip';
import {Tag, VARIANT} from 'baseui/tag';

import {Action} from './const';
import {getCode, formatCode} from './code-generator';
import Knobs from './knobs';
import {transformBeforeCompilation, parseCode, parseOverrides} from './ast';
import {assertUnreachable} from './utils';
import Overrides from './overrides';
import ThemeEditor from './theme-editor';
import PopupError from './popup-error';
import {TYardProps, TState, TProp} from './types';

import Compiler from './compiler';
import Editor from './editor';
import Error from './error';

import {trackEvent} from '../../helpers/ga';

const buildPropsObj = (
  stateProps: {[key: string]: TProp},
  updatedPropValues: {[key: string]: any},
) => {
  const newProps: {
    [key: string]: TProp;
  } = {};
  Object.keys(stateProps).forEach(name => {
    newProps[name] = {...stateProps[name]};
  });
  Object.keys(updatedPropValues).forEach(name => {
    newProps[name] = {
      value: updatedPropValues[name],
      type: stateProps[name].type,
      options: stateProps[name].options,
      enumName: stateProps[name].enumName,
      description: stateProps[name].description,
      placeholder: stateProps[name].placeholder,
      hidden: stateProps[name].hidden,
      meta: stateProps[name].meta,
    };
  });
  return newProps;
};

const getComponentThemeFromContext = (theme: Theme, themeConfig: string[]) => {
  const componentThemeObj: {[key: string]: string} = {};
  themeConfig.forEach(key => {
    componentThemeObj[key] = (theme.colors as any)[key];
  });
  return componentThemeObj;
};

function reducer(state: TState, action: {type: Action; payload: any}): TState {
  switch (action.type) {
    case Action.UpdateCode:
      return {...state, code: action.payload, codeNoRecompile: ''};
    case Action.Update:
      const newTheme = {...state.theme};
      Object.keys(state.theme).forEach(key => {
        if (action.payload.theme[key]) {
          newTheme[key] = action.payload.theme[key];
        }
      });
      return {
        ...state,
        code: action.payload.code,
        codeNoRecompile: '',
        theme: newTheme,
        props: buildPropsObj(state.props, action.payload.updatedPropValues),
      };
    case Action.UpdatePropsAndCodeNoRecompile:
      return {
        ...state,
        codeNoRecompile: action.payload.codeNoRecompile,
        props: buildPropsObj(state.props, action.payload.updatedPropValues),
      };
    case Action.UpdateProps:
      return {
        ...state,
        codeNoRecompile: '',
        props: buildPropsObj(state.props, action.payload),
      };
    case Action.UpdatePropsAndCode:
      return {
        ...state,
        code: action.payload.code,
        codeNoRecompile: '',
        props: buildPropsObj(state.props, action.payload.updatedPropValues),
      };
    case Action.UpdateThemeAndCode:
      return {
        ...state,
        code: action.payload.code,
        codeNoRecompile: '',
        theme: action.payload.theme,
      };
    case Action.Reset:
      return {
        ...state,
        code: action.payload.code,
        codeNoRecompile: '',
        props: action.payload.props,
        theme: action.payload.theme,
      };
    default:
      return assertUnreachable();
  }
}

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
    const [css, theme] = useStyletron();
    const [hydrated, setHydrated] = React.useState(false);
    const [error, setError] = React.useState<{
      where: string;
      msg: string | null;
    }>({where: '', msg: null});
    const componentThemeObj = getComponentThemeFromContext(theme, themeConfig);
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
      theme: componentThemeObj,
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
      const isIdentical = Object.keys(componentThemeObj).every(
        key => componentThemeObj[key] === state.theme[key],
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
          Router.push({
            pathname: router.pathname,
            query: {code: newCode},
          } as any);
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
      Router.push({
        pathname: router.pathname,
        query: {code: newCode},
      } as any);
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
        <StatefulTabs
          initialState={{activeKey: '0'}}
          onChange={({activeKey}) => {
            trackEvent('yard', `${componentName}:tab_switch_${activeKey}`);
          }}
          overrides={{
            Root: {
              style: {
                marginBottom: theme.sizing.scale400,
              },
            },
            TabBar: {
              style: {backgroundColor: 'transparent', paddingLeft: 0},
            },
            TabContent: {style: {paddingLeft: 0, paddingRight: 0}},
          }}
        >
          <Tab
            title={`Props${changedProps > 0 ? ` (${changedProps})` : ''}`}
            overrides={{
              Tab: {
                style: ({$theme}) =>
                  ({
                    marginLeft: 0,
                    ...$theme.typography.font450,
                  } as any),
              },
            }}
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
                  Router.push({
                    pathname: router.pathname,
                    query: {code: newCode},
                  } as any);
                } catch (e) {
                  dispatch({
                    type: Action.UpdateProps,
                    payload: {[name]: value},
                  });
                  setError({where: name, msg: e.toString()});
                }
              }}
            />
          </Tab>
          <Tab
            title={`Style Overrides${
              activeOverrides > 0 ? ` (${activeOverrides})` : ''
            }`}
            overrides={{
              Tab: {
                style: ({$theme}) =>
                  ({
                    ...$theme.typography.font450,
                  } as any),
              },
            }}
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
                  Router.push({
                    pathname: router.pathname,
                    query: {code: newCode},
                  } as any);
                } catch (e) {
                  dispatch({
                    type: Action.UpdateProps,
                    payload: {overrides: value},
                  });
                  setError({where: `overrides`, msg: e.toString()});
                }
              }}
            />
          </Tab>
          <Tab
            title={`Theme ${
              Object.keys(componentThemeValueDiff).length > 0
                ? `(${Object.keys(componentThemeValueDiff).length})`
                : ''
            }`}
            overrides={{
              Tab: {
                style: ({$theme}) =>
                  ({
                    ...$theme.typography.font450,
                  } as any),
              },
            }}
          >
            <ThemeEditor
              themeInit={componentThemeObj}
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
                Router.push({
                  pathname: router.pathname,
                  query: {code: newCode},
                } as any);
              }}
            />
          </Tab>
        </StatefulTabs>
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
              Router.push({
                pathname: router.pathname,
                query: {code: newCode},
              } as any);
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
                  theme: componentThemeObj,
                },
              });
              trackEvent('yard', `${componentName}:reset_code`);
              Router.push({
                pathname: router.pathname,
              } as any);
            }}
          >
            Reset
          </Button>
        </ButtonGroup>
        <div className={css({display: 'flex', justifyContent: 'flex-end'})}>
          <Tag closeable={false} variant={VARIANT.outlined} kind="warning">
            <StatefulTooltip
              accessibilityType="tooltip"
              placement="bottomLeft"
              content="This is a new experimental component playground. Please use GitHub issues to report any feedback and bugs. Thank you!"
            >
              Beta
            </StatefulTooltip>
          </Tag>
        </div>
      </React.Fragment>
    );
  },
);
