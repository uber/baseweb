// @flow
import * as React from 'react';
// Components
import {ListItem as StyledListItem} from './styled-components';
import {OPTION_LIST_SIZE} from './constants';
import {getOverrides} from '../helpers/overrides';
// Types
import type {OptionListPropsT} from './types';

export default function OptionList({
  item,
  getItemLabel,
  size,
  overrides,
  ...restProps
}: OptionListPropsT) {
  const [ListItem, listItemProps] = getOverrides(
    overrides.ListItem,
    StyledListItem,
  );
  const sharedProps = {
    $size: size,
  };
  return (
    <ListItem {...sharedProps} {...restProps} {...listItemProps}>
      {getItemLabel(item)}
    </ListItem>
  );
}

OptionList.defaultProps = {
  getItemLabel: (item: *) => (item ? item.label : ''),
  size: OPTION_LIST_SIZE.default,
  overrides: {},
};
