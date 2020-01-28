/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {
  Root as StyledRoot,
  List as StyledList,
  Item as StyledItem,
  DragHandle as StyledDragHandle,
  CloseHandle as StyledCloseHandle,
  Label as StyledLabel,
} from './styled-components.js';
import {List as MovableList} from 'react-movable';
import Grab from '../icon/grab.js';
import Delete from '../icon/delete.js';

import type {ListPropsT, SharedStylePropsArgT} from './types.js';

class StatelessList extends React.Component<ListPropsT> {
  static defaultProps: $Shape<ListPropsT> = {
    items: [],
    onChange: () => {},
  };

  render() {
    const {overrides = {}, items, onChange, removable} = this.props;
    const {
      Root: RootOverride,
      List: ListOverride,
      Item: ItemOverride,
      DragHandle: DragHandleOverride,
      CloseHandle: CloseHandleOverride,
      Label: LabelOverride,
    } = overrides;
    const [Root, rootProps] = getOverrides(RootOverride, StyledRoot);
    const [List, listProps] = getOverrides(ListOverride, StyledList);
    const [Item, itemProps] = getOverrides(ItemOverride, StyledItem);
    const [DragHandle, dragHandleProps] = getOverrides(
      DragHandleOverride,
      StyledDragHandle,
    );
    const [CloseHandle, closeHandleProps] = getOverrides(
      CloseHandleOverride,
      StyledCloseHandle,
    );
    const [Label, labelProps] = getOverrides(LabelOverride, StyledLabel);
    const isRemovable = this.props.removable || false;
    const isRemovableByMove = this.props.removableByMove || false;
    return (
      <Root $isRemovable={isRemovable} data-baseweb="dnd-list" {...rootProps}>
        <MovableList
          removableByMove={isRemovableByMove}
          values={items}
          onChange={onChange}
          renderList={({children, props, isDragged}) => (
            <List
              $isRemovable={isRemovable}
              $isDragged={isDragged}
              ref={props.ref}
              {...listProps}
            >
              {children}
            </List>
          )}
          renderItem={({
            value,
            props,
            isDragged,
            isSelected,
            isOutOfBounds,
            index,
          }) => {
            const sharedProps: SharedStylePropsArgT = {
              $isRemovable: isRemovable,
              $isRemovableByMove: isRemovableByMove,
              $isDragged: isDragged,
              $isSelected: isSelected,
              $isOutOfBounds: isOutOfBounds,
              $value: value,
              $index: index,
            };
            return (
              <Item
                {...sharedProps}
                ref={props.ref}
                key={props.key}
                tabIndex={props.tabIndex}
                aria-roledescription={props['aria-roledescription']}
                onKeyDown={props.onKeyDown}
                onWheel={props.onWheel}
                {...itemProps}
                style={{...props.style, display: 'flex'}}
              >
                <DragHandle {...sharedProps} {...dragHandleProps}>
                  <Grab size={24} color="#CCC" />
                </DragHandle>
                <Label {...sharedProps} {...labelProps}>
                  {value}
                </Label>
                {removable && (
                  <CloseHandle
                    {...sharedProps}
                    onClick={evt => {
                      evt.preventDefault();
                      onChange &&
                        onChange({
                          oldIndex: typeof index !== 'undefined' ? index : 0,
                          newIndex: -1,
                        });
                    }}
                    {...closeHandleProps}
                  >
                    <Delete size={24} color="#CCC" />
                  </CloseHandle>
                )}
              </Item>
            );
          }}
        />
      </Root>
    );
  }
}

export default StatelessList;
