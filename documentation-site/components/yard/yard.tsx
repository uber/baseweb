import React from 'react';
import {useStyletron} from 'baseui';
import Router, {withRouter} from 'next/router';
import {Button, KIND, SIZE} from 'baseui/button';
import {Input} from 'baseui/input';
import {Textarea} from 'baseui/textarea';
import {Radio, RadioGroup} from 'baseui/radio';
// @ts-ignore
import prettier from 'prettier/standalone';
// @ts-ignore
import traverse from '@babel/traverse';
// @ts-ignore
import generate from '@babel/generator';
// @ts-ignore
import babel from 'prettier/parser-babylon';
import {Checkbox} from 'baseui/checkbox';
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live';
import {
  StyledTable,
  StyledHead,
  StyledHeadCell,
  StyledBody,
  StyledRow,
  StyledCell,
} from 'baseui/table';
import darkTheme from './dark-theme';
import lightTheme from './light-theme';
import CodeBox from './code-box';

const parse: any = babel.parsers.babel.parse;

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

enum PropTypes {
  String = 'string',
  Boolean = 'boolean',
  Number = 'number',
  Enum = 'enum',
  Array = 'array',
  Object = 'object',
  Function = 'function',
}

function assertUnreachable(): never {
  throw new Error("Didn't expect to get here");
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
    const ast: any = parse(code);
    traverse(ast, {
      enter(path: any) {
        if (
          Object.keys(propValues).length === 0 && // process just the first element
          path.node.type === 'JSXElement' &&
          path.node.openingElement.type === 'JSXOpeningElement' &&
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
          propValues['children'] = generate(path.node.children[0]).code.replace(
            /^\s+|\s+$/g,
            '',
          );
        }
      },
    });
  } catch (e) {
    throw new Error("Code is not valid and can't be parsed.");
  }
  return propValues;
}

const ValueCell: React.SFC<{
  name: string;
  val: any;
  set: any;
  type: PropTypes;
  options: any;
}> = ({name, type, val, set, options}) => {
  switch (type) {
    case PropTypes.String:
    case PropTypes.Number:
    case PropTypes.Array:
    case PropTypes.Object:
      return (
        <Input
          //@ts-ignore
          onChange={event => set(event.target.value)}
          placeholder="Controlled Input"
          value={val}
        />
      );
    case PropTypes.Boolean:
      return <Checkbox checked={val} onChange={() => set(!val)} />;
    case PropTypes.Enum:
      return (
        <RadioGroup
          name="radio group"
          //@ts-ignore
          onChange={e => set(e.target.value)}
          value={val}
        >
          {Object.keys(options).map(opt => (
            <Radio value={`${name.toUpperCase()}.${opt}`}>{opt}</Radio>
          ))}
        </RadioGroup>
      );
    case PropTypes.Function:
      return (
        <Textarea
          //@ts-ignore
          onChange={event => set(event.target.value)}
          value={val}
          overrides={{
            Input: {
              style: {
                fontSize: '0.8em',
                fontFamily:
                  "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
                resize: 'vertical',
              },
            },
          }}
        />
      );
    default:
      return assertUnreachable();
  }
};

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
        <div className={css({height: '50px'})}>
          <LivePreview />
        </div>
        <div className={css({marginTop: '2em'})}>
          <StyledTable>
            <StyledHead>
              <StyledHeadCell $style={{maxWidth: '120px'}}>
                Prop name
              </StyledHeadCell>
              <StyledHeadCell>Value</StyledHeadCell>
              <StyledHeadCell $style={{maxWidth: '80px'}}>Type</StyledHeadCell>
              <StyledHeadCell $style={{maxWidth: '300px'}}>
                Description
              </StyledHeadCell>
            </StyledHead>
            <StyledBody>
              {Object.keys(state.props).map(name => (
                <StyledRow key={name}>
                  <StyledCell $style={{maxWidth: '120px'}}>{name}</StyledCell>
                  <StyledCell>
                    <ValueCell
                      name={name}
                      type={state.props[name].type}
                      val={state.props[name].value}
                      options={state.props[name].options}
                      set={(value: any) => {
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
                  </StyledCell>
                  <StyledCell $style={{maxWidth: '80px'}}>
                    {state.props[name].type}
                  </StyledCell>
                  <StyledCell $style={{maxWidth: '300px'}}>
                    {state.props[name].description}
                  </StyledCell>
                </StyledRow>
              ))}
            </StyledBody>
          </StyledTable>
        </div>
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
