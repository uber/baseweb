// @flow
import * as React from 'react';
// Components
import {
  List as StyledList,
  ListItem as StyledListItem,
} from './styled-components';
import {STYLETRON_PROP_MAPPER} from './constants';
import {mapStyletronProps} from './utils';
// Types
import type {StatelessMenulistProps} from './types';

export default function StatelessMenuList({
  items,
  getItemString,
  getRequiredItemProps = (item, index) => ({key: String(index)}),
  rootRef = React.createRef(),
  components: {
    // $FlowFixMe
    List = StyledList,
    // $FlowFixMe
    ListItem = StyledListItem,
  },
}: StatelessMenulistProps) {
  return (
    <List $ref={rootRef}>
      {items.map((item, index) => {
        // $FlowFixMe
        const {key, ...itemProps} = mapStyletronProps(
          getRequiredItemProps(item, index),
          STYLETRON_PROP_MAPPER,
        );
        // Need to be explicit with `key` otherwise eslint throws error?
        return (
          <ListItem key={key} {...itemProps}>
            {getItemString(item)}
          </ListItem>
        );
      })}
    </List>
  );
}
