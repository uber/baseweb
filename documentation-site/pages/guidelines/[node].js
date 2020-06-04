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

import {
  Node,
  Offset,
  Styles,
  Vectors,
  Images,
} from '../../components/guidelines/render.js';
import Layout from '../../components/guidelines/layout.js';

declare var process: {env: {FIGMA_AUTH_TOKEN: string, FIGMA_FILE_ID: string}};

async function getStaticPaths() {
  let staticPaths;
  if (process.env.FIGMA_USE_FS) {
    const fs = require('fs');
    const path = require('path');
    staticPaths = JSON.parse(
      fs.readFileSync(
        path.join(
          process.cwd(),
          'documentation-site/figma/data/nodeStaticPaths.json',
        ),
        'utf8',
      ),
    );
  } else {
    const {getStaticPathsForNode} = require('../../figma/api.js');
    staticPaths = await getStaticPathsForNode();
  }
  return staticPaths;
}

async function getStaticProps(params) {
  let staticProps;
  if (process.env.FIGMA_USE_FS) {
    const fs = require('fs');
    const path = require('path');
    staticProps = JSON.parse(
      fs.readFileSync(
        path.join(
          process.cwd(),
          `documentation-site/figma/data/nodeStaticProps[${params.params.node}].json`,
        ),
        'utf8',
      ),
    );
  } else {
    const {getStaticPropsForNode} = require('../../figma/api.js');
    staticProps = await getStaticPropsForNode(params);
  }
  return staticProps;
}

function Page({document, styles, images, vectors, pages}: any) {
  const [css, theme] = useStyletron();
  return (
    <Layout pages={pages}>
      <Styles.Provider value={styles}>
        <Images.Provider value={images}>
          <Vectors.Provider value={vectors}>
            <Offset.Provider
              value={{
                x: document.absoluteBoundingBox.x,
                y: document.absoluteBoundingBox.y,
              }}
            >
              <div
                className={css({
                  position: 'relative',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: `${document.absoluteBoundingBox.width}px`,
                  height: `${document.absoluteBoundingBox.height}px`,
                })}
              >
                <Node node={document} />
              </div>
            </Offset.Provider>
          </Vectors.Provider>
        </Images.Provider>
      </Styles.Provider>
    </Layout>
  );
}

export {Page as default, getStaticPaths, getStaticProps};
