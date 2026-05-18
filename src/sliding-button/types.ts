/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { Override } from "../helpers/overrides";
import type { THRESHOLD } from "./constants";

export type SlidingButtonOverrides = {
  Root?: Override;
  Track?: Override;
  Slider?: Override;
  Label?: Override;
  CompletedLabel?: Override;
  Grabber?: Override;
  LoadingOverlay?: Override;
  LoadingSpinner?: Override;
};

export type SlidingButtonProps = {
  /** Text displayed in the button track. */
  label: string;
  /** Completion threshold — 'high' requires 80% drag, 'low' requires 20%. */
  threshold?: keyof typeof THRESHOLD;
  /** Shows loading spinner, disables interaction. */
  isLoading?: boolean;
  /** Grays out the component, disables interaction. */
  isDisabled?: boolean;
  /** Called once when the user drags past the threshold. */
  onComplete?: () => void;
  /** Auto-reset to idle state after N milliseconds. */
  slideBackAfterMs?: number;
  /** Override internal elements. */
  overrides?: SlidingButtonOverrides;
  /** Accessible label — recommended to omit "Slide" for screen readers. */
  "aria-label"?: string;
};

export type StyleProps = {
  $isDisabled?: boolean;
  $isLoading?: boolean;
  $isCompleted?: boolean;
  $isDragging?: boolean;
  $isInteractive?: boolean;
  $isActuallySliding?: boolean;
  $dragOffset?: number;
  $sliderWidth?: string;
  $isRtl?: boolean;
};
