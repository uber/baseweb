import * as React from 'react';
import {useStyletron} from 'baseui';
import {Textarea} from 'baseui/textarea';
import {Button, KIND, SIZE} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';
import {formatCode, addOverrideSharedProps} from './ast';

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
  set: (args: any) => void;
};

const Override: React.FC<TProps> = ({
  overrideKey,
  overrides,
  overridesObj,
  set,
}) => {
  const [, theme] = useStyletron();
  const isLightTheme = theme.name === 'light-theme';
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
        value={overridesObj[overrideKey] ? overridesObj[overrideKey].style : ''}
        overrides={{
          Input: {
            style: () => ({
              fontSize: '12px',
              minHeight: '162px',
              fontFamily:
                "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
              resize: 'vertical',
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
            set({
              ...overrides.value,
              [overrideKey]: {
                style: formatCode(
                  addOverrideSharedProps(
                    overrides.value[overrideKey].style,
                    Object.keys(overrides.meta.sharedProps),
                  ),
                ),
                active: true,
              },
            });
          }}
        >
          Add shared props
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
