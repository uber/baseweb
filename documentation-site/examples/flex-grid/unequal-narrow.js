// @flow
import * as React from 'react';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';

const itemProps = {
  backgroundColor: 'mono300',
  height: 'scale1000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const narrowItemProps = {
  ...itemProps,
  overrides: {
    Block: {
      style: ({$theme}) => ({
        width: $theme.sizing.scale1600,
        flexGrow: 0,
      }),
    },
  },
};

export default function Example() {
  return (
    <FlexGrid
      flexGridColumnCount={3}
      flexGridColumnGap="scale800"
      flexGridRowGap="scale800"
    >
      <FlexGridItem {...itemProps}>Item</FlexGridItem>
      <FlexGridItem {...narrowItemProps}>Narrow</FlexGridItem>
      <FlexGridItem {...itemProps}>Item</FlexGridItem>
      <FlexGridItem {...itemProps}>Item</FlexGridItem>
      <FlexGridItem {...narrowItemProps}>Narrow</FlexGridItem>
      <FlexGridItem {...itemProps}>Item</FlexGridItem>
    </FlexGrid>
  );
}
