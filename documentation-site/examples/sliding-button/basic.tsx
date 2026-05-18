/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from "react";
import { SlidingButton } from "baseui/sliding-button";

export default function Example() {
  return (
    <SlidingButton
      label="Slide to confirm"
      onComplete={() => {
        // eslint-disable-next-line no-console
        console.log("Completed!");
      }}
    />
  );
}
