import React from 'react';
import {Menu, StatefulMenu} from 'baseui/menu';

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

const ThirdMenu = () => (
  <Menu
    items={ITEMS}
    overrides={{List: {style: {width: '200px'}}}}
    rootRef={React.createRef()}
  />
);

const SecondMenu = () => (
  <Menu
    items={ITEMS}
    overrides={{
      List: {style: {width: '200px'}},
      Option: {props: {getChildMenu: ThirdMenu}},
    }}
    rootRef={React.createRef()}
  />
);

export default () => (
  <StatefulMenu
    items={ITEMS}
    overrides={{
      List: {style: {width: '350px', overflow: 'auto'}},
      Option: {
        props: {
          getChildMenu: SecondMenu,
        },
      },
    }}
  />
);
