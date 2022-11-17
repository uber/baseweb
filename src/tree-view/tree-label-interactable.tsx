/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { StyledLabelInteractable } from './styled-components';
import { getOverride } from '../helpers/overrides';
import type { Override } from '../helpers/overrides';

import type { ComponentType, PropsWithChildren } from 'react';

const TreeLabelInteractable: ComponentType<
  PropsWithChildren<{
    overrides?: {
      LabelInteractable: Override;
    };
  }>
> = ({ overrides = {}, ...props }) => {
  const LabelInteractable = getOverride(overrides.LabelInteractable) || StyledLabelInteractable;
  return (
    // $FlowExpectedError[cannot-spread-inexact]
    <LabelInteractable
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      {...props}
    />
  );
};

export default TreeLabelInteractable;
