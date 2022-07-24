/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { styled } from '../../styles';
import { getOverrides, type Override } from '../overrides';

const StyledBase = styled('div', {});

function Child(props: {
  overrides: {
    Base: Override;
  };
}) {
  const [Base, baseProps] = getOverrides(props.overrides.Base, StyledBase);
  return (
    <div>
      <Base {...baseProps}>default children</Base>
    </div>
  );
}

function BaseOverride(props: any) {
  return <input onChange={props.onChange} value={props.value} />;
}

export function Scenario() {
  const [value, setValue] = React.useState('');
  return (
    <div>
      <Child
        overrides={{
          Base: {
            component: BaseOverride,
            props: {
              onChange: (event) => setValue(event.target.value),
              value,
            },
          },
        }}
      />
    </div>
  );
}
