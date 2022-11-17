// @flow
import * as React from 'react';
import {FloatingRouteMarker} from 'baseui/map-marker';
import {styled} from 'baseui';

const Container = styled<{}>('div', () => ({
  height: `${128}px`,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  padding: `${16}px`,
}));

const Cell = styled<{}>('div', () => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function Example() {
  return (
    <Container>
      <Cell>
        <FloatingRouteMarker
          label="I'm unselected!"
          secondaryLabel="Avoids tolls"
          overrides={{
            Root: {
              style: ({$theme}) => ({
                backgroundColor: $theme.colors.warning200,
              }),
            },
            Pointer: {
              style: ({$theme}) => ({
                fill: $theme.colors.warning200,
              }),
            },
            Label: {
              style: ({$theme}) => ({
                color: $theme.colors.contentNegative,
              }),
            },
          }}
        />
      </Cell>
      <Cell>
        <FloatingRouteMarker
          label="I'm selected!"
          secondaryLabel="Secondary label with a custom color"
          selected={true}
          overrides={{
            Root: {
              style: ({$theme}) => ({
                backgroundColor: $theme.colors.backgroundAccent,
              }),
            },
            Pointer: {
              style: ({$theme}) => ({
                fill: $theme.colors.backgroundAccent,
              }),
            },
            SecondaryLabel: {
              style: ({$theme}) => ({
                color: $theme.colors.contentOnColor,
              }),
            },
          }}
        />
      </Cell>
    </Container>
  );
}
