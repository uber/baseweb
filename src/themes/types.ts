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

export type ColorTokens = {
  // Primary Palette
  primaryA: string;
  primaryB: string;
  primary: string;
  primary50: string;
  primary100: string;
  primary200: string;
  primary300: string;
  primary400: string;
  primary500: string;
  primary600: string;
  primary700: string;
  // Accent Palette
  accent: string;
  accent50: string;
  accent100: string;
  accent200: string;
  accent300: string;
  accent400: string;
  accent500: string;
  accent600: string;
  accent700: string;
  // Alert Palette
  negative: string;
  negative50: string;
  negative100: string;
  negative200: string;
  negative300: string;
  negative400: string;
  negative500: string;
  negative600: string;
  negative700: string;
  // Warning Palette
  warning: string;
  warning50: string;
  warning100: string;
  warning200: string;
  warning300: string;
  warning400: string;
  warning500: string;
  warning600: string;
  warning700: string;
  // Success Palette
  positive: string;
  positive50: string;
  positive100: string;
  positive200: string;
  positive300: string;
  positive400: string;
  positive500: string;
  positive600: string;
  positive700: string;
  // Monochrome Palette
  white: string;
  black: string;
  mono100: string;
  mono200: string;
  mono300: string;
  mono400: string;
  mono500: string;
  mono600: string;
  mono700: string;
  mono800: string;
  mono900: string;
  mono1000: string;
  // Rating Palette
  ratingInactiveFill: string;
  ratingStroke: string;
};

export type CoreSemanticColorTokens = {
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
  borderTransparent?: string;
  borderSelected: string;
  borderInverseOpaque: string;
  borderInverseTransparent?: string;
  borderInverseSelected: string;
};
export type CoreExtensionSemanticColorTokens = {
  // Backgrounds
  backgroundStateDisabled: string;
  backgroundOverlayDark?: string;
  backgroundOverlayLight?: string;
  backgroundOverlayArt?: string;
  backgroundAccent: string;
  backgroundNegative: string;
  backgroundWarning: string;
  backgroundPositive: string;
  backgroundLightAccent: string;
  backgroundLightPositive: string;
  backgroundLightNegative: string;
  backgroundLightWarning: string;
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
  // Programs
  safety: string;
  eatsGreen400: string;
  freightBlue400: string;
  jumpRed400: string;
  rewardsTier1: string;
  rewardsTier2: string;
  rewardsTier3: string;
  rewardsTier4: string;
  membership: string;
};

export type SemanticColorTokens = {} & CoreSemanticColorTokens & CoreExtensionSemanticColorTokens;

export type ComponentColorTokens = {
  bannerActionLowInfo: string;
  bannerActionLowNegative: string;
  bannerActionLowPositive: string;
  bannerActionLowWarning: string;
  bannerActionHighInfo: string;
  bannerActionHighNegative: string;
  bannerActionHighPositive: string;
  bannerActionHighWarning: string;
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
};

export type FontTokens = {
  primaryFontFamily: string;
};

// TODO(#2318) Deprecate in the next major version
export type Primitives = {} & ColorTokens & FontTokens;

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
  scale0: string;
  scale100: string;
  scale200: string;
  scale300: string;
  scale400: string;
  scale500: string;
  scale550: string;
  scale600: string;
  scale650: string;
  scale700: string;
  scale750: string;
  scale800: string;
  scale850: string;
  scale900: string;
  scale950: string;
  scale1000: string;
  scale1200: string;
  scale1400: string;
  scale1600: string;
  scale2400: string;
  scale3200: string;
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
  timing100: string;
  timing200: string;
  timing300: string;
  timing400: string;
  timing500: string;
  timing600: string;
  timing700: string;
  timing800: string;
  timing900: string;
  timing1000: string;
  easeOutCurve: string;
  easeInCurve: string;
  easeInOutCurve: string;
  easeInQuinticCurve: string;
  easeOutQuinticCurve: string;
  easeInOutQuinticCurve: string;
  linearCurve: string;
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
