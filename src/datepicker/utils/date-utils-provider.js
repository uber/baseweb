/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import type {AdapterT, DateUtilsT} from './types.js';

const baseInstance = new DateFnsUtils();

export const DateUtilsContext: React.Context<DateUtilsT> = React.createContext(
  baseInstance,
);

const DateUtilsProvider = (props: {
  utilsInstance: DateUtilsT,
  children: ?React.Node,
}) => {
  const {utilsInstance = baseInstance, children} = props;
  return (
    <DateUtilsContext.Provider value={utilsInstance}>
      {children}
    </DateUtilsContext.Provider>
  );
};

export default DateUtilsProvider;
