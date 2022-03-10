/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

const config = {
  'app-nav-bar--app-nav-bar': {
    interactions: [
      {
        name: 'openedMenu',
        behavior: async (page) => {
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
  'phone-input--country-select-dropdown': {
    interactions: [
      {
        name: 'expanded',
        behavior: async (page) => {
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
  'phone-input--country-select-small-dropdown': {
    interactions: [
      {
        name: 'expanded',
        behavior: async (page) => {
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
  'combobox--combobox': {
    interactions: [
      {
        name: 'listboxOpen',
        behavior: async (page) => {
          const input = await page.$('input');
          await input.focus();
          await page.keyboard.press('a');
        },
      },
    ],
  },
  'combobox--overrides': {
    interactions: [
      {
        name: 'listboxOpen',
        behavior: async (page) => {
          const input = await page.$('input');
          await input.focus();
          await page.keyboard.press('a');
        },
      },
    ],
  },
  'data-table--add-remove-columns': {
    interactions: [
      {
        name: 'addColumn',
        behavior: async (page) => {
          const button = '[data-testid="add"]';
          await page.waitForSelector(button);
          await page.click(button);
        },
      },
      {
        name: 'removeColumn',
        behavior: async (page) => {
          const button = '[data-testid="remove"]';
          await page.waitForSelector(button);
          await page.click(button);
        },
      },
    ],
  },
  'data-table--extracted-highlight': {
    interactions: [
      {
        name: 'controlledRowHighlightIndex',
        behavior: async (page) => {
          await Promise.all(
            Array.from({length: 4}).map(() => page.keyboard.press('j')),
          );
        },
      },
      {
        name: 'rowHighlightScrollsTableDown',
        behavior: async (page) => {
          await Promise.all(
            Array.from({length: 20}).map(() => page.keyboard.press('j')),
          );
        },
      },
      {
        name: 'rowHighlightScrollsTableUp',
        behavior: async (page) => {
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
  'data-table--numerical-column': {
    interactions: [
      {
        name: 'single',
        behavior: async (page) => {
          const button = '[aria-label="Single Value"]';
          await page.waitForSelector(button, {
            visible: true,
          });
          await page.click(button);
        },
      },
    ],
  },
  'datepicker--datepicker': {
    interactions: [
      {
        name: 'setDateHighlighted',
        behavior: async (page) => {
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
  'datepicker--rtl': {
    interactions: [
      {
        name: 'calendarOpened',
        behavior: async (page) => {
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
  'datepicker--range': {
    interactions: [
      {
        name: 'selectedRangeHighlighted',
        behavior: async (page) => {
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
  'datepicker--range-highlight': {
    interactions: [
      {
        name: 'noHighlight',
        behavior: async (page) => {
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
            `document.querySelector("button[aria-haspopup]").innerText === 'April'`,
          );
        },
      },
    ],
  },
  'input--password': {
    interactions: [
      {
        name: 'togglesMask',
        behavior: async (page) => {
          const toggleSelector = `[data-e2e="mask-toggle"]`;
          await page.$(toggleSelector);
          await page.click(toggleSelector);
        },
      },
    ],
  },
  'input--number': {
    interactions: [
      {
        name: 'numberInput',
        behavior: async (page) => {
          const toggleSelector = `input`;
          await page.$(toggleSelector);
          await page.click(toggleSelector);
        },
      },
    ],
  },
  'layer--z-index': {
    interactions: [
      {
        name: 'withAndWithoutZIndex',
        behavior: async (page) => {
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
  'side-navigation--nav-long': {
    skip: true,
  },
  'snackbar--element': {
    skip: true,
  },
  //Ref: https://github.com/uber/baseweb/issues/4557
  'popover--focus-loop': {
    interactions: [
      {
        name: 'keyboardNav',
        behavior: async (page) => {
          await page.keyboard.press('Tab');
        },
      },
    ],
  },
  // Ref: https://github.com/uber/baseweb/issues/4693
  'popover--hover': {
    interactions: [
      {
        name: 'positions-content-correctly-on-first-render',
        behavior: async (page) => {
          await page.hover('button');
          await page.waitForSelector('#content');
        },
      },
    ],
  },
  'popover--progress-bar': {
    interactions: [
      {
        name: 'popover-shows-when-progress-bar-is-hovered',
        behavior: async (page) => {
          await page.hover('[data-baseweb="progress-bar"]');
          await page.waitForSelector('[data-baseweb="typo-paragraphsmall"]');
        },
      },
    ],
  },
  'popover--reposition': {
    skip: true,
  },
  'popover--prevent-scroll-on-focus': {
    interactions: [
      {
        name: 'scrollDownAndCheckIfPreventScrollPreventsReScrollOnPopover',
        behavior: async (page) => {
          await page.waitForSelector('button');

          // Open Popover
          await page.click('button');
          await page.waitForSelector('div[data-e2e="content"]');

          // Close Popover
          await page.click('button');
          await page.waitForSelector('div[data-e2e="content"]', {hidden: true});

          // Scroll to the last div
          await page.evaluate(() =>
            // eslint-disable-next-line cup/no-undef
            document.querySelector('div[data-e2e-spacer="1"]').scrollIntoView(),
          );

          // Listening to Scroll Event to determine if the page is still scrolling
          // Could wait for few seconds but that would be unreliable
          await page.evaluate(() => {
            function scrollHandler() {
              // Disabling eslint checks on window / document as they would be executed in puppeteer
              /* eslint-disable cup/no-undef */
              window.isPageScrolling = true;
              clearTimeout(window.scrollTimer);
              window.scrollTimer = setTimeout(() => {
                window.isPageScrolling = false;
                window.removeEventListener('scroll', scrollHandler);
              }, 100);
            }
            window.addEventListener('scroll', scrollHandler);
            /* eslint-enable cup/no-undef */
          });

          // Waiting for scroll to end
          await page.waitForFunction('window.isPageScrolling === false');

          // Clicking on button to show Popover
          await page.click('button');
          await page.waitForSelector('div[data-e2e="content"]');
        },
      },
    ],
  },
  'popover--reposition-with-anchor-update': {
    interactions: [
      {
        name: 'addOptions',
        behavior: async (page) => {
          const options = await page.$$('[role="option"]');
          await options[0].click();
          await options[1].click();
        },
      },
    ],
  },
  'phone-input--custom-flags': {
    interactions: [
      {
        name: 'expandedAndFiltered',
        behavior: async (page) => {
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
  'pin-code--mask': {
    interactions: [
      {
        name: 'numberInput',
        behavior: async (page) => {
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
  'progress-bar--progressbar-rounded-animated': {
    //Animation is in JS, so it can't be disabled
    skip: true,
  },
  'progress-steps--progress-steps': {
    interactions: [
      {
        name: 'triggerNextStep',
        behavior: async (page) => {
          const selector = `button:enabled`;
          await page.$(selector);
          await page.click(selector);
        },
      },
    ],
  },
  'rating--star': {
    interactions: [
      {
        name: 'selectFiveStars',
        behavior: async (page) => {
          const selector = `li:nth-child(5)`;
          await page.$(selector);
          await page.click(selector);
          await page.waitForTimeout(200);
        },
      },
    ],
  },
  'drawer--select': {
    interactions: [
      {
        name: 'selectDropdownVisible',
        behavior: async (page) => {
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
  'select--select': {
    interactions: [
      {
        name: 'typeToFilter',
        behavior: async (page) => {
          const selectSelector = `[data-baseweb="select"] input`;
          await page.type(selectSelector, 'aq');
        },
      },
    ],
  },
  'select--in-modal': {
    interactions: [
      {
        name: 'selectDropdownVisible',
        behavior: async (page) => {
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
  'select--option-group': {
    interactions: [
      {
        name: 'selectGroupDropdownVisible',
        behavior: async (page) => {
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
  'select--search-single': {
    interactions: [
      {
        name: 'open',
        behavior: async (page) => {
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
  'select--search-single-fontsize': {
    interactions: [
      {
        name: 'showsAllText',
        behavior: async (page) => {
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
  'spinner--determinate-animated': {
    skip: true,
  },
  'tabs-motion--conditional': {
    skip: true,
  },
  'tabs-motion--focus': {
    skip: true,
  },
  'tabs-motion--manual': {
    skip: true,
  },
  'tabs-motion--stateful': {
    skip: true,
  },
  'tabs-motion--render-all': {
    skip: true,
  },
  'tabs-motion--vertical-page-scroll': {
    interactions: [
      {
        name: 'ArrowDown',
        behavior: async (page) => {
          const tab = await page.$('[role=tab]');
          await tab.focus();
          await page.keyboard.press('ArrowDown');
        },
      },
    ],
  },
  'tabs-motion--tabs-motion': {
    interactions: [
      {
        name: 'focus',
        behavior: async (page) => {
          const tab = await page.$('[role=tab]');
          await tab.focus();
        },
      },
    ],
  },
  'textarea--textarea': {
    interactions: [
      {
        name: 'focus',
        behavior: async (page) => {
          const element = await page.$('textarea');
          await element.focus();
        },
      },
    ],
  },
  'toast--toaster-focus': {
    skip: true,
  },
  'tooltip--complex': {
    interactions: [
      {
        name: 'contrast',
        behavior: async (page) => {
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
  'modal--select': {
    interactions: [
      {
        name: 'selectOption',
        behavior: async (page) => {
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
