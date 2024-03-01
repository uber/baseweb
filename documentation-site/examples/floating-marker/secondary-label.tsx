import * as React from "react";
import { FloatingMarker, FLOATING_MARKER_SIZES } from "baseui/map-marker";

export default function Example() {
  return (
    <FloatingMarker
      size={FLOATING_MARKER_SIZES.large}
      label="Uber HQ"
      secondaryLabel="Mission Bay 3"
    />
  );
}
