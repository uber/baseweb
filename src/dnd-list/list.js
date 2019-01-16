/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {getOverride, getOverrideProps} from '../helpers/overrides.js';
import {
  Root as StyledRoot,
  List as StyledList,
  Item as StyledItem,
} from './styled-components.js';
import {List as MovableList} from 'react-movable';
import Grab from '../icon/grab.js';
import Delete from '../icon/delete.js';

import type {ListPropsT, SharedStylePropsArgT} from './types.js';

class StatelessList extends React.Component<ListPropsT> {
  static defaultProps: $Shape<ListPropsT> = {
    prop: true,
    onClick: () => {},
  };

  getSharedProps(): $Diff<SharedStylePropsArgT, {children?: React.Node}> {
    //const {prop} = this.props;
    return {};
  }

  render() {
    const {overrides = {}, items, onChange} = this.props;
    const {
      Root: RootOverride,
      List: ListOverride,
      Item: ItemOverride,
    } = overrides;

    const Root = getOverride(RootOverride) || StyledRoot;
    const List = getOverride(ListOverride) || StyledList;
    const Item = getOverride(ItemOverride) || StyledItem;
    const sharedProps = this.getSharedProps();

    return (
      <Root
        onClick={this.props.onClick}
        {...sharedProps}
        {...getOverrideProps(RootOverride)}
      >
        <MovableList
          values={items}
          onChange={onChange}
          renderList={({children, props, isDragged}) => (
            <List $isDragged={isDragged} $ref={props.ref}>
              {children}
            </List>
          )}
          renderItem={({value, props, isDragged, isSelected}) => (
            <Item
              $isDragged={isDragged}
              $isSelected={isSelected}
              $ref={props.ref}
              key={props.key}
              tabIndex={props.tabIndex}
              aria-roledescription={props['aria-roledescription']}
              onKeyDown={props.onKeyDown}
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              onWheel={props.onWheel}
              style={{...props.style, display: 'flex'}}
            >
              <Grab size={24} color="#CCC" style={{marginRight: '1em'}} />
              <div style={{textAlign: 'left', flexGrow: 1}}>{value}</div>
              <Delete size={24} color="#CCC" />
            </Item>
          )}
        />
      </Root>
    );
  }
}

export default StatelessList;
