/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/*
  This file should be used for adding new card type configuration
*/

const UATP_CARD_TYPE_CONFIG = {
  niceType: 'Uatp',
  type: 'uatp',
  patterns: [[1001, 1999]],
  gaps: [4, 9],
  lengths: [15],
  code: {
    name: 'CVV',
    size: 0,
  },
};

export const CUSTOM_CARDS_CONFIGURATION = [UATP_CARD_TYPE_CONFIG];
