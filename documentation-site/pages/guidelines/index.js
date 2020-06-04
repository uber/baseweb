/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/no-weak-types */

// @flow

import * as React from 'react';
import fetch from 'node-fetch';
import {useStyletron} from 'baseui';
import Layout from '../../components/guidelines/layout.js';

declare var process: {
  env: {FIGMA_USE_FS: string},
};

async function getStaticProps({params}: {params: {node: any}}) {
  let staticProps;
  if (process.env.FIGMA_USE_FS) {
    const fs = require('fs');
    const path = require('path');
    staticProps = JSON.parse(
      fs.readFileSync(
        path.join(
          process.cwd(),
          'documentation-site/figma/data/indexStaticProps.json',
        ),
        'utf8',
      ),
    );
  } else {
    const {getStaticPropsForIndex} = require('../../figma/api.js');
    staticProps = await getStaticPropsForIndex();
  }
  return staticProps;
}

function Index({pages}: any) {
  const [css] = useStyletron();
  return <Layout pages={pages}>🍉docs go here!</Layout>;
}
export {Index as default, getStaticProps};
