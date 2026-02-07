import type { Theme } from '../styles';

export const getFocusOutlineStyle = (theme: Theme) => {
  const { colors, sizing } = theme;
  return {
    // 2px for the outline and 2px for the outline offset(Accessible 4px focus ring)
    outline: `${sizing.scale0} solid ${colors.brandBorderAccessible}`,
    outlineOffset: sizing.scale0,
  };
};

// Get overlay (for example, backplate background) color based on disabled and error states
// Used in Checkbox, Radio, and Switch components Or any other component that requires an overlay(for example, backplate) for hovering and pressing states
export const getOverlayColor = ({
  $theme,
  $disabled,
  $error,
}: {
  $theme: Theme;
  $disabled: boolean;
  $error: boolean;
}) => {
  const { colors } = $theme;
  const hoveredColor = $disabled
    ? 'transparent'
    : $error
    ? colors.hoverNegativeAlpha
    : colors.hoverOverlayAlpha;
  const pressedColor = $disabled
    ? 'transparent'
    : $error
    ? colors.pressedNegativeAlpha
    : colors.pressedOverlayAlpha;

  return {
    hoveredColor,
    pressedColor,
  };
};
