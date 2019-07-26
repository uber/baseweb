import React from 'react';
import {useStyletron} from 'baseui';
import Router, {withRouter} from 'next/router';
import {Button, KIND, SIZE} from 'baseui/button';
import {Card, StyledBody as CardStyledBody} from 'baseui/card';

import prettier from 'prettier/standalone';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import babel from 'prettier/parser-babylon';

import Knobs from './knobs';
import {PropTypes} from './const';
import {assertUnreachable} from './utils';

import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live';
import darkTheme from './dark-theme';
import lightTheme from './light-theme';
import CodeBox from './code-box';

const parse = babel.parsers.babel.parse as (code: string) => any;

const FILTERED = [/^import.*/gim, 'export default', 'export'];

const transformCode = (code: string) =>
  FILTERED.reduce(
    (acc, token) => (acc as string).replace(token, ''),
    code,
  ) as string;

const formatCode = (code: string) => {
  try {
    return (
      prettier
        .format(code, {
          parser: 'babel',
          printWidth: 60,
          plugins: [babel],
        })
        // remove newline at the end of file
        .replace(/[\r\n]+$/, '')
    );
  } catch (e) {
    return code;
  }
};

enum Action {
  UpdateCode,
  UpdatePropsAndCode,
}

const getCode = (props: any) => {
  let propsString = ``;
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
        case PropTypes.Enum:
        case PropTypes.Function:
          propsString += ` ${name}={${value}}`;
          break;
        default:
          assertUnreachable();
      }
    }
  });
  const imports = `import {Button, KIND, SIZE} from 'baseui/button';\n\n`;
  if (children.value) {
    return `${imports}export default () => <Button${propsString}>${children.value}</Button>`;
  } else {
    return `${imports}export default () => <Button${propsString} />`;
  }
};

const initialProps: any = {
  children: {
    value: 'Hello',
    type: PropTypes.String,
    description: `button's label`,
  },
  onClick: {
    value: "() => {\n  console.log('clicked');\n}",
    type: PropTypes.Function,
    description: `triggered when button is clicked`,
  },
  disabled: {
    value: false,
    type: PropTypes.Boolean,
    description: 'true when button is disabled',
  },
  isLoading: {
    value: false,
    type: PropTypes.Boolean,
    description: 'true when button is loading',
  },
  isSelected: {
    value: false,
    type: PropTypes.Boolean,
    description: 'true when button is selected',
  },
  kind: {
    value: 'KIND.primary',
    options: KIND,
    type: PropTypes.Enum,
    description: 'button style',
  },
  size: {
    value: 'SIZE.default',
    options: SIZE,
    type: PropTypes.Enum,
    description: 'button size',
  },
};

const buildPropsObj = (state: any, updatedPropValues: any) => {
  const newProps: any = {};

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

function reducer(state: any, action: {type: Action; payload: any}) {
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
    default:
      return assertUnreachable();
  }
}

function parseProps(code: string, elementName: string) {
  const propValues: any = {};
  try {
    const ast = parse(code);
    traverse(ast, {
      enter(path) {
        if (
          Object.keys(propValues).length === 0 && // process just the first element
          path.node.type === 'JSXElement' &&
          path.node.openingElement.type === 'JSXOpeningElement' &&
          //@ts-ignore
          path.node.openingElement.name.name === elementName
        ) {
          path.node.openingElement.attributes.forEach((attr: any) => {
            const name = attr.name.name;
            let value = null;
            if (attr.value === null) {
              //boolean prop without value
              value = true;
            } else {
              if (attr.value.type === 'StringLiteral') {
                value = attr.value.value;
              } else if (attr.value.type === 'JSXExpressionContainer') {
                if (attr.value.expression.type === 'BooleanLiteral') {
                  value = attr.value.expression.value;
                } else {
                  value = generate(attr.value.expression).code;
                }
              }
            }
            propValues[name] = value;
          });
          propValues['children'] = generate(
            (path.node as any).children[0],
          ).code.replace(/^\s+|\s+$/g, '');
        }
      },
    });
  } catch (e) {
    throw new Error("Code is not valid and can't be parsed.");
  }
  return propValues;
}

export default withRouter(({router}) => {
  const [css, theme] = useStyletron();
  const [state, dispatch] = React.useReducer(reducer, {
    code: formatCode(getCode(initialProps)),
    props: initialProps,
  });

  React.useEffect(() => {
    if (router.query.code) {
      const propValues: any = {};
      const parsedProps = parseProps(router.query.code as string, 'Button');
      Object.keys(state.props).forEach(name => {
        propValues[name] = initialProps[name].value;
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
  }, [router.query.code]);
  return (
    <React.Fragment>
      <LiveProvider
        code={state.code}
        scope={{Button, KIND, SIZE}}
        transformCode={transformCode}
        theme={theme.name === 'light-theme' ? lightTheme : darkTheme}
        language="jsx"
      >
        <Card>
          <CardStyledBody>
            <div className={css({display: 'flex', alignItems: 'center'})}>
              <div
                className={css({
                  width: '50%',
                  marginRight: '1em',
                  justifyContent: 'center',
                  textAlign: 'center',
                })}
              >
                <LivePreview />
              </div>
              <div className={css({width: '50%', display: 'block'})}>
                <Knobs
                  knobProps={state.props}
                  set={(value: any, name: string) => {
                    dispatch({
                      type: Action.UpdatePropsAndCode,
                      payload: {
                        code: formatCode(
                          getCode(buildPropsObj(state, {[name]: value})),
                        ),
                        updatedPropValues: {[name]: value},
                      },
                    });
                  }}
                />
              </div>
            </div>
          </CardStyledBody>
        </Card>
        <CodeBox>
          <LiveEditor
            lang="jsx"
            onChange={newCode => {
              const propValues: any = {};
              try {
                const parsedProps = parseProps(newCode, 'Button');
                Object.keys(state.props).forEach(name => {
                  propValues[name] = initialProps[name].value;
                  propValues[name] = parsedProps[name];
                });
                dispatch({
                  type: Action.UpdatePropsAndCode,
                  payload: {
                    code: newCode,
                    updatedPropValues: propValues,
                  },
                });
              } catch (e) {
                dispatch({
                  type: Action.UpdateCode,
                  payload: newCode,
                });
              }
            }}
          />
        </CodeBox>

        <LiveError />
      </LiveProvider>
      <Button
        kind={KIND.secondary}
        size={SIZE.compact}
        onClick={() => {
          Router.push({pathname: '/', query: {code: state.code}} as any);
        }}
      >
        Share
      </Button>
      <Button
        kind={KIND.secondary}
        size={SIZE.compact}
        onClick={() =>
          dispatch({
            type: Action.UpdateCode,
            payload: formatCode(state.code),
          })
        }
      >
        Format
      </Button>
    </React.Fragment>
  );
});
