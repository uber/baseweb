// @flow
import * as React from 'react';
import {styled} from 'baseui';
import {Select} from 'baseui/select';
import type {ValueT} from 'baseui/select';
import {expandBorderStyles} from 'baseui/styles';

const ColorSwatch = styled<{$color: string}>('div', props => {
  return {
    width: props.$theme.sizing.scale300,
    height: props.$theme.sizing.scale300,
    marginRight: props.$theme.sizing.scale200,
    display: 'inline-block',
    backgroundColor: props.$color,
    verticalAlign: 'baseline',
    ...expandBorderStyles(props.$theme.borders.border400),
  };
});

const getLabel = ({option}) => {
  return (
    <React.Fragment>
      <ColorSwatch $color={option.color} />
      {option.id}
    </React.Fragment>
  );
};

function CustomLabel() {
  const [value, setValue] = React.useState([]);
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
