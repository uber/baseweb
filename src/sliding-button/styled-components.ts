/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from "../styles";
import { TAP_OFFSET } from "./constants";
import type { StyleProps } from "./types";

export const Root = styled<"div", StyleProps>("div", ({ $theme }) => ({
  width: "100%",
  borderTopLeftRadius: $theme.borders.radius300,
  borderTopRightRadius: $theme.borders.radius300,
  borderBottomLeftRadius: $theme.borders.radius300,
  borderBottomRightRadius: $theme.borders.radius300,
  ":focus": { outline: "none" },
  ":focus-visible": {
    outline: `3px solid ${$theme.colors.borderAccent}`,
    outlineOffset: "0px",
  },
}));
Root.displayName = "Root";

export const Track = styled<"div", StyleProps>(
  "div",
  ({ $theme, $isDisabled }) => ({
    position: "relative" as const,
    backgroundColor: $isDisabled
      ? $theme.colors.backgroundStateDisabled
      : $theme.colors.backgroundTertiary,
    borderTopLeftRadius: $theme.borders.radius300,
    borderTopRightRadius: $theme.borders.radius300,
    borderBottomLeftRadius: $theme.borders.radius300,
    borderBottomRightRadius: $theme.borders.radius300,
    height: $theme.sizing.scale1400,
    overflow: "hidden" as const,
    userSelect: "none" as const,
    touchAction: "none" as const,
  }),
);
Track.displayName = "Track";

export const LoadingOverlay = styled<"div", StyleProps>(
  "div",
  ({ $theme }) => ({
    position: "absolute" as const,
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: $theme.colors.backgroundInversePrimary,
    borderTopLeftRadius: $theme.borders.radius300,
    borderTopRightRadius: $theme.borders.radius300,
    borderBottomLeftRadius: $theme.borders.radius300,
    borderBottomRightRadius: $theme.borders.radius300,
  }),
);
LoadingOverlay.displayName = "LoadingOverlay";

export const LoadingSpinner = styled<"div", StyleProps>(
  "div",
  ({ $theme }) => ({
    width: $theme.sizing.scale700,
    height: $theme.sizing.scale700,
    borderTopLeftRadius: "50%",
    borderTopRightRadius: "50%",
    borderBottomLeftRadius: "50%",
    borderBottomRightRadius: "50%",
    borderLeftWidth: $theme.sizing.scale0,
    borderTopWidth: $theme.sizing.scale0,
    borderRightWidth: $theme.sizing.scale0,
    borderBottomWidth: $theme.sizing.scale0,
    borderLeftStyle: "solid" as const,
    borderTopStyle: "solid" as const,
    borderRightStyle: "solid" as const,
    borderBottomStyle: "solid" as const,
    borderLeftColor: $theme.colors.borderInverseOpaque,
    borderRightColor: $theme.colors.borderInverseOpaque,
    borderBottomColor: $theme.colors.borderInverseOpaque,
    borderTopColor: $theme.colors.contentInversePrimary,
    boxSizing: "border-box" as const,
    animationName: {
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(360deg)" },
    },
    animationDuration: "0.75s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  }),
);
LoadingSpinner.displayName = "LoadingSpinner";

export const Label = styled<"div", StyleProps>(
  "div",
  ({ $theme, $isDisabled, $isActuallySliding, $isCompleted, $isRtl }) => {
    const startProperty = $isRtl ? "right" : "left";
    const endProperty = $isRtl ? "left" : "right";
    return {
      position: "absolute" as const,
      top: "0",
      [startProperty]: $theme.sizing.scale1400,
      [endProperty]: "0",
      bottom: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color:
        $isDisabled || $isActuallySliding
          ? $theme.colors.contentStateDisabled
          : $theme.colors.contentPrimary,
      opacity: $isCompleted ? 0 : 1,
      transitionProperty: "opacity, color",
      transitionDuration: $theme.animation.timing200,
      transitionTimingFunction: "ease-out",
      pointerEvents: "none" as const,
      ...$theme.typography.LabelLarge,
      fontWeight: 500,
    };
  },
);
Label.displayName = "Label";

export const Slider = styled<"div", StyleProps>(
  "div",
  ({
    $theme,
    $isDisabled,
    $isDragging,
    $dragOffset,
    $sliderWidth,
    $isCompleted,
    $isRtl,
  }) => {
    const startProperty = $isRtl ? "right" : "left";
    const endAlign = $isRtl ? "flex-start" : "flex-end";
    const paddingEnd = $isRtl ? "paddingLeft" : "paddingRight";
    const suppressTransition = $isDragging && $dragOffset !== TAP_OFFSET;
    return {
      position: "absolute" as const,
      top: "0",
      [startProperty]: "0",
      bottom: "0",
      width: $sliderWidth,
      backgroundColor: $isDisabled
        ? $theme.colors.backgroundStateDisabled
        : $theme.colors.backgroundInversePrimary,
      borderTopLeftRadius: $theme.borders.radius300,
      borderTopRightRadius: $theme.borders.radius300,
      borderBottomLeftRadius: $theme.borders.radius300,
      borderBottomRightRadius: $theme.borders.radius300,
      display: "flex",
      alignItems: "center",
      justifyContent: endAlign,
      [paddingEnd]: $isCompleted ? $theme.sizing.scale600 : "0",
      overflow: "hidden" as const,
      ...(suppressTransition
        ? { transition: "none" }
        : {
            transitionProperty: "width",
            transitionDuration: $theme.animation.timing200,
            transitionTimingFunction: "ease-out",
          }),
    };
  },
);
Slider.displayName = "Slider";

export const CompletedLabel = styled<"div", StyleProps>(
  "div",
  ({ $theme, $isDisabled }) => ({
    position: "absolute" as const,
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: $isDisabled
      ? $theme.colors.contentStateDisabled
      : $theme.colors.contentInversePrimary,
    pointerEvents: "none" as const,
    ...$theme.typography.LabelLarge,
    fontWeight: 500,
  }),
);
CompletedLabel.displayName = "CompletedLabel";

export const Grabber = styled<"div", StyleProps>(
  "div",
  ({ $theme, $isDisabled, $isInteractive }) => ({
    width: $theme.sizing.scale1400,
    height: $theme.sizing.scale1400,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: $isDisabled
      ? $theme.colors.contentStateDisabled
      : $theme.colors.contentInversePrimary,
    cursor: $isInteractive ? "grab" : "default",
    touchAction: "none" as const,
  }),
);
Grabber.displayName = "Grabber";
