import React from "react";
import { StatefulDatepicker } from "baseui/datepicker";

export default function Example() {
  return (
    <StatefulDatepicker
      aria-label="Select a date"
      clearable={true}
      initialState={{ value: [] }}
      highlightedDate={new Date("March 10, 2019")}
      range
      separateRangeInputs
    />
  );
}
