/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { Theme, ColorTokens, Typography, Sizing, Animation } from '../styles/types';

// Import breakpoints and other constants that remain as JavaScript
import breakpoints from '../themes/shared/breakpoints';
import grid from '../themes/shared/grid';
import borders from '../themes/shared/borders';
import lighting from '../themes/shared/lighting';
import getMediaQuery from '../themes/shared/media-query';

/**
 * Create a proxy object that returns human-readable CSS variable references
 * This version uses readable variable names like --bui-color-primary instead of hashed names
 */
function createReadableColorProxy(): ColorTokens {
  return new Proxy({} as ColorTokens, {
    get(target, prop: string) {
      // Map JavaScript property names to readable CSS variable names
      const cssVarMap: Record<string, string> = {
        // Primitives
        white: '--bui-color-white',
        black: '--bui-color-black',
        gray50: '--bui-color-gray-50',
        gray100: '--bui-color-gray-100',
        gray200: '--bui-color-gray-200',
        gray300: '--bui-color-gray-300',
        gray400: '--bui-color-gray-400',
        gray500: '--bui-color-gray-500',
        gray600: '--bui-color-gray-600',
        gray700: '--bui-color-gray-700',
        gray800: '--bui-color-gray-800',
        gray900: '--bui-color-gray-900',

        // Brand colors
        brandDefault50: '--bui-color-brand-50',
        brandDefault100: '--bui-color-brand-100',
        brandDefault200: '--bui-color-brand-200',
        brandDefault300: '--bui-color-brand-300',
        brandDefault400: '--bui-color-brand-400',
        brandDefault500: '--bui-color-brand-500',
        brandDefault600: '--bui-color-brand-600',
        brandDefault700: '--bui-color-brand-700',
        brandDefault800: '--bui-color-brand-800',
        brandDefault900: '--bui-color-brand-900',

        // Red
        red50: '--bui-color-red-50',
        red100: '--bui-color-red-100',
        red200: '--bui-color-red-200',
        red300: '--bui-color-red-300',
        red400: '--bui-color-red-400',
        red500: '--bui-color-red-500',
        red600: '--bui-color-red-600',
        red700: '--bui-color-red-700',
        red800: '--bui-color-red-800',
        red900: '--bui-color-red-900',

        // Green
        green50: '--bui-color-green-50',
        green100: '--bui-color-green-100',
        green200: '--bui-color-green-200',
        green300: '--bui-color-green-300',
        green400: '--bui-color-green-400',
        green500: '--bui-color-green-500',
        green600: '--bui-color-green-600',
        green700: '--bui-color-green-700',
        green800: '--bui-color-green-800',
        green900: '--bui-color-green-900',

        // Blue
        blue50: '--bui-color-blue-50',
        blue100: '--bui-color-blue-100',
        blue200: '--bui-color-blue-200',
        blue300: '--bui-color-blue-300',
        blue400: '--bui-color-blue-400',
        blue500: '--bui-color-blue-500',
        blue600: '--bui-color-blue-600',
        blue700: '--bui-color-blue-700',
        blue800: '--bui-color-blue-800',
        blue900: '--bui-color-blue-900',

        // Yellow
        yellow50: '--bui-color-yellow-50',
        yellow100: '--bui-color-yellow-100',
        yellow200: '--bui-color-yellow-200',
        yellow300: '--bui-color-yellow-300',
        yellow400: '--bui-color-yellow-400',
        yellow500: '--bui-color-yellow-500',
        yellow600: '--bui-color-yellow-600',
        yellow700: '--bui-color-yellow-700',
        yellow800: '--bui-color-yellow-800',
        yellow900: '--bui-color-yellow-900',

        // Semantic - Background
        backgroundPrimary: '--bui-background-primary',
        backgroundSecondary: '--bui-background-secondary',
        backgroundTertiary: '--bui-background-tertiary',
        backgroundInversePrimary: '--bui-background-inverse-primary',
        backgroundInverseSecondary: '--bui-background-inverse-secondary',
        backgroundStateDisabled: '--bui-background-state-disabled',
        backgroundOverlay: '--bui-background-overlay',
        backgroundAccent: '--bui-background-accent',
        backgroundNegative: '--bui-background-negative',
        backgroundWarning: '--bui-background-warning',
        backgroundPositive: '--bui-background-positive',
        backgroundAccentLight: '--bui-background-accent-light',
        backgroundNegativeLight: '--bui-background-negative-light',
        backgroundWarningLight: '--bui-background-warning-light',
        backgroundPositiveLight: '--bui-background-positive-light',
        backgroundAlwaysDark: '--bui-background-always-dark',
        backgroundAlwaysLight: '--bui-background-always-light',

        // Semantic - Content
        contentPrimary: '--bui-content-primary',
        contentSecondary: '--bui-content-secondary',
        contentTertiary: '--bui-content-tertiary',
        contentInversePrimary: '--bui-content-inverse-primary',
        contentInverseSecondary: '--bui-content-inverse-secondary',
        contentInverseTertiary: '--bui-content-inverse-tertiary',
        contentStateDisabled: '--bui-content-state-disabled',
        contentOnColor: '--bui-content-on-color',
        contentOnColorInverse: '--bui-content-on-color-inverse',
        contentAccent: '--bui-content-accent',
        contentNegative: '--bui-content-negative',
        contentWarning: '--bui-content-warning',
        contentPositive: '--bui-content-positive',

        // Semantic - Border
        borderOpaque: '--bui-border-opaque',
        borderTransparent: '--bui-border-transparent',
        borderSelected: '--bui-border-selected',
        borderInverseOpaque: '--bui-border-inverse-opaque',
        borderInverseTransparent: '--bui-border-inverse-transparent',
        borderInverseSelected: '--bui-border-inverse-selected',
        borderStateDisabled: '--bui-border-state-disabled',
        borderAccent: '--bui-border-accent',
        borderAccentLight: '--bui-border-accent-light',
        borderNegative: '--bui-border-negative',
        borderNegativeLight: '--bui-border-negative-light',
        borderWarning: '--bui-border-warning',
        borderWarningLight: '--bui-border-warning-light',
        borderPositive: '--bui-border-positive',
        borderPositiveLight: '--bui-border-positive-light',

        // Brand
        brandBackgroundPrimary: '--bui-brand-background-primary',
        brandBackgroundSecondary: '--bui-brand-background-secondary',
        brandBackgroundTertiary: '--bui-brand-background-tertiary',
        brandBackgroundDisabled: '--bui-brand-background-disabled',
        brandContentPrimary: '--bui-brand-content-primary',
        brandContentOnPrimary: '--bui-brand-content-on-primary',
        brandContentOnSecondary: '--bui-brand-content-on-secondary',
        brandContentOnTertiary: '--bui-brand-content-on-tertiary',
        brandContentDisabled: '--bui-brand-content-disabled',
        brandBorderAccessible: '--bui-brand-border-accessible',
        brandBorderSubtle: '--bui-brand-border-subtle',

        // Component Colors
        // Banner
        bannerActionLowInfo: '--bui-banner-action-low-info',
        bannerActionLowNegative: '--bui-banner-action-low-negative',
        bannerActionLowPositive: '--bui-banner-action-low-positive',
        bannerActionLowWarning: '--bui-banner-action-low-warning',
        bannerActionHighInfo: '--bui-banner-action-high-info',
        bannerActionHighNegative: '--bui-banner-action-high-negative',
        bannerActionHighPositive: '--bui-banner-action-high-positive',
        bannerActionHighWarning: '--bui-banner-action-high-warning',

        // Bottom Navigation
        bottomNavigationText: '--bui-bottom-navigation-text',
        bottomNavigationSelectedText: '--bui-bottom-navigation-selected-text',

        // Buttons - Primary
        buttonPrimaryFill: '--bui-button-primary-fill',
        buttonPrimaryText: '--bui-button-primary-text',
        buttonPrimaryHover: '--bui-button-primary-hover',
        buttonPrimaryActive: '--bui-button-primary-active',
        buttonPrimaryHoverOverlay: '--bui-button-primary-hover-overlay',
        buttonPrimaryActiveOverlay: '--bui-button-primary-active-overlay',
        buttonPrimarySelectedFill: '--bui-button-primary-selected-fill',
        buttonPrimarySelectedText: '--bui-button-primary-selected-text',
        buttonPrimaryLoadingFill: '--bui-button-primary-loading-fill',
        buttonPrimarySpinnerForeground: '--bui-button-primary-spinner-foreground',
        buttonPrimarySpinnerBackground: '--bui-button-primary-spinner-background',

        // Buttons - Secondary
        buttonSecondaryFill: '--bui-button-secondary-fill',
        buttonSecondaryText: '--bui-button-secondary-text',
        buttonSecondaryHover: '--bui-button-secondary-hover',
        buttonSecondaryActive: '--bui-button-secondary-active',
        buttonSecondaryHoverOverlay: '--bui-button-secondary-hover-overlay',
        buttonSecondaryActiveOverlay: '--bui-button-secondary-active-overlay',
        buttonSecondarySelectedFill: '--bui-button-secondary-selected-fill',
        buttonSecondarySelectedText: '--bui-button-secondary-selected-text',
        buttonSecondaryLoadingFill: '--bui-button-secondary-loading-fill',
        buttonSecondarySpinnerForeground: '--bui-button-secondary-spinner-foreground',
        buttonSecondarySpinnerBackground: '--bui-button-secondary-spinner-background',

        // Buttons - Tertiary
        buttonTertiaryFill: '--bui-button-tertiary-fill',
        buttonTertiaryText: '--bui-button-tertiary-text',
        buttonTertiaryHover: '--bui-button-tertiary-hover',
        buttonTertiaryActive: '--bui-button-tertiary-active',
        buttonTertiaryHoverOverlay: '--bui-button-tertiary-hover-overlay',
        buttonTertiaryActiveOverlay: '--bui-button-tertiary-active-overlay',
        buttonTertiarySelectedFill: '--bui-button-tertiary-selected-fill',
        buttonTertiarySelectedText: '--bui-button-tertiary-selected-text',
        buttonTertiaryLoadingFill: '--bui-button-tertiary-loading-fill',
        buttonTertiaryFocusFill: '--bui-button-tertiary-focus-fill',
        buttonTertiaryDisabledActiveFill: '--bui-button-tertiary-disabled-active-fill',
        buttonTertiaryDisabledActiveText: '--bui-button-tertiary-disabled-active-text',
        buttonTertiarySpinnerForeground: '--bui-button-tertiary-spinner-foreground',
        buttonTertiarySpinnerBackground: '--bui-button-tertiary-spinner-background',

        // Buttons - Danger Primary
        buttonDangerPrimaryFill: '--bui-button-danger-primary-fill',
        buttonDangerPrimaryText: '--bui-button-danger-primary-text',
        buttonDangerPrimaryHoverOverlay: '--bui-button-danger-primary-hover-overlay',
        buttonDangerPrimaryActiveOverlay: '--bui-button-danger-primary-active-overlay',
        buttonDangerPrimarySelectedFill: '--bui-button-danger-primary-selected-fill',
        buttonDangerPrimarySelectedText: '--bui-button-danger-primary-selected-text',
        buttonDangerPrimaryLoadingFill: '--bui-button-danger-primary-loading-fill',
        buttonDangerPrimarySpinnerForeground: '--bui-button-danger-primary-spinner-foreground',
        buttonDangerPrimarySpinnerBackground: '--bui-button-danger-primary-spinner-background',

        // Buttons - Danger Secondary
        buttonDangerSecondaryFill: '--bui-button-danger-secondary-fill',
        buttonDangerSecondaryText: '--bui-button-danger-secondary-text',
        buttonDangerSecondaryHoverOverlay: '--bui-button-danger-secondary-hover-overlay',
        buttonDangerSecondaryActiveOverlay: '--bui-button-danger-secondary-active-overlay',
        buttonDangerSecondarySelectedFill: '--bui-button-danger-secondary-selected-fill',
        buttonDangerSecondarySelectedText: '--bui-button-danger-secondary-selected-text',
        buttonDangerSecondaryLoadingFill: '--bui-button-danger-secondary-loading-fill',
        buttonDangerSecondarySpinnerForeground: '--bui-button-danger-secondary-spinner-foreground',
        buttonDangerSecondarySpinnerBackground: '--bui-button-danger-secondary-spinner-background',

        // Buttons - Danger Tertiary
        buttonDangerTertiaryFill: '--bui-button-danger-tertiary-fill',
        buttonDangerTertiaryText: '--bui-button-danger-tertiary-text',
        buttonDangerTertiaryHoverOverlay: '--bui-button-danger-tertiary-hover-overlay',
        buttonDangerTertiaryActiveOverlay: '--bui-button-danger-tertiary-active-overlay',
        buttonDangerTertiarySelectedFill: '--bui-button-danger-tertiary-selected-fill',
        buttonDangerTertiarySelectedText: '--bui-button-danger-tertiary-selected-text',
        buttonDangerTertiaryLoadingFill: '--bui-button-danger-tertiary-loading-fill',
        buttonDangerTertiarySpinnerForeground: '--bui-button-danger-tertiary-spinner-foreground',
        buttonDangerTertiarySpinnerBackground: '--bui-button-danger-tertiary-spinner-background',

        // Buttons - Outline
        buttonOutlineFill: '--bui-button-outline-fill',
        buttonOutlineText: '--bui-button-outline-text',
        buttonOutlineHoverOverlay: '--bui-button-outline-hover-overlay',
        buttonOutlineActiveOverlay: '--bui-button-outline-active-overlay',
        buttonOutlineSelectedFill: '--bui-button-outline-selected-fill',
        buttonOutlineSelectedText: '--bui-button-outline-selected-text',
        buttonOutlineFocusFill: '--bui-button-outline-focus-fill',
        buttonOutlineLoadingFill: '--bui-button-outline-loading-fill',
        buttonOutlineSpinnerForeground: '--bui-button-outline-spinner-foreground',
        buttonOutlineSpinnerBackground: '--bui-button-outline-spinner-background',

        // Buttons - Disabled
        buttonDisabledFill: '--bui-button-disabled-fill',
        buttonDisabledText: '--bui-button-disabled-text',
        buttonDisabledActiveFill: '--bui-button-disabled-active-fill',
        buttonDisabledActiveText: '--bui-button-disabled-active-text',
        buttonDisabledSpinnerForeground: '--bui-button-disabled-spinner-foreground',
        buttonDisabledSpinnerBackground: '--bui-button-disabled-spinner-background',

        // Button Borders
        buttonOuterBorder: '--bui-button-outer-border',
        buttonOutlineOuterBorder: '--bui-button-outline-outer-border',
        buttonDangerTertiaryOuterBorder: '--bui-button-danger-tertiary-outer-border',
        buttonInnerBorder: '--bui-button-inner-border',
        buttonTransparentBorder: '--bui-button-transparent-border',
        buttonFocusOuterBorder: '--bui-button-focus-outer-border',

        // Breadcrumbs
        breadcrumbsText: '--bui-breadcrumbs-text',
        breadcrumbsSeparatorFill: '--bui-breadcrumbs-separator-fill',

        // Calendar/Datepicker
        calendarBackground: '--bui-calendar-background',
        calendarForeground: '--bui-calendar-foreground',
        calendarForegroundDisabled: '--bui-calendar-foreground-disabled',
        calendarHeaderBackground: '--bui-calendar-header-background',
        calendarHeaderForeground: '--bui-calendar-header-foreground',
        calendarHeaderBackgroundActive: '--bui-calendar-header-background-active',
        calendarHeaderForegroundDisabled: '--bui-calendar-header-foreground-disabled',
        calendarDayForegroundPseudoSelected: '--bui-calendar-day-foreground-pseudo-selected',
        calendarDayBackgroundPseudoSelectedHighlighted: '--bui-calendar-day-background-pseudo-selected-highlighted',
        calendarDayForegroundPseudoSelectedHighlighted: '--bui-calendar-day-foreground-pseudo-selected-highlighted',
        calendarDayBackgroundSelected: '--bui-calendar-day-background-selected',
        calendarDayForegroundSelected: '--bui-calendar-day-foreground-selected',
        calendarDayBackgroundSelectedHighlighted: '--bui-calendar-day-background-selected-highlighted',
        calendarDayForegroundSelectedHighlighted: '--bui-calendar-day-foreground-selected-highlighted',

        // Combobox
        comboboxListItemFocus: '--bui-combobox-list-item-focus',
        comboboxListItemHover: '--bui-combobox-list-item-hover',

        // File Uploader
        fileUploaderBackgroundColor: '--bui-file-uploader-background-color',
        fileUploaderBackgroundColorActive: '--bui-file-uploader-background-color-active',
        fileUploaderBorderColorActive: '--bui-file-uploader-border-color-active',
        fileUploaderBorderColorDefault: '--bui-file-uploader-border-color-default',
        fileUploaderMessageColor: '--bui-file-uploader-message-color',

        // Links
        linkText: '--bui-link-text',
        linkVisited: '--bui-link-visited',
        linkHover: '--bui-link-hover',
        linkActive: '--bui-link-active',

        // List
        listHeaderFill: '--bui-list-header-fill',
        listBodyFill: '--bui-list-body-fill',

        // Progress Steps
        progressStepsCompletedText: '--bui-progress-steps-completed-text',
        progressStepsCompletedFill: '--bui-progress-steps-completed-fill',
        progressStepsActiveText: '--bui-progress-steps-active-text',
        progressStepsActiveFill: '--bui-progress-steps-active-fill',

        // Toggle
        toggleFill: '--bui-toggle-fill',
        toggleFillChecked: '--bui-toggle-fill-checked',
        toggleFillDisabled: '--bui-toggle-fill-disabled',
        toggleTrackFill: '--bui-toggle-track-fill',
        toggleTrackFillDisabled: '--bui-toggle-track-fill-disabled',

        // Tick/Checkbox
        tickFill: '--bui-tick-fill',
        tickFillHover: '--bui-tick-fill-hover',
        tickFillActive: '--bui-tick-fill-active',
        tickFillSelected: '--bui-tick-fill-selected',
        tickFillSelectedHover: '--bui-tick-fill-selected-hover',
        tickFillSelectedHoverActive: '--bui-tick-fill-selected-hover-active',
        tickFillError: '--bui-tick-fill-error',
        tickFillErrorHover: '--bui-tick-fill-error-hover',
        tickFillErrorHoverActive: '--bui-tick-fill-error-hover-active',
        tickFillErrorSelected: '--bui-tick-fill-error-selected',
        tickFillErrorSelectedHover: '--bui-tick-fill-error-selected-hover',
        tickFillErrorSelectedHoverActive: '--bui-tick-fill-error-selected-hover-active',
        tickFillDisabled: '--bui-tick-fill-disabled',
        tickBorder: '--bui-tick-border',
        tickBorderError: '--bui-tick-border-error',
        tickMarkFill: '--bui-tick-mark-fill',
        tickMarkFillError: '--bui-tick-mark-fill-error',
        tickMarkFillDisabled: '--bui-tick-mark-fill-disabled',

        // Slider
        sliderTrackFill: '--bui-slider-track-fill',
        sliderHandleFill: '--bui-slider-handle-fill',
        sliderHandleFillDisabled: '--bui-slider-handle-fill-disabled',
        sliderHandleInnerFill: '--bui-slider-handle-inner-fill',
        sliderTrackFillHover: '--bui-slider-track-fill-hover',
        sliderTrackFillActive: '--bui-slider-track-fill-active',
        sliderTrackFillDisabled: '--bui-slider-track-fill-disabled',
        sliderHandleInnerFillDisabled: '--bui-slider-handle-inner-fill-disabled',
        sliderHandleInnerFillSelectedHover: '--bui-slider-handle-inner-fill-selected-hover',
        sliderHandleInnerFillSelectedActive: '--bui-slider-handle-inner-fill-selected-active',

        // Inputs
        inputBorder: '--bui-input-border',
        inputFill: '--bui-input-fill',
        inputFillError: '--bui-input-fill-error',
        inputFillDisabled: '--bui-input-fill-disabled',
        inputFillActive: '--bui-input-fill-active',
        inputFillPositive: '--bui-input-fill-positive',
        inputTextDisabled: '--bui-input-text-disabled',
        inputBorderError: '--bui-input-border-error',
        inputBorderPositive: '--bui-input-border-positive',
        inputEnhancerFill: '--bui-input-enhancer-fill',
        inputEnhancerFillDisabled: '--bui-input-enhancer-fill-disabled',
        inputEnhancerTextDisabled: '--bui-input-enhancer-text-disabled',
        inputPlaceholder: '--bui-input-placeholder',
        inputPlaceholderDisabled: '--bui-input-placeholder-disabled',

        // Menu
        menuFill: '--bui-menu-fill',
        menuFillHover: '--bui-menu-fill-hover',
        menuFontDefault: '--bui-menu-font-default',
        menuFontDisabled: '--bui-menu-font-disabled',
        menuFontHighlighted: '--bui-menu-font-highlighted',
        menuFontSelected: '--bui-menu-font-selected',

        // Modal
        modalCloseColor: '--bui-modal-close-color',
        modalCloseColorHover: '--bui-modal-close-color-hover',
        modalCloseColorFocus: '--bui-modal-close-color-focus',

        // Tab
        tabBarFill: '--bui-tab-bar-fill',
        tabColor: '--bui-tab-color',

        // Notification
        notificationInfoBackground: '--bui-notification-info-background',
        notificationInfoText: '--bui-notification-info-text',
        notificationPositiveBackground: '--bui-notification-positive-background',
        notificationPositiveText: '--bui-notification-positive-text',
        notificationWarningBackground: '--bui-notification-warning-background',
        notificationWarningText: '--bui-notification-warning-text',
        notificationNegativeBackground: '--bui-notification-negative-background',
        notificationNegativeText: '--bui-notification-negative-text',

        // Tag - Neutral
        tagNeutralFontDisabled: '--bui-tag-neutral-font-disabled',
        tagNeutralOutlinedDisabled: '--bui-tag-neutral-outlined-disabled',
        tagNeutralSolidFont: '--bui-tag-neutral-solid-font',
        tagNeutralSolidBackground: '--bui-tag-neutral-solid-background',
        tagNeutralOutlinedBackground: '--bui-tag-neutral-outlined-background',
        tagNeutralOutlinedFont: '--bui-tag-neutral-outlined-font',

        // Tag - Primary
        tagPrimaryFontDisabled: '--bui-tag-primary-font-disabled',
        tagPrimaryOutlinedDisabled: '--bui-tag-primary-outlined-disabled',
        tagPrimarySolidFont: '--bui-tag-primary-solid-font',
        tagPrimarySolidBackground: '--bui-tag-primary-solid-background',
        tagPrimaryOutlinedFontHover: '--bui-tag-primary-outlined-font-hover',
        tagPrimaryOutlinedFont: '--bui-tag-primary-outlined-font',
        tagPrimaryOutlinedBackground: '--bui-tag-primary-outlined-background',

        // Tag - Accent
        tagAccentFontDisabled: '--bui-tag-accent-font-disabled',
        tagAccentOutlinedDisabled: '--bui-tag-accent-outlined-disabled',
        tagAccentSolidFont: '--bui-tag-accent-solid-font',
        tagAccentSolidBackground: '--bui-tag-accent-solid-background',
        tagAccentOutlinedBackground: '--bui-tag-accent-outlined-background',
        tagAccentOutlinedFont: '--bui-tag-accent-outlined-font',

        // Tag - Positive
        tagPositiveFontDisabled: '--bui-tag-positive-font-disabled',
        tagPositiveOutlinedDisabled: '--bui-tag-positive-outlined-disabled',
        tagPositiveSolidFont: '--bui-tag-positive-solid-font',
        tagPositiveSolidBackground: '--bui-tag-positive-solid-background',
        tagPositiveOutlinedBackground: '--bui-tag-positive-outlined-background',
        tagPositiveOutlinedFont: '--bui-tag-positive-outlined-font',

        // Tag - Warning
        tagWarningFontDisabled: '--bui-tag-warning-font-disabled',
        tagWarningOutlinedDisabled: '--bui-tag-warning-outlined-disabled',
        tagWarningSolidFont: '--bui-tag-warning-solid-font',
        tagWarningSolidBackground: '--bui-tag-warning-solid-background',
        tagWarningOutlinedBackground: '--bui-tag-warning-outlined-background',
        tagWarningOutlinedFont: '--bui-tag-warning-outlined-font',

        // Tag - Negative
        tagNegativeFontDisabled: '--bui-tag-negative-font-disabled',
        tagNegativeOutlinedDisabled: '--bui-tag-negative-outlined-disabled',
        tagNegativeSolidFont: '--bui-tag-negative-solid-font',
        tagNegativeSolidBackground: '--bui-tag-negative-solid-background',
        tagNegativeOutlinedBackground: '--bui-tag-negative-outlined-background',
        tagNegativeOutlinedFont: '--bui-tag-negative-outlined-font',

        // Table
        tableHeadBackgroundColor: '--bui-table-head-background-color',
        tableBackground: '--bui-table-background',
        tableStripedBackground: '--bui-table-striped-background',
        tableFilter: '--bui-table-filter',
        tableFilterHeading: '--bui-table-filter-heading',
        tableFilterBackground: '--bui-table-filter-background',
        tableFilterFooterBackground: '--bui-table-filter-footer-background',

        // Toast
        toastText: '--bui-toast-text',
        toastPrimaryText: '--bui-toast-primary-text',
        toastInfoBackground: '--bui-toast-info-background',
        toastInfoText: '--bui-toast-info-text',
        toastPositiveBackground: '--bui-toast-positive-background',
        toastPositiveText: '--bui-toast-positive-text',
        toastWarningBackground: '--bui-toast-warning-background',
        toastWarningText: '--bui-toast-warning-text',
        toastNegativeBackground: '--bui-toast-negative-background',
        toastNegativeText: '--bui-toast-negative-text',

        // Spinner
        spinnerTrackFill: '--bui-spinner-track-fill',

        // Progress bar
        progressbarTrackFill: '--bui-progressbar-track-fill',

        // Tooltip
        tooltipBackground: '--bui-tooltip-background',
        tooltipText: '--bui-tooltip-text',

        // Rating
        ratingInactiveFill: '--bui-rating-inactive-fill',
        ratingStroke: '--bui-rating-stroke',
      };

      const varName = cssVarMap[prop];
      return varName ? `var(${varName})` : undefined;
    },
  });
}

/**
 * Create a proxy for typography that returns CSS variables
 */
function createReadableTypographyProxy(): Typography {
  const fontObjects: any = {
    font100: {
      fontFamily: 'var(--bui-font-family-primary)',
      fontSize: 'var(--bui-font-size-100)',
      fontWeight: 'var(--bui-font-weight-normal)',
      lineHeight: 'var(--bui-line-height-100)',
    },
    font200: {
      fontFamily: 'var(--bui-font-family-primary)',
      fontSize: 'var(--bui-font-size-200)',
      fontWeight: 'var(--bui-font-weight-normal)',
      lineHeight: 'var(--bui-line-height-200)',
    },
    font300: {
      fontFamily: 'var(--bui-font-family-primary)',
      fontSize: 'var(--bui-font-size-300)',
      fontWeight: 'var(--bui-font-weight-normal)',
      lineHeight: 'var(--bui-line-height-300)',
    },
    font400: {
      fontFamily: 'var(--bui-font-family-primary)',
      fontSize: 'var(--bui-font-size-400)',
      fontWeight: 'var(--bui-font-weight-normal)',
      lineHeight: 'var(--bui-line-height-400)',
    },
    font550: {
      fontFamily: 'var(--bui-font-family-secondary)',
      fontSize: 'var(--bui-font-size-550)',
      fontWeight: 'var(--bui-font-weight-bold)',
      lineHeight: 'var(--bui-line-height-550)',
    },
    font650: {
      fontFamily: 'var(--bui-font-family-secondary)',
      fontSize: 'var(--bui-font-size-650)',
      fontWeight: 'var(--bui-font-weight-bold)',
      lineHeight: 'var(--bui-line-height-650)',
    },
    font750: {
      fontFamily: 'var(--bui-font-family-secondary)',
      fontSize: 'var(--bui-font-size-750)',
      fontWeight: 'var(--bui-font-weight-bold)',
      lineHeight: 'var(--bui-line-height-750)',
    },
    font850: {
      fontFamily: 'var(--bui-font-family-secondary)',
      fontSize: 'var(--bui-font-size-850)',
      fontWeight: 'var(--bui-font-weight-bold)',
      lineHeight: 'var(--bui-line-height-850)',
    },
    font950: {
      fontFamily: 'var(--bui-font-family-secondary)',
      fontSize: 'var(--bui-font-size-950)',
      fontWeight: 'var(--bui-font-weight-bold)',
      lineHeight: 'var(--bui-line-height-950)',
    },
  };

  // Add aliases
  const aliases: any = {
    ParagraphSmall: fontObjects.font200,
    ParagraphMedium: fontObjects.font300,
    ParagraphLarge: fontObjects.font400,
    HeadingXSmall: fontObjects.font550,
    HeadingSmall: fontObjects.font650,
    HeadingMedium: fontObjects.font750,
    HeadingLarge: fontObjects.font850,
    HeadingXLarge: fontObjects.font950,
  };

  return {
    ...fontObjects,
    ...aliases,
  } as Typography;
}

/**
 * Create a proxy for sizing that returns CSS variables
 */
function createReadableSizingProxy(): Sizing {
  return new Proxy({} as Sizing, {
    get(target, prop: string) {
      // Convert camelCase to kebab-case
      const cssVarName = `--bui-sizing-${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      return `var(${cssVarName})`;
    },
  });
}

/**
 * Create a proxy for animation that returns CSS variables
 */
function createReadableAnimationProxy(): Animation {
  return new Proxy({} as Animation, {
    get(target, prop: string) {
      const varMap: Record<string, string> = {
        timing100: '--bui-animation-timing-100',
        timing200: '--bui-animation-timing-200',
        timing300: '--bui-animation-timing-300',
        easeLinear: '--bui-animation-ease-linear',
        easeDecelerate: '--bui-animation-ease-decelerate',
        easeAccelerate: '--bui-animation-ease-accelerate',
        easeInOutCurve: '--bui-animation-ease-in-out',
      };
      const varName = varMap[prop] || `--bui-animation-${prop}`;
      return `var(${varName})`;
    },
  });
}

/**
 * Create a complete theme object with human-readable CSS variables
 */
export function createReadableCSSVarTheme(themeName: 'light' | 'dark'): Theme {
  return {
    name: themeName,
    colors: createReadableColorProxy(),
    typography: createReadableTypographyProxy(),
    sizing: createReadableSizingProxy(),
    animation: createReadableAnimationProxy(),

    // These remain as JavaScript constants
    breakpoints,
    borders,
    direction: 'auto' as const,
    grid,
    lighting,
    mediaQuery: getMediaQuery(breakpoints),
    zIndex: { modal: 2000 },
  };
}
