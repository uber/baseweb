/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {useStyletron} from 'baseui';
import {Title, Value} from './common.js';

export function Type({value}: {value: string}) {
  const [css, theme] = useStyletron();
  return (
    <div className={css({marginBottom: theme.sizing.scale600})}>
      <Title $style={{...theme.typography[value]}}>{value}</Title>
      <Value>
        <div>{theme.typography[value].fontSize}</div>
        <div>{theme.typography[value].fontWeight}</div>
        <div>{theme.typography[value].lineHeight}</div>
      </Value>
    </div>
  );
}
