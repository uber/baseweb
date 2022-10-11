import * as React from 'react';
import {
  FloatingRouteMarker,
  FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS,
} from 'baseui/map-marker';
import {styled} from 'baseui';

const Container = styled('div', () => ({
  height: `${128}px`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
      <FloatingRouteMarker
        label={anchors[index]}
        secondaryLabel="I change every 3 sec"
        anchorPosition={anchors[index]}
      />
    </Container>
  );
}
