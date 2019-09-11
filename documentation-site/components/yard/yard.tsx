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
import {getCode} from './code-generator';
import Knobs from './knobs';
import {
  removeImportsAndExports,
  formatCode,
  parseCode,
  parseOverrides,
} from './ast';
import {assertUnreachable} from './utils';
import Overrides from './overrides';
import ThemeEditor from './theme-editor';
import {TYardProps, TState, TProp} from './types';

import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live';
import darkTheme from './dark-theme';
import lightTheme from './light-theme';

import {trackEvent} from '../../helpers/ga';

const buildPropsObj = (
  state: TState,
  updatedPropValues: {[key: string]: any},
) => {
  const newProps: {
    [key: string]: TProp;
  } = {};
  Object.keys(state.props).forEach(name => {
    newProps[name] = {...state.props[name]};
  });
  Object.keys(updatedPropValues).forEach(name => {
    newProps[name] = {
      value: updatedPropValues[name],
      type: state.props[name].type,
      options: state.props[name].options,
      description: state.props[name].description,
      placeholder: state.props[name].placeholder,
      hidden: state.props[name].hidden,
      meta: state.props[name].meta,
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
      return {...state, code: action.payload};
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
        theme: newTheme,
        props: buildPropsObj(state, action.payload.updatedPropValues),
      };
    case Action.UpdatePropsAndCode:
      return {
        ...state,
        code: action.payload.code,
        props: buildPropsObj(state, action.payload.updatedPropValues),
      };
    case Action.UpdateThemeAndCode:
      return {
        ...state,
        code: action.payload.code,
        theme: action.payload.theme,
      };
    case Action.Reset:
      return {
        ...state,
        code: action.payload.code,
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
  }: TYardProps & {
    router: any;
  }) => {
    const [css, theme] = useStyletron();
    const [editorFocused, focusEditor] = React.useState(false);
    const [urlCodeHydrated, setUrlCodeHydrated] = React.useState(false);
    const componentThemeObj = getComponentThemeFromContext(theme, themeConfig);

    const [state, dispatch] = React.useReducer(reducer, {
      code: formatCode(
        getCode(propsConfig, componentName, {
          themeValues: {},
          themeName: '',
        }),
      ),
      props: propsConfig,
      theme: componentThemeObj,
    });

    // when theme (context) is switched, reset the theme state
    React.useEffect(() => {
      const newCode = formatCode(
        getCode(state.props, componentName, {
          themeValues: {},
          themeName: theme.name,
        }),
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
    }, [theme.name]);

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

    React.useEffect(() => {
      if (!urlCodeHydrated && router.query.code) {
        setUrlCodeHydrated(true);
        try {
          const propValues: {[key: string]: any} = {};
          const {parsedProps, parsedTheme} = parseCode(
            router.query.code as string,
            componentName,
          );
          Object.keys(state.props).forEach(name => {
            //@ts-ignore
            propValues[name] = propsConfig[name].value;
            if (name === 'overrides') {
              // overrides need a special treatment since the value needs to
              // be further analyzed and parsed
              propValues[name] = parseOverrides(
                parsedProps[name],
                propsConfig.overrides && propsConfig.overrides.meta
                  ? propsConfig.overrides.meta.names
                  : [],
              );
            } else {
              propValues[name] = parsedProps[name];
            }
          });

          dispatch({
            type: Action.Update,
            payload: {
              code: formatCode(router.query.code as string),
              theme: parsedTheme,
              updatedPropValues: propValues,
            },
          });
        } catch (e) {
          dispatch({
            type: Action.UpdateCode,
            payload: router.query.code,
          });
        }
      }
    }, [router.query.code]);

    return (
      <React.Fragment>
        <LiveProvider
          code={state.code}
          scope={{
            ...scopeConfig,
            ThemeProvider,
            lightThemePrimitives,
            darkThemePrimitives,
            createTheme,
          }}
          transformCode={removeImportsAndExports}
          theme={
            theme.name.startsWith('light-theme')
              ? {
                  ...lightTheme,
                  plain: {
                    ...lightTheme.plain,
                    backgroundColor: theme.colors.mono200,
                  },
                }
              : {
                  ...darkTheme,
                  plain: {
                    ...darkTheme.plain,
                    backgroundColor: editorFocused ? '#3D3D3D' : '#292929',
                  },
                }
          }
          language="jsx"
        >
          <LivePreview
            className={css({
              display: 'flex',
              justifyContent: 'center',
              marginBottom: theme.sizing.scale1000,
              marginTop: theme.sizing.scale1000,
            })}
          />
          <StatefulTabs
            initialState={{activeKey: '0'}}
            onChange={({activeKey}) => {
              trackEvent('yard', `${componentName}:tab_switch_${activeKey}`);
            }}
            overrides={{
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
                      ...$theme.typography.font350,
                    } as any),
                },
              }}
            >
              <Knobs
                knobProps={state.props}
                set={(value: any, name: string) => {
                  const newCode = formatCode(
                    getCode(
                      buildPropsObj(state, {[name]: value}),
                      componentName,
                      componentThemeDiff,
                    ),
                  );
                  trackEvent('yard', `${componentName}:knob_change_${name}`);
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
                      ...$theme.typography.font350,
                    } as any),
                },
              }}
            >
              <Overrides
                componentName={componentName}
                componentConfig={propsConfig}
                overrides={state.props.overrides}
                set={(value: any) => {
                  const newCode = formatCode(
                    getCode(
                      buildPropsObj(state, {overrides: value}),
                      componentName,
                      componentThemeDiff,
                    ),
                  );
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
                      ...$theme.typography.font350,
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
                  const newCode = formatCode(
                    getCode(state.props, componentName, componentThemeDiff),
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
          <div
            className={css({
              marginTop: `${theme.sizing.scale800}`,
              boxSizing: 'border-box',
              border: editorFocused
                ? `2px solid ${theme.colors.primary400}`
                : `2px solid ${
                    theme.name.startsWith('light-theme')
                      ? theme.colors.mono200
                      : '#292929 '
                  }`,
            })}
            onClick={() => {
              trackEvent('yard', `${componentName}:code_editor_focused`);
              focusEditor(true);
            }}
            onBlur={() => focusEditor(false)}
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `.npm__react-simple-code-editor__textarea { outline: none !important }`,
              }}
            />
            <LiveEditor
              lang="jsx"
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
                          ? propsConfig.overrides.meta.names
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
          </div>
          <LiveError
            className={css({
              backgroundColor: theme.colors.negative600,
              whiteSpace: 'pre',
              fontSize: '12px',
              fontFamily: `Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,
              color: theme.colors.mono100,
              padding: theme.sizing.scale600,
              overflowX: 'scroll',
            })}
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
                copy(formatCode(state.code));
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
                    code: formatCode(
                      getCode(propsConfig, componentName, {
                        themeValues: {},
                        themeName: '',
                      } as any),
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
        </LiveProvider>
      </React.Fragment>
    );
  },
);
