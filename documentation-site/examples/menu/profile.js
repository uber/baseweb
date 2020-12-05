// @flow
import * as React from 'react';
import {StatefulMenu, OptionProfile} from 'baseui/menu';

const ITEMS = Array.from({length: 4}, () => ({
  title: 'David Smith',
  subtitle: 'Senior Engineering Manager',
  body: 'Uber Everything',
  imgUrl: 'https://via.placeholder.com/60x60',
}));

export default function Example() {
  return (
    <StatefulMenu
      items={ITEMS}
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
}
