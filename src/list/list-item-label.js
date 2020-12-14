/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {getOverrides} from '../helpers/overrides.js';

import {
  StyledLabelContent,
  StyledLabelDescription,
  StyledLabelSublistContent,
} from './styled-components.js';
import type {LabelPropsT} from './types.js';

function ListItemLabel(props: LabelPropsT) {
  const {overrides = {}} = props;

  const [LabelSublistContent, labelSublistContentProps] = getOverrides(
    overrides.LabelSublistContent,
    StyledLabelSublistContent,
  );
  const [LabelContent, labelContentProps] = getOverrides(
    overrides.LabelContent,
    StyledLabelContent,
  );
  const [LabelDescription, labelDescriptionProps] = getOverrides(
    overrides.LabelDescription,
    StyledLabelDescription,
  );

  if (props.sublist) {
    return (
      <LabelSublistContent {...labelSublistContentProps}>
        {props.children}
      </LabelSublistContent>
    );
  }

  return (
    <div>
      <LabelContent {...labelContentProps}>{props.children}</LabelContent>
      {props.description && (
        <LabelDescription {...labelDescriptionProps}>
          {props.description}
        </LabelDescription>
      )}
    </div>
  );
}

export default ListItemLabel;
