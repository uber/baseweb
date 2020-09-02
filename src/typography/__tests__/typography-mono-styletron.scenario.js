/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {useStyletron} from '../../styles/index.js';

export default function Scenario() {
  const [css, theme] = useStyletron();
  return (
    <div className={css({width: '800px', color: theme.colors.contentPrimary})}>
      <div className={css({display: 'flex', justifyContent: 'space-between'})}>
        <div>
          <p>paragraph</p>
          <p className={css({...theme.typography.MonoParagraphXSmall})}>
            $123,000
          </p>
          <p className={css({...theme.typography.MonoParagraphSmall})}>
            $123,000
          </p>
          <p className={css({...theme.typography.MonoParagraphMedium})}>
            $123,000
          </p>
          <p className={css({...theme.typography.MonoParagraphLarge})}>
            $123,000
          </p>
        </div>

        <div>
          <p>label</p>
          <div className={css({...theme.typography.MonoLabelXSmall})}>
            $123,000
          </div>
          <div className={css({...theme.typography.MonoLabelSmall})}>
            $123,000
          </div>
          <div className={css({...theme.typography.MonoLabelMedium})}>
            $123,000
          </div>
          <div className={css({...theme.typography.MonoLabelLarge})}>
            $123,000
          </div>
        </div>
      </div>

      <div className={css({display: 'flex', justifyContent: 'space-between'})}>
        <div>
          <p>heading</p>
          <h6 className={css({...theme.typography.MonoHeadingXSmall})}>
            $123,000
          </h6>
          <h5 className={css({...theme.typography.MonoHeadingSmall})}>
            $123,000
          </h5>
          <h4 className={css({...theme.typography.MonoHeadingMedium})}>
            $123,000
          </h4>
          <h3 className={css({...theme.typography.MonoHeadingLarge})}>
            $123,000
          </h3>
          <h2 className={css({...theme.typography.MonoHeadingXLarge})}>
            $123,000
          </h2>
          <h1 className={css({...theme.typography.MonoHeadingXXLarge})}>
            $123,000
          </h1>
        </div>

        <div>
          <p>display</p>
          <div className={css({...theme.typography.MonoDisplayXSmall})}>
            $123,000
          </div>
          <div className={css({...theme.typography.MonoDisplaySmall})}>
            $123,000
          </div>
          <div className={css({...theme.typography.MonoDisplayMedium})}>
            $123,000
          </div>
          <div className={css({...theme.typography.MonoDisplayLarge})}>
            $123,000
          </div>
        </div>
      </div>
    </div>
  );
}
