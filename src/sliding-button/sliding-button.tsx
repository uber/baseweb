/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import ArrowRight from "../icon/arrow-right";
import Check from "../icon/check";
import { getOverrides } from "../helpers/overrides";
import { useStyletron } from "../styles";
import {
  Root as StyledRoot,
  Track as StyledTrack,
  Slider as StyledSlider,
  Label as StyledLabel,
  CompletedLabel as StyledCompletedLabel,
  Grabber as StyledGrabber,
  LoadingOverlay as StyledLoadingOverlay,
  LoadingSpinner as StyledLoadingSpinner,
} from "./styled-components";
import { BUTTON_SIZE, TAP_OFFSET, THRESHOLD_VALUES } from "./constants";
import { defaultProps } from "./default-props";

import type { SlidingButtonProps, StyleProps } from "./types";

function SlidingButtonInner(
  {
    label,
    threshold = defaultProps.threshold,
    isLoading = defaultProps.isLoading,
    isDisabled = defaultProps.isDisabled,
    onComplete,
    overrides = defaultProps.overrides,
    slideBackAfterMs,
    "aria-label": ariaLabel,
  }: SlidingButtonProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const [, theme] = useStyletron();
  const isRtl = theme.direction === "rtl";

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const dragStartRef = useRef<number>(0);
  const isDraggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const thresholdValue = THRESHOLD_VALUES[threshold];
  const isInteractive = !isDisabled && !isLoading && !isCompleted;

  // -- Pointer handlers -------------------------------------------------------

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!isInteractive) return;
      setIsDragging(true);
      isDraggingRef.current = true;
      setDragOffset(TAP_OFFSET);
      const pos = isRtl ? -e.clientX : e.clientX;
      dragStartRef.current = pos - TAP_OFFSET;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [isInteractive, isRtl],
  );

  const resetDrag = useCallback(() => {
    setIsDragging(false);
    isDraggingRef.current = false;
    if (!isCompleted) {
      setDragOffset(0);
    }
  }, [isCompleted]);

  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current || !containerRef.current || isCompleted)
        return;

      const pos = isRtl ? -e.clientX : e.clientX;
      const delta = pos - dragStartRef.current;
      if (delta <= 0) return;

      const containerWidth = containerRef.current.offsetWidth;
      const maxOffset = containerWidth - BUTTON_SIZE;
      const thresholdPixels = containerWidth * thresholdValue;

      if (delta > thresholdPixels) {
        setDragOffset(maxOffset);
        setIsCompleted(true);
        setIsDragging(false);
        isDraggingRef.current = false;
        onComplete?.();
      } else {
        setDragOffset(Math.min(delta, maxOffset));
      }
    };

    const handleGlobalPointerUp = () => {
      setIsDragging(false);
      isDraggingRef.current = false;
      if (!isCompleted) {
        setDragOffset(0);
      }
    };

    if (isDragging) {
      document.addEventListener("pointermove", handleGlobalPointerMove);
      document.addEventListener("pointerup", handleGlobalPointerUp);
      return () => {
        document.removeEventListener("pointermove", handleGlobalPointerMove);
        document.removeEventListener("pointerup", handleGlobalPointerUp);
      };
    }
  }, [isDragging, thresholdValue, isCompleted, onComplete, isRtl]);

  // -- Slide-back timer -------------------------------------------------------

  useEffect(() => {
    if (!isCompleted || slideBackAfterMs == null || slideBackAfterMs <= 0)
      return;
    const timerId = setTimeout(() => {
      setIsCompleted(false);
      setDragOffset(0);
    }, slideBackAfterMs);
    return () => clearTimeout(timerId);
  }, [isCompleted, slideBackAfterMs]);

  // -- Keyboard handler -------------------------------------------------------

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isInteractive) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsCompleted(true);
        onComplete?.();
      }
    },
    [isInteractive, onComplete],
  );

  // -- Early return -----------------------------------------------------------

  if (!label) {
    return null;
  }

  // -- Derived values ---------------------------------------------------------

  const sliderWidth = isCompleted ? "100%" : `${BUTTON_SIZE + dragOffset}px`;
  const isActuallySliding = isDragging && dragOffset > TAP_OFFSET;

  const sharedProps: StyleProps = {
    $isDisabled: isDisabled,
    $isLoading: isLoading,
    $isCompleted: isCompleted,
    $isDragging: isDragging,
    $isInteractive: isInteractive,
    $isActuallySliding: isActuallySliding,
    $dragOffset: dragOffset,
    $sliderWidth: sliderWidth,
    $isRtl: isRtl,
  };

  // -- Overrides --------------------------------------------------------------

  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Track, trackProps] = getOverrides(overrides.Track, StyledTrack);
  const [SliderEl, sliderProps] = getOverrides(overrides.Slider, StyledSlider);
  const [LabelEl, labelProps] = getOverrides(overrides.Label, StyledLabel);
  const [CompletedLabelEl, completedLabelProps] = getOverrides(
    overrides.CompletedLabel,
    StyledCompletedLabel,
  );
  const [GrabberEl, grabberProps] = getOverrides(
    overrides.Grabber,
    StyledGrabber,
  );
  const [LoadingOverlayEl, loadingOverlayProps] = getOverrides(
    overrides.LoadingOverlay,
    StyledLoadingOverlay,
  );
  const [LoadingSpinnerEl, loadingSpinnerProps] = getOverrides(
    overrides.LoadingSpinner,
    StyledLoadingSpinner,
  );

  // -- Aria -------------------------------------------------------------------

  const ariaProps: Record<string, string | boolean | undefined> = {
    "aria-label": ariaLabel || label,
  };
  if (isLoading) {
    ariaProps["aria-busy"] = true;
    ariaProps["aria-live"] = "polite";
  }
  if (isDisabled) {
    ariaProps["aria-disabled"] = true;
  }

  // -- Render -----------------------------------------------------------------

  return (
    <Root
      ref={ref}
      data-baseweb="sliding-button"
      tabIndex={0}
      role="button"
      onKeyDown={handleKeyDown}
      {...ariaProps}
      {...sharedProps}
      {...rootProps}
    >
      <Track ref={containerRef} {...sharedProps} {...trackProps}>
        {isLoading && (
          <LoadingOverlayEl {...sharedProps} {...loadingOverlayProps}>
            <LoadingSpinnerEl {...sharedProps} {...loadingSpinnerProps} />
          </LoadingOverlayEl>
        )}

        {!isLoading && (
          <>
            <LabelEl {...sharedProps} {...labelProps}>
              {label}
            </LabelEl>

            <SliderEl {...sharedProps} {...sliderProps}>
              {isCompleted && (
                <CompletedLabelEl {...sharedProps} {...completedLabelProps}>
                  {label}
                </CompletedLabelEl>
              )}

              <GrabberEl
                data-baseweb="sliding-button-grabber"
                onPointerDown={handlePointerDown}
                onPointerUp={resetDrag}
                onPointerCancel={resetDrag}
                {...sharedProps}
                {...grabberProps}
              >
                <ArrowIcon isCompleted={isCompleted} />
              </GrabberEl>
            </SliderEl>
          </>
        )}
      </Track>
    </Root>
  );
}

function ArrowIcon({ isCompleted }: { isCompleted: boolean }) {
  if (isCompleted) {
    return <Check title="" size="24px" />;
  }
  return <ArrowRight title="" size="24px" />;
}

const SlidingButton = React.forwardRef<HTMLDivElement, SlidingButtonProps>(
  SlidingButtonInner,
);
SlidingButton.displayName = "SlidingButton";
export default SlidingButton;
