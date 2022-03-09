/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import React, {Children} from 'react';

import {LocaleContext} from '../locale/index.js';
import {ThemeContext} from '../styles/theme-provider.js';
import ChevronRight from '../icon/chevron-right.js';
import ChevronLeft from '../icon/chevron-left.js';
import type {BreadcrumbsPropsT} from './types.js';
import {
  StyledList,
  StyledListItem,
  StyledRoot,
  StyledSeparator,
} from './styled-components.js';
import {getOverrides, mergeOverrides} from '../helpers/overrides.js';

export function Breadcrumbs(props: BreadcrumbsPropsT) {
  const {overrides = {}, showTrailingSeparator = false} = props;
  const childrenArray = Children.toArray(props.children);
  const childrenWithSeparators = [];

  const [Root, baseRootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Right, baseIconProps] = getOverrides(overrides.Icon, ChevronRight);
  const [Left] = getOverrides(overrides.Icon, ChevronLeft);
  const [List, baseListProps] = getOverrides(overrides.List, StyledList);
  const [ListItem, baseListItemProps] = getOverrides(
    overrides.ListItem,
    StyledListItem,
  );
  const [Separator, baseSeparatorProps] = getOverrides(
    overrides.Separator,
    StyledSeparator,
  );

  baseIconProps.overrides = mergeOverrides(
    {Svg: {style: {verticalAlign: 'text-bottom'}}},
    baseIconProps && baseIconProps.overrides,
  );

  childrenArray.forEach((child, index) => {
    childrenWithSeparators.push(
      <ListItem
        key={`breadcrumb-item-${index}`}
        $itemIndex={index}
        {...baseListItemProps}
      >
        {child}
        {(showTrailingSeparator || index !== childrenArray.length - 1) && (
          <Separator {...baseSeparatorProps} key={`separator-${index}`}>
            <ThemeContext.Consumer>
              {(theme) =>
                theme.direction === 'rtl' ? (
                  <Left {...baseIconProps} />
                ) : (
                  <Right {...baseIconProps} />
                )
              }
            </ThemeContext.Consumer>
          </Separator>
        )}
      </ListItem>,
    );
  });

  return (
    <LocaleContext.Consumer>
      {(locale) => (
        <Root
          aria-label={
            props['aria-label'] ||
            props.ariaLabel ||
            locale.breadcrumbs.ariaLabel
          }
          data-baseweb="breadcrumbs"
          {...baseRootProps}
        >
          <List {...baseListProps}>{childrenWithSeparators}</List>
        </Root>
      )}
    </LocaleContext.Consumer>
  );
}

Breadcrumbs.defaultProps = {
  overrides: {},
  showTrailingSeparator: false,
};

export default Breadcrumbs;
