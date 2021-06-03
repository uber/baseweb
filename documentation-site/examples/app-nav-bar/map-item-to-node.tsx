import * as React from 'react';

import {useStyletron} from 'baseui';
import {
  AppNavBar,
  setItemActive,
  NavItemT,
} from 'baseui/app-nav-bar';

export default function Example() {
  const [css] = useStyletron();

  const [mainItems, setMainItems] = React.useState<NavItemT[]>([
    {label: 'main one', info: {color: 'blue'}},
    {label: 'main two', info: {color: 'red'}},
  ]);

  const userItems = [
    {label: 'user one', info: {color: 'green'}},
    {label: 'user two', info: {color: 'yellow'}},
  ];

  function handleMainItemSelect(item: NavItemT) {
    setMainItems(prev => setItemActive(prev, item));
  }

  return (
    <AppNavBar
      title="Title"
      mainItems={mainItems}
      userItems={userItems}
      mapItemToNode={item => (
        <div
          className={css({
            border: `dashed 2px ${
              item.info ? item.info.color : 'green'
            }`,
          })}
        >
          {item.info ? `color: ${item.info.color}` : item.label}
        </div>
      )}
      onMainItemSelect={handleMainItemSelect}
      username="Umka Marshmallow"
      usernameSubtitle="5.0"
      userImgUrl=""
    />
  );
}
