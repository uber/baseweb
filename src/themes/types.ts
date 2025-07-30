/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// eslint-disable-next-line import/no-unresolved
import type { Properties } from 'csstype';

import type { Responsive, CSSLengthUnit } from '../layout-grid';

export type Globals = '-moz-initial' | 'inherit' | 'initial' | 'revert' | 'unset';
export type LineStyle =
  | 'dashed'
  | 'dotted'
  | 'double'
  | 'groove'
  | 'hidden'
  | 'inset'
  | 'none'
  | 'outset'
  | 'ridge'
  | 'solid';

export type FoundationColors = {
  // Primary Palette
  primaryA: string;
  primaryB: string;
  /** @deprecated Use semantic tokens instead. */
  primary: string;
  /** @deprecated Use semantic tokens instead. */
  primary50: string;
  /** @deprecated Use semantic tokens instead. */
  primary100: string;
  /** @deprecated Use semantic tokens instead. */
  primary200: string;
  /** @deprecated Use semantic tokens instead. */
  primary300: string;
  /** @deprecated Use semantic tokens instead. */
  primary400: string;
  /** @deprecated Use semantic tokens instead. */
  primary500: string;
  /** @deprecated Use semantic tokens instead. */
  primary600: string;
  /** @deprecated Use semantic tokens instead. */
  primary700: string;

  // Accent Palette
  accent: string;
  /** @deprecated Use semantic tokens instead. */
  accent50: string;
  /** @deprecated Use semantic tokens instead. */
  accent100: string;
  /** @deprecated Use semantic tokens instead. */
  accent200: string;
  /** @deprecated Use semantic tokens instead. */
  accent300: string;
  /** @deprecated Use semantic tokens instead. */
  accent400: string;
  /** @deprecated Use semantic tokens instead. */
  accent500: string;
  /** @deprecated Use semantic tokens instead. */
  accent600: string;
  /** @deprecated Use semantic tokens instead. */
  accent700: string;

  // Alert Palette
  negative: string;
  negative50: string;
  /** @deprecated Use semantic tokens instead. */
  negative100: string;
  /** @deprecated Use semantic tokens instead. */
  negative200: string;
  /** @deprecated Use semantic tokens instead. */
  negative300: string;
  /** @deprecated Use semantic tokens instead. */
  negative400: string;
  /** @deprecated Use semantic tokens instead. */
  negative500: string;
  /** @deprecated Use semantic tokens instead. */
  negative600: string;
  /** @deprecated Use semantic tokens instead. */
  negative700: string;

  // Warning Palette
  warning: string;
  /** @deprecated Use semantic tokens instead. */
  warning50: string;
  /** @deprecated Use semantic tokens instead. */
  warning100: string;
  /** @deprecated Use semantic tokens instead. */
  warning200: string;
  /** @deprecated Use semantic tokens instead. */
  warning300: string;
  /** @deprecated Use semantic tokens instead. */
  warning400: string;
  /** @deprecated Use semantic tokens instead. */
  warning500: string;
  /** @deprecated Use semantic tokens instead. */
  warning600: string;
  /** @deprecated Use semantic tokens instead. */
  warning700: string;

  // Success Palette
  positive: string;
  /** @deprecated Use semantic tokens instead. */
  positive50: string;
  /** @deprecated Use semantic tokens instead. */
  positive100: string;
  /** @deprecated Use semantic tokens instead. */
  positive200: string;
  /** @deprecated Use semantic tokens instead. */
  positive300: string;
  /** @deprecated Use semantic tokens instead. */
  positive400: string;
  /** @deprecated Use semantic tokens instead. */
  positive500: string;
  /** @deprecated Use semantic tokens instead. */
  positive600: string;
  /** @deprecated Use semantic tokens instead. */
  positive700: string;

  // Monochrome Palette
  /** @deprecated Use semantic tokens instead. */
  white: string;
  /** @deprecated Use semantic tokens instead. */
  black: string;
  /** @deprecated Use semantic tokens instead. */
  mono100: string;
  /** @deprecated Use semantic tokens instead. */
  mono200: string;
  /** @deprecated Use semantic tokens instead. */
  mono300: string;
  /** @deprecated Use semantic tokens instead. */
  mono400: string;
  /** @deprecated Use semantic tokens instead. */
  mono500: string;
  /** @deprecated Use semantic tokens instead. */
  mono600: string;
  /** @deprecated Use semantic tokens instead. */
  mono700: string;
  /** @deprecated Use semantic tokens instead. */
  mono800: string;
  /** @deprecated Use semantic tokens instead. */
  mono900: string;
  /** @deprecated Use semantic tokens instead. */
  mono1000: string;
};

export type CoreSemanticColors = {
  // Background
  backgroundPrimary: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  backgroundInversePrimary: string;
  backgroundInverseSecondary: string;
  // Content
  contentPrimary: string;
  contentSecondary: string;
  contentTertiary: string;
  contentInversePrimary: string;
  contentInverseSecondary: string;
  contentInverseTertiary: string;
  // Border
  borderOpaque: string;
  borderTransparent: string;
  borderSelected: string;
  borderInverseOpaque: string;
  borderInverseTransparent: string;
  borderInverseSelected: string;
  // Brand theme colors
  brandBackgroundPrimary: string;
  brandBackgroundSecondary: string;
  brandBackgroundDisabled: string;
  brandContentPrimary: string;
  brandContentOnPrimary: string;
  brandContentOnSecondary: string;
  brandContentDisabled: string;
  brandBorderAccessible: string;
  brandBorderSubtle: string;
};
export type CoreExtensionSemanticColors = {
  // Backgrounds
  backgroundStateDisabled: string;
  backgroundOverlay: string;
  backgroundOverlayArt: string;
  backgroundAccent: string;
  backgroundNegative: string;
  backgroundWarning: string;
  backgroundPositive: string;
  backgroundAccentLight: string;
  backgroundPositiveLight: string;
  backgroundNegativeLight: string;
  backgroundWarningLight: string;
  backgroundAlwaysDark: string;
  backgroundAlwaysLight: string;
  // Content
  contentStateDisabled: string;
  contentAccent: string;
  contentOnColor: string;
  contentOnColorInverse: string;
  contentNegative: string;
  contentWarning: string;
  contentPositive: string;
  // Border
  borderStateDisabled: string;
  borderAccent: string;
  borderAccentLight: string;
  borderNegative: string;
  borderWarning: string;
  borderPositive: string;
  borderNegativeLight: string;
  borderWarningLight: string;
  borderPositiveLight: string;
  // Programs
  safety: string;
  eatsGreen400: string;
  freightBlue400: string;
  rewardsTier1: string;
  rewardsTier2: string;
  rewardsTier3: string;
  rewardsTier4: string;
  membership: string;
};

export type DeprecatedSemanticColors = {
  /** @deprecated this color token is deprecated */
  jumpRed400: string;
  /** @deprecated this color token is deprecated */
  backgroundOverlayLight: string;
  /** @deprecated this color token is deprecated */
  backgroundOverlayDark: string;
  /** @deprecated this color token is deprecated */
  backgroundLightAccent: string;
  /** @deprecated this color token is deprecated */
  backgroundLightPositive: string;
  /** @deprecated this color token is deprecated */
  backgroundLightWarning: string;
  /** @deprecated this color token is deprecated */
  backgroundLightNegative: string;
};

export type SemanticColors = {} & CoreSemanticColors &
  CoreExtensionSemanticColors &
  DeprecatedSemanticColors;

export type ComponentColors = {
  //Banner
  bannerActionLowInfo: string;
  bannerActionLowNegative: string;
  bannerActionLowPositive: string;
  bannerActionLowWarning: string;
  bannerActionHighInfo: string;
  bannerActionHighNegative: string;
  bannerActionHighPositive: string;
  bannerActionHighWarning: string;
  // BottomNavigation
  bottomNavigationText: string;
  bottomNavigationSelectedText: string;
  // Buttons
  buttonPrimaryFill: string;
  buttonPrimaryText: string;
  buttonPrimaryHover: string;
  buttonPrimaryActive: string;
  buttonPrimarySelectedText: string;
  buttonPrimarySelectedFill: string;
  buttonPrimarySpinnerForeground: string;
  buttonPrimarySpinnerBackground: string;
  buttonSecondaryFill: string;
  buttonSecondaryText: string;
  buttonSecondaryHover: string;
  buttonSecondaryActive: string;
  buttonSecondarySelectedText: string;
  buttonSecondarySelectedFill: string;
  buttonSecondarySpinnerForeground: string;
  buttonSecondarySpinnerBackground: string;
  buttonTertiaryFill: string;
  buttonTertiaryText: string;
  buttonTertiaryHover: string;
  buttonTertiaryActive: string;
  buttonTertiarySelectedText: string;
  buttonTertiarySelectedFill: string;
  buttonTertiaryDisabledActiveFill: string;
  buttonTertiaryDisabledActiveText: string;
  buttonTertiarySpinnerForeground: string;
  buttonTertiarySpinnerBackground: string;
  buttonDisabledFill: string;
  buttonDisabledText: string;
  buttonDisabledActiveFill: string;
  buttonDisabledActiveText: string;
  buttonDisabledSpinnerForeground: string;
  buttonDisabledSpinnerBackground: string;
  // Breadcrumbs
  breadcrumbsText: string;
  breadcrumbsSeparatorFill: string;
  // Datepicker
  calendarBackground: string;
  calendarForeground: string;
  calendarForegroundDisabled: string;
  calendarHeaderBackground: string;
  calendarHeaderForeground: string;
  calendarHeaderBackgroundActive: string;
  calendarHeaderForegroundDisabled: string;
  calendarDayForegroundPseudoSelected: string;
  calendarDayBackgroundPseudoSelectedHighlighted: string;
  calendarDayForegroundPseudoSelectedHighlighted: string;
  calendarDayBackgroundSelected: string;
  calendarDayForegroundSelected: string;
  calendarDayBackgroundSelectedHighlighted: string;
  calendarDayForegroundSelectedHighlighted: string;
  // Combobox
  comboboxListItemFocus: string;
  comboboxListItemHover: string;
  // FileUploader
  fileUploaderBackgroundColor: string;
  fileUploaderBackgroundColorActive: string;
  fileUploaderBorderColorActive: string;
  fileUploaderBorderColorDefault: string;
  fileUploaderMessageColor: string;
  // Links
  linkText: string;
  linkVisited: string;
  linkHover: string;
  linkActive: string;
  // Lists
  listHeaderFill: string;
  listBodyFill: string;
  // ProgressSteps
  progressStepsCompletedText: string;
  progressStepsCompletedFill: string;
  progressStepsActiveText: string;
  progressStepsActiveFill: string;
  // Toggle
  toggleFill: string;
  toggleFillChecked: string;
  toggleFillDisabled: string;
  toggleTrackFill: string;
  toggleTrackFillDisabled: string;
  // Ticks
  tickFill: string;
  tickFillHover: string;
  tickFillActive: string;
  tickFillSelected: string;
  tickFillSelectedHover: string;
  tickFillSelectedHoverActive: string;
  tickFillError: string;
  tickFillErrorHover: string;
  tickFillErrorHoverActive: string;
  tickFillErrorSelected: string;
  tickFillErrorSelectedHover: string;
  tickFillErrorSelectedHoverActive: string;
  tickFillDisabled: string;
  tickBorder: string;
  tickBorderError: string;
  tickMarkFill: string;
  tickMarkFillDisabled: string;
  tickMarkFillError: string;
  // Slider/Toggle
  sliderTrackFill: string;
  sliderTrackFillHover: string;
  sliderTrackFillActive: string;
  sliderTrackFillDisabled: string;
  sliderHandleFill: string;
  sliderHandleFillDisabled: string;
  sliderHandleInnerFill: string;
  sliderHandleInnerFillDisabled: string;
  sliderHandleInnerFillSelectedHover: string;
  sliderHandleInnerFillSelectedActive: string;
  // Input
  inputBorder: string;
  inputFill: string;
  inputFillError: string;
  inputFillDisabled: string;
  inputFillActive: string;
  inputFillPositive: string;
  inputTextDisabled: string;
  inputBorderError: string;
  inputBorderPositive: string;
  inputEnhancerFill: string;
  inputEnhancerFillDisabled: string;
  inputEnhancerTextDisabled: string;
  inputPlaceholder: string;
  inputPlaceholderDisabled: string;
  // Notification
  notificationInfoBackground: string;
  notificationInfoText: string;
  notificationPositiveBackground: string;
  notificationPositiveText: string;
  notificationWarningBackground: string;
  notificationWarningText: string;
  notificationNegativeBackground: string;
  notificationNegativeText: string;
  // Menu
  menuFill: string;
  menuFillHover: string;
  menuFontDefault: string;
  menuFontDisabled: string;
  menuFontHighlighted: string;
  menuFontSelected: string;
  // Modal
  modalCloseColor: string;
  modalCloseColorHover: string;
  modalCloseColorFocus: string;
  // Tab
  tabBarFill: string;
  tabColor: string;
  // Tag
  tagSolidRampUnit: string;
  tagSolidHoverRampUnit: string;
  tagSolidActiveRampUnit: string;
  tagSolidDisabledRampUnit: string;
  tagSolidFontRampUnit: string;
  tagSolidFontHoverRampUnit: string;
  tagLightRampUnit: string;
  tagLightHoverRampUnit: string;
  tagLightActiveRampUnit: string;
  tagLightFontRampUnit: string;
  tagLightFontHoverRampUnit: string;
  tagOutlinedRampUnit: string;
  tagOutlinedHoverRampUnit: string;
  tagOutlinedActiveRampUnit: string;
  tagOutlinedFontRampUnit: string;
  tagOutlinedFontHoverRampUnit: string;
  tagFontDisabledRampUnit: string;
  tagNeutralSolidBackground: string;
  tagNeutralSolidHover: string;
  tagNeutralSolidActive: string;
  tagNeutralSolidDisabled: string;
  tagNeutralSolidFont: string;
  tagNeutralSolidFontHover: string;
  tagNeutralLightBackground: string;
  tagNeutralLightHover: string;
  tagNeutralLightActive: string;
  tagNeutralLightDisabled: string;
  tagNeutralLightFont: string;
  tagNeutralLightFontHover: string;
  tagNeutralOutlinedBackground: string;
  tagNeutralOutlinedHover: string;
  tagNeutralOutlinedActive: string;
  tagNeutralOutlinedDisabled: string;
  tagNeutralOutlinedFont: string;
  tagNeutralOutlinedFontHover: string;
  tagNeutralFontDisabled: string;
  tagPrimarySolidBackground: string;
  tagPrimarySolidHover: string;
  tagPrimarySolidActive: string;
  tagPrimarySolidDisabled: string;
  tagPrimarySolidFont: string;
  tagPrimarySolidFontHover: string;
  tagPrimaryLightBackground: string;
  tagPrimaryLightHover: string;
  tagPrimaryLightActive: string;
  tagPrimaryLightDisabled: string;
  tagPrimaryLightFont: string;
  tagPrimaryLightFontHover: string;
  tagPrimaryOutlinedBackground: string;
  tagPrimaryOutlinedHover: string;
  tagPrimaryOutlinedActive: string;
  tagPrimaryOutlinedDisabled: string;
  tagPrimaryOutlinedFont: string;
  tagPrimaryOutlinedFontHover: string;
  tagPrimaryFontDisabled: string;
  tagAccentSolidBackground: string;
  tagAccentSolidHover: string;
  tagAccentSolidActive: string;
  tagAccentSolidDisabled: string;
  tagAccentSolidFont: string;
  tagAccentSolidFontHover: string;
  tagAccentLightBackground: string;
  tagAccentLightHover: string;
  tagAccentLightActive: string;
  tagAccentLightDisabled: string;
  tagAccentLightFont: string;
  tagAccentLightFontHover: string;
  tagAccentOutlinedBackground: string;
  tagAccentOutlinedHover: string;
  tagAccentOutlinedActive: string;
  tagAccentOutlinedDisabled: string;
  tagAccentOutlinedFont: string;
  tagAccentOutlinedFontHover: string;
  tagAccentFontDisabled: string;
  tagPositiveSolidBackground: string;
  tagPositiveSolidHover: string;
  tagPositiveSolidActive: string;
  tagPositiveSolidDisabled: string;
  tagPositiveSolidFont: string;
  tagPositiveSolidFontHover: string;
  tagPositiveLightBackground: string;
  tagPositiveLightHover: string;
  tagPositiveLightActive: string;
  tagPositiveLightDisabled: string;
  tagPositiveLightFont: string;
  tagPositiveLightFontHover: string;
  tagPositiveOutlinedBackground: string;
  tagPositiveOutlinedHover: string;
  tagPositiveOutlinedActive: string;
  tagPositiveOutlinedDisabled: string;
  tagPositiveOutlinedFont: string;
  tagPositiveOutlinedFontHover: string;
  tagPositiveFontDisabled: string;
  tagWarningSolidBackground: string;
  tagWarningSolidHover: string;
  tagWarningSolidActive: string;
  tagWarningSolidDisabled: string;
  tagWarningSolidFont: string;
  tagWarningSolidFontHover: string;
  tagWarningLightBackground: string;
  tagWarningLightHover: string;
  tagWarningLightActive: string;
  tagWarningLightDisabled: string;
  tagWarningLightFont: string;
  tagWarningLightFontHover: string;
  tagWarningOutlinedBackground: string;
  tagWarningOutlinedHover: string;
  tagWarningOutlinedActive: string;
  tagWarningOutlinedDisabled: string;
  tagWarningOutlinedFont: string;
  tagWarningOutlinedFontHover: string;
  tagWarningFontDisabled: string;
  tagNegativeSolidBackground: string;
  tagNegativeSolidHover: string;
  tagNegativeSolidActive: string;
  tagNegativeSolidDisabled: string;
  tagNegativeSolidFont: string;
  tagNegativeSolidFontHover: string;
  tagNegativeLightBackground: string;
  tagNegativeLightHover: string;
  tagNegativeLightActive: string;
  tagNegativeLightDisabled: string;
  tagNegativeLightFont: string;
  tagNegativeLightFontHover: string;
  tagNegativeOutlinedBackground: string;
  tagNegativeOutlinedHover: string;
  tagNegativeOutlinedActive: string;
  tagNegativeOutlinedDisabled: string;
  tagNegativeOutlinedFont: string;
  tagNegativeOutlinedFontHover: string;
  tagNegativeFontDisabled: string;
  // Table
  tableHeadBackgroundColor: string;
  tableBackground: string;
  tableStripedBackground: string;
  tableFilter: string;
  tableFilterHeading: string;
  tableFilterBackground: string;
  tableFilterFooterBackground: string;
  // Toast
  toastText: string;
  toastPrimaryText: string;
  toastInfoBackground: string;
  toastInfoText: string;
  toastPositiveBackground: string;
  toastPositiveText: string;
  toastWarningBackground: string;
  toastWarningText: string;
  toastNegativeBackground: string;
  toastNegativeText: string;
  // Spinner
  spinnerTrackFill: string;
  // Progress bar
  progressbarTrackFill: string;
  // Tooltip
  tooltipBackground: string;
  tooltipText: string;
  // Rating
  ratingInactiveFill: string;
  ratingStroke: string;
};

export type FontTokens = {
  primaryFontFamily: string;
  secondaryFontFamily: string;
  monoFontFamily: string;
};

// TODO(#2318) Deprecate in the next major version
export type Primitives = {} & FoundationColors & FontTokens;

export type Font = {
  fontFamily: string;
  fontWeight: Globals | 'bold' | 'normal' | 'bolder' | 'lighter' | number;
  fontSize: string;
  lineHeight: string | number;
};
export type Typography = {
  font100: Font;
  font150: Font;
  font200: Font;
  font250: Font;
  font300: Font;
  font350: Font;
  font400: Font;
  font450: Font;
  font550: Font;
  font650: Font;
  font750: Font;
  font850: Font;
  font950: Font;
  font1050: Font;
  font1150: Font;
  font1250: Font;
  font1350: Font;
  font1450: Font;
  ParagraphXSmall: Font;
  ParagraphSmall: Font;
  ParagraphMedium: Font;
  ParagraphLarge: Font;
  LabelXSmall: Font;
  LabelSmall: Font;
  LabelMedium: Font;
  LabelLarge: Font;
  HeadingXSmall: Font;
  HeadingSmall: Font;
  HeadingMedium: Font;
  HeadingLarge: Font;
  HeadingXLarge: Font;
  HeadingXXLarge: Font;
  DisplayXSmall: Font;
  DisplaySmall: Font;
  DisplayMedium: Font;
  DisplayLarge: Font;
  MonoParagraphXSmall: Font;
  MonoParagraphSmall: Font;
  MonoParagraphMedium: Font;
  MonoParagraphLarge: Font;
  MonoLabelXSmall: Font;
  MonoLabelSmall: Font;
  MonoLabelMedium: Font;
  MonoLabelLarge: Font;
  MonoHeadingXSmall: Font;
  MonoHeadingSmall: Font;
  MonoHeadingMedium: Font;
  MonoHeadingLarge: Font;
  MonoHeadingXLarge: Font;
  MonoHeadingXXLarge: Font;
  MonoDisplayXSmall: Font;
  MonoDisplaySmall: Font;
  MonoDisplayMedium: Font;
  MonoDisplayLarge: Font;
};

export type Sizing = {
  /** 2px */
  scale0: string;
  /** 4px */
  scale100: string;
  /** 6px */
  scale200: string;
  /** 8px */
  scale300: string;
  /** 10px */
  scale400: string;
  /** 12px */
  scale500: string;
  /** 14px */
  scale550: string;
  /** 16px */
  scale600: string;
  /** 18px */
  scale650: string;
  /** 20px */
  scale700: string;
  /** 22px */
  scale750: string;
  /** 24px */
  scale800: string;
  /** 28px */
  scale850: string;
  /** 32px */
  scale900: string;
  /** 36px */
  scale950: string;
  /** 40px */
  scale1000: string;
  /** 48px */
  scale1200: string;
  /** 56px */
  scale1400: string;
  /** 64px */
  scale1600: string;
  /** 96px */
  scale2400: string;
  /** 128px */
  scale3200: string;
  /** 192px */
  scale4800: string;
};

export type Breakpoints = {
  small: number;
  medium: number;
  large: number;
};

export type MediaQuery = {
  small: string;
  medium: string;
  large: string;
};

export type Lighting = {
  shadow400: string;
  shadow500: string;
  shadow600: string;
  shadow700: string;
  overlay0: string;
  overlay100: string;
  overlay200: string;
  overlay300: string;
  overlay400: string;
  overlay500: string;
  overlay600: string;
  shallowAbove: string;
  shallowBelow: string;
  deepAbove: string;
  deepBelow: string;
};

export type Animation = {
  timing0: string;
  timing100: string;
  timing150: string;
  timing200: string;
  timing250: string;
  timing300: string;
  timing400: string;
  timing500: string;
  timing600: string;
  timing700: string;
  timing800: string;
  timing900: string;
  timing1000: string;
  timing1500: string;
  timing3000: string;
  timing5000: string;
  timing7000: string;
  easeOutCurve: string;
  easeInCurve: string;
  easeInOutCurve: string;
  easeInQuinticCurve: string;
  easeOutQuinticCurve: string;
  easeInOutQuinticCurve: string;
  linearCurve: string;
  easeLinear: string;
  easeDecelerate: string;
  easeAccelerate: string;
  easeAccelerateDecelerate: string;
  easeResponsiveAccelerate: string;
};

export type Border = {
  borderColor: Properties['borderColor'];
  // longhand border-style properties do not accept string values
  borderStyle: Properties['borderLeftStyle'];
  borderWidth: Properties['borderWidth'];
};

export type Borders = {
  border100: Border;
  border200: Border;
  border300: Border;
  border400: Border;
  border500: Border;
  border600: Border;
  radius100: string;
  radius200: string;
  radius300: string;
  radius400: string;
  radius500: string;
  useRoundedCorners: boolean;
  buttonBorderRadius: string;
  buttonBorderRadiusMini: string;
  checkboxBorderRadius: string;
  surfaceBorderRadius: string;
  inputBorderRadius: string;
  inputBorderRadiusMini: string;
  popoverBorderRadius: string;
  tagBorderRadius: string;
};

export type Grid = {
  columns: Responsive<number>;
  gutters: Responsive<number>;
  margins: Responsive<number>;
  gaps: Responsive<number>;
  maxWidth: number;
  unit: CSSLengthUnit;
};

// TODO(#2318) Deprecate in the next major
export type ZIndex = {
  modal: number;
};
