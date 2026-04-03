import * as React from "react";
import { ProgressBar, INTENT } from "baseui/progress-bar";

export default function Example() {
  return (
    <>
      <ProgressBar value={50} showLabel intent={INTENT.positive} />
      <br />
      <ProgressBar value={50} showLabel intent={INTENT.warning} />
      <br />
      <ProgressBar value={50} showLabel intent={INTENT.negative} />
      <br />
      <ProgressBar value={50} showLabel intent={INTENT.brand} />
      <br />
      <ProgressBar infinite showLabel intent={INTENT.positive} />
    </>
  );
}
