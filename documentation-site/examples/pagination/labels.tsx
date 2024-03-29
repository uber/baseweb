import * as React from "react";
import { StatefulPagination } from "baseui/pagination";

export default function Example() {
  return (
    <StatefulPagination
      numPages={10}
      labels={{
        prevButton: "Back",
        nextButton: "Forward",
        preposition: "out of",
      }}
    />
  );
}
