import * as React from 'react';
import {Accordion, Panel} from 'baseui/accordion';
import {Textarea} from 'baseui/textarea';
import {Button, KIND, SIZE} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';
import {Caption1} from 'baseui/typography';
import Link from 'next/link';
import {StyledLink} from 'baseui/link';
import {useStyletron} from 'baseui';
import {formatCode, addOverrideSharedProps} from './ast';

type TOverridesProps = {
  set: any;
  overrides: any;
  componentName: string;
};

const getHighlightStyles = (isLightTheme: boolean, sharedProps: string[]) =>
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

const Overrides: React.FC<TOverridesProps> = ({
  overrides,
  set,
  componentName,
}) => {
  const [, theme] = useStyletron();
  const isLightTheme = theme.name === 'light-theme';
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
          style: getHighlightStyles(isLightTheme, []),
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
    <React.Fragment>
      <Caption1
        marginLeft="scale200"
        marginRight="scale200"
        marginBottom="scale400"
      >
        Additionally, you can fully customize any part of the {componentName}{' '}
        through the overrides prop (
        <Link href="/theming/understanding-overrides/">
          <StyledLink href="/theming/understanding-overrides/">
            learn more
          </StyledLink>
        </Link>
        ). Try to update different <b>style overrides</b> in the explorer
        bellow:
      </Caption1>
      <Accordion
        initialState={{
          expanded: overrides.value ? Object.keys(overrides.value) : [],
        }}
        onChange={handleChange}
        accordion={false}
      >
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
                  overridesObj[overrideKey]
                    ? overridesObj[overrideKey].style
                    : ''
                }
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
            </Panel>
          );
        })}
      </Accordion>
    </React.Fragment>
  );
};

export default Overrides;
