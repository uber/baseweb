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
import MenuProfile from './menu-profile';
import StatefulMenu from './stateful-menu';
import StatefulMenuProfile from './stateful-menu-profile';
import {List, ListProfile} from './styled-components';

function CloudComponent() {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      style={{width: 40, height: 40}}
    >
      <rect width={24} height={24} fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5 5C12.8755 5 11.4519 5.86084 10.6609 7.15112C10.2905 7.05249 9.90137 7 9.5 7C7.14185 7 5.20752 8.81372 5.01562 11.1221C3.28247 11.5605 2 13.1304 2 15C2 17.2092 3.79077 19 6 19H11V14.4143L9.70703 15.707C9.31665 16.0977 8.68335 16.0977 8.29297 15.707C7.90234 15.3167 7.90234 14.6833 8.29297 14.293L11.293 11.293C11.6833 10.9023 12.3167 10.9023 12.707 11.293L15.707 14.293C16.0977 14.6833 16.0977 15.3167 15.707 15.707C15.3167 16.0977 14.6833 16.0977 14.293 15.707L13 14.4143V19H17C19.7615 19 22 16.7615 22 14C22 11.9492 20.7656 10.187 18.9993 9.41577C18.9543 6.96924 16.9573 5 14.5 5Z"
        fill="black"
      />
    </svg>
  );
}

// Give a width to render this nicer
const ListMaxWidth = withStyle(List, {width: '200px'});

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

const profileItem = {
  title: 'David Smith',
  subtitle: 'Senior Engineering Manager',
  body: 'Uber Everything',
  imgUrl: 'https://via.placeholder.com/60x60',
};
const PROFILE_ITEMS = [
  {...profileItem},
  {...profileItem, subtitle: null},
  {...profileItem, body: null},
  {...profileItem, title: null},
  {...profileItem, imgUrl: null},
  {...profileItem, imgUrl: CloudComponent},
];

storiesOf('Menu', module)
  .add('Stateless simple', () => (
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
  .add('Stateless profile', () => (
    <MenuProfile
      items={PROFILE_ITEMS}
      getProfileItemLabels={({title, subtitle, body}) => ({
        title,
        subtitle,
        body,
      })}
      getProfileItemImg={item => item.imgUrl}
      getProfileItemImgText={item => item.title}
      rootRef={React.createRef()}
      overrides={{
        // $FlowFixMe
        ListProfile: withStyle(ListProfile, {width: '300px'}),
      }}
    />
  ))
  .add('Stateful simple with keybindings', () => (
    <StatefulMenu
      items={ITEMS}
      onItemSelect={action('item select')}
      getItemLabel={item => item.label}
      overrides={{
        // $FlowFixMe
        List: withStyle(ListMaxWidth, {height: '150px', overflow: 'auto'}),
      }}
    />
  ))
  .add('Stateful profile with keybindingsw', () => (
    <StatefulMenuProfile
      items={PROFILE_ITEMS}
      getProfileItemLabels={({title, subtitle, body}) => ({
        title,
        subtitle,
        body,
      })}
      getProfileItemImg={item => item.imgUrl}
      getProfileItemImgText={item => item.title}
      overrides={{
        // $FlowFixMe
        ListProfile: withStyle(ListProfile, {
          width: '300px',
          height: '150px',
          overflow: 'auto',
        }),
      }}
    />
  ));
