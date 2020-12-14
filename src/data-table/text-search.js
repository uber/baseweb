/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {useStyletron} from '../styles/index.js';

export function matchesQuery(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase());
}

export function splitByQuery(text: string, query: string): string[] {
  const start = text.toLowerCase().indexOf(query.toLowerCase());

  // query not found
  if (start === -1) {
    return [text];
  }

  if (start === 0) {
    return [text.slice(0, query.length), text.slice(query.length)];
  }

  const substrings = [];
  let substring = '';
  for (let i = 0; i < text.length; i++) {
    substring = substring + text[i];
    if (
      // prefix
      i === start - 1 ||
      // query
      i === start + query.length - 1 ||
      // suffix
      i === text.length - 1
    ) {
      substrings.push(substring);
      substring = '';
    }
  }
  return substrings;
}

export function HighlightCellText(props: {text: string, query: string}) {
  const [css, theme] = useStyletron();

  if (!props.query) {
    return props.text;
  }

  return (
    <React.Fragment>
      {splitByQuery(props.text, props.query).map((el, i) => {
        if (matchesQuery(el, props.query)) {
          return (
            <span className={css({...theme.typography.font150})} key={i}>
              {el}
            </span>
          );
        }

        return el;
      })}
    </React.Fragment>
  );
}
