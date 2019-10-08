module.exports = {
  'country-select-dropdown': [
    {
      name: 'expanded',
      behavior: async page => {
        const selectSelector = `[data-baseweb="select"]`;
        page.waitFor(selectSelector);
        page.click(selectSelector);
      },
    },
  ],
  'country-select-small-dropdown': [
    {
      name: 'expanded',
      behavior: async page => {
        const selectSelector = `[data-baseweb="select"]`;
        page.waitFor(selectSelector);
        page.click(selectSelector);
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
        await page.waitFor(input);
        await page.click(input);
        await page.waitFor(calendar);
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
        await page.waitFor(btnZIndex);
        await page.click(btnZIndex);
        await page.waitFor(layerZIndex);
        await page.click(btnNoZIndex);
        await page.waitFor(layerNoZIndex);
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
        await page.waitFor(buttonSelector);
        await page.click(buttonSelector);
        await page.waitFor(selectSelector);
        await page.click(selectSelector);
      },
    },
  ],
  'select-search-single': [
    {
      name: 'open',
      behavior: async page => {
        const selector = `[data-baseweb="select"] input`;
        page.waitFor(selector);
        page.click(selector);
      },
    },
  ],
};
