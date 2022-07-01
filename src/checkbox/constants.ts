/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable import/prefer-default-export */

export const STATE_TYPE = {
  change: 'CHANGE',
};

export const STYLE_TYPE = Object.freeze({
  default: 'default',
  toggle: 'toggle',
  // maintaining key with aliased value to assist in transition to v11 but will be removed soon after release
  toggle_round: 'toggle',
});

export const LABEL_PLACEMENT = Object.freeze({
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
});

/* eslint-enable import/prefer-default-export */
