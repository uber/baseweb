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

export default function Example() {
  return (
    <FlexGrid
      flexGridColumnCount={3}
      flexGridColumnGap="scale800"
      flexGridRowGap="scale800"
    >
      <FlexGridItem {...itemProps}>1</FlexGridItem>
      <FlexGridItem {...itemProps}>2</FlexGridItem>
      <FlexGridItem {...itemProps}>3</FlexGridItem>
      <FlexGridItem {...itemProps}>4</FlexGridItem>
      <FlexGridItem {...itemProps}>5</FlexGridItem>
      <FlexGridItem {...itemProps}>6</FlexGridItem>
    </FlexGrid>
  );
}
