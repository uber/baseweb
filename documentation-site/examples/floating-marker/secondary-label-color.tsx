import * as React from "react";
import { FloatingMarker, FLOATING_MARKER_SIZES } from "baseui/map-marker";

export default function Example() {
  return (
    <FloatingMarker
      size={FLOATING_MARKER_SIZES.medium}
      label="Pickup"
      secondaryLabel="Mission Bay 3"
      overrides={{
        Label: {
          style: ({ $theme }) => ({
            color: $theme.colors.contentTertiary,
          }),
        },
      }}
    />
  );
}
