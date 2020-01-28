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
  return text.split(new RegExp(`(${query})`, 'i'));
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
