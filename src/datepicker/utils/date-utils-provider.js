/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import dateFnsUtils from '@date-io/date-fns';

export const DateUtilsContext: React.Context<ThemeT> = React.createContext(
  dateFnsUtils,
);

const DateUtilsProvider = (props: {utils: any, children: ?React.Node}) => {
  const {utils, children} = props;
  return (
    <DateUtilsContext.Provider value={utils}>
      {children}
    </DateUtilsContext.Provider>
  );
};

export default DateUtilsProvider;
