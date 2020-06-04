const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// TODO: Convert to a proper API singleton. Hide FS/API details.

let imageFillsCache = null;
let figmaFileCache = null;

async function getStaticPropsForIndex() {
  try {
    let figmaFile;

    if (figmaFileCache !== null) {
      figmaFile = figmaFileCache;
    } else {
      // Query top-level figma file, this ID should never change
      const figmaFileRequest = await fetch(
        `https://api.figma.com/v1/files/${process.env.FIGMA_FILE_ID}?depth=2`,
        {
          headers: {
            'X-FIGMA-TOKEN': process.env.FIGMA_AUTH_TOKEN,
          },
        },
      );

      // Figma file structure: File > Pages > Frames.
      // By convention, we use the top-level frames in each figma page
      // as individual web pages.
      figmaFile = await figmaFileRequest.json();
      figmaFileCache = figmaFile;
    }

    const figmaPages = figmaFile.document.children;

    // Filter top level pages.
    // Only showing pages that start with a capital letter.
    const filteredFigmaPages = figmaPages.filter(page => {
      return page.name.match(/^[A-Z]/);
    });

    return {
      props: {
        pages: filteredFigmaPages,
      },
    };
  } catch (er) {
    console.log('there was a problem requesting the figma file');
    console.log(er);
    return {
      props: {
        pages: [],
      },
    };
  }
}

async function getStaticPathsForNode() {
  try {
    let figmaFile;

    if (figmaFileCache !== null) {
      figmaFile = figmaFileCache;
    } else {
      // Query top-level figma file, this ID should never change
      const figmaFileRequest = await fetch(
        `https://api.figma.com/v1/files/${process.env.FIGMA_FILE_ID}?depth=2`,
        {
          headers: {
            'X-FIGMA-TOKEN': process.env.FIGMA_AUTH_TOKEN,
          },
        },
      );

      // Figma file structure: File > Pages > Frames.
      // By convention, we use the top-level frames in each figma page
      // as individual web pages.
      figmaFile = await figmaFileRequest.json();
      figmaFileCache = figmaFile;
    }

    const figmaPages = figmaFile.document.children;
    const figmaTopLevelFrames = figmaPages.reduce(
      (acc, cur) => [...acc, ...cur.children],
      [],
    );

    return {
      paths: figmaTopLevelFrames
        .filter(f => f.name.match(/^[A-Z]/) && f.visible !== false)
        .map(f => ({
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

async function getStaticPropsForNode({params}) {
  let figmaImageFills;

  if (imageFillsCache !== null) {
    figmaImageFills = imageFillsCache;
  } else {
    // Fetches images for entire file. Very slow. Would be nice to cache.
    const figmaImageFillsRequest = await fetch(
      `https://api.figma.com/v1/files/${process.env.FIGMA_FILE_ID}/images`,
      {
        headers: {
          'X-FIGMA-TOKEN': process.env.FIGMA_AUTH_TOKEN,
        },
      },
    );
    figmaImageFills = await figmaImageFillsRequest.json();
    figmaFillsCache = figmaImageFills;
  }

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

    let figmaVectorImageUrls = {images: []};
    let figmaVectorImages = [];
    try {
      figmaVectorImageUrls = await figmaVectorImageUrlsRequest.json();
      figmaVectorImages = await Promise.all(
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
    } catch (er) {
      console.log(er);
    }

    vectors = figmaVectorImages.reduce((acc, cur) => {
      if (cur !== null) {
        acc[cur.v] = cur.markup;
      }
      return acc;
    }, {});
  }

  let pages;
  try {
    let figmaFile;

    if (figmaFileCache !== null) {
      figmaFile = figmaFileCache;
    } else {
      // Query top-level figma file, this ID should never change
      const figmaFileRequest = await fetch(
        `https://api.figma.com/v1/files/${process.env.FIGMA_FILE_ID}?depth=2`,
        {
          headers: {
            'X-FIGMA-TOKEN': process.env.FIGMA_AUTH_TOKEN,
          },
        },
      );

      // Figma file structure: File > Pages > Frames.
      // By convention, we use the top-level frames in each figma page
      // as individual web pages.
      figmaFile = await figmaFileRequest.json();
      figmaFileCache = figmaFile;
    }

    const figmaPages = figmaFile.document.children;

    // Filter top level pages.
    // Only showing pages that start with a capital letter.
    const filteredFigmaPages = figmaPages.filter(page => {
      return page.name.match(/^[A-Z]/);
    });

    pages = filteredFigmaPages;
  } catch (er) {
    console.log('there was a problem requesting the figma file');
    console.log(er);
    pages = [];
  }

  return {
    props: {
      pages,
      document: node.document,
      styles: node.styles,
      images: figmaImageFills,
      vectors,
    },
  };
}

module.exports = {
  getStaticPropsForIndex,
  getStaticPathsForNode,
  getStaticPropsForNode,
};
