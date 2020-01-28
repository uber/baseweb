/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
/* global process */

import React from 'react';
import {useStyletron} from 'baseui';
import {StyledLink} from 'baseui/link';
import outlines from '../cheat-sheet.js';
import {H2} from './markdown-elements.js';
// $FlowFixMe - because this is a .ts file
import {trackEvent} from '../helpers/ga';

function buildHref(file, line) {
  const commit = process.env.COMMIT_REF || 'master';
  const base = 'https://github.com/uber/baseweb/blob';
  const href = `${base}/${commit}/${file}`;

  if (line) {
    return href + `#L${line}`;
  }
  return href;
}
function CheatSheet() {
  const [css, theme] = useStyletron();
  return (
    <div>
      {!outlines.length && <p>no data to display</p>}
      {outlines.map(outline => {
        const componentName = outline.file.split('/')[1];
        return (
          <div key={outline.file}>
            <H2 id={componentName}>
              <StyledLink
                target="_blank"
                href={buildHref(outline.file)}
                onClick={() => trackEvent('cheat_sheet_click', componentName)}
              >
                {componentName}
              </StyledLink>
            </H2>
            <ul
              className={css({
                columnCount: 1,
                '@media screen and (min-width: 920px)': {
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  columnCount: 3,
                },
              })}
            >
              {outline.definitions.map(t => (
                <React.Fragment key={t.name}>
                  <li
                    className={css({
                      ...theme.typography.font400,
                    })}
                  >
                    <StyledLink
                      target="_blank"
                      href={buildHref(outline.file, t.lineStart)}
                      onClick={() =>
                        trackEvent(
                          'cheat_sheet_click',
                          `${componentName}_${t.name}`,
                        )
                      }
                    >
                      {t.name}
                    </StyledLink>
                  </li>
                  {t.children.map(c => (
                    <li
                      key={c.name}
                      className={css({
                        ...theme.typography.font300,
                        paddingLeft: '12px',
                        listStyleType: 'none',
                      })}
                    >
                      <StyledLink
                        target="_blank"
                        href={buildHref(outline.file, c.lineStart)}
                        onClick={() =>
                          trackEvent(
                            'cheat_sheet_click',
                            `${componentName}_${t.name}_${c.name}`,
                          )
                        }
                      >
                        {c.name}
                      </StyledLink>
                    </li>
                  ))}
                </React.Fragment>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default CheatSheet;
