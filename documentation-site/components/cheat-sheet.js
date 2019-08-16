/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import React from 'react';
import outlines from '../cheat-sheet.js';

function buildHref(file, line) {
  const commit = process.env.COMMIT_REF || 'master';
  const base = 'https://github.com/uber-web/baseui/blob';
  const href = `${base}/${commit}/${file}`;

  if (line) {
    return href + `#L${line}`;
  }
  return href;
}

function CheatSheet() {
  return (
    <div>
      cheat sheet
      {!outlines.length && <p>no data to display</p>}
      {outlines.map(outline => (
        <div>
          <h2>
            <a href={buildHref(outline.file)}>{outline.file.split('/')[1]}</a>
          </h2>
          <ul>
            {outline.definitions.map(t => (
              <React.Fragment>
                <li>
                  <a href={buildHref(outline.file, t.lineStart)}>{t.name}</a>
                </li>
                <ul>
                  {t.children.map(c => (
                    <li>
                      <a href={buildHref(outline.file, c.lineStart)}>
                        {c.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </React.Fragment>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CheatSheet;
