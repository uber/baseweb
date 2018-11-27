/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import React from 'react';
import Colors from './colors';
import Sizing from './sizing';
import Lighting from './lighting';
import Typography from './typography';

function ThemingPage() {
  return (
    <div>
      <Colors />
      <Sizing />
      <Lighting />
      <Typography />
    </div>
  );
}

export default ThemingPage;
