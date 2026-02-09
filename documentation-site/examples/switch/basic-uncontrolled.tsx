import * as React from "react";
import { StatefulSwitch } from "baseui/switch";

export default function Example() {
  return <StatefulSwitch onChange={console.log}>click me</StatefulSwitch>;
}
