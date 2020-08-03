/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

'use strict';

module.exports = {
  replace: {
    id: 'replace',
    message: `"{{ old }}" is deprecated and can be replaced with "{{ new }}".`,
  },
  deprecateThemeProperty: {
    id: 'deprecateThemeProperty',
    message: `The theme property, "{{ old }}", is deprecated.`,
  },
  replaceThemeProperty: {
    id: 'replaceThemeProperty',
    message: `The theme property, "{{ old }}", is deprecated and can be replaced with "{{ new }}".`,
  },
  deprecateSpinner: {
    id: 'deprecateSpinner',
    message: `The "Spinner" component has been deprecated in favor of "StyledSpinnerNext". In v11 of baseui, "Spinner" will be removed and "StyledSpinnerNext" will be renamed to "Spinner".`,
  },
  styleOnBlock: {
    id: 'styleOnBlock',
    message: `"$style" and "style" are not supported props for the "Block" component. Please use "overrides.Block" to pass styles down to the root element.`,
  },
  buttonKindMinimal: {
    id: 'buttonKindMinimal',
    message: `The "minimal" option for the Button "kind" prop is deprecated in favor of "tertiary". In v11 of baseui, "minimal" will be removed.`,
  },
  modalBackdrop: {
    id: 'modalBackdrop',
    message: `"Backdrop" has been deprecated as an override property. In v11 of baseui, "Backdrop" will be removed in favor of "DialogContainer".`,
  },
};
