import * as React from 'react';
import {Accordion, Panel} from 'baseui/accordion';
import {Textarea} from 'baseui/textarea';
import {Button, KIND, SIZE} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';
import {useStyletron} from 'baseui';
import {formatCode} from './ast';

type TOverridesProps = {
  set: any;
  overrides: any;
};

const getHighlightStyles = (isLightTheme: boolean, sharedProps: string[]) =>
  formatCode(`({ $theme, ${sharedProps.join(',')} }) => { return ({
    outlineStyle: 'solid',
    outlineColor: ${
      isLightTheme ? '$theme.colors.warning200' : '$theme.colors.warning600'
    },
    backgroundColor: ${
      isLightTheme ? '$theme.colors.warning200' : '$theme.colors.warning600'
    },
    })}
  `);

const Overrides: React.FC<TOverridesProps> = ({overrides, set}) => {
  const [, theme] = useStyletron();
  if (
    !overrides.meta ||
    !overrides.meta.names ||
    overrides.meta.names.length === 0
  ) {
    return null;
  }

  const overridesObj: {
    [key: string]: {
      style: any;
    };
  } = {};

  overrides.meta.names.forEach((key: string) => {
    if (overrides.value && overrides.value[key]) {
      overridesObj[key] = overrides.value[key];
    } else {
      overridesObj[key] = {
        style: null,
      };
    }
  });

  const handleChange = ({expanded}: {expanded: (string | number)[]}) => {
    const returnValue: any = {...overrides.value};
    if (overrides.value) {
      Object.keys(overrides.value).forEach(key => {
        returnValue[key]['active'] = false;
      });
    }
    expanded.forEach(key => {
      if (overridesObj[key].style === null) {
        returnValue[key] = {
          style: getHighlightStyles(theme.name === 'light-theme', []),
        };
      } else {
        returnValue[key] = {
          style: overridesObj[key].style,
        };
      }
      returnValue[key]['active'] = true;
    });
    set(Object.keys(returnValue).length > 0 ? returnValue : undefined);
  };

  return (
    <Accordion onChange={handleChange} accordion={false}>
      {Object.keys(overridesObj).map(overrideKey => {
        return (
          <Panel
            key={overrideKey}
            title={overrideKey}
            overrides={{Content: {style: {backgroundColor: 'transparent'}}}}
          >
            <Textarea
              onChange={event => {
                const newValue = (event.target as HTMLTextAreaElement).value;
                set({
                  ...overrides.value,
                  [overrideKey]: {style: newValue, active: true},
                });
              }}
              value={
                overridesObj[overrideKey] ? overridesObj[overrideKey].style : ''
              }
              overrides={{
                Input: {
                  style: () => ({
                    fontSize: '12px',
                    minHeight: '186px',
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
              <Button kind={KIND.tertiary} onClick={() => {}}>
                Format
              </Button>
              <Button kind={KIND.tertiary} onClick={() => {}}>
                Add shared props
              </Button>
              <Button kind={KIND.tertiary} onClick={() => {}}>
                Reset
              </Button>
            </ButtonGroup>
          </Panel>
        );
      })}
    </Accordion>
  );
};

export default Overrides;
