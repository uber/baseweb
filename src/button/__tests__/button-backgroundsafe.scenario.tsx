/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { styled } from '../../';

import { Button, KIND } from '../';

const GridContainer = styled('div', ({ $theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(120px, 1fr) repeat(5, minmax(180px, 1fr))',
  gap: $theme.sizing.scale500,
  alignItems: 'center',
  padding: $theme.sizing.scale400,
}));

const HeaderCell = styled('div', ({ $theme }) => ({
  ...$theme.typography.LabelMedium,
  fontWeight: 600,
  padding: $theme.sizing.scale300,
  textAlign: 'center',
  color: $theme.colors.contentPrimary,
}));

const KindCell = styled('div', ({ $theme }) => ({
  ...$theme.typography.LabelMedium,
  padding: $theme.sizing.scale300,
  textAlign: 'left',
  color: $theme.colors.contentPrimary,
}));

const ButtonCell = styled('div', ({ $theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: $theme.sizing.scale300,
  color: $theme.colors.contentPrimary,
  minHeight: '60px', // Ensures consistent row height regardless of button size
}));

export function Scenario() {
  return (
    <GridContainer>
      {/* Header Row */}
      <HeaderCell>Kind</HeaderCell>
      <HeaderCell>Default (Enabled, Hovered, Pressed)</HeaderCell>
      <HeaderCell>Selected</HeaderCell>
      <HeaderCell>Loading</HeaderCell>
      <HeaderCell>Disabled</HeaderCell>
      <HeaderCell>Disabled Loading</HeaderCell>

      {/* Button Rows */}
      {Object.values(KIND).map((kind) => {
        return (
          <React.Fragment key={kind}>
            <KindCell>{kind}</KindCell>
            <ButtonCell>
              <Button kind={kind} backgroundSafe>
                Move
              </Button>
            </ButtonCell>
            <ButtonCell>
              <Button kind={kind} isSelected backgroundSafe>
                Move
              </Button>
            </ButtonCell>
            <ButtonCell>
              <Button kind={kind} isLoading backgroundSafe>
                Move
              </Button>
            </ButtonCell>
            <ButtonCell>
              <Button kind={kind} disabled backgroundSafe>
                Move
              </Button>
            </ButtonCell>
            <ButtonCell>
              <Button kind={kind} disabled isLoading backgroundSafe>
                Move
              </Button>
            </ButtonCell>
          </React.Fragment>
        );
      })}
    </GridContainer>
  );
}
