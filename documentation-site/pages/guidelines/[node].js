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

declare var process: {
  env: {FIGMA_AUTH_TOKEN: string, HD_FIGMA_FILE_ID: string},
};

async function getStaticPaths() {
  let paths = [];
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
    const figmaTopLevelFrames = figmaPages.reduce((acc, page) => {
      return [...acc, ...page.children];
    }, []);

    // By convention, we generate a page for each visible top-level Figma Frame
    // starting with a capital letter.
    paths = figmaTopLevelFrames
      .filter(frame => frame.name.match(/^[A-Z]/) && frame.visible !== false)
      .map(f => ({
        // Url can't contain ":".
        params: {node: f.id.replace(':', '-')},
      }));
  } catch (er) {
    console.log('there was a problem fetching the figma file');
    console.log(er);
  }

  return {paths, fallback: false};
}

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

  // Fetch PDF of current node
  let image = null;
  try {
    const response = await fetch(
      `https://api.figma.com/v1/images/${
        process.env.HD_FIGMA_FILE_ID
      }?ids=${params.node.replace('-', ':')}&format=pdf`,
      {
        headers: {
          'X-FIGMA-TOKEN': process.env.FIGMA_AUTH_TOKEN,
        },
      },
    );
    const json = await response.json();
    image = json.images[params.node.replace('-', ':')] || null;
  } catch (er) {
    console.log(`there was a problem fetching the image for [${params.node}]`);
    console.log(er);
  }

  return {
    props: {pages, image, node: params.node},
  };
}

function Page({pages, image, node}) {
  const [css] = useStyletron();
  return (
    <Layout pages={pages} node={node}>
      {image ? (
        <embed
          id="pdf"
          title="Figma PDF"
          type="application/pdf"
          src={image}
          className={css({
            display: 'block',
            width: '100%',
            height: '100vh',
            border: '0',
          })}
        />
      ) : (
        'No Figma node found.'
      )}
    </Layout>
  );
}

export {Page as default, getStaticPaths, getStaticProps};
