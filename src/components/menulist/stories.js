// @flow
/* global module */
import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withStyle} from 'styletron-react';

import Menulist from './menulist';
import StatefulMenulist from './stateful-menulist';
import {List} from './styled-components';

// Give a width to render this nicer
const ListMaxWidth = withStyle(List, {width: '200px'});

const ITEMS: Array<{label: string}> = [
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

storiesOf('Menulist', module)
  .add('Stateless', () => (
    <Menulist
      items={ITEMS}
      getItemLabel={item => item.label}
      rootRef={React.createRef()}
      overrides={{
        // $FlowFixMe
        List: ListMaxWidth,
      }}
    />
  ))
  .add('Stateful with keybindings', () => (
    <StatefulMenulist
      items={ITEMS}
      onItemSelect={action('item select')}
      getItemLabel={item => item.label}
      overrides={{
        // $FlowFixMe
        List: withStyle(ListMaxWidth, {height: '150px', overflow: 'auto'}),
      }}
    />
  ));
