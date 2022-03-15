/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import extend from 'just-extend';

import type { LocaleT } from './types.js';
import en_US from './en_US.js';

export const LocaleContext: React.Context<LocaleT> = React.createContext(en_US);

const LocaleProvider = (props: { locale: $Shape<LocaleT>, children: ?React.Node }) => {
  const { locale, children } = props;
  if (__DEV__) {
    if (locale.datepicker && locale.datepicker.timePickerAriaLabel) {
      console.warn(
        '`timePickerAriaLabel` will be removed in v11 - please use timePickerAriaLabel12Hour and timePickerAriaLabel24Hour instead'
      );
    }
  }
  return (
    <LocaleContext.Provider value={extend({}, en_US, locale)}>{children}</LocaleContext.Provider>
  );
};

export default LocaleProvider;
