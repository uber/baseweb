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
    prop: true,
    onClick: () => {},
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
    const Root = getOverride(RootOverride) || StyledRoot;
    const List = getOverride(ListOverride) || StyledList;
    const Item = getOverride(ItemOverride) || StyledItem;
    const DragHandle = getOverride(DragHandleOverride) || StyledDragHandle;
    const CloseHandle = getOverride(CloseHandleOverride) || StyledCloseHandle;
    const Label = getOverride(LabelOverride) || StyledLabel;
    const isRemovable = this.props.removable || false;
    return (
      <Root
        $isRemovable={isRemovable}
        onClick={this.props.onClick}
        {...getOverrideProps(RootOverride)}
      >
        <MovableList
          values={items}
          onChange={onChange}
          renderList={({children, props, isDragged}) => (
            <List
              $isRemovable={isRemovable}
              $isDragged={isDragged}
              $ref={props.ref}
              {...getOverrideProps(ListOverride)}
            >
              {children}
            </List>
          )}
          renderItem={({value, props, isDragged, isSelected, index}) => {
            const sharedProps: SharedStylePropsArgT = {
              $isRemovable: this.props.removable || false,
              $isDragged: isDragged,
              $isSelected: isSelected,
            };
            return (
              <Item
                {...sharedProps}
                $ref={props.ref}
                key={props.key}
                tabIndex={props.tabIndex}
                aria-roledescription={props['aria-roledescription']}
                onKeyDown={props.onKeyDown}
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                onWheel={props.onWheel}
                {...getOverrideProps(ItemOverride)}
                style={{...props.style, display: 'flex'}}
              >
                <DragHandle
                  {...sharedProps}
                  {...getOverrideProps(DragHandleOverride)}
                >
                  <Grab size={24} color="#CCC" />
                </DragHandle>
                <Label {...sharedProps} {...getOverrideProps(LabelOverride)}>
                  {value}
                </Label>
                {removable && (
                  <CloseHandle
                    {...sharedProps}
                    onMouseDown={e => e.stopPropagation()}
                    onTouchStart={e => e.stopPropagation()}
                    onClick={() =>
                      onChange && onChange({oldIndex: index, newIndex: -1})
                    }
                    {...getOverrideProps(CloseHandleOverride)}
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
