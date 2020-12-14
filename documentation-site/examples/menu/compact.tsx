import * as React from 'react';
import {StatefulMenu} from 'baseui/menu';

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

export default function Example() {
  return (
    <StatefulMenu
      items={ITEMS}
      overrides={{
        List: {
          style: {
            width: '500px',
          },
        },
        Option: {
          props: {
            getItemLabel: (item: {label: string}) => item.label,
            size: 'compact',
          },
        },
      }}
    />
  );
}
