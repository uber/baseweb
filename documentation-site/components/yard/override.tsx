import * as React from 'react';
import generate from '@babel/generator';
import traverse from '@babel/traverse';
import * as t from '@babel/types';
import {useStyletron} from 'baseui';
import {StatefulTooltip} from 'baseui/tooltip';
import {Button, KIND, SIZE} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';
import Editor from './editor';

import {formatCode, parse} from 'react-view';

export function toggleOverrideSharedProps(code: string, sharedProps: string[]) {
  let result: string = '';
  try {
    const ast = parse(code) as any;
    traverse(ast, {
      ArrowFunctionExpression(path) {
        if (result !== '') return;
        if (path.node.params.length !== 1) return;
        const firstParam: any = path.node.params[0];
        let newParams: string[] = [];
        if (firstParam.type === 'ObjectPattern') {
          const properties = firstParam.properties;
          newParams = properties.map((prop: any) => prop.key.name);
        }

        const shoudlWeAddSharedProps = newParams.every(
          name => !sharedProps.includes(name),
        );

        if (shoudlWeAddSharedProps) {
          sharedProps.forEach(param => {
            if (!newParams.includes(param)) {
              newParams.push(param);
            }
          });
          path.node.params = [
            //@ts-ignore
            t.objectPattern(
              newParams.map(param =>
                t.objectProperty(
                  t.identifier(param),
                  t.identifier(param),
                  false,
                  true,
                ),
              ),
            ),
          ];
        } else {
          path.node.params = [
            //@ts-ignore
            t.objectPattern([
              t.objectProperty(
                t.identifier('$theme'),
                t.identifier('$theme'),
                false,
                true,
              ),
            ]),
          ];
        }
        result = generate(path.node as any).code;
      },
    });
  } catch (e) {
    throw new Error('Override params transform was no good.');
  }
  return result;
}

export const getHighlightStyles = (
  isLightTheme: boolean,
  sharedProps: string[],
) =>
  formatCode(`({ $theme, ${sharedProps.join(',')} }) => { return ({
    outline: \`\${${
      isLightTheme ? '$theme.colors.warning200' : '$theme.colors.warning600'
    }} solid\`,
    backgroundColor: ${
      isLightTheme ? '$theme.colors.warning200' : '$theme.colors.warning600'
    },
    })}
  `);

const getEmptyStyles = (sharedProps: string[]) =>
  formatCode(`({ $theme, ${sharedProps.join(',')} }) => { return ({})}
`);

type TProps = {
  overrideKey: string;
  overrides: any;
  overridesObj: any;
  componentConfig: any;
  componentName: string;
  set: (args: any) => void;
};

const SharedPropsTooltip: React.FC<{
  componentConfig: any;
  children: React.ReactNode;
}> = ({componentConfig, children}) => {
  const sharedProps = Object.keys(componentConfig.overrides.custom.sharedProps);
  const getDescription = (name: string) => {
    let metaObj: any = {};
    if (
      typeof componentConfig.overrides.custom.sharedProps[name] === 'string'
    ) {
      metaObj =
        componentConfig[componentConfig.overrides.custom.sharedProps[name]];
    } else {
      metaObj = componentConfig.overrides.custom.sharedProps[name];
    }
    return (
      <React.Fragment>
        <i>{metaObj.type}</i> - {metaObj.description}
      </React.Fragment>
    );
  };
  return (
    <StatefulTooltip
      accessibilityType="tooltip"
      placement="bottomLeft"
      content={
        <React.Fragment>
          <p>These props are passed to the override function:</p>
          <ul>
            <li>
              <strong>$theme</strong>: <i>ThemeT</i> - Global theme object.
            </li>
            {sharedProps.map(prop => (
              <li key={prop}>
                <strong>{prop}</strong>: {getDescription(prop)}
              </li>
            ))}
          </ul>
        </React.Fragment>
      }
    >
      {children}
    </StatefulTooltip>
  );
};

const Override: React.FC<TProps> = ({
  overrideKey,
  overrides,
  overridesObj,
  componentConfig,
  set,
}) => {
  const [, theme] = useStyletron();
  const isLightTheme = theme.name.startsWith('light-theme');
  const code = overridesObj[overrideKey] ? overridesObj[overrideKey].style : '';
  return (
    <React.Fragment>
      <Editor
        onChange={newCode => {
          set({
            ...overrides.value,
            [overrideKey]: {style: newCode, active: true},
          });
        }}
        code={code}
      />
      <ButtonGroup
        size={SIZE.compact}
        overrides={{
          Root: {
            style: ({$theme}) => ({
              marginTop: $theme.sizing.scale300,
              [`@media screen and (max-width: ${$theme.breakpoints.medium}px)`]: {
                flexWrap: 'wrap',
              },
            }),
          },
        }}
      >
        <Button
          kind={KIND.tertiary}
          onClick={() => {
            set({
              ...overrides.value,
              [overrideKey]: {
                style: formatCode(overrides.value[overrideKey].style),
                active: true,
              },
            });
          }}
        >
          Format
        </Button>
        <Button
          kind={KIND.tertiary}
          onClick={() => {
            const newCode = formatCode(
              toggleOverrideSharedProps(
                overrides.value[overrideKey].style,
                Object.keys(overrides.custom.sharedProps),
              ),
            );
            set({
              ...overrides.value,
              [overrideKey]: {
                style: newCode,
                active: true,
              },
            });
          }}
        >
          <SharedPropsTooltip componentConfig={componentConfig}>
            Toggle shared props
          </SharedPropsTooltip>
        </Button>
        <Button
          kind={KIND.tertiary}
          onClick={() => {
            set({
              ...overrides.value,
              [overrideKey]: {
                style: getEmptyStyles([]),
                active: true,
              },
            });
          }}
        >
          Empty
        </Button>
        <Button
          kind={KIND.tertiary}
          onClick={() => {
            set({
              ...overrides.value,
              [overrideKey]: {
                style: getHighlightStyles(isLightTheme, []),
                active: true,
              },
            });
          }}
        >
          Reset
        </Button>
      </ButtonGroup>
    </React.Fragment>
  );
};

export default Override;
