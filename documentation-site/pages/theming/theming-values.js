/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import Layout from '../../components/layout';
import Colors from '../../components/theming-values/colors';
import Sizing from '../../components/theming-values/sizing';
import Lighting from '../../components/theming-values/lighting';
import Typography from '../../components/theming-values/typography';

type PropsT = {
  changeTheme: () => void,
};

function ThemingPage(props: PropsT) {
  return (
    <Layout changeTheme={props.changeTheme}>
      <Colors />
      <Sizing />
      <Lighting />
      <Typography />
    </Layout>
  );
}

export default ThemingPage;
