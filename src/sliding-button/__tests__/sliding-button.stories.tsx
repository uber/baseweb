/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from "react";
import { Scenario as SlidingButtonDefault } from "./sliding-button.scenario";
import { Scenario as SlidingButtonStates } from "./sliding-button-states.scenario";
import { Scenario as SlidingButtonLowThreshold } from "./sliding-button-low-threshold.scenario";

export const Default = () => <SlidingButtonDefault />;
export const States = () => <SlidingButtonStates />;
export const LowThreshold = () => <SlidingButtonLowThreshold />;

export default {
  meta: {
    runtimeErrorsAllowed: true,
  },
};
