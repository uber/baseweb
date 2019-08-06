/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {StyledSearchIcon} from './styled-components.js';
import SearchIconComponent from '../icon/search.js';
import {StatefulInput as DefaultStatefulInput} from '../input/index.js';
import {getOverrides, mergeOverrides} from '../helpers/overrides.js';

import type {FilterInputPropsT} from './types.js';

function SearchIcon(props) {
  return (
    <StyledSearchIcon {...props}>
      <SearchIconComponent size={16} title={'search'} />
    </StyledSearchIcon>
  );
}

export default function FilterInput(props: FilterInputPropsT) {
  const {overrides = {}, ...rest} = props;
  const [StatefulInput, statefulInputProps] = getOverrides(
    overrides.FilterInput,
    DefaultStatefulInput,
  );
  // $FlowFixMe
  statefulInputProps.overrides = mergeOverrides(
    {
      Before: {
        component: SearchIcon,
      },
    },
    // $FlowFixMe
    statefulInputProps.overrides,
  );
  return <StatefulInput {...rest} {...statefulInputProps} />;
}
