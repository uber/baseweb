/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import extend from 'just-extend';

import type { LocaleT } from './types';
import en_US from './en_US';

export const LocaleContext: React.Context<LocaleT> = React.createContext(en_US);

const LocaleProvider = (props: {
  locale: Partial<LocaleT>;
  children: React.ReactNode | undefined | null;
}) => {
  const { locale, children } = props;
  return (
    <LocaleContext.Provider value={extend({}, en_US, locale)}>{children}</LocaleContext.Provider>
  );
};

export default LocaleProvider;

export type { LocaleT };
