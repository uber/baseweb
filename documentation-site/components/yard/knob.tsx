import * as React from 'react';
import {useStyletron} from 'baseui';
import {assertUnreachable} from './utils';
import {PropTypes} from './const';
import {Input} from 'baseui/input';
import {Textarea} from 'baseui/textarea';
import {Radio, RadioGroup} from 'baseui/radio';
import {Checkbox} from 'baseui/checkbox';
import {StatefulTooltip} from 'baseui/tooltip';

const getTooltip = (description: string, type: string, name: string) => (
  <span>
    <p>
      <b>{name}</b>: <i>{type}</i>
    </p>
    <p>{description}</p>
  </span>
);

const Spacing: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [css, theme] = useStyletron();
  return (
    <div className={css({margin: `${theme.sizing.scale400} 0`})}>
      {children}
    </div>
  );
};

const Label: React.FC<{
  children: React.ReactNode;
  tooltip: React.ReactNode;
}> = ({children, tooltip}) => {
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
  set: (val: any) => void;
  type: PropTypes;
  options?: any;
  placeholder?: string;
}> = ({name, type, val, set, options, description, placeholder}) => {
  //const [css, theme] = useStyletron();
  switch (type) {
    case PropTypes.String:
    case PropTypes.Number:
    case PropTypes.Array:
    case PropTypes.Object:
      return (
        <Spacing>
          <Label tooltip={getTooltip(description, type, name)}>{name}</Label>
          <Input
            //@ts-ignore
            onChange={event => set(event.target.value)}
            placeholder={placeholder}
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
              content={getTooltip(description, type, name)}
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
          <Label tooltip={getTooltip(description, type, name)}>{name}</Label>
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
                key={opt}
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
    case PropTypes.ReactNode:
    case PropTypes.Function:
      return (
        <Spacing>
          <Label tooltip={getTooltip(description, type, name)}>{name}</Label>
          <Textarea
            //@ts-ignore
            onChange={event => set(event.target.value)}
            value={val}
            size="compact"
            placeholder={placeholder}
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
    case PropTypes.Overrides:
      return null;
    default:
      return assertUnreachable();
  }
};

export default Knob;
