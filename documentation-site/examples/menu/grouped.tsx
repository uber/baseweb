import * as React from 'react';

import {StatefulMenu} from 'baseui/menu';

const ITEMS = {
  __ungrouped: [{id: 'Black', color: '#000000'}],
  Blueish: [
    {id: 'AliceBlue', color: '#F0F8FF'},
    {id: 'Aqua', color: '#00FFFF'},
    {id: 'Aquamarine', color: '#7FFFD4'},
  ],
  Whiteish: [
    {id: 'AntiqueWhite', color: '#FAEBD7'},
    {id: 'Azure', color: '#F0FFFF'},
    {id: 'Beige', color: '#F5F5DC'},
  ],
};

export default () => (
  <StatefulMenu
    items={ITEMS}
    onItemSelect={({item}) => console.log(item)}
    overrides={{
      List: {
        style: {
          width: '200px',
        },
      },
      Option: {
        props: {
          getItemLabel: (item: any) => item.id,
        },
      },
    }}
  />
);
