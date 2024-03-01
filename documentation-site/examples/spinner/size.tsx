import * as React from "react";
import { Spinner, SIZE } from "baseui/spinner";

export default function Example() {
  return (
    <React.Fragment>
      <Spinner $size={SIZE.small} />
      <Spinner $size={SIZE.medium} /> {/* Default */}
      <Spinner $size={SIZE.large} />
    </React.Fragment>
  );
}
