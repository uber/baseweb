module.exports = {
  'country-select-dropdown': [
    {
      name: 'expanded',
      behavior: async page => {
        const selectSelector = `[data-baseweb="select"]`;
        const dropdownSelector = `[data-baseweb="menu"]`;
        page.waitForSelector(selectSelector);
        page.click(selectSelector);
        page.waitForSelector(dropdownSelector);
      },
    },
  ],
  'country-select-small-dropdown': [
    {
      name: 'expanded',
      behavior: async page => {
        const selectSelector = `[data-baseweb="select"]`;
        const dropdownSelector = `[data-baseweb="menu"]`;
        page.waitForSelector(selectSelector);
        page.click(selectSelector);
        page.waitForSelector(dropdownSelector);
      },
    },
  ],
  'datepicker-range-highlight': [
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
  'input-password': [
    {
      name: 'togglesMask',
      behavior: async page => {
        const toggleSelector = `[data-e2e="mask-toggle"]`;
        await page.$(toggleSelector);
        await page.click(toggleSelector);
      },
    },
  ],
  'layer-z-index': [
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
  'progress-steps': [
    {
      name: 'triggerNextStep',
      behavior: async page => {
        const selector = `button:enabled`;
        await page.$(selector);
        await page.click(selector);
      },
    },
  ],
  'rating-star': [
    {
      name: 'selectFiveStars',
      behavior: async page => {
        const selector = `li:nth-child(5)`;
        await page.$(selector);
        await page.click(selector);
      },
    },
  ],
  'select-in-modal': [
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
  'select-search-single': [
    {
      name: 'open',
      behavior: async page => {
        const inputSelector = `[data-baseweb="select"]`;
        const dropdownSelector = `[role="listbox"]`;
        page.waitForSelector(inputSelector);
        page.click(inputSelector);
        page.waitForSelector(dropdownSelector);
      },
    },
  ],
};
