import * as React from 'react';

import {
  AppNavBar,
  setItemActive,
  NavItem,
} from 'baseui/app-nav-bar';

export default function Example() {
  const [mainItems, setMainItems] = React.useState<NavItem[]>([
    {label: 'label', info: {id: 1}},
    {label: 'label', info: {id: 2}},
    {label: 'label', info: {id: 3}},
    {label: 'label', info: {id: 4}},
  ]);

  function getUniqueIdentifier(item: NavItem) {
    if (item.info) {
      return item.info.id;
    }
    return item.label;
  }

  function handleMainItemSelect(item: NavItem) {
    setMainItems((prev) =>
      setItemActive(prev, item, getUniqueIdentifier),
    );
  }

  return (
    <AppNavBar
      title="Title"
      mainItems={mainItems}
      onMainItemSelect={handleMainItemSelect}
    />
  );
}
