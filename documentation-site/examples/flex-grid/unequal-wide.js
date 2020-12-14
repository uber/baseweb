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

const wideItemProps = {
  ...itemProps,
  overrides: {
    Block: {
      style: ({$theme}) => ({
        width: `calc((200% - ${$theme.sizing.scale800}) / 3)`,
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
      marginBottom="scale800"
    >
      <FlexGridItem {...wideItemProps}>Wide item</FlexGridItem>
      <FlexGridItem display="none">
        This invisible one is needed so the margins line up
      </FlexGridItem>
      <FlexGridItem {...itemProps}>Item</FlexGridItem>
      <FlexGridItem {...itemProps}>Item</FlexGridItem>
      <FlexGridItem {...itemProps}>Item</FlexGridItem>
      <FlexGridItem {...itemProps}>Item</FlexGridItem>
    </FlexGrid>
  );
}
