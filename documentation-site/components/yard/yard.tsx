import React from 'react';
import {useStyletron} from 'baseui';
import Router, {withRouter} from 'next/router';
import {Button, KIND, SIZE, SHAPE} from 'baseui/button';
import {StatefulTabs, Tab} from 'baseui/tabs';
import {ButtonGroup} from 'baseui/button-group';
import copy from 'copy-to-clipboard';
import {Card, StyledBody as CardStyledBody} from 'baseui/card';
import {StatefulTooltip} from 'baseui/tooltip';
import {Tag, VARIANT} from 'baseui/tag';

import {COMPONENTS, PropTypes, Action} from './const';
import Knobs from './knobs';
import {transformCode, formatCode, parseProps, parseOverrides} from './ast';
import {assertUnreachable} from './utils';
import Overrides from './overrides';
import ThemeEditor from './theme-editor';
import {TState, TProp} from './types';

import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live';
import darkTheme from './dark-theme';
import lightTheme from './light-theme';

import {trackEvent} from '../../helpers/ga';

const getCode = (props: {[key: string]: TProp}) => {
  let propsString = ``;
  let enumImports = ``;
  const {children, ...restProps} = props;
  Object.keys(restProps).forEach(name => {
    const value = restProps[name].value;
    const type = restProps[name].type;
    if (value) {
      switch (type as PropTypes) {
        case PropTypes.String:
          propsString += ` ${name}="${value}"`;
          break;
        case PropTypes.Boolean:
          propsString += ` ${name}`;
          break;
        case PropTypes.Number:
        case PropTypes.Array:
        case PropTypes.Object:
        case PropTypes.Function:
        case PropTypes.ReactNode:
          propsString += ` ${name}={${value}}`;
          break;
        case PropTypes.Enum:
          enumImports += `, ${name.toUpperCase()}`;
          propsString += ` ${name}={${value}}`;
          break;
        case PropTypes.Overrides:
          if (!value) break;
          let overrideString = '{';
          Object.keys(value).forEach(key => {
            if (value[key].active === true) {
              overrideString += `${key}: { style: ${value[key].style} },`;
            }
          });
          overrideString += '}';
          if (overrideString === '{}') break;
          propsString += ` ${name}={${overrideString}}`;
          break;
        default:
          assertUnreachable();
      }
    }
  });
  const imports = `import {Button${enumImports}} from 'baseui/button';\n\n`;
  if (children.value) {
    return `${imports}export default () => <Button${propsString}>${children.value}</Button>`;
  } else {
    return `${imports}export default () => <Button${propsString} />`;
  }
};

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
      meta: state.props[name].meta,
    };
  });
  return newProps;
};

function reducer(state: TState, action: {type: Action; payload: any}): TState {
  switch (action.type) {
    case Action.UpdateCode:
      return {...state, code: action.payload};
    case Action.UpdatePropsAndCode:
      const {updatedPropValues} = action.payload;
      return {
        ...state,
        code: action.payload.code,
        props: buildPropsObj(state, updatedPropValues),
      };
    case Action.Reset:
      return {
        ...state,
        code: action.payload.code,
        props: action.payload.props,
      };
    default:
      return assertUnreachable();
  }
}

export default withRouter(
  ({
    router,
    componentName,
  }: {
    router: any;
    componentName: keyof typeof COMPONENTS;
  }) => {
    const [css, theme] = useStyletron();
    const [editorFocused, focusEditor] = React.useState(false);
    const [urlCodeHydrated, setUrlCodeHydrated] = React.useState(false);
    const [state, dispatch] = React.useReducer(reducer, {
      code: formatCode(getCode(COMPONENTS[componentName])),
      props: COMPONENTS[componentName],
    });

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
          const parsedProps = parseProps(router.query.code as string, 'Button');
          Object.keys(state.props).forEach(name => {
            //@ts-ignore
            propValues[name] = COMPONENTS[componentName][name].value;
            if (name === 'overrides') {
              // overrides need a special treatment since the value needs to
              // be further analyzed and parsed
              propValues[name] = parseOverrides(
                parsedProps[name],
                COMPONENTS[componentName].overrides.meta.names,
              );
            } else {
              propValues[name] = parsedProps[name];
            }
          });

          dispatch({
            type: Action.UpdatePropsAndCode,
            payload: {
              code: formatCode(router.query.code as string),
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
          scope={{Button, KIND, SIZE, SHAPE}}
          transformCode={transformCode}
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
          <Card>
            <CardStyledBody>
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
                  trackEvent(
                    'yard',
                    `${componentName}:tab_switch_${activeKey}`,
                  );
                }}
                overrides={{
                  TabBar: {
                    style: {backgroundColor: 'transparent', paddingLeft: 0},
                  },
                  TabContent: {style: {paddingLeft: 0, paddingRight: 0}},
                }}
              >
                <Tab
                  title="Props"
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
                    set={(value: any, name: string) => {
                      const newCode = formatCode(
                        getCode(buildPropsObj(state, {[name]: value})),
                      );
                      trackEvent(
                        'yard',
                        `${componentName}:knob_change_${name}`,
                      );
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
                          ...$theme.typography.font450,
                        } as any),
                    },
                  }}
                >
                  <Overrides
                    componentName={componentName}
                    componentConfig={COMPONENTS[componentName]}
                    overrides={state.props.overrides}
                    set={(value: any) => {
                      const newCode = formatCode(
                        getCode(buildPropsObj(state, {overrides: value})),
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
                  title="Theme"
                  overrides={{
                    Tab: {
                      style: ({$theme}) =>
                        ({
                          ...$theme.typography.font450,
                        } as any),
                    },
                  }}
                >
                  <ThemeEditor />
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
                      const parsedProps = parseProps(newCode, 'Button');
                      Object.keys(state.props).forEach(name => {
                        propValues[name] =
                          //@ts-ignore
                          COMPONENTS[componentName][name].value;
                        if (name === 'overrides') {
                          // overrides need a special treatment since the value needs to
                          // be further analyzed and parsed
                          propValues[name] = parseOverrides(
                            parsedProps[name],
                            COMPONENTS[componentName].overrides.meta.names,
                          );
                        } else {
                          propValues[name] = parsedProps[name];
                        }
                      });

                      dispatch({
                        type: Action.UpdatePropsAndCode,
                        payload: {
                          code: newCode,
                          updatedPropValues: propValues,
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
                        code: formatCode(getCode(COMPONENTS[componentName])),
                        props: COMPONENTS[componentName],
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
              <div
                className={css({display: 'flex', justifyContent: 'flex-end'})}
              >
                <Tag
                  closeable={false}
                  variant={VARIANT.outlined}
                  kind="warning"
                >
                  <StatefulTooltip
                    accessibilityType="tooltip"
                    placement="bottomLeft"
                    content="This is a new experimental component playground. Please use GitHub issues to report any feedback and bugs. Thank you!"
                  >
                    Beta
                  </StatefulTooltip>
                </Tag>
              </div>
            </CardStyledBody>
          </Card>
        </LiveProvider>
      </React.Fragment>
    );
  },
);
