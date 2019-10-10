/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

module.exports = {
  'country-select-dropdown': {
    fullPage: true,
    interactions: [
      {
        name: 'expanded',
        behavior: async page => {
          const selectSelector = `[data-baseweb="select"]`;
          const dropdownSelector = `[data-baseweb="menu"]`;
          page.waitForSelector(selectSelector);
          page.click(selectSelector);
          page.waitForSelector(dropdownSelector);
          await page.waitFor(1000);
        },
      },
    ],
  },
  'country-select-small-dropdown': {
    fullPage: true,
    interactions: [
      {
        name: 'expanded',
        behavior: async page => {
          const selectSelector = `[data-baseweb="select"]`;
          const dropdownSelector = `[data-baseweb="menu"]`;
          page.waitForSelector(selectSelector);
          page.click(selectSelector);
          page.waitForSelector(dropdownSelector);
          await page.waitFor(1000);
        },
      },
    ],
  },
  'datepicker-range-highlight': {
    interactions: [
      {
        name: 'noHighlight',
        behavior: async page => {
          const input = `input`;
          const calendar = `[role="application"]`;
          const rightArrow = `[aria-label="Next month"]`;
          await page.waitForSelector(input);
          await page.click(input);
          await page.waitForSelector(calendar);
          await page.click(rightArrow);
        },
      },
    ],
  },
  drawer: {
    fullPage: true,
  },
  'drawer-select': {
    fullPage: true,
  },
  'drawer-rtl': {
    fullPage: true,
  },
  'input-password': {
    interactions: [
      {
        name: 'togglesMask',
        behavior: async page => {
          const toggleSelector = `[data-e2e="mask-toggle"]`;
          await page.$(toggleSelector);
          await page.click(toggleSelector);
        },
      },
    ],
  },
  'layer-z-index': {
    interactions: [
      {
        name: 'withAndWithoutZIndex',
        behavior: async page => {
          const btnZIndex = `[data-test="zindex-btn"]`;
          const btnNoZIndex = `[data-test="no-zindex-btn"]`;
          const layerZIndex = `[data-test="zindex-layer"]`;
          const layerNoZIndex = `[data-test="no-zindex-layer"]`;
          await page.waitForSelector(btnZIndex);
          await page.click(btnZIndex);
          await page.waitForSelector(layerZIndex);
          await page.click(btnNoZIndex);
          await page.waitForSelector(layerNoZIndex);
        },
      },
    ],
  },
  modal: {
    fullPage: true,
  },
  'modal-select': {
    fullPage: true,
  },
  'modal-rtl': {
    fullPage: true,
  },
  'nav-long': {
    skip: true,
  },
  popover: {
    fullPage: true,
  },
  'popover-click': {
    fullPage: true,
  },
  'popover-hover': {
    fullPage: true,
  },
  'progress-steps': {
    interactions: [
      {
        name: 'triggerNextStep',
        behavior: async page => {
          const selector = `button:enabled`;
          await page.$(selector);
          await page.click(selector);
        },
      },
    ],
  },
  'rating-star': {
    interactions: [
      {
        name: 'selectFiveStars',
        behavior: async page => {
          const selector = `li:nth-child(5)`;
          await page.$(selector);
          await page.click(selector);
        },
      },
    ],
  },
  'select-in-modal': {
    fullPage: true,
    interactions: [
      {
        name: 'opens',
        behavior: async page => {
          const buttonSelector = `[data-baseweb="button"]`;
          const selectSelector = `[data-baseweb="select"] input`;
          const dropdownSelector = `[role="listbox"]`;
          await page.waitForSelector(buttonSelector);
          await page.click(buttonSelector);
          await page.waitForSelector(selectSelector);
          await page.click(selectSelector);
          await page.waitForSelector(dropdownSelector);
        },
      },
    ],
  },
  toaster: {
    fullPage: true,
  },
  tooltip: {
    fullPage: true,
  },
  'select-search-single': {
    interactions: [
      {
        name: 'open',
        fullPage: true,
        behavior: async page => {
          const inputSelector = `[data-baseweb="select"]`;
          const dropdownSelector = `[role="listbox"]`;
          page.waitForSelector(inputSelector);
          page.click(inputSelector);
          page.waitForSelector(dropdownSelector);
          await page.waitFor(2000);
        },
      },
    ],
  },
};
