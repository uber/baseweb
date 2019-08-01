import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {StatefulSelect} from 'baseui/select';

export default () => (
  <FormControl label="Select label" caption="Select caption">
    <StatefulSelect
      id="select-id"
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
    />
  </FormControl>
);
