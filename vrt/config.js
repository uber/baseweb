/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

const config = {
  'app-nav-bar': {
    interactions: [
      {
        name: 'openedMenu',
        behavior: async page => {
          const drawerMenuSelector = `[data-baseweb="button"] [data-baseweb="icon"]`;
          const userMenuSelector = `[data-baseweb="button"] [data-baseweb="avatar"]`;
          const menuSelector = `[data-baseweb="menu"]`;
          let menuToClickOn = userMenuSelector;
          await page.waitForSelector('body');
          // the large breakpoint from the theme is 1136
          if (page.viewport().width < 1136) {
            menuToClickOn = drawerMenuSelector;
          }
          await page.waitForSelector(menuToClickOn, {visible: true});
          await page.click(menuToClickOn);
          await page.waitForSelector(menuSelector, {
            visible: true,
          });
        },
      },
    ],
  },
  'country-select-dropdown': {
    interactions: [
      {
        name: 'expanded',
        behavior: async page => {
          const selectSelector = `[data-baseweb="select"]`;
          const dropdownSelector = `[data-baseweb="menu"]`;
          const flagOptionSelector = `li[role="option"] [data-iso="US"]`;
          await page.waitForSelector(selectSelector);
          await page.click(selectSelector);
          await page.waitForSelector(dropdownSelector, {
            visible: true,
          });
          await page.waitForSelector(flagOptionSelector, {
            visible: true,
          });
        },
      },
    ],
  },
  'country-select-small-dropdown': {
    interactions: [
      {
        name: 'expanded',
        behavior: async page => {
          const selectSelector = `[data-baseweb="select"]`;
          const dropdownSelector = `[data-baseweb="menu"]`;
          const flagOptionSelector = `li[role="option"] [data-iso="US"]`;
          await page.waitForSelector(selectSelector);
          await page.click(selectSelector);
          await page.waitForSelector(dropdownSelector, {
            visible: true,
          });
          await page.waitForSelector(flagOptionSelector, {
            visible: true,
          });
        },
      },
    ],
  },
  combobox: {
    interactions: [
      {
        name: 'listboxOpen',
        behavior: async page => {
          const input = await page.$('input');
          await input.focus();
          await page.keyboard.press('a');
        },
      },
    ],
  },
  'combobox-overrides': {
    interactions: [
      {
        name: 'listboxOpen',
        behavior: async page => {
          const input = await page.$('input');
          await input.focus();
          await page.keyboard.press('a');
        },
      },
    ],
  },
  'data-table-extracted-highlight': {
    interactions: [
      {
        name: 'controlledRowHighlightIndex',
        behavior: async page => {
          await Promise.all(
            Array.from({length: 4}).map(() => page.keyboard.press('j')),
          );
        },
      },
      {
        name: 'rowHighlightScrollsTableDown',
        behavior: async page => {
          await Promise.all(
            Array.from({length: 20}).map(() => page.keyboard.press('j')),
          );
        },
      },
      {
        name: 'rowHighlightScrollsTableUp',
        behavior: async page => {
          await Promise.all(
            Array.from({length: 20}).map(() => page.keyboard.press('j')),
          );
          await Promise.all(
            Array.from({length: 15}).map(() => page.keyboard.press('k')),
          );
        },
      },
    ],
  },
  datepicker: {
    interactions: [
      {
        name: 'setDateHighlighted',
        behavior: async page => {
          const button = '[data-baseweb="button"]';
          const input = 'input';
          const calendar = '[data-baseweb="calendar"]';
          await page.waitForSelector(button);
          await page.click(button);
          await page.waitForSelector(input);
          await page.click(input);
          await page.waitForSelector(calendar, {
            visible: true,
          });
        },
      },
    ],
  },
  'datepicker-rtl': {
    interactions: [
      {
        name: 'calendarOpened',
        behavior: async page => {
          const input = 'input';
          const calendar = '[data-baseweb="calendar"]';
          await page.waitForSelector(input);
          await page.click(input);
          await page.waitForSelector(calendar, {
            visible: true,
          });
        },
      },
    ],
  },
  'datepicker-range': {
    interactions: [
      {
        name: 'selectedRangeHighlighted',
        behavior: async page => {
          const input = 'input';
          const calendar = '[data-baseweb="calendar"]';
          const startDay =
            '[aria-label="Choose Sunday, March 10th 2019. It\'s available."]';
          const endDay =
            '[aria-label="Choose Wednesday, March 20th 2019. It\'s available."]';
          await page.waitForSelector(input);
          await page.click(input);
          await page.waitForSelector(calendar, {
            visible: true,
          });
          await page.click(startDay);
          await page.click(endDay);
          await page.waitForSelector(calendar, {
            hidden: true,
          });
          await page.waitForSelector(input);
          await page.click(input);
          await page.waitForSelector(calendar, {
            visible: true,
          });
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
          const calendar = '[data-baseweb="calendar"]';
          const rightArrow = `[aria-label="Next month."]`;
          await page.waitForSelector(input);
          await page.click(input);
          await page.waitForSelector(calendar, {
            visible: true,
          });
          await page.click(rightArrow);
          await page.waitForFunction(
            `document.querySelector("button[aria-haspopup]").innerText === 'April 2019'`,
          );
        },
      },
    ],
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
  'input-number': {
    interactions: [
      {
        name: 'numberInput',
        behavior: async page => {
          const toggleSelector = `input`;
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
  'nav-long': {
    skip: true,
  },
  'popover-reposition': {
    skip: true,
  },
  'phone-input-custom-flags': {
    interactions: [
      {
        name: 'expandedAndFiltered',
        behavior: async page => {
          const selectSelector = `[data-baseweb="select"]`;
          const selectInputSelector = `input[role="combobox"]`;
          const dropdownSelector = `[role="listbox"]`;
          await page.waitForSelector(selectSelector);
          await page.click(selectSelector);
          await page.waitForSelector(dropdownSelector, {
            visible: true,
          });
          await page.type(selectInputSelector, 'zzz');
        },
      },
    ],
  },
  'pin-code-mask': {
    interactions: [
      {
        name: 'numberInput',
        behavior: async page => {
          const inputSelector = 'input';
          await page.focus(inputSelector);
          await page.keyboard.press('1');
          await page.keyboard.press('2');
          await page.keyboard.press('3');
          await page.keyboard.press('4');
        },
      },
    ],
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
  'drawer-select': {
    interactions: [
      {
        name: 'selectDropdownVisible',
        behavior: async page => {
          const selectSelector = `[data-baseweb="select"] input`;
          const dropdownSelector = `[role="listbox"]`;
          await page.waitForSelector(selectSelector);
          await page.click(selectSelector);
          await page.waitForSelector(dropdownSelector, {
            visible: true,
          });
        },
      },
    ],
  },
  select: {
    interactions: [
      {
        name: 'typeToFilter',
        behavior: async page => {
          const selectSelector = `[data-baseweb="select"] input`;
          await page.type(selectSelector, 'aq');
        },
      },
    ],
  },
  'select-in-modal': {
    interactions: [
      {
        name: 'selectDropdownVisible',
        behavior: async page => {
          const buttonSelector = `[data-baseweb="button"]`;
          const selectSelector = `[data-baseweb="select"] input`;
          const dropdownSelector = `[role="listbox"]`;
          await page.waitForSelector(buttonSelector);
          // open modal
          await page.click(buttonSelector);
          await page.waitForSelector(selectSelector);
          // open select dropdown
          await page.click(selectSelector);
          await page.waitForSelector(dropdownSelector, {
            visible: true,
          });
        },
      },
    ],
  },
  'select-option-group': {
    interactions: [
      {
        name: 'selectGroupDropdownVisible',
        behavior: async page => {
          const inputSelector = `[data-baseweb="select"]`;
          const dropdownSelector = `[role="listbox"]`;
          await page.waitForSelector(inputSelector);
          await page.click(inputSelector);
          await page.waitForSelector(dropdownSelector, {
            visible: true,
          });
        },
      },
    ],
  },
  'select-search-single': {
    interactions: [
      {
        name: 'open',
        behavior: async page => {
          const inputSelector = `[data-baseweb="select"]`;
          const dropdownSelector = `[role="listbox"]`;
          await page.waitForSelector(inputSelector);
          await page.click(inputSelector);
          await page.waitForSelector(dropdownSelector, {
            visible: true,
          });
        },
      },
    ],
  },
  'select-search-single-fontsize': {
    interactions: [
      {
        name: 'showsAllText',
        behavior: async page => {
          const inputSelector = `[data-baseweb="select"]`;
          const selectInputSelector = `input[role="combobox"]`;
          const dropdownSelector = `[role="listbox"]`;
          await page.waitForSelector(inputSelector);
          await page.click(inputSelector);
          await page.waitForSelector(dropdownSelector, {
            visible: true,
          });
          await page.type(selectInputSelector, 'zzz');
        },
      },
    ],
  },
  'spinner-determinate-animated': {
    skip: true,
  },
  'tabs-motion-conditional': {
    skip: true,
  },
  'tabs-motion-focus': {
    skip: true,
  },
  'tabs-motion-manual': {
    skip: true,
  },
  'tabs-motion-stateful': {
    skip: true,
  },
  'tabs-motion-renderAll': {
    skip: true,
  },
  'tabs-motion-vertical-pageScroll': {
    interactions: [
      {
        name: 'ArrowDown',
        behavior: async page => {
          const tab = await page.$('[role=tab]');
          await tab.focus();
          await page.keyboard.press('ArrowDown');
        },
      },
    ],
  },
  'tabs-motion': {
    interactions: [
      {
        name: 'focus',
        behavior: async page => {
          const tab = await page.$('[role=tab]');
          await tab.focus();
        },
      },
    ],
  },
  textarea: {
    interactions: [
      {
        name: 'focus',
        behavior: async page => {
          const input = await page.$('input');
          await input.focus();
        },
      },
    ],
  },
  'toaster-focus': {
    skip: true,
  },
  'tooltip-complex': {
    interactions: [
      {
        name: 'contrast',
        behavior: async page => {
          const tooltipSelector = 'span';
          const tooltipPopoverSelector = '[data-baseweb="tooltip"]';
          await page.hover(tooltipSelector);
          await page.waitForSelector(tooltipPopoverSelector, {
            visible: true,
          });
        },
      },
    ],
  },
  'modal-select': {
    interactions: [
      {
        name: 'selectOption',
        behavior: async page => {
          const selectSelector = '[data-baseweb="select"] input';
          const dropdownSelector = '[role="listbox"]';
          const dropdownOptionSelector = '[role="option"]';
          const firstOption = `${dropdownSelector} ${dropdownOptionSelector}:nth-child(1)`;
          await page.waitForSelector(selectSelector);
          await page.click(selectSelector);
          await page.waitForSelector(dropdownSelector, {
            visible: true,
          });
          await page.click(firstOption);
          await page.waitForSelector(dropdownSelector, {
            hidden: true,
          });
        },
      },
    ],
  },
};

function getSnapshotConfig(scenarioName) {
  const defaultConfig = {
    skip: false,
    interactions: [],
  };
  const snapshotConfig = config[scenarioName];
  if (!snapshotConfig) {
    return defaultConfig;
  } else {
    return {
      ...defaultConfig,
      ...snapshotConfig,
    };
  }
}

module.exports = {
  config,
  getSnapshotConfig,
};
