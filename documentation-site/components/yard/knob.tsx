import * as React from 'react';
import {useStyletron} from 'baseui';
import {assertUnreachable} from './utils';
import {PropTypes} from './const';
import {Input} from 'baseui/input';
import {Textarea} from 'baseui/textarea';
import {Radio, RadioGroup} from 'baseui/radio';
import {Checkbox} from 'baseui/checkbox';
import {StatefulTooltip} from 'baseui/tooltip';

const Spacing: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [css, theme] = useStyletron();
  return (
    <div className={css({margin: `${theme.sizing.scale400} 0`})}>
      {children}
    </div>
  );
};

const Label: React.FC<{children: React.ReactNode; tooltip: string}> = ({
  children,
  tooltip,
}) => {
  const [css, theme] = useStyletron();
  return (
    <label
      className={css({
        ...(theme.typography.font350 as any),
        color: theme.colors.foreground,
      })}
    >
      <StatefulTooltip accessibilityType="tooltip" content={tooltip}>
        {children}
      </StatefulTooltip>
    </label>
  );
};

const Knob: React.SFC<{
  name: string;
  description: string;
  val: any;
  set: any;
  type: PropTypes;
  options: any;
}> = ({name, type, val, set, options, description}) => {
  //const [css, theme] = useStyletron();
  switch (type) {
    case PropTypes.String:
    case PropTypes.Number:
    case PropTypes.Array:
    case PropTypes.Object:
      return (
        <Spacing>
          <Label tooltip={description}>{name}</Label>
          <Input
            //@ts-ignore
            onChange={event => set(event.target.value)}
            size="compact"
            value={val}
          />
        </Spacing>
      );
    case PropTypes.Boolean:
      return (
        <Spacing>
          <Checkbox checked={val} onChange={() => set(!val)}>
            <StatefulTooltip
              accessibilityType="tooltip"
              content={description}
              placement="right"
            >
              {name}
            </StatefulTooltip>
          </Checkbox>
        </Spacing>
      );
    case PropTypes.Enum:
      return (
        <Spacing>
          <Label tooltip={description}>{name}</Label>
          <RadioGroup
            name="radio group"
            align="horizontal"
            overrides={{
              RadioGroupRoot: {
                style: ({$theme}) => ({
                  flexWrap: 'wrap',
                  marginTop: 0,
                  marginBottom: $theme.sizing.scale300,
                }),
              },
            }}
            //@ts-ignore
            onChange={e => set(e.target.value)}
            value={val}
          >
            {Object.keys(options).map(opt => (
              <Radio
                value={`${name.toUpperCase()}.${opt}`}
                overrides={{
                  Root: {
                    style: ({$theme}) => ({
                      marginRight: $theme.sizing.scale600,
                      marginTop: 0,
                      marginBottom: 0,
                    }),
                  },
                  Label: {
                    style: ({$theme}) => $theme.typography.font350,
                  },
                }}
              >
                {opt}
              </Radio>
            ))}
          </RadioGroup>
        </Spacing>
      );
    case PropTypes.Function:
      return (
        <Spacing>
          <Label tooltip={description}>{name}</Label>
          <Textarea
            //@ts-ignore
            onChange={event => set(event.target.value)}
            value={val}
            size="compact"
            overrides={{
              Input: {
                style: ({$isFocused}) => ({
                  height: $isFocused ? 'auto' : '32px',
                  fontSize: '12px',
                  fontFamily:
                    "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
                  resize: $isFocused ? 'vertical' : 'none',
                }),
              },
            }}
          />
        </Spacing>
      );
    default:
      return assertUnreachable();
  }
};

export default Knob;
