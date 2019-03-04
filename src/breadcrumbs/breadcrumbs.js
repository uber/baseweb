/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import React, {Children} from 'react';

import {LocaleContext} from '../locale/index.js';
import type {BreadcrumbsPropsT} from './types.js';
import type {BreadcrumbLocaleT} from './locale.js';
import {StyledRoot, StyledSeparator, StyledIcon} from './styled-components.js';
import {getOverrides} from '../helpers/overrides.js';

type LocaleT = {|locale?: BreadcrumbLocaleT|};
export function BreadcrumbsRoot(props: {|...BreadcrumbsPropsT, ...LocaleT|}) {
  const {overrides = {}} = props;
  const numChildren = Children.count(props.children);
  const childrenWithSeparators = [];

  const [Root, baseRootProps] = getOverrides(overrides.Root, StyledRoot);
  const [Icon, baseIconProps] = getOverrides(overrides.Icon, StyledIcon);
  const [Separator, baseSeparatorProps] = getOverrides(
    overrides.Separator,
    StyledSeparator,
  );

  Children.forEach(props.children, (child, index) => {
    childrenWithSeparators.push(child);

    if (index !== numChildren - 1) {
      childrenWithSeparators.push(
        <Separator {...baseSeparatorProps} key={index}>
          <Icon {...baseIconProps} />
        </Separator>,
      );
    }
  });

  return (
    <Root
      aria-label={
        props.ariaLabel || (props.locale ? props.locale.ariaLabel : '')
      }
      {...baseRootProps}
    >
      {childrenWithSeparators}
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
