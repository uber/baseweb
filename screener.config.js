/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const Accordion = require('./src/accordion/examples-list');
const Button = require('./src/button/examples-list');
const Card = require('./src/card/examples-list');
const Checkbox = require('./src/checkbox/examples-list');
const Input = require('./src/input/examples-list');
const Modal = require('./src/modal/examples-list');
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
  storybookConfigDir: '.storybook-move',
  apiKey: process.env.SCREENER_API_KEY,
  resolution: '1024x768',
  baseBranch: 'master',
  includeRules: [
    new RegExp(`${Accordion.ACCORDION_EXAMPLE}$`),
    new RegExp(Button.BUTTON_COMPACT_WITH_ENHANCERS),
    new RegExp(Button.BUTTON_WITH_ENHANCERS),
    new RegExp(Card.TEXT_IMAGE_LINK),
    new RegExp(Card.TEXT_ONLY),
    new RegExp(Checkbox.SIMPLE_EXAMPLE),
    /Checkbox as toggle example/,
    /Icons in Button/,
    new RegExp(Input.SIMPLE_EXAMPLE),
    new RegExp(Input.VALUE_EXAMPLE),
    /Stateless Menu/,
    new RegExp(`${Modal.SIMPLE_EXAMPLE}$`),
    new RegExp(Pagination.STATEFUL_PAGINATION),
    new RegExp(Popover.SIMPLE_EXAMPLE),
    new RegExp(Radio.SIMPLE_EXAMPLE),
    new RegExp(Rating.DEFAULT),
    new RegExp(Rating.EMOTICON),
    new RegExp(Select.MULTI_SELECT),
    new RegExp(Slider.AS_SIMPLE_RANGE_SLIDER),
    new RegExp(Textarea.STATE_EXAMPLE),
    new RegExp(Toast.SIMPLE_EXAMPLE),
    new RegExp(ProgressStep.DEFAULT),
  ],
  failureExitCode: 0,
};
