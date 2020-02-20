import React from 'react';
import {Grid, Cell} from 'baseui/layout-grid';

export default function Scenario() {
  return (
    <Grid
      overrides={{
        StyledGrid: {
          style: ({$theme}) => ({
            background: $theme.colors.accent100,
            color: $theme.colors.accent700,
          }),
        },
        StyledCell: {
          props: {
            $span: [1, 2, 3],
          },
        },
      }}
    >
      <Cell>1</Cell>
      <Cell>2</Cell>
      <Cell>3</Cell>
      <Cell
        overrides={{
          StyledCell: {
            style: ({$theme}) => ({
              background: $theme.colors.backgroundAccent,
              color: $theme.colors.contentOnColor,
            }),
          },
        }}
      >
        4
      </Cell>
    </Grid>
  );
}
