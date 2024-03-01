import React from "react";
import { StatefulCalendar } from "baseui/datepicker";

export default function Example() {
  return (
    <StatefulCalendar
      onChange={({ date }) => console.log(date)}
      timeSelectStart
    />
  );
}
