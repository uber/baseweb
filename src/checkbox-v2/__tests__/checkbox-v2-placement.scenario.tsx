/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { Checkbox, LABEL_PLACEMENT } from '../';

export function Scenario() {
  const [checkboxes, setCheckboxes] = React.useState([false, false]);

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <Checkbox
        checked={checkboxes[0]}
        onChange={(e) => {
          const nextCheckboxes = [...checkboxes];
          nextCheckboxes[0] = e.currentTarget.checked;
          setCheckboxes(nextCheckboxes);
        }}
        labelPlacement={LABEL_PLACEMENT.left}
      >
        Label on the left
      </Checkbox>
      <Checkbox
        checked={checkboxes[1]}
        onChange={(e) => {
          const nextCheckboxes = [...checkboxes];
          nextCheckboxes[1] = e.currentTarget.checked;
          setCheckboxes(nextCheckboxes);
        }}
        labelPlacement={LABEL_PLACEMENT.right}
      >
        Label on the right
      </Checkbox>
    </div>
  );
}
