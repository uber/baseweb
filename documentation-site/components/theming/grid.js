/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {useStyletron} from 'baseui';

const monospace = {
  fontFamily:
    'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace',
};

export function Grid() {
  const [css, theme] = useStyletron();
  return (
    <React.Fragment>
      <div className={css({marginBottom: theme.sizing.scale1000})}>
        <div
          className={css({
            ...theme.typography.HeadingXSmall,
            ...monospace,
            marginBottom: theme.sizing.scale400,
          })}
        >
          columns
        </div>
        <div
          className={css({
            ...theme.typography.ParagraphMedium,
            ...monospace,
          })}
        >
          {theme.grid.columns[0]}, {theme.grid.columns[1]},{' '}
          {theme.grid.columns[2]}
        </div>
      </div>
      <div className={css({marginBottom: theme.sizing.scale1000})}>
        <div
          className={css({
            ...theme.typography.HeadingXSmall,
            ...monospace,
            marginBottom: theme.sizing.scale400,
          })}
        >
          gutters
        </div>
        <div
          className={css({
            ...theme.typography.ParagraphMedium,
            ...monospace,
          })}
        >
          {theme.grid.gutters[0]}px, {theme.grid.gutters[1]}px,{' '}
          {theme.grid.gutters[2]}px
        </div>
      </div>
      <div className={css({marginBottom: theme.sizing.scale1000})}>
        <div
          className={css({
            ...theme.typography.HeadingXSmall,
            ...monospace,
            marginBottom: theme.sizing.scale400,
          })}
        >
          margins
        </div>
        <div
          className={css({
            ...theme.typography.ParagraphMedium,
            ...monospace,
          })}
        >
          {theme.grid.margins[0]}px, {theme.grid.margins[1]}px,{' '}
          {theme.grid.margins[2]}px
        </div>
      </div>
      <div className={css({marginBottom: theme.sizing.scale1000})}>
        <div
          className={css({
            ...theme.typography.HeadingXSmall,
            ...monospace,
            marginBottom: theme.sizing.scale400,
          })}
        >
          gaps
        </div>
        <div
          className={css({
            ...theme.typography.ParagraphMedium,
            ...monospace,
          })}
        >
          {theme.grid.gaps}px
        </div>
      </div>
      <div className={css({marginBottom: theme.sizing.scale1000})}>
        <div
          className={css({
            ...theme.typography.HeadingXSmall,
            ...monospace,
            marginBottom: theme.sizing.scale400,
          })}
        >
          maxWidth
        </div>
        <div
          className={css({
            ...theme.typography.ParagraphMedium,
            ...monospace,
          })}
        >
          {theme.grid.maxWidth}px
        </div>
      </div>
    </React.Fragment>
  );
}
