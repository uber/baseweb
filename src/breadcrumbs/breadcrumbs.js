/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

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
import type {BreadcrumbLocaleT} from './locale.js';
import {
  StyledRoot,
  StyledSeparator,
  StyledList,
  StyledListItem,
} from './styled-components.js';
import {getOverrides, mergeOverrides} from '../helpers/overrides.js';

type LocaleT = {|locale?: BreadcrumbLocaleT|};
export function BreadcrumbsRoot(props: {|...BreadcrumbsPropsT, ...LocaleT|}) {
  const {overrides = {}} = props;
  const numChildren = Children.count(props.children);
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

  const iconOverrides = mergeOverrides(
    {Svg: {style: {verticalAlign: 'text-bottom'}}},
    // $FlowFixMe
    baseIconProps && baseIconProps.overrides,
  );
  // $FlowFixMe
  baseIconProps.overrides = iconOverrides;

  Children.forEach(props.children, (child, index) => {
    childrenWithSeparators.push(
      <ListItem
        key={`breadcrumb-item-${index}`}
        $itemIndex={index}
        {...baseListItemProps}
      >
        {child}
        {index !== numChildren - 1 && (
          <Separator {...baseSeparatorProps} key={`separator-${index}`}>
            <ThemeContext.Consumer>
              {theme =>
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
    <Root
      aria-label={
        props.ariaLabel || (props.locale ? props.locale.ariaLabel : '')
      }
      data-baseweb="breadcrumbs"
      {...baseRootProps}
    >
      <List {...baseListProps}>{childrenWithSeparators}</List>
    </Root>
  );
}

function Breadcrumbs(props: BreadcrumbsPropsT) {
  return (
    <LocaleContext.Consumer>
      {locale => <BreadcrumbsRoot {...props} locale={locale.breadcrumbs} />}
    </LocaleContext.Consumer>
  );
}

Breadcrumbs.defaultProps = {
  overrides: {},
};

export default Breadcrumbs;
