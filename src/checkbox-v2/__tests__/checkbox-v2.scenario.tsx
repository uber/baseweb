/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { useStyletron } from '../../';
import { StatefulCheckbox } from '../';
import { HeadingSmall, ParagraphSmall, ParagraphMedium } from '../../typography';

export function Scenario() {
  const [css] = useStyletron();
  return (
    <React.Fragment>
      <StatefulCheckbox>click me</StatefulCheckbox>
      <div className={css({ width: '200px' })}>
        <StatefulCheckbox>
          This is a long text. This is a long text. This is a long text. This is a long text. This
          is a long text.
        </StatefulCheckbox>
      </div>

      <HeadingSmall marginBottom="scale500">Checkboxes Group</HeadingSmall>
      <ParagraphMedium>
        Note: checkbox itself does not implement group behavior. Developers need to take care of
        Accessibility for checkboxes group. Below is an example with ul and li.
      </ParagraphMedium>
      <ParagraphSmall id="checkbox-group-label">
        Checkboxes group - choose your favorite fruit:
      </ParagraphSmall>
      <ul style={{ padding: 0 }} aria-labelledby="checkbox-group-label" role="group">
        <li style={{ listStyle: 'none' }}>
          <StatefulCheckbox>Apple</StatefulCheckbox>
        </li>
        <li style={{ listStyle: 'none' }}>
          <StatefulCheckbox>Banana</StatefulCheckbox>
        </li>
        <li style={{ listStyle: 'none' }}>
          <StatefulCheckbox>Orange</StatefulCheckbox>
        </li>
      </ul>
    </React.Fragment>
  );
}
