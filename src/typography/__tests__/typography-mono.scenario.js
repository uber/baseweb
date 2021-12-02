/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import {
  MonoParagraphXSmall,
  MonoParagraphSmall,
  MonoParagraphMedium,
  MonoParagraphLarge,
  MonoLabelXSmall,
  MonoLabelSmall,
  MonoLabelMedium,
  MonoLabelLarge,
  MonoHeadingXSmall,
  MonoHeadingSmall,
  MonoHeadingMedium,
  MonoHeadingLarge,
  MonoHeadingXLarge,
  MonoHeadingXXLarge,
  MonoDisplayXSmall,
  MonoDisplaySmall,
  MonoDisplayMedium,
  MonoDisplayLarge,
} from '../index.js';

import {useStyletron} from '../../styles/index.js';

export function Scenario() {
  const [css, theme] = useStyletron();
  return (
    <div className={css({width: '800px', color: theme.colors.contentPrimary})}>
      <div className={css({display: 'flex', justifyContent: 'space-between'})}>
        <div>
          <p>paragraph</p>
          <MonoParagraphXSmall>$123,000</MonoParagraphXSmall>
          <MonoParagraphSmall>$123,000</MonoParagraphSmall>
          <MonoParagraphMedium>$123,000</MonoParagraphMedium>
          <MonoParagraphLarge>$123,000</MonoParagraphLarge>
        </div>

        <div>
          <p>label</p>
          <MonoLabelXSmall>$123,000</MonoLabelXSmall>
          <MonoLabelSmall>$123,000</MonoLabelSmall>
          <MonoLabelMedium>$123,000</MonoLabelMedium>
          <MonoLabelLarge>$123,000</MonoLabelLarge>
        </div>
      </div>

      <div className={css({display: 'flex', justifyContent: 'space-between'})}>
        <div>
          <p>heading</p>
          <MonoHeadingXSmall>$123,000</MonoHeadingXSmall>
          <MonoHeadingSmall>$123,000</MonoHeadingSmall>
          <MonoHeadingMedium>$123,000</MonoHeadingMedium>
          <MonoHeadingLarge>$123,000</MonoHeadingLarge>
          <MonoHeadingXLarge>$123,000</MonoHeadingXLarge>
          <MonoHeadingXXLarge>$123,000</MonoHeadingXXLarge>
        </div>

        <div>
          <p>display</p>
          <MonoDisplayXSmall>$123,000</MonoDisplayXSmall>
          <MonoDisplaySmall>$123,000</MonoDisplaySmall>
          <MonoDisplayMedium>$123,000</MonoDisplayMedium>
          <MonoDisplayLarge>$123,000</MonoDisplayLarge>
        </div>
      </div>
    </div>
  );
}
