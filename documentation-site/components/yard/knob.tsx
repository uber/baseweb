import * as React from 'react';
import {useStyletron} from 'baseui';
import {StyledLink} from 'baseui/link';
import {Input} from 'baseui/input';
import {Radio, RadioGroup} from 'baseui/radio';
import {Checkbox} from 'baseui/checkbox';
import {Select, SIZE} from 'baseui/select';
import {StatefulTooltip} from 'baseui/tooltip';

import Editor from './editor';
import {
  assertUnreachable,
  useValueDebounce,
  PropTypes,
  Error,
  TPropValue,
} from 'react-view';

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
        ...theme.typography.font250,
        color: theme.colors.contentPrimary,
      })}
    >
      <StatefulTooltip accessibilityType="tooltip" content={tooltip}>
        <span
          className={css({
            textDecoration: 'underline',
            ':hover': {
              color: theme.colors.contentSecondary,
            },
          })}
        >
          {children}
        </span>
      </StatefulTooltip>
    </label>
  );
};

const Knob: React.SFC<{
  name: string;
  error: string | null;
  description: string;
  val: TPropValue;
  set: (val: TPropValue) => void;
  type: PropTypes;
  options?: {[key: string]: string};
  placeholder?: string;
  enumName?: string;
}> = ({
  name,
  error,
  type,
  val: globalVal,
  set: globalSet,
  options = {},
  description,
  placeholder,
  enumName,
}) => {
  const [val, set] = useValueDebounce<TPropValue>(globalVal, globalSet);
  const [css, theme] = useStyletron();
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
          <Error msg={error} isPopup />
        </Spacing>
      );
    case PropTypes.String:
    case PropTypes.Date:
    case PropTypes.Number:
      return (
        <Spacing>
          <Label tooltip={getTooltip(description, type, name)}>{name}</Label>
          <Input
            error={Boolean(error)}
            onChange={event => set((event.target as HTMLInputElement).value)}
            placeholder={placeholder}
            size="compact"
            value={val ? String(val) : undefined}
          />
          <Error msg={error} isPopup />
        </Spacing>
      );
    case PropTypes.Boolean:
      return (
        <Spacing>
          <Checkbox
            checked={Boolean(val)}
            onChange={() => {
              globalSet(!val);
            }}
          >
            <StatefulTooltip
              accessibilityType="tooltip"
              content={getTooltip(description, type, name)}
              placement="right"
            >
              <span
                className={css({
                  textDecoration: 'underline',
                  ':hover': {
                    color: theme.colors.contentSecondary,
                  },
                })}
              >
                {name}
              </span>
            </StatefulTooltip>
          </Checkbox>
          <Error msg={error} isPopup />
        </Spacing>
      );
    case PropTypes.Enum:
      const optionsKeys = Object.keys(options);
      const numberOfOptions = optionsKeys.length;
      const selectOptions = optionsKeys.map(key => ({
        id: key,
        option: options[key],
      }));
      const valueKey = val && String(val).split('.')[1];
      return (
        <Spacing>
          <Label tooltip={getTooltip(description, type, name)}>{name}</Label>
          {numberOfOptions < 7 ? (
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
              onChange={e => {
                globalSet((e.target as HTMLInputElement).value);
              }}
              value={String(val)}
            >
              {Object.keys(options).map(opt => (
                <Radio
                  key={opt}
                  value={`${enumName || name.toUpperCase()}.${opt}`}
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
          ) : (
            <Select
              size={SIZE.compact}
              options={selectOptions}
              clearable={false}
              value={[{id: valueKey || '', option: valueKey}]}
              labelKey="option"
              valueKey="id"
              onChange={({value}) => {
                globalSet(`${enumName || name.toUpperCase()}.${value[0].id}`);
              }}
            />
          )}
          <Error msg={error} isPopup />
        </Spacing>
      );
    case PropTypes.ReactNode:
    case PropTypes.Function:
    case PropTypes.Array:
    case PropTypes.Object:
      return (
        <Spacing>
          <Label tooltip={getTooltip(description, type, name)}>{name}</Label>
          <Editor
            onChange={code => {
              globalSet(code);
            }}
            code={val ? String(val) : ''}
            placeholder={placeholder}
            small
          />
          <Error msg={error} isPopup />
        </Spacing>
      );
    case PropTypes.Custom:
      return null;
    default:
      return assertUnreachable();
  }
};

export default Knob;
