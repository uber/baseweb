// @flow
import * as React from 'react';
// Components
import {
  List as StyledList,
  ListItem as StyledListItem,
} from './styled-components';
import {STYLETRON_PROP_MAPPER} from './constants';
// Types
import type {StatelessMenulistProps} from './types';

function mapStyletronProps(props: {}, mapper: {}): {} {
  return Object.keys(props).reduce((newProps, propName) => {
    const newName = mapper[propName] ? `$${propName}` : propName;
    newProps[newName] = props[propName];
    return newProps;
  }, {});
}

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
        const itemProps = mapStyletronProps(
          getRequiredItemProps(item, index),
          STYLETRON_PROP_MAPPER,
        );
        return <ListItem {...itemProps}>{getItemString(item)}</ListItem>;
      })}
    </List>
  );
}
