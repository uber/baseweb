/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

/**
 * Some re-usable layout components for displaying theme
 * properties and their default values.
 */

import * as React from 'react';
import {useStyletron, styled} from 'baseui';

const monospaceFontFamily =
  'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace';

export const Title = styled<{}>('div', ({$theme}) => {
  return {
    ...$theme.typography.HeadingXSmall,
    fontFamily: monospaceFontFamily,
    marginBottom: $theme.sizing.scale300,
  };
});

export const Value = styled<{}>('div', ({$theme}) => {
  return {
    ...$theme.typography.ParagraphMedium,
    fontFamily: monospaceFontFamily,
    marginBottom: $theme.sizing.scale300,
  };
});

export function Property({
  title,
  value,
  children,
}: {
  title: string,
  value: string | string[],
  children?: React.Node,
}) {
  const [css, theme] = useStyletron();
  return (
    <div className={css({marginBottom: theme.sizing.scale600})}>
      <Title>{title}</Title>
      <Value>
        {Array.isArray(value) ? value.map(v => <div key={v}>{v}</div>) : value}
      </Value>
      {children && (
        <div
          className={css({
            paddingTop: theme.sizing.scale400,
            paddingBottom: theme.sizing.scale400,
          })}
        >
          {children}
        </div>
      )}
    </div>
  );
}
