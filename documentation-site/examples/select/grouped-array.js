// @flow
import * as React from 'react';
import {Select} from 'baseui/select';

const options = [
  {id: 'Black', color: '#000000'},
  {
    optgroup: 'Bluish',
    options: [
      {id: 'AliceBlue', color: '#F0F8FF'},
      {id: 'Aqua', color: '#00FFFF'},
      {id: 'Aquamarine', color: '#7FFFD4'},
    ],
  },
  {id: 'Red', color: '#FF0000'},
  {
    optgroup: 'Whiteish',
    options: [
      {id: 'AntiqueWhite', color: '#FAEBD7'},
      {id: 'Azure', color: '#F0FFFF'},
      {id: 'Beige', color: '#F5F5DC'},
    ],
  },
  {id: 'Yellow', color: '#FFFF00'},
];

function convert(opts) {
  const options = {
    __ungrouped: [],
  };
  opts.forEach(option => {
    if (!option.optgroup) {
      options.__ungrouped.push(option);
    }

    if (option.options && option.optgroup) {
      // $FlowFixMe
      options[option.optgroup] = option.options;
    }
  });
  return options;
}

export default () => {
  const [value, setValue] = React.useState([]);
  return (
    <Select
      options={convert(options)}
      labelKey="id"
      valueKey="color"
      onChange={({value}) => setValue(value)}
      value={value}
    />
  );
};
