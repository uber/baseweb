/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { StyledTitle, StyledSelector } from './styled-components';
import { useStyletron } from '../styles/index';
import { getOverrides } from '../helpers/overrides';
import type { SelectorProps } from './types';

export const Selector = ({ title, icon, isActive, onChange, overrides = {} }: SelectorProps) => {
  const [Title, TitleProps] = getOverrides(overrides.Title, StyledTitle);
  const [Selector, SelectorProps] = getOverrides(overrides.Selector, StyledSelector);
  const [, theme] = useStyletron();
  const Icon = icon;

  return (
    <Selector onClick={onChange} role="tab" aria-selected={isActive} {...SelectorProps}>
      <Icon
        size={20}
        color={
          isActive ? theme.colors.bottomNavigationSelectedText : theme.colors.bottomNavigationText
        }
      />
      <Title $isActive={isActive} {...TitleProps}>
        {title}
      </Title>
    </Selector>
  );
};
