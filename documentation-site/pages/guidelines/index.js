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
  env: {HD_FIGMA_FILE_ID: string, FIGMA_AUTH_TOKEN: string},
};

async function getStaticProps({params}: {params: {node: any}}) {
  let pages = [];
  try {
    // Figma file structure: File > Pages > Frames.

    // By convention we turn the top level Figma Frames for each Figma Page
    // into web pages. The Figma Pages become headers for grouping the pages
    // in our navigation.

    // Fetch Figma file 2 levels deep. We only need Figma Pages & the
    // top level Figma Frames within them.
    const figmaFileResponse = await fetch(
      `https://api.figma.com/v1/files/${process.env.HD_FIGMA_FILE_ID}?depth=2`,
      {
        headers: {
          'X-FIGMA-TOKEN': process.env.FIGMA_AUTH_TOKEN,
        },
      },
    );
    const figmaFile = await figmaFileResponse.json();

    // By convention, only use Figma Pages starting with a capital letter.
    const figmaPages = figmaFile.document.children.filter(page =>
      page.name.match(/^[A-Z]/),
    );

    // We need both the Figma Page as well as its children (top level frames).
    pages = figmaPages;
  } catch (er) {
    console.log('there was a problem fetching the figma file');
    console.log(er);
  }

  return {props: {pages}};
}

function Index({pages}: any) {
  const [css] = useStyletron();
  return <Layout pages={pages}>🍉docs go here!</Layout>;
}
export {Index as default, getStaticProps};
