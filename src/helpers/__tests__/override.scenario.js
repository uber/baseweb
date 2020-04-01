/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {styled} from '../../styles/index.js';
import {Override} from '../override.js';
import type {OverrideT} from '../override.js';
import {getOverrides} from '../overrides.js';

const StyledBase = styled('div', {});

function Old(props: {overrides: {Base: OverrideT<{}>}}) {
  const [Base, baseProps] = getOverrides(props.overrides.Base, StyledBase);
  return (
    <div>
      <Base {...baseProps}>default children</Base>
    </div>
  );
}

const Base = Override(StyledBase);
function New(props: {overrides: {Base: OverrideT<{}>}}) {
  return (
    <div>
      <Base override={props.overrides.Base}>default children</Base>
    </div>
  );
}

// eslint-disable-next-line flowtype/no-weak-types
function BaseOverride(props: any) {
  return <input onChange={props.onChange} value={props.value} />;
}

export default function Parent() {
  const [value, setValue] = React.useState('');
  return (
    <div>
      <Old
        overrides={{
          Base: {
            component: BaseOverride,
            props: {
              onChange: event => setValue(event.target.value),
              value,
            },
          },
        }}
      />
      <New
        overrides={{
          Base: {
            component: BaseOverride,
            props: {
              onChange: event => setValue(event.target.value),
              value,
            },
          },
        }}
      />
    </div>
  );
}
