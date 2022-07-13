/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import {
  Root as StyledRoot,
  List as StyledList,
  Item as StyledItem,
  DragHandle as StyledDragHandle,
  CloseHandle as StyledCloseHandle,
  Label as StyledLabel,
} from './styled-components';
import { List as MovableList } from 'react-movable';
import Grab from '../icon/grab';
import Delete from '../icon/delete';
import { isFocusVisible, forkFocus, forkBlur } from '../utils/focusVisible';
import { Layer } from '../layer';

import type { ListPropsT, SharedStylePropsArgT } from './types';

import type { SyntheticEvent } from 'react';

const ItemLayer: React.FC<{ children: React.ReactNode; dragged: boolean }> = ({
  children,
  dragged,
}) => {
  if (!dragged) {
    return <>{children}</>;
  }
  return <Layer>{children}</Layer>;
};

class StatelessList extends React.Component<
  ListPropsT,
  {
    isFocusVisible: boolean;
  }
> {
  static defaultProps: Partial<ListPropsT> = {
    items: [],
    onChange: () => {},
  };

  state = { isFocusVisible: false };

  handleFocus = (event: SyntheticEvent) => {
    if (isFocusVisible(event)) {
      this.setState({ isFocusVisible: true });
    }
  };

  handleBlur = (event: SyntheticEvent) => {
    if (this.state.isFocusVisible !== false) {
      this.setState({ isFocusVisible: false });
    }
  };

  render() {
    const { overrides = {}, items, onChange, removable } = this.props;
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
    const [DragHandle, dragHandleProps] = getOverrides(DragHandleOverride, StyledDragHandle);
    const [CloseHandle, closeHandleProps] = getOverrides(CloseHandleOverride, StyledCloseHandle);
    const [Label, labelProps] = getOverrides(LabelOverride, StyledLabel);
    const isRemovable = this.props.removable || false;
    const isRemovableByMove = this.props.removableByMove || false;
    return (
      <Root
        $isRemovable={isRemovable}
        data-baseweb="dnd-list"
        {...rootProps}
        onFocus={forkFocus(rootProps, this.handleFocus)}
        onBlur={forkBlur(rootProps, this.handleBlur)}
      >
        <MovableList
          removableByMove={isRemovableByMove}
          values={items}
          onChange={onChange}
          renderList={({ children, props, isDragged }) => (
            <List $isRemovable={isRemovable} $isDragged={isDragged} ref={props.ref} {...listProps}>
              {children}
            </List>
          )}
          renderItem={({ value, props, isDragged, isSelected, isOutOfBounds, index }) => {
            const sharedProps: SharedStylePropsArgT = {
              $isRemovable: isRemovable,
              $isRemovableByMove: isRemovableByMove,
              $isDragged: isDragged,
              $isSelected: isSelected,
              $isFocusVisible: this.state.isFocusVisible,
              $isOutOfBounds: isOutOfBounds,
              $value: value,
              $index: index,
            };
            return (
              <ItemLayer dragged={isDragged} key={props.key}>
                <Item
                  {...sharedProps}
                  ref={props.ref}
                  tabIndex={props.tabIndex}
                  aria-roledescription={props['aria-roledescription']}
                  onKeyDown={props.onKeyDown}
                  onWheel={props.onWheel}
                  {...itemProps}
                  style={{ ...props.style, display: 'flex' }}
                >
                  <DragHandle {...sharedProps} {...dragHandleProps}>
                    <Grab size={24} />
                  </DragHandle>
                  <Label {...sharedProps} {...labelProps}>
                    {value}
                  </Label>
                  {removable && (
                    <CloseHandle
                      {...sharedProps}
                      onClick={(evt) => {
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
              </ItemLayer>
            );
          }}
        />
      </Root>
    );
  }
}

export default StatelessList;
