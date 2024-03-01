import React from "react";
import { useStyletron } from "baseui";
import { StyledTable, StyledHeadCell, StyledBodyCell } from "baseui/table-grid";

const data = Array(100)
  .fill(2)
  .map(() => [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
     labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut`,
    "Cell two",
    "Cell three",
  ]);

export default function Example() {
  const [css] = useStyletron();
  return (
    <div className={css({ height: "750px" })}>
      <StyledTable
        role="grid"
        $gridTemplateColumns="minmax(400px, max-content) 200px 200px"
      >
        <div role="row" className={css({ display: "contents" })}>
          <StyledHeadCell>Column 1</StyledHeadCell>
          <StyledHeadCell>Column 2</StyledHeadCell>
          <StyledHeadCell>Column 3</StyledHeadCell>
        </div>
        {data.map((row) => {
          return (
            <div role="row" className={css({ display: "contents" })}>
              <StyledBodyCell>{row[0]}</StyledBodyCell>
              <StyledBodyCell>{row[1]}</StyledBodyCell>
              <StyledBodyCell>{row[2]}</StyledBodyCell>
            </div>
          );
        })}
      </StyledTable>
    </div>
  );
}
