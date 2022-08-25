/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { ThemeContext } from '../styles/theme-provider';
import type { TreeLabelProps, SharedStyleProps } from './types';
import { StyledIconContainer, StyledItemContent } from './styled-components';
import ChevronRight from '../icon/chevron-right';
import ChevronDown from '../icon/chevron-down';
import ChevronLeft from '../icon/chevron-left';
import BlankIcon from '../icon/blank';
import { getOverride, getOverrideProps, getOverrides } from '../helpers/overrides';

import type { ComponentType } from 'react';

const TreeLabel: ComponentType<TreeLabelProps> = ({
  hasChildren,
  isExpanded,
  label,
  overrides = {},
  node,
  isSelected,
  isFocusVisible,
  ...props
}) => {
  const sharedProps: SharedStyleProps = {
    $isExpanded: !!isExpanded,
    $isSelected: !!isSelected,
    $isFocusVisible: !!isFocusVisible,
    $hasChildren: !!hasChildren,
  };
  const {
    IconContainer: IconContainerOverride,
    ExpandIcon: ExpandIconOverride,
    CollapseIcon: CollapseIconOverride,
    LeafIconContainer: LeafIconContainerOverride,
    LeafIcon: LeafIconOverride,
    TreeItemContent: TreeItemContentOverride,
  } = overrides;
  const IconContainer = getOverride(IconContainerOverride) || StyledIconContainer;
  const [Left, LeftProps] = getOverrides(ExpandIconOverride, ChevronLeft);
  const [Right, RightProps] = getOverrides(ExpandIconOverride, ChevronRight);
  const CollapseIcon = getOverride(CollapseIconOverride) || ChevronDown;
  const LeafIconContainer = getOverride(LeafIconContainerOverride) || StyledIconContainer;
  const LeafIcon = getOverride(LeafIconOverride) || BlankIcon;
  const TreeItemContent = getOverride(TreeItemContentOverride) || StyledItemContent;
  return (
    // $FlowExpectedError[cannot-spread-inexact]
    <TreeItemContent {...sharedProps} {...props}>
      {hasChildren && (
        <IconContainer {...sharedProps} {...getOverrideProps(IconContainerOverride)}>
          {!isExpanded ? (
            <ThemeContext.Consumer>
              {(theme) =>
                theme.direction === 'rtl' ? (
                  <Left size={16} {...sharedProps} {...LeftProps} />
                ) : (
                  <Right size={16} {...sharedProps} {...RightProps} />
                )
              }
            </ThemeContext.Consumer>
          ) : (
            <CollapseIcon size={16} {...sharedProps} {...getOverrideProps(CollapseIconOverride)} />
          )}
        </IconContainer>
      )}
      {!hasChildren && LeafIcon && (
        <LeafIconContainer {...sharedProps} {...getOverrideProps(LeafIconContainerOverride)}>
          <LeafIcon size={16} {...sharedProps} {...getOverrideProps(LeafIconOverride)} />
        </LeafIconContainer>
      )}
      {typeof label === 'function' ? label(node) : label}
    </TreeItemContent>
  );
};

export default TreeLabel;
