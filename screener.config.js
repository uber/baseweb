/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const Pagination = require('./src/pagination/examples-list');
const Popover = require('./src/popover/examples-list');
const Radio = require('./src/radio/examples-list');
const Rating = require('./src/rating/examples-list');
const Select = require('./src/select/examples-list');
const Slider = require('./src/slider/examples-list');
const Textarea = require('./src/textarea/examples-list');
const Toast = require('./src/toast/examples-list');
const ProgressStep = require('./src/progress-steps/examples-list');

module.exports = {
  projectRepo: 'uber-web/baseui',
  storybookConfigDir: '.storybook',
  apiKey: process.env.SCREENER_API_KEY,
  resolution: '1024x768',
  baseBranch: 'master',
  includeRules: [
    new RegExp(Pagination.STATEFUL_PAGINATION),
    new RegExp(Popover.SIMPLE_EXAMPLE),
    new RegExp(Radio.SIMPLE_EXAMPLE),
    new RegExp(Rating.DEFAULT),
    new RegExp(Rating.EMOTICON),
    new RegExp(Select.MULTI_SELECT),
    new RegExp(Select.SINGLE_SELECT_SEARCH),
    new RegExp(Slider.AS_SIMPLE_RANGE_SLIDER),
    new RegExp(Textarea.STATE_EXAMPLE),
    new RegExp(Toast.TOAST_EXAMPLE),
    new RegExp(ProgressStep.DEFAULT),
    new RegExp(ProgressStep.NUMBERED),
  ],
  failureExitCode: 0,
};
