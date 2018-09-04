/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global module */
import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withStyle} from 'styletron-react';

import Menu from './menu';
import StatefulMenu from './stateful-menu';
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

storiesOf('Menu', module)
  .add('Stateless', () => (
    <Menu
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
    <StatefulMenu
      items={ITEMS}
      onItemSelect={action('item select')}
      getItemLabel={item => item.label}
      overrides={{
        // $FlowFixMe
        List: withStyle(ListMaxWidth, {height: '150px', overflow: 'auto'}),
      }}
    />
  ));
