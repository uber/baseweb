/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {action} from '@storybook/addon-actions';

import Menu from './menu.js';
import StatefulMenu from './stateful-menu.js';

import OptionProfile from './option-profile.js';
import {OPTION_LIST_SIZE} from './constants.js';
import examples from './examples-list.js';

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

export default {
  [examples.MENU]: function Story1() {
    return (
      <Menu
        items={ITEMS}
        rootRef={React.createRef()}
        overrides={{
          List: {
            style: {
              width: '200px',
            },
          },
          Option: {
            props: {
              getItemLabel: item => item.label,
            },
          },
        }}
      />
    );
  },
  [examples.MENU_COMPACT]: function StoryMenuCompact() {
    return (
      <Menu
        items={ITEMS}
        rootRef={React.createRef()}
        overrides={{
          List: {
            style: {
              width: '200px',
            },
          },
          Option: {
            props: {
              getItemLabel: item => item.label,
              size: OPTION_LIST_SIZE.compact,
            },
          },
        }}
      />
    );
  },
  [examples.MENU_PROFILE]: function Story2() {
    return (
      <Menu
        items={PROFILE_ITEMS}
        rootRef={React.createRef()}
        overrides={{
          List: {
            style: {
              width: '350px',
            },
          },
          Option: {
            component: OptionProfile,
            props: {
              getProfileItemLabels: ({title, subtitle, body}) => ({
                title,
                subtitle,
                body,
              }),
              getProfileItemImg: item => item.imgUrl,
              getProfileItemImgText: item => item.title,
            },
          },
        }}
      />
    );
  },
  [examples.MENU_STATEFUL]: function Story3() {
    return (
      <StatefulMenu
        items={ITEMS}
        onItemSelect={action('item select')}
        overrides={{
          List: {
            style: {
              height: '150px',
              width: '350px',
              overflow: 'auto',
            },
          },
          Option: {
            props: {
              getItemLabel: item => item.label,
            },
          },
        }}
      />
    );
  },
  [examples.MENU_PROFILE_STATEFUL]: function Story4() {
    return (
      <StatefulMenu
        items={PROFILE_ITEMS}
        overrides={{
          List: {
            style: {
              width: '350px',
              height: '150px',
              overflow: 'auto',
            },
          },
          Option: {
            component: OptionProfile,
            props: {
              getProfileItemLabels: ({title, subtitle, body}) => ({
                title,
                subtitle,
                body,
              }),
              getProfileItemImg: item => item.imgUrl,
              getProfileItemImgText: item => item.title,
            },
          },
        }}
      />
    );
  },

  [examples.CHILD_MENU]: function ChildMenuStory() {
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

    const ThirdMenu = () => (
      <Menu
        items={ITEMS}
        overrides={{List: {style: {width: '200px'}}}}
        rootRef={React.createRef()}
      />
    );

    return (
      <StatefulMenu
        items={PROFILE_ITEMS}
        overrides={{
          List: {style: {width: '350px', overflow: 'auto'}},
          Option: {
            component: OptionProfile,
            props: {
              getProfileItemLabels: ({title, subtitle, body}) => ({
                title,
                subtitle,
                body,
              }),
              getProfileItemImg: item => item.imgUrl,
              getProfileItemImgText: item => item.title,
              getChildMenu: SecondMenu,
            },
          },
        }}
      />
    );
  },
};
