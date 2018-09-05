// @flow
import * as React from 'react';
// Components
import {ListItem as StyledListItem} from './styled-components';
import {getOverrideObject} from '../helpers/overrides';
// Types
import type {OptionListPropsT} from './types';

export default function OptionList({
  item,
  getItemLabel = (item: *) => (item ? item.label : ''),
  overrides = {},
  ...restProps
}: OptionListPropsT) {
  const {component: ListItem, props: listItemProps} = getOverrideObject(
    overrides.ListItem,
    StyledListItem,
  );
  return (
    <ListItem {...restProps} {...listItemProps}>
      {getItemLabel(item)}
    </ListItem>
  );
}
