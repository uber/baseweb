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

declare var process: {env: {FIGMA_AUTH_TOKEN: string, FIGMA_FILE_ID: string}};

async function getStaticPaths() {
  try {
    // Query top-level figma file, this should not change
    const figmaFileRequest = await fetch(
      `https://api.figma.com/v1/files/${process.env.FIGMA_FILE_ID}?depth=2`,
      {
        headers: {
          'X-FIGMA-TOKEN': process.env.FIGMA_AUTH_TOKEN,
        },
      },
    );

    // Figma structure: File > Pages > Frames
    // By convention, we use the top-level frames as individual pages
    const figmaFile = await figmaFileRequest.json();
    const figmaPages = figmaFile.document.children;
    const figmaTopLevelFrames = figmaPages.reduce(
      (acc, cur) => [...acc, ...cur.children],
      [],
    );

    return {
      paths: figmaTopLevelFrames.map(f => ({
        params: {node: f.id.replace(':', '-')},
      })),
      fallback: false,
    };
  } catch (er) {
    console.log(
      'there was a problem requesting the figma file to generate paths',
    );
    return {paths: [], fallback: false};
  }
}

async function getStaticProps({params}: {params: {node: any}}) {
  // Get all images for file
  // TODO(@sandgraham): Can we not fetch every image in the entire file?
  const figmaImageFillsRequest = await fetch(
    `https://api.figma.com/v1/files/${process.env.FIGMA_FILE_ID}/images`,
    {
      headers: {
        'X-FIGMA-TOKEN': process.env.FIGMA_AUTH_TOKEN,
      },
    },
  );
  const figmaImageFills = await figmaImageFillsRequest.json();

  const figmaNodesRequest = await fetch(
    `https://api.figma.com/v1/files/${
      process.env.FIGMA_FILE_ID
    }/nodes?ids=${params.node.replace('-', ':')}`,
    {
      headers: {
        'X-FIGMA-TOKEN': process.env.FIGMA_AUTH_TOKEN,
      },
    },
  );
  const figmaNodes = await figmaNodesRequest.json();
  const node = figmaNodes.nodes[params.node.replace('-', ':')];

  // Rather than render vectors ourselves, we will request an svg image
  // from Figma's API. However, we don't want to request every vector in the
  // file. Instead we will assemble a list of the vectors we want and query
  // only those nodes.
  const vectorNodes = [];

  // To assemble our list of desired svgs, we do a DFS of the document tree,
  // looking for any vector type node that is visible.
  (function traverse(node, fn) {
    const {traverseChildren = true} = fn(node) || {};
    if (traverseChildren && node.children) {
      node.children.forEach(n => traverse(n, fn));
    }
  })(node.document, node => {
    if (node.visible === false) {
      return {traverseChildren: false};
    }

    if (
      node.type === 'VECTOR' ||
      node.type === 'INSTANCE' ||
      node.type === 'LINE' ||
      node.type === 'BOOLEAN_OPERATION'
    ) {
      vectorNodes.push(node);
    }
  });

  // Global dictionary of svg image urls
  let vectors = {};

  if (vectorNodes.length > 0) {
    // Get svg url for each vector node in our list
    const figmaVectorImageUrlsRequest = await fetch(
      `https://api.figma.com/v1/images/${
        process.env.FIGMA_FILE_ID
      }?ids=${vectorNodes.map(n => n.id).join(',')}&format=svg`,
      {
        headers: {
          'X-FIGMA-TOKEN': process.env.FIGMA_AUTH_TOKEN,
        },
      },
    );
    const figmaVectorImageUrls = await figmaVectorImageUrlsRequest.json();
    const figmaVectorImages = await Promise.all(
      Object.keys(figmaVectorImageUrls.images).map(async v => {
        if (figmaVectorImageUrls.images[v] !== null) {
          const response = await fetch(figmaVectorImageUrls.images[v]);
          const markup = await response.text();
          return {v, markup};
        } else {
          return null;
        }
      }),
    );

    vectors = figmaVectorImages.reduce((acc, cur) => {
      if (cur !== null) {
        acc[cur.v] = cur.markup;
      }
      return acc;
    }, {});
  }

  return {
    props: {
      document: node.document,
      styles: node.styles,
      images: figmaImageFills,
      vectors,
    },
  };
}

function Page({document, styles, images, vectors}: any) {
  const [css, theme] = useStyletron();
  return (
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
                backgroundColor: theme.colors.backgroundTertiary,
                minHeight: '100vh',
                paddingTop: '48px',
                paddingBottom: '48px',
              })}
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
            </div>
          </Offset.Provider>
        </Vectors.Provider>
      </Images.Provider>
    </Styles.Provider>
  );
}

export {Page as default, getStaticPaths, getStaticProps};
