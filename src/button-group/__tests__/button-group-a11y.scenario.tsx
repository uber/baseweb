/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Button } from '../../button';
import { StatefulButtonGroup, MODE, ButtonGroup } from '../';
import { HeadingMedium, HeadingXSmall } from '../../typography';

export function Scenario() {
  return (
    <React.Fragment>
      <HeadingMedium marginTop="0" marginBottom="0">
        Button group A11y
      </HeadingMedium>

      <HeadingXSmall marginTop="0" marginBottom="8px">
        Actionable button group
      </HeadingXSmall>
      <ButtonGroup>
        <Button
          onClick={() => {
            alert('Label1 clicked');
          }}
        >
          Label1
        </Button>
        <Button
          onClick={() => {
            alert('Label2 clicked');
          }}
        >
          Label2
        </Button>
        <Button
          onClick={() => {
            alert('Label3 clicked');
          }}
        >
          Label3
        </Button>
      </ButtonGroup>

      <HeadingXSmall marginTop="0" marginBottom="8px">
        Checkbox button group
      </HeadingXSmall>
      <StatefulButtonGroup mode={MODE.checkbox} initialState={{ selected: [1] }}>
        <Button>Checkbox1</Button>
        <Button>Checkbox2</Button>
        <Button>Checkbox3</Button>
      </StatefulButtonGroup>

      <HeadingXSmall marginTop="0" marginBottom="8px">
        Radio button group
      </HeadingXSmall>
      <StatefulButtonGroup mode={MODE.radio} initialState={{ selected: [1] }}>
        <Button>Radio1</Button>
        <Button>Radio2</Button>
        <Button>Radio3</Button>
      </StatefulButtonGroup>
    </React.Fragment>
  );
}
