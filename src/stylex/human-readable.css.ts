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
}
`;
