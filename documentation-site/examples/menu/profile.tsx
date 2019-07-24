import * as React from 'react';
import {Menu, OptionProfile} from 'baseui/menu';

interface IItem {
  title: string;
  subtitle: string;
  body: string;
  imgUrl: string;
}

const ITEMS = [...new Array(4)].map(() => ({
  title: 'David Smith',
  subtitle: 'Senior Engineering Manager',
  body: 'Uber Everything',
  imgUrl: 'https://via.placeholder.com/60x60',
}));

export default () => (
  <Menu
    items={ITEMS}
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
          getProfileItemLabels: ({
            title,
            subtitle,
            body,
          }: IItem) => ({
            title,
            subtitle,
            body,
          }),
          getProfileItemImg: (item: IItem) => item.imgUrl,
          getProfileItemImgText: (item: IItem) => item.title,
        },
      },
    }}
  />
);
