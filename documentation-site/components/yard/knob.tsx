import * as React from 'react';
import {useStyletron} from 'baseui';
import {StyledLink} from 'baseui/link';
import {assertUnreachable} from './utils';
import {PropTypes} from './const';
import {Input} from 'baseui/input';
import {Textarea} from 'baseui/textarea';
import {Radio, RadioGroup} from 'baseui/radio';
import {Checkbox} from 'baseui/checkbox';
import {StatefulTooltip} from 'baseui/tooltip';
import PopupError from './popup-error';

const getTooltip = (description: string, type: string, name: string) => (
  <span>
    <p>
      <b>{name}</b>: <i>{type}</i>
    </p>
    <p>{description}</p>
  </span>
);

const Spacing: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [useCss, theme] = useStyletron();
  return (
    <div className={useCss({margin: `${theme.sizing.scale400} 0`})}>
      {children}
    </div>
  );
};

const Label: React.FC<{
  children: React.ReactNode;
  tooltip: React.ReactNode;
}> = ({children, tooltip}) => {
  const [useCss, theme] = useStyletron();
  return (
    <label
      className={useCss({
        ...(theme.typography.font250 as any),
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
  error: string | null;
  description: string;
  val: any;
  set: (val: any) => void;
  type: PropTypes;
  options?: any;
  placeholder?: string;
}> = ({name, error, type, val, set, options, description, placeholder}) => {
  switch (type) {
    case PropTypes.Ref:
      return (
        <Spacing>
          <Label tooltip={getTooltip(description, type, name)}>{name}</Label>
          <StyledLink
            href="https://reactjs.org/docs/refs-and-the-dom.html"
            target="_blank"
            $style={{
              fontSize: '14px',
              display: 'block',
            }}
          >
            React Ref documentation
          </StyledLink>
          <PopupError error={error} />
        </Spacing>
      );
    case PropTypes.String:
    case PropTypes.Number:
    case PropTypes.Array:
    case PropTypes.Object:
      return (
        <Spacing>
          <Label tooltip={getTooltip(description, type, name)}>{name}</Label>
          <Input
            //@ts-ignore
            error={Boolean(error)}
            onChange={event => set((event.target as any).value)}
            placeholder={placeholder}
            size="compact"
            value={val}
          />
          <PopupError error={error} />
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
          <PopupError error={error} />
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
                    style: ({$theme}) => $theme.typography.font250,
                  },
                }}
              >
                {opt}
              </Radio>
            ))}
          </RadioGroup>
          <PopupError error={error} />
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
            error={Boolean(error)}
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
          <PopupError error={error} />
        </Spacing>
      );
    case PropTypes.Overrides:
      return null;
    default:
      return assertUnreachable();
  }
};

export default Knob;
