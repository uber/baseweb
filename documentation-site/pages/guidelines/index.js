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

declare var process: {env: {FIGMA_AUTH_TOKEN: string, FIGMA_FILE_ID: string}};

async function getStaticProps({params}: {params: {node: any}}) {
  try {
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
    const figmaFile = await figmaFileRequest.json();
    const figmaPages = figmaFile.document.children;

    return {
      props: {
        figmaPages,
      },
    };
  } catch (er) {
    console.log('there was a problem requesting the figma file');
    return {
      props: {
        figmaPages: [],
      },
    };
  }
}

function Index({figmaPages}: any) {
  const [css] = useStyletron();
  return (
    <div>
      {figmaPages.length > 0
        ? figmaPages.map(page => (
            <div key={page.id} className={css({marginBottom: '16px'})}>
              <div>{page.name}</div>
              {page.children.map(frame => (
                <div key={frame.id} className={css({marginLeft: '16px'})}>
                  <a href={`/guidelines/${frame.id.replace(':', '-')}`}>
                    {frame.name}
                  </a>
                </div>
              ))}
            </div>
          ))
        : 'No pages were found.'}
    </div>
  );
}

export {Index as default, getStaticProps};
