import * as React from 'react';
import {Menu} from 'baseui/menu';

const ITEMS = [
  {label: 'Item One'},
  {label: 'Item Two'},
  {label: 'Item Three'},
  {label: 'Item Four'},
  {label: 'Item Five'},
  {label: 'Item Six'},
  {label: 'Item Seven'},
  {label: 'Item Eight'},
  {label: 'Item Nine'},
  {label: 'Item Ten'},
  {label: 'Item Eleven'},
  {label: 'Item Twelve'},
];

export default () => (
  <Menu
    items={ITEMS}
    rootRef={React.createRef()}
    overrides={{
      List: {
        style: {
          width: '500px',
        },
      },
      Option: {
        props: {
          getItemLabel: item => item.label,
          size: 'compact',
        },
      },
    }}
  />
);
