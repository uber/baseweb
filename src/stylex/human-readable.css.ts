/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/**
 * Human-Readable CSS Custom Properties
 *
 * This file generates standard CSS custom properties with readable names
 * instead of using StyleX's hashed names. This is useful for debugging
 * and developer experience.
 */

// Light Theme CSS Variables
export const lightThemeCSS = `
:root, [data-theme="light"] {
  /* ========== Colors - Primitives ========== */
  --bui-color-white: #FFFFFF;
  --bui-color-black: #000000;
  --bui-color-gray-50: #F3F3F3;
  --bui-color-gray-100: #E8E8E8;
  --bui-color-gray-200: #DDDDDD;
  --bui-color-gray-300: #C6C6C6;
  --bui-color-gray-400: #A6A6A6;
  --bui-color-gray-500: #868686;
  --bui-color-gray-600: #727272;
  --bui-color-gray-700: #5E5E5E;
  --bui-color-gray-800: #4B4B4B;
  --bui-color-gray-900: #282828;

  /* Brand */
  --bui-color-brand-50: #EFF4FE;
  --bui-color-brand-100: #DEE9FE;
  --bui-color-brand-200: #CDDEFF;
  --bui-color-brand-300: #A9C9FF;
  --bui-color-brand-400: #6DAAFB;
  --bui-color-brand-500: #068BEE;
  --bui-color-brand-600: #276EF1;
  --bui-color-brand-700: #175BCC;
  --bui-color-brand-800: #1948A3;
  --bui-color-brand-900: #002661;

  /* Red */
  --bui-color-red-50: #FFF0EE;
  --bui-color-red-100: #FFE1DE;
  --bui-color-red-200: #FFD2CD;
  --bui-color-red-300: #FFB2AB;
  --bui-color-red-400: #FC7F79;
  --bui-color-red-500: #F83446;
  --bui-color-red-600: #DE1135;
  --bui-color-red-700: #BB032A;
  --bui-color-red-800: #950F22;
  --bui-color-red-900: #520810;

  /* Green */
  --bui-color-green-50: #EAF6ED;
  --bui-color-green-100: #D3EFDA;
  --bui-color-green-200: #B1EAC2;
  --bui-color-green-300: #7FD99A;
  --bui-color-green-400: #06C167;
  --bui-color-green-500: #009A51;
  --bui-color-green-600: #0E8345;
  --bui-color-green-700: #166C3B;
  --bui-color-green-800: #0D572D;
  --bui-color-green-900: #002F14;

  /* Blue */
  --bui-color-blue-50: #EFF4FE;
  --bui-color-blue-100: #DEE9FE;
  --bui-color-blue-200: #CDDEFF;
  --bui-color-blue-300: #A9C9FF;
  --bui-color-blue-400: #6DAAFB;
  --bui-color-blue-500: #068BEE;
  --bui-color-blue-600: #276EF1;
  --bui-color-blue-700: #175BCC;
  --bui-color-blue-800: #1948A3;
  --bui-color-blue-900: #002661;

  /* Yellow */
  --bui-color-yellow-50: #FDF2DC;
  --bui-color-yellow-100: #FBE5B6;
  --bui-color-yellow-200: #FFD688;
  --bui-color-yellow-300: #F6BC2F;
  --bui-color-yellow-400: #D79900;
  --bui-color-yellow-500: #B97502;
  --bui-color-yellow-600: #9F6402;
  --bui-color-yellow-700: #845201;
  --bui-color-yellow-800: #6B4100;
  --bui-color-yellow-900: #392300;

  /* ========== Semantic Colors ========== */
  /* Background */
  --bui-background-primary: #FFFFFF;
  --bui-background-secondary: #F3F3F3;
  --bui-background-tertiary: #E8E8E8;
  --bui-background-inverse-primary: #000000;
  --bui-background-inverse-secondary: #282828;
  --bui-background-state-disabled: #F3F3F3;
  --bui-background-overlay: rgba(0, 0, 0, 0.5);
  --bui-background-accent: #276EF1;
  --bui-background-negative: #DE1135;
  --bui-background-warning: #F6BC2F;
  --bui-background-positive: #0E8345;
  --bui-background-accent-light: #EFF4FE;
  --bui-background-negative-light: #FFF0EE;
  --bui-background-warning-light: #FDF2DC;
  --bui-background-positive-light: #EAF6ED;
  --bui-background-always-dark: #000000;
  --bui-background-always-light: #FFFFFF;

  /* Content/Text */
  --bui-content-primary: #000000;
  --bui-content-secondary: #4B4B4B;
  --bui-content-tertiary: #5E5E5E;
  --bui-content-inverse-primary: #FFFFFF;
  --bui-content-inverse-secondary: #DDDDDD;
  --bui-content-inverse-tertiary: #A6A6A6;
  --bui-content-state-disabled: #A6A6A6;
  --bui-content-on-color: #FFFFFF;
  --bui-content-on-color-inverse: #000000;
  --bui-content-accent: #276EF1;
  --bui-content-negative: #DE1135;
  --bui-content-warning: #9F6402;
  --bui-content-positive: #0E8345;

  /* Border */
  --bui-border-opaque: #F3F3F3;
  --bui-border-transparent: rgba(0, 0, 0, 0.08);
  --bui-border-selected: #000000;
  --bui-border-inverse-opaque: #4B4B4B;
  --bui-border-inverse-transparent: rgba(255, 255, 255, 0.2);
  --bui-border-inverse-selected: #FFFFFF;
  --bui-border-state-disabled: #F3F3F3;
  --bui-border-accent: #276EF1;
  --bui-border-accent-light: #A9C9FF;
  --bui-border-negative: #DE1135;
  --bui-border-negative-light: #FFB2AB;
  --bui-border-warning: #9F6402;
  --bui-border-warning-light: #FFD688;
  --bui-border-positive: #0E8345;
  --bui-border-positive-light: #7FD99A;

  /* Brand Tokens */
  --bui-brand-background-primary: #276EF1;
  --bui-brand-background-secondary: #EFF4FE;
  --bui-brand-background-tertiary: #FFFFFF;
  --bui-brand-background-disabled: #EFF4FE;
  --bui-brand-content-primary: #276EF1;
  --bui-brand-content-on-primary: #FFFFFF;
  --bui-brand-content-on-secondary: #175BCC;
  --bui-brand-content-on-tertiary: #000000;
  --bui-brand-content-disabled: #A9C9FF;
  --bui-brand-border-accessible: #276EF1;
  --bui-brand-border-subtle: #DEE9FE;

  /* ========== Typography ========== */
  --bui-font-family-primary: UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif;
  --bui-font-family-secondary: UberMove, UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif;
  --bui-font-family-mono: UberMoveMono, "Lucida Console", Monaco, monospace;

  --bui-font-size-100: 12px;
  --bui-font-size-200: 14px;
  --bui-font-size-300: 16px;
  --bui-font-size-400: 18px;
  --bui-font-size-550: 20px;
  --bui-font-size-650: 24px;
  --bui-font-size-750: 28px;
  --bui-font-size-850: 32px;
  --bui-font-size-950: 36px;
  --bui-font-size-1050: 40px;
  --bui-font-size-1250: 44px;
  --bui-font-size-1350: 52px;
  --bui-font-size-1450: 96px;

  --bui-font-weight-normal: normal;
  --bui-font-weight-medium: 500;
  --bui-font-weight-bold: 700;

  --bui-line-height-100: 20px;
  --bui-line-height-150: 16px;
  --bui-line-height-200: 20px;
  --bui-line-height-300: 24px;
  --bui-line-height-400: 28px;
  --bui-line-height-550: 28px;
  --bui-line-height-650: 32px;
  --bui-line-height-750: 36px;
  --bui-line-height-850: 40px;
  --bui-line-height-950: 44px;
  --bui-line-height-1050: 52px;
  --bui-line-height-1250: 52px;
  --bui-line-height-1350: 64px;
  --bui-line-height-1450: 112px;

  /* ========== Sizing/Spacing ========== */
  --bui-sizing-scale-0: 2px;
  --bui-sizing-scale-100: 4px;
  --bui-sizing-scale-200: 6px;
  --bui-sizing-scale-300: 8px;
  --bui-sizing-scale-400: 10px;
  --bui-sizing-scale-500: 12px;
  --bui-sizing-scale-550: 14px;
  --bui-sizing-scale-600: 16px;
  --bui-sizing-scale-650: 18px;
  --bui-sizing-scale-700: 20px;
  --bui-sizing-scale-750: 22px;
  --bui-sizing-scale-800: 24px;
  --bui-sizing-scale-850: 28px;
  --bui-sizing-scale-900: 32px;
  --bui-sizing-scale-950: 36px;
  --bui-sizing-scale-1000: 40px;
  --bui-sizing-scale-1200: 48px;
  --bui-sizing-scale-1400: 56px;
  --bui-sizing-scale-1600: 64px;
  --bui-sizing-scale-2400: 96px;
  --bui-sizing-scale-3200: 128px;
  --bui-sizing-scale-4800: 192px;

  /* ========== Animation ========== */
  --bui-animation-timing-0: 0;
  --bui-animation-timing-100: 100ms;
  --bui-animation-timing-150: 150ms;
  --bui-animation-timing-200: 200ms;
  --bui-animation-timing-300: 300ms;
  --bui-animation-timing-400: 400ms;
  --bui-animation-timing-500: 500ms;

  --bui-animation-ease-linear: cubic-bezier(0, 0, 1, 1);
  --bui-animation-ease-decelerate: cubic-bezier(0.22, 1, 0.36, 1);
  --bui-animation-ease-accelerate: cubic-bezier(0.64, 0, 0.78, 0);
  --bui-animation-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  /* ========== Borders ========== */
  --bui-border-radius-100: 2px;
  --bui-border-radius-200: 4px;
  --bui-border-radius-300: 8px;
  --bui-border-radius-400: 16px;
  --bui-border-radius-circle: 50%;
  --bui-border-radius-pill: 9999px;

  /* ========== Shadows ========== */
  --bui-shadow-100: 0 1px 4px rgba(0, 0, 0, 0.16);
  --bui-shadow-400: 0 2px 8px rgba(0, 0, 0, 0.16);
  --bui-shadow-600: 0 4px 16px rgba(0, 0, 0, 0.16);
  --bui-shadow-700: 0 8px 24px rgba(0, 0, 0, 0.16);

  /* ========== Component Colors ========== */

  /* Banner */
  --bui-banner-action-low-info: #E1EDFE;
  --bui-banner-action-low-negative: #FFE1DE;
  --bui-banner-action-low-positive: #C7F0D9;
  --bui-banner-action-low-warning: #FFFADE;
  --bui-banner-action-high-info: #175BCC;
  --bui-banner-action-high-negative: #BB032A;
  --bui-banner-action-high-positive: #166C3B;
  --bui-banner-action-high-warning: #FFFADE;

  /* Bottom Navigation */
  --bui-bottom-navigation-text: #727272;
  --bui-bottom-navigation-selected-text: #000000;

  /* Buttons - Primary */
  --bui-button-primary-fill: #000000;
  --bui-button-primary-text: #FFFFFF;
  --bui-button-primary-hover: #282828;
  --bui-button-primary-active: #4B4B4B;
  --bui-button-primary-hover-overlay: rgba(255, 255, 255, 0.08);
  --bui-button-primary-active-overlay: rgba(255, 255, 255, 0.12);
  --bui-button-primary-selected-fill: #000000;
  --bui-button-primary-selected-text: #FFFFFF;
  --bui-button-primary-loading-fill: #000000;
  --bui-button-primary-spinner-foreground: #276EF1;
  --bui-button-primary-spinner-background: #FFFFFF;

  /* Buttons - Secondary */
  --bui-button-secondary-fill: #F3F3F3;
  --bui-button-secondary-text: #000000;
  --bui-button-secondary-hover: #DDDDDD;
  --bui-button-secondary-active: #C6C6C6;
  --bui-button-secondary-hover-overlay: rgba(0, 0, 0, 0.04);
  --bui-button-secondary-active-overlay: rgba(0, 0, 0, 0.08);
  --bui-button-secondary-selected-fill: #000000;
  --bui-button-secondary-selected-text: #FFFFFF;
  --bui-button-secondary-loading-fill: #F3F3F3;
  --bui-button-secondary-spinner-foreground: #276EF1;
  --bui-button-secondary-spinner-background: #FFFFFF;

  /* Buttons - Tertiary */
  --bui-button-tertiary-fill: transparent;
  --bui-button-tertiary-text: #000000;
  --bui-button-tertiary-hover: #F3F3F3;
  --bui-button-tertiary-active: #E8E8E8;
  --bui-button-tertiary-hover-overlay: rgba(0, 0, 0, 0.04);
  --bui-button-tertiary-active-overlay: rgba(0, 0, 0, 0.08);
  --bui-button-tertiary-selected-fill: transparent;
  --bui-button-tertiary-selected-text: #000000;
  --bui-button-tertiary-loading-fill: transparent;
  --bui-button-tertiary-focus-fill: #E8E8E8;
  --bui-button-tertiary-disabled-active-fill: #F3F3F3;
  --bui-button-tertiary-disabled-active-text: #A6A6A6;
  --bui-button-tertiary-spinner-foreground: #276EF1;
  --bui-button-tertiary-spinner-background: #E8E8E8;

  /* Buttons - Danger Primary */
  --bui-button-danger-primary-fill: #DE1135;
  --bui-button-danger-primary-text: #FFFFFF;
  --bui-button-danger-primary-hover-overlay: rgba(0, 0, 0, 0.04);
  --bui-button-danger-primary-active-overlay: rgba(0, 0, 0, 0.08);
  --bui-button-danger-primary-selected-fill: #DE1135;
  --bui-button-danger-primary-selected-text: #FFFFFF;
  --bui-button-danger-primary-loading-fill: #DE1135;
  --bui-button-danger-primary-spinner-foreground: #276EF1;
  --bui-button-danger-primary-spinner-background: #FFFFFF;

  /* Buttons - Danger Secondary */
  --bui-button-danger-secondary-fill: #F3F3F3;
  --bui-button-danger-secondary-text: #DE1135;
  --bui-button-danger-secondary-hover-overlay: rgba(0, 0, 0, 0.04);
  --bui-button-danger-secondary-active-overlay: rgba(0, 0, 0, 0.08);
  --bui-button-danger-secondary-selected-fill: #DE1135;
  --bui-button-danger-secondary-selected-text: #FFFFFF;
  --bui-button-danger-secondary-loading-fill: #F3F3F3;
  --bui-button-danger-secondary-spinner-foreground: #276EF1;
  --bui-button-danger-secondary-spinner-background: #FFFFFF;

  /* Buttons - Danger Tertiary */
  --bui-button-danger-tertiary-fill: transparent;
  --bui-button-danger-tertiary-text: #DE1135;
  --bui-button-danger-tertiary-hover-overlay: rgba(0, 0, 0, 0.04);
  --bui-button-danger-tertiary-active-overlay: rgba(0, 0, 0, 0.08);
  --bui-button-danger-tertiary-selected-fill: #FFFFFF;
  --bui-button-danger-tertiary-selected-text: #DE1135;
  --bui-button-danger-tertiary-loading-fill: transparent;
  --bui-button-danger-tertiary-spinner-foreground: #276EF1;
  --bui-button-danger-tertiary-spinner-background: #FFFFFF;

  /* Buttons - Outline */
  --bui-button-outline-fill: transparent;
  --bui-button-outline-text: #000000;
  --bui-button-outline-hover-overlay: rgba(0, 0, 0, 0.04);
  --bui-button-outline-active-overlay: rgba(0, 0, 0, 0.08);
  --bui-button-outline-selected-fill: transparent;
  --bui-button-outline-selected-text: #000000;
  --bui-button-outline-focus-fill: #E8E8E8;
  --bui-button-outline-loading-fill: transparent;
  --bui-button-outline-spinner-foreground: #276EF1;
  --bui-button-outline-spinner-background: #FFFFFF;

  /* Buttons - Disabled */
  --bui-button-disabled-fill: #F3F3F3;
  --bui-button-disabled-text: #A6A6A6;
  --bui-button-disabled-active-fill: #F3F3F3;
  --bui-button-disabled-active-text: #A6A6A6;
  --bui-button-disabled-spinner-foreground: #A6A6A6;
  --bui-button-disabled-spinner-background: #FFFFFF;

  /* Button Borders */
  --bui-button-outer-border: #000000;
  --bui-button-outline-outer-border: #F3F3F3;
  --bui-button-danger-tertiary-outer-border: #DE1135;
  --bui-button-inner-border: #FFFFFF;
  --bui-button-transparent-border: transparent;
  --bui-button-focus-outer-border: #276EF1;

  /* Breadcrumbs */
  --bui-breadcrumbs-text: #000000;
  --bui-breadcrumbs-separator-fill: #5E5E5E;

  /* Datepicker/Calendar */
  --bui-calendar-background: #FFFFFF;
  --bui-calendar-foreground: #000000;
  --bui-calendar-foreground-disabled: #A6A6A6;
  --bui-calendar-header-background: #FFFFFF;
  --bui-calendar-header-foreground: #000000;
  --bui-calendar-header-background-active: #000000;
  --bui-calendar-header-foreground-disabled: #A6A6A6;
  --bui-calendar-day-foreground-pseudo-selected: #000000;
  --bui-calendar-day-background-pseudo-selected-highlighted: #E8E8E8;
  --bui-calendar-day-foreground-pseudo-selected-highlighted: #000000;
  --bui-calendar-day-background-selected: #000000;
  --bui-calendar-day-foreground-selected: #FFFFFF;
  --bui-calendar-day-background-selected-highlighted: #000000;
  --bui-calendar-day-foreground-selected-highlighted: #FFFFFF;

  /* Combobox */
  --bui-combobox-list-item-focus: #F3F3F3;
  --bui-combobox-list-item-hover: #E8E8E8;

  /* File Uploader */
  --bui-file-uploader-background-color: #F3F3F3;
  --bui-file-uploader-background-color-active: #FFFFFF;
  --bui-file-uploader-border-color-active: #000000;
  --bui-file-uploader-border-color-default: #F3F3F3;
  --bui-file-uploader-message-color: #000000;

  /* Links */
  --bui-link-text: #000000;
  --bui-link-visited: #727272;
  --bui-link-hover: #4B4B4B;
  --bui-link-active: #5E5E5E;

  /* List */
  --bui-list-header-fill: #FFFFFF;
  --bui-list-body-fill: #FFFFFF;

  /* Progress Steps */
  --bui-progress-steps-completed-text: #FFFFFF;
  --bui-progress-steps-completed-fill: #000000;
  --bui-progress-steps-active-text: #FFFFFF;
  --bui-progress-steps-active-fill: #000000;

  /* Toggle */
  --bui-toggle-fill: #FFFFFF;
  --bui-toggle-fill-checked: #000000;
  --bui-toggle-fill-disabled: #A6A6A6;
  --bui-toggle-track-fill: #E8E8E8;
  --bui-toggle-track-fill-disabled: #F3F3F3;

  /* Tick/Checkbox */
  --bui-tick-fill: #FFFFFF;
  --bui-tick-fill-hover: #F3F3F3;
  --bui-tick-fill-active: #E8E8E8;
  --bui-tick-fill-selected: #000000;
  --bui-tick-fill-selected-hover: #282828;
  --bui-tick-fill-selected-hover-active: #4B4B4B;
  --bui-tick-fill-error: #FFFFFF;
  --bui-tick-fill-error-hover: #F3F3F3;
  --bui-tick-fill-error-hover-active: #E8E8E8;
  --bui-tick-fill-error-selected: #DE1135;
  --bui-tick-fill-error-selected-hover: #BB032A;
  --bui-tick-fill-error-selected-hover-active: #950F22;
  --bui-tick-fill-disabled: #F3F3F3;
  --bui-tick-border: #5E5E5E;
  --bui-tick-border-error: #DE1135;
  --bui-tick-mark-fill: #FFFFFF;
  --bui-tick-mark-fill-error: #FFFFFF;
  --bui-tick-mark-fill-disabled: #FFFFFF;

  /* Slider */
  --bui-slider-track-fill: transparent;
  --bui-slider-handle-fill: #000000;
  --bui-slider-handle-fill-disabled: #F3F3F3;
  --bui-slider-handle-inner-fill: #000000;
  --bui-slider-track-fill-hover: #DDDDDD;
  --bui-slider-track-fill-active: #C6C6C6;
  --bui-slider-track-fill-disabled: #F3F3F3;
  --bui-slider-handle-inner-fill-disabled: #F3F3F3;
  --bui-slider-handle-inner-fill-selected-hover: #282828;
  --bui-slider-handle-inner-fill-selected-active: #4B4B4B;

  /* Inputs */
  --bui-input-border: #F3F3F3;
  --bui-input-fill: #F3F3F3;
  --bui-input-fill-error: #FFFFFF;
  --bui-input-fill-disabled: #F3F3F3;
  --bui-input-fill-active: #FFFFFF;
  --bui-input-fill-positive: #FFFFFF;
  --bui-input-text-disabled: #A6A6A6;
  --bui-input-border-error: #DE1135;
  --bui-input-border-positive: #0E8345;
  --bui-input-enhancer-fill: #000000;
  --bui-input-enhancer-fill-disabled: #A6A6A6;
  --bui-input-enhancer-text-disabled: #A6A6A6;
  --bui-input-placeholder: #5E5E5E;
  --bui-input-placeholder-disabled: #A6A6A6;

  /* Menu */
  --bui-menu-fill: #FFFFFF;
  --bui-menu-fill-hover: #F3F3F3;
  --bui-menu-font-default: #000000;
  --bui-menu-font-disabled: #A6A6A6;
  --bui-menu-font-highlighted: #000000;
  --bui-menu-font-selected: #000000;

  /* Modal */
  --bui-modal-close-color: #000000;
  --bui-modal-close-color-hover: #282828;
  --bui-modal-close-color-focus: #4B4B4B;

  /* Tab */
  --bui-tab-bar-fill: #FFFFFF;
  --bui-tab-color: #5E5E5E;

  /* Notification */
  --bui-notification-info-background: #EFF4FE;
  --bui-notification-info-text: #000000;
  --bui-notification-positive-background: #EAF6ED;
  --bui-notification-positive-text: #000000;
  --bui-notification-warning-background: #FDF2DC;
  --bui-notification-warning-text: #000000;
  --bui-notification-negative-background: #FFF0EE;
  --bui-notification-negative-text: #000000;

  /* Tag - Neutral */
  --bui-tag-neutral-font-disabled: #E8E8E8;
  --bui-tag-neutral-outlined-disabled: #E8E8E8;
  --bui-tag-neutral-solid-font: #FFFFFF;
  --bui-tag-neutral-solid-background: #727272;
  --bui-tag-neutral-outlined-background: #F3F3F3;
  --bui-tag-neutral-outlined-font: #5E5E5E;

  /* Tag - Primary */
  --bui-tag-primary-font-disabled: #C6C6C6;
  --bui-tag-primary-outlined-disabled: #E8E8E8;
  --bui-tag-primary-solid-font: #FFFFFF;
  --bui-tag-primary-solid-background: #727272;
  --bui-tag-primary-outlined-font-hover: #282828;
  --bui-tag-primary-outlined-font: #5E5E5E;
  --bui-tag-primary-outlined-background: #F3F3F3;

  /* Tag - Accent */
  --bui-tag-accent-font-disabled: #A9C9FF;
  --bui-tag-accent-outlined-disabled: #CDDEFF;
  --bui-tag-accent-solid-font: #FFFFFF;
  --bui-tag-accent-solid-background: #276EF1;
  --bui-tag-accent-outlined-background: #EFF4FE;
  --bui-tag-accent-outlined-font: #175BCC;

  /* Tag - Positive */
  --bui-tag-positive-font-disabled: #7FD99A;
  --bui-tag-positive-outlined-disabled: #A8E4BA;
  --bui-tag-positive-solid-font: #FFFFFF;
  --bui-tag-positive-solid-background: #0E8345;
  --bui-tag-positive-outlined-background: #EAF6ED;
  --bui-tag-positive-outlined-font: #166C3B;

  /* Tag - Warning */
  --bui-tag-warning-font-disabled: #FFFADE;
  --bui-tag-warning-outlined-disabled: #FFFADE;
  --bui-tag-warning-solid-font: #6B4100;
  --bui-tag-warning-solid-background: #FFD688;
  --bui-tag-warning-outlined-background: #FDF2DC;
  --bui-tag-warning-outlined-font: #845201;

  /* Tag - Negative */
  --bui-tag-negative-font-disabled: #FFB2AB;
  --bui-tag-negative-outlined-disabled: #FFD2CD;
  --bui-tag-negative-solid-font: #FFFFFF;
  --bui-tag-negative-solid-background: #DE1135;
  --bui-tag-negative-outlined-background: #FFF0EE;
  --bui-tag-negative-outlined-font: #BB032A;

  /* Table */
  --bui-table-head-background-color: #FFFFFF;
  --bui-table-background: #FFFFFF;
  --bui-table-striped-background: #F3F3F3;
  --bui-table-filter: #5E5E5E;
  --bui-table-filter-heading: #000000;
  --bui-table-filter-background: #FFFFFF;
  --bui-table-filter-footer-background: #F3F3F3;

  /* Toast */
  --bui-toast-text: #FFFFFF;
  --bui-toast-primary-text: #FFFFFF;
  --bui-toast-info-background: #276EF1;
  --bui-toast-info-text: #FFFFFF;
  --bui-toast-positive-background: #0E8345;
  --bui-toast-positive-text: #FFFFFF;
  --bui-toast-warning-background: #F6BC2F;
  --bui-toast-warning-text: #000000;
  --bui-toast-negative-background: #DE1135;
  --bui-toast-negative-text: #FFFFFF;

  /* Spinner */
  --bui-spinner-track-fill: #E8E8E8;

  /* Progress bar */
  --bui-progressbar-track-fill: #E8E8E8;

  /* Tooltip */
  --bui-tooltip-background: #2E2E2E;
  --bui-tooltip-text: #FFFFFF;

  /* Rating */
  --bui-rating-inactive-fill: #FFFFFF;
  --bui-rating-stroke: #000000;
}
`;

// Dark Theme CSS Variables
export const darkThemeCSS = `
[data-theme="dark"] {
  /* ========== Background ========== */
  --bui-background-primary: #000000;
  --bui-background-secondary: #161616;
  --bui-background-tertiary: #1F1F1F;
  --bui-background-inverse-primary: #FFFFFF;
  --bui-background-inverse-secondary: #E8E8E8;
  --bui-background-overlay: rgba(0, 0, 0, 0.7);
  --bui-background-accent-light: #002661;
  --bui-background-negative-light: #520810;
  --bui-background-warning-light: #392300;
  --bui-background-positive-light: #002F14;

  /* ========== Content/Text ========== */
  --bui-content-primary: #FFFFFF;
  --bui-content-secondary: #C6C6C6;
  --bui-content-tertiary: #A6A6A6;
  --bui-content-inverse-primary: #000000;
  --bui-content-inverse-secondary: #2E2E2E;
  --bui-content-inverse-tertiary: #545454;
  --bui-content-state-disabled: #727272;
  --bui-content-accent: #6DAAFB;
  --bui-content-negative: #FC7F79;
  --bui-content-warning: #FFC043;
  --bui-content-positive: #66D19E;

  /* ========== Border ========== */
  --bui-border-opaque: #161616;
  --bui-border-transparent: rgba(255, 255, 255, 0.08);
  --bui-border-selected: #FFFFFF;
  --bui-border-inverse-opaque: #C6C6C6;
  --bui-border-state-disabled: #161616;
  --bui-border-accent: #6DAAFB;
  --bui-border-accent-light: #1948A3;
  --bui-border-negative: #FC7F79;
  --bui-border-negative-light: #950F22;
  --bui-border-warning: #FFC043;
  --bui-border-warning-light: #6B4100;
  --bui-border-positive: #66D19E;
  --bui-border-positive-light: #0D572D;

  /* ========== Brand Tokens ========== */
  --bui-brand-background-secondary: #002661;
  --bui-brand-background-tertiary: #000000;
  --bui-brand-background-disabled: #002661;
  --bui-brand-content-primary: #6DAAFB;
  --bui-brand-content-on-secondary: #A9C9FF;
  --bui-brand-content-on-tertiary: #FFFFFF;
  --bui-brand-content-disabled: #1948A3;
  --bui-brand-border-accessible: #6DAAFB;
  --bui-brand-border-subtle: #1948A3;

  /* ========== Component Colors - Dark Theme Overrides ========== */

  /* Banner */
  --bui-banner-action-low-info: #182946;
  --bui-banner-action-low-negative: #621C20;
  --bui-banner-action-low-positive: #20402A;
  --bui-banner-action-low-warning: #4C3111;
  --bui-banner-action-high-info: #2D4775;
  --bui-banner-action-high-negative: #7F1F26;
  --bui-banner-action-high-positive: #2A5237;
  --bui-banner-action-high-warning: #624013;

  /* Bottom Navigation */
  --bui-bottom-navigation-text: #8C8C8C;

  /* Buttons - Primary */
  --bui-button-primary-hover: #ABABAB;
  --bui-button-primary-active: #8C8C8C;

  /* Buttons - Secondary */
  --bui-button-secondary-hover: #484848;
  --bui-button-secondary-active: #5D5D5D;

  /* Buttons - Tertiary */
  --bui-button-tertiary-hover: #292929;
  --bui-button-tertiary-active: #383838;

  /* Buttons - Danger Secondary */
  --bui-button-danger-secondary-text: #FC7F79;

  /* Buttons - Danger Tertiary */
  --bui-button-danger-tertiary-text: #FC7F79;

  /* Links */
  --bui-link-visited: #717171;
  --bui-link-hover: #ABABAB;
  --bui-link-active: #8C8C8C;

  /* Modal */
  --bui-modal-close-color-hover: #ABABAB;
  --bui-modal-close-color-focus: #8C8C8C;

  /* Tag - Neutral */
  --bui-tag-neutral-font-disabled: #5D5D5D;
  --bui-tag-neutral-outlined-disabled: #5D5D5D;
  --bui-tag-neutral-solid-font: #DEDEDE;
  --bui-tag-neutral-solid-background: #5D5D5D;
  --bui-tag-neutral-outlined-background: #292929;
  --bui-tag-neutral-outlined-font: #ABABAB;

  /* Tag - Primary */
  --bui-tag-primary-font-disabled: #5D5D5D;
  --bui-tag-primary-outlined-disabled: #5D5D5D;
  --bui-tag-primary-solid-font: #DEDEDE;
  --bui-tag-primary-solid-background: #5D5D5D;
  --bui-tag-primary-outlined-background: #292929;
  --bui-tag-primary-outlined-font: #ABABAB;

  /* Tag - Accent */
  --bui-tag-accent-font-disabled: #335BA3;
  --bui-tag-accent-outlined-disabled: #335BA3;
  --bui-tag-accent-solid-font: #DEDEDE;
  --bui-tag-accent-solid-background: #3F6EC5;
  --bui-tag-accent-outlined-background: #182946;
  --bui-tag-accent-outlined-font: #93B4EE;

  /* Tag - Positive */
  --bui-tag-positive-font-disabled: #306C44;
  --bui-tag-positive-outlined-disabled: #306C44;
  --bui-tag-positive-solid-font: #DEDEDE;
  --bui-tag-positive-solid-background: #3D8351;
  --bui-tag-positive-outlined-background: #162F1E;
  --bui-tag-positive-outlined-font: #8FC19C;

  /* Tag - Warning */
  --bui-tag-warning-font-disabled: #7A5616;
  --bui-tag-warning-outlined-disabled: #7A5616;
  --bui-tag-warning-solid-font: #211201;
  --bui-tag-warning-solid-background: #AE8523;
  --bui-tag-warning-outlined-background: #39240A;
  --bui-tag-warning-outlined-font: #D7AC57;

  /* Tag - Negative */
  --bui-tag-negative-font-disabled: #A32C34;
  --bui-tag-negative-outlined-disabled: #A32C34;
  --bui-tag-negative-solid-font: #DEDEDE;
  --bui-tag-negative-solid-background: #C33840;
  --bui-tag-negative-outlined-background: #4A1216;
  --bui-tag-negative-outlined-font: #EA9B98;

  /* Tick/Checkbox */
  --bui-tick-fill-hover: #292929;
  --bui-tick-fill-active: #383838;
  --bui-tick-fill-selected-hover: #C4C4C4;
  --bui-tick-fill-selected-hover-active: #ABABAB;
  --bui-tick-fill-error-hover: #292929;
  --bui-tick-fill-error-hover-active: #383838;
  --bui-tick-fill-error-selected-hover: #C33840;
  --bui-tick-fill-error-selected-hover-active: #A32C34;

  /* Slider */
  --bui-slider-track-fill-hover: #484848;
  --bui-slider-track-fill-active: #5D5D5D;
  --bui-slider-handle-inner-fill-selected-hover: #8C8C8C;
  --bui-slider-handle-inner-fill-selected-active: #ABABAB;

  /* Rating */
  --bui-rating-inactive-fill: #717171;
  --bui-rating-stroke: #ABABAB;
}
`;
