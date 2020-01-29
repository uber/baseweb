/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import type {TreeLabelT, SharedStylePropsT} from './types.js';
import {StyledIconContainer, StyledItemContent} from './styled-components.js';
import CheckIndeterminateIcon from '../icon/check-indeterminate.js';
import PlusIcon from '../icon/plus.js';
import {getOverride, getOverrideProps} from '../helpers/overrides.js';

const TreeLabel: React$ComponentType<TreeLabelT> = ({
  hasChildren,
  isExpanded,
  label,
  overrides = {},
  node,
  ...props
}) => {
  const sharedProps: SharedStylePropsT = {
    $isExpanded: !!isExpanded,
    $hasChildren: !!hasChildren,
  };
  const {
    IconContainer: IconContainerOverride,
    ExpandIcon: ExapandIconOverride,
    CollapseIcon: CollapseIconOverride,
    TreeItemContent: TreeItemContentOverride,
  } = overrides;
  const IconContainer =
    getOverride(IconContainerOverride) || StyledIconContainer;
  const ExpandIcon = getOverride(ExapandIconOverride) || PlusIcon;
  const CollapseIcon =
    getOverride(CollapseIconOverride) || CheckIndeterminateIcon;
  const TreeItemContent =
    getOverride(TreeItemContentOverride) || StyledItemContent;
  return (
    <TreeItemContent {...sharedProps} {...props}>
      {hasChildren && (
        <IconContainer
          {...sharedProps}
          {...getOverrideProps(IconContainerOverride)}
        >
          {!isExpanded ? (
            <ExpandIcon
              {...sharedProps}
              {...getOverrideProps(ExapandIconOverride)}
            />
          ) : (
            <CollapseIcon
              {...sharedProps}
              {...getOverrideProps(CollapseIconOverride)}
            />
          )}
        </IconContainer>
      )}
      {typeof label === 'function' ? label(node) : label}
    </TreeItemContent>
  );
};

export default TreeLabel;
