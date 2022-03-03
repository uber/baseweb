/*
Copyright (c) Uber Technologies, Inc.

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
  progressBarSuccessValue: {
    id: 'progressBarSuccessValue',
    message:
      'The "successValue" prop has been deprecated. The "value" prop should be normalized as though "successValue" was always set to 100.',
  },
  selectSearchIcon: {
    id: 'selectSearchIcon',
    message:
      'The "SearchIcon" override will be removed in favor of "StyledSearchIconContainer".',
  },
  radioGroupOverrides: {
    id: 'radioGroupOverrides',
    message:
      'All overrides on RadioGroup except RadioGroupRoot are deprecated. Please apply overrides to individual radio buttons',
  },
  noClassName: {
    id: 'noClassName',
    message:
      'Base web components should only be styled using `styled`, `withStyle`, or `overrides`. {{ component }} is using className, which can cause unintended styling issues. See https://baseweb.design/guides/styling/ for recommended styling patterns.',
  },
};
