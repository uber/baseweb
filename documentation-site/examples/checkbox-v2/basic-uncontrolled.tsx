import * as React from "react";
import { StatefulCheckbox } from "baseui/checkbox-v2";

export default function Example() {
  return <StatefulCheckbox onChange={console.log}>click me</StatefulCheckbox>;
}
