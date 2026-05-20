/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

export const THRESHOLD = {
  low: "low",
  high: "high",
} as const;

export const THRESHOLD_VALUES: Record<
  (typeof THRESHOLD)[keyof typeof THRESHOLD],
  number
> = {
  low: 0.2,
  high: 0.8,
};

const GRABBER_ICON_SIZE_PX = 24;
const GRABBER_PADDING_PX = 16;

export const BUTTON_SIZE = GRABBER_ICON_SIZE_PX + GRABBER_PADDING_PX * 2; // 56
export const TAP_OFFSET = GRABBER_PADDING_PX; // 16
