import React from 'react';

import {StatefulSelect, TYPE} from '../index.js';

export const name = 'select-overridden-menu';

export const component = () => (
  <StatefulSelect
    options={[
      {id: 'AliceBlue', color: '#F0F8FF'},
      {id: 'AntiqueWhite', color: '#FAEBD7'},
      {id: 'Aqua', color: '#00FFFF'},
      {id: 'Aquamarine', color: '#7FFFD4'},
      {id: 'Azure', color: '#F0FFFF'},
      {id: 'Beige', color: '#F5F5DC'},
      {id: 'DarkBlue', color: '#00008B'},
      {id: 'DarkCyan', color: '#008B8B'},
    ]}
    overrides={{StatefulMenu: {props: {stateReducer: (type, next, prev) => {
      console.log(type, prev, next);
      return next;
    }}}}}
    closeOnSelect={false}
    labelKey="id"
    multi
    valueKey="color"
    type={TYPE.search}
  />
);
