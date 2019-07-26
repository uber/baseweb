import * as React from 'react';
import {assertUnreachable} from './utils';
import {PropTypes} from './const';
import {Input} from 'baseui/input';
import {Textarea} from 'baseui/textarea';
import {Radio, RadioGroup} from 'baseui/radio';
import {Checkbox, STYLE_TYPE} from 'baseui/checkbox';

const Knob: React.SFC<{
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
          size="compact"
          value={val}
        />
      );
    case PropTypes.Boolean:
      return (
        <Checkbox
          checkmarkType={STYLE_TYPE.toggle}
          checked={val}
          onChange={() => set(!val)}
        />
      );
    case PropTypes.Enum:
      return (
        <RadioGroup
          name="radio group"
          align="horizontal"
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

export default Knob;
