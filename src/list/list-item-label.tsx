/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';

import { getOverrides } from '../helpers/overrides';

import {
  StyledLabelRoot,
  StyledLabelContent,
  StyledLabelDescription,
  StyledLabelSublistContent,
} from './styled-components';
import type { LabelProps } from './types';

function ListItemLabel(props: LabelProps) {
  const { overrides = {} } = props;

  const [LabelSublistContent, labelSublistContentProps] = getOverrides(
    overrides.LabelSublistContent,
    StyledLabelSublistContent
  );
  const [LabelRoot, labelRootProps] = getOverrides(overrides.LabelRoot, StyledLabelRoot);
  const [LabelContent, labelContentProps] = getOverrides(
    overrides.LabelContent,
    StyledLabelContent
  );
  const [LabelDescription, labelDescriptionProps] = getOverrides(
    overrides.LabelDescription,
    StyledLabelDescription
  );

  if (props.sublist) {
    return (
      <LabelSublistContent {...labelSublistContentProps}>{props.children}</LabelSublistContent>
    );
  }

  return (
    <LabelRoot {...labelRootProps}>
      <LabelContent {...labelContentProps}>{props.children}</LabelContent>
      {props.description && (
        <LabelDescription {...labelDescriptionProps}>{props.description}</LabelDescription>
      )}
    </LabelRoot>
  );
}

export default ListItemLabel;
