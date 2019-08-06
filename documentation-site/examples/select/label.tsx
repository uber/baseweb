import * as React from 'react';
import {useStyletron} from 'baseui';
import {Select, Value} from 'baseui/select';

const getLabel = ({option}: any) => {
  const [useCss, theme] = useStyletron();
  return (
    <React.Fragment>
      <div
        className={useCss({
          width: theme.sizing.scale300,
          height: theme.sizing.scale300,
          marginRight: theme.sizing.scale200,
          display: 'inline-block',
          bakgroundColor: option.color,
          verticalAlign: 'baseline',
          ...theme.borders.border400,
        })}
      />
      {option.id}
    </React.Fragment>
  );
};

function CustomLabel() {
  const [value, setValue] = React.useState<Value>([]);
  return (
    <Select
      options={[
        {id: 'AliceBlue', color: '#F0F8FF'},
        {id: 'AntiqueWhite', color: '#FAEBD7'},
        {id: 'Aqua', color: '#00FFFF'},
        {id: 'Aquamarine', color: '#7FFFD4'},
        {id: 'Azure', color: '#F0FFFF'},
        {id: 'Beige', color: '#F5F5DC'},
      ]}
      labelKey="id"
      valueKey="color"
      onChange={options => setValue(options.value)}
      value={value}
      getOptionLabel={getLabel}
      getValueLabel={getLabel}
    />
  );
}

export default CustomLabel;
