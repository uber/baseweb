import * as React from 'react';
import {useStyletron} from 'baseui';
import {Textarea} from 'baseui/textarea';
import {StatefulTooltip} from 'baseui/tooltip';
import {Button, KIND, SIZE} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';
import {formatCode, toggleOverrideSharedProps} from './ast';

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
  set: (args: any) => void;
};

const SharedPropsTooltip: React.FC<{
  componentConfig: any;
  children: React.ReactNode;
}> = ({componentConfig, children}) => {
  const sharedProps = Object.keys(componentConfig.overrides.meta.sharedProps);
  const getDescription = (name: string) => {
    if (typeof componentConfig.overrides.meta.sharedProps[name] === 'string') {
      const propName = componentConfig.overrides.meta.sharedProps[name];
      return (
        <React.Fragment>
          <i>{componentConfig[propName].type}</i> -{' '}
          {componentConfig[propName].description}
        </React.Fragment>
      );
    }
    return 'TBD';
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
              <li>
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
  const [textareaHeight, setTextareaHeight] = React.useState(162);
  const isLightTheme = theme.name === 'light-theme';
  const textareaValue = overridesObj[overrideKey]
    ? overridesObj[overrideKey].style
    : '';
  // autoresize textarea
  React.useEffect(() => {
    setTextareaHeight(textareaValue.split('\n').length * 24 + 16);
  }, [textareaValue]);
  return (
    <React.Fragment>
      <Textarea
        onChange={event => {
          const newValue = (event.target as HTMLTextAreaElement).value;
          set({
            ...overrides.value,
            [overrideKey]: {style: newValue, active: true},
          });
        }}
        value={textareaValue}
        overrides={{
          Input: {
            style: () => ({
              fontSize: '12px',
              height: `${textareaHeight}px`,
              fontFamily:
                "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
            }),
          },
        }}
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
                Object.keys(overrides.meta.sharedProps),
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
