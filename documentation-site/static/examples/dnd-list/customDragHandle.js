import React from 'react';
import {StatefulList} from 'baseui/dnd-list';
import {styled} from 'baseui';
import ArrowRight from 'baseui/icon/arrow-right';

const CustomDragHandleWrapper = styled('div', () => {
  return {
    marginRight: '1em',
    width: '24px',
    display: 'flex',
    alignItems: 'center',
  };
});

const CustomDragHandle = () => (
  <CustomDragHandleWrapper>
    <ArrowRight size={24} color="#CCC" />
  </CustomDragHandleWrapper>
);

export default () => (
  <StatefulList
    initialState={{
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    }}
    overrides={{
      DragHandle: CustomDragHandle,
    }}
    onChange={console.log}
  />
);
