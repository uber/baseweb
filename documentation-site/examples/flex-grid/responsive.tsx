import * as React from "react";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import { BlockProps } from "baseui/block";

const itemProps: BlockProps = {
  backgroundColor: "mono300",
  height: "scale1000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function Example() {
  return (
    <FlexGrid
      flexGridColumnCount={[1, 2, 4, 8]}
      flexGridColumnGap="scale800"
      flexGridRowGap="scale800"
    >
      <FlexGridItem {...itemProps}>1</FlexGridItem>
      <FlexGridItem {...itemProps}>2</FlexGridItem>
      <FlexGridItem {...itemProps}>3</FlexGridItem>
      <FlexGridItem {...itemProps}>4</FlexGridItem>
      <FlexGridItem {...itemProps}>5</FlexGridItem>
      <FlexGridItem {...itemProps}>6</FlexGridItem>
      <FlexGridItem {...itemProps}>7</FlexGridItem>
      <FlexGridItem {...itemProps}>8</FlexGridItem>
      <FlexGridItem {...itemProps}>9</FlexGridItem>
      <FlexGridItem {...itemProps}>10</FlexGridItem>
      <FlexGridItem {...itemProps}>11</FlexGridItem>
      <FlexGridItem {...itemProps}>12</FlexGridItem>
      <FlexGridItem {...itemProps}>13</FlexGridItem>
      <FlexGridItem {...itemProps}>14</FlexGridItem>
      <FlexGridItem {...itemProps}>15</FlexGridItem>
      <FlexGridItem {...itemProps}>16</FlexGridItem>
    </FlexGrid>
  );
}
