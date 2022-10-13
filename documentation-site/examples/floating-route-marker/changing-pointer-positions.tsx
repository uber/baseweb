import * as React from 'react';
import {
  FloatingRouteMarker,
  FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS,
  calculateFloatingRouteMarkerOffsets,
} from 'baseui/map-marker';
import {styled} from 'baseui';

const Container = styled<{}>('div', () => ({
  height: `${200}px`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Center = styled<{}>('div', () => ({
  position: 'absolute',
}));

const anchors = Object.values(
  FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS,
);

export default function Example() {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    setInterval(() => {
      setIndex((t) => {
        if (t >= anchors.length - 1) {
          return 0;
        } else {
          return t + 1;
        }
      });
    }, 3000);
  }, []);

  return (
    <Container>
      <Center>
        <FloatingRouteMarker
          label={`${anchors[index]}`}
          secondaryLabel="I change every 3 sec"
          anchorPosition={anchors[index]}
          overrides={{
            Root: {
              style: () => ({
                transform: calculateFloatingRouteMarkerOffsets(
                  anchors[index],
                ),
              }),
            },
          }}
        />
      </Center>
    </Container>
  );
}
