import React from 'react';
import {useStyletron} from 'baseui';
import Router, {withRouter} from 'next/router';
import {Button, KIND, SIZE, SHAPE} from 'baseui/button';
import {StatefulTabs, Tab} from 'baseui/tabs';
import {ButtonGroup} from 'baseui/button-group';
import copy from 'copy-to-clipboard';
import {Card, StyledBody as CardStyledBody} from 'baseui/card';

import {COMPONENTS, PropTypes, Action} from './const';
import Knobs from './knobs';
import {transformCode, formatCode, parseProps} from './ast';
import {assertUnreachable} from './utils';
import Overrides from './overrides';
import {TState, TProp} from './types';

import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live';
import darkTheme from './dark-theme';
import lightTheme from './light-theme';

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
    const [state, dispatch] = React.useReducer(reducer, {
      code: formatCode(getCode(COMPONENTS[componentName])),
      props: COMPONENTS[componentName],
    });

    React.useEffect(() => {
      if (router.query.code) {
        const propValues: {[key: string]: any} = {};
        const parsedProps = parseProps(router.query.code as string, 'Button');
        Object.keys(state.props).forEach(name => {
          //@ts-ignore
          propValues[name] = COMPONENTS[componentName][name].value;
          propValues[name] = parsedProps[name];
        });
        dispatch({
          type: Action.UpdatePropsAndCode,
          payload: {
            code: formatCode(router.query.code as string),
            updatedPropValues: propValues,
          },
        });
      }
    }, []);
    return (
      <React.Fragment>
        <LiveProvider
          code={state.code}
          scope={{Button, KIND, SIZE, SHAPE}}
          transformCode={transformCode}
          theme={
            theme.name === 'light-theme'
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
                overrides={{
                  TabBar: {style: {background: 'none', paddingLeft: 0}},
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
                  title="Overrides"
                  overrides={{
                    Tab: {
                      style: ({$theme}) =>
                        ({
                          ...$theme.typography.font450,
                        } as any),
                    },
                  }}
                >
                  <Overrides />
                </Tab>
              </StatefulTabs>
              <div
                className={css({
                  marginTop: `${theme.sizing.scale800}`,
                  boxSizing: 'border-box',
                  border: editorFocused
                    ? `2px solid ${theme.colors.primary400}`
                    : `2px solid ${
                        theme.name === 'light-theme'
                          ? theme.colors.mono200
                          : '#292929 '
                      }`,
                })}
                onClick={() => focusEditor(true)}
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
                        propValues[name] = parsedProps[name];
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
              <div
                className={css({display: 'flex', justifyContent: 'flex-end'})}
              >
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
                    onClick={() =>
                      dispatch({
                        type: Action.UpdateCode,
                        payload: formatCode(state.code),
                      })
                    }
                  >
                    Format
                  </Button>
                  <Button
                    kind={KIND.tertiary}
                    onClick={() => copy(window.location.href)}
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
                      Router.push({
                        pathname: router.pathname,
                      } as any);
                    }}
                  >
                    Reset
                  </Button>
                </ButtonGroup>
              </div>
            </CardStyledBody>
          </Card>
        </LiveProvider>
      </React.Fragment>
    );
  },
);
