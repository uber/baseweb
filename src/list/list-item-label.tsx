/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';

import { getOverrides } from '../helpers/overrides';

import {
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
      // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
      <LabelSublistContent {...labelSublistContentProps}>{props.children}</LabelSublistContent>
    );
  }

  return (
    <div>
      {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
      <LabelContent {...labelContentProps}>{props.children}</LabelContent>
      {props.description && (
        // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
        <LabelDescription {...labelDescriptionProps}>{props.description}</LabelDescription>
      )}
    </div>
  );
}

export default ListItemLabel;
