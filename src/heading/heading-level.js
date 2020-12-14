/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import type {HeadingLevelPropsT} from './types.js';

export const LevelContext: React.Context<number> = React.createContext(0);

export const HeadingLevel = ({children}: HeadingLevelPropsT) => (
  <LevelContext.Consumer>
    {level => (
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    )}
  </LevelContext.Consumer>
);

export default HeadingLevel;
