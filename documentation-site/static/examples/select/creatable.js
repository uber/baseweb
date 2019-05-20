import * as React from 'react';
import {StatefulSelect} from 'baseui/select';

export default () => (
  <StatefulSelect
    creatable
    options={[
      {id: 'Portland', label: 'Portland'},
      {id: 'NYC', label: 'New York City'},
      {id: 'LosAngeles', label: 'Los Angeles'},
      {id: 'Boston', label: 'Boston'},
      {id: 'Atlanta', label: 'Atlanta'},
      {id: 'SanFrancisco', label: 'San Francisco'},
    ]}
    labelKey="label"
    valueKey="id"
    onChange={event => console.log(event)}
  />
);
