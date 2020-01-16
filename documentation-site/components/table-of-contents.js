/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */

import * as React from 'react';
import {useStyletron} from 'baseui';

function getPadding(componentType) {
  const multiplier = Number(componentType.replace('h', ''));

  return `${multiplier * 8}px`;
}

const TableOfContents = props => {
  const [css, theme] = useStyletron();
  const TOC = [];
  const content = props.content[0].props.children;
  content &&
    content.forEach &&
    content.forEach(element => {
      if (
        element.props.name &&
        element.props.name.startsWith('h') &&
        element.props.children &&
        element.props.children.toLowerCase
      ) {
        TOC.push({
          name: element.props.children,
          anchor: `#${element.props.children
            .toLowerCase()
            .replace(/\s+/g, '-')}`,
          component: element.props.name,
        });
      }

      if (element.props.title) {
        TOC.push({
          name: element.props.title,
          anchor: `#${element.props.title.toLowerCase().replace(/\s+/g, '-')}`,
          component: 'h3',
        });
      }

      if (element.props.api && element.props.heading) {
        TOC.push({
          name: element.props.heading,
          anchor: `#${element.props.heading
            .toLowerCase()
            .replace(/\s+/g, '-')}`,
          component: 'h3',
        });
      }
    });

  if (TOC.length === 1) {
    return null;
  }

  return (
    <ul
      className={css({
        [theme.direction === 'rtl'
          ? 'borderRight'
          : 'borderLeft']: `1px solid ${theme.colors.mono400}`,
        listStyle: 'none',
        [theme.direction === 'rtl' ? 'marginRight' : 'marginLeft']: theme.sizing
          .scale400,
        paddingLeft: 0,
        paddingRight: 0,
        // to make sure we align vertically with the edit on github button
        marginTop: '-10px',
        marginBottom: 0,
        // set predictable width to avoid page relayout when table of content changes
        width: '160px',
        position: 'fixed',
        top: '100px',
      })}
    >
      {TOC.map(header => (
        <li
          key={header.name}
          className={css({
            ...theme.typography.font100,
            [theme.direction === 'rtl'
              ? 'paddingRight'
              : 'paddingLeft']: getPadding(header.component),
          })}
        >
          <a
            className={css({color: theme.colors.contentSecondary})}
            href={header.anchor}
          >
            {header.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default TableOfContents;
