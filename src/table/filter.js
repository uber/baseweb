/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import FocusLock from 'react-focus-lock';

import {Button, KIND, SIZE} from '../button/index.js';
import {getOverrides} from '../helpers/overrides.js';
import FilterIcon from '../icon/filter.js';
import {StatefulPopover, PLACEMENT} from '../popover/index.js';

import {
  StyledFilterButton,
  StyledFilterContent,
  StyledFilterHeading,
  StyledFilterFooter,
} from './styled-components.js';
import type {FilterProps} from './types.js';

export default function Filter(props: FilterProps) {
  const {onSelectAll = () => {}, onReset = () => {}, overrides = {}} = props;

  const [MenuButton, menuButtonProps] = getOverrides(
    overrides.MenuButton,
    StyledFilterButton,
  );

  const [Content, contentProps] = getOverrides(
    overrides.Content,
    StyledFilterContent,
  );

  const [Heading, headingProps] = getOverrides(
    overrides.Heading,
    StyledFilterHeading,
  );

  const [Footer, footerProps] = getOverrides(
    overrides.Footer,
    StyledFilterFooter,
  );

  return (
    <StatefulPopover
      placement={PLACEMENT.bottom}
      stateReducer={(_, nextState) => {
        if (props.disabled) {
          return {...nextState, isOpen: false};
        }
        return nextState;
      }}
      content={
        // eslint-disable-next-line jsx-a11y/no-autofocus
        <FocusLock autoFocus={false}>
          <Heading {...headingProps}>Filter Column</Heading>
          <Content {...contentProps}>{props.children}</Content>
          <Footer {...footerProps}>
            <Button
              kind={KIND.minimal}
              size={SIZE.compact}
              onClick={() => {
                onSelectAll();
              }}
            >
              Select All
            </Button>

            <Button
              kind={KIND.minimal}
              size={SIZE.compact}
              onClick={() => {
                onReset();
              }}
            >
              Reset
            </Button>
          </Footer>
        </FocusLock>
      }
    >
      <MenuButton
        $active={props.active}
        $disabled={props.disabled}
        {...menuButtonProps}
      >
        <FilterIcon size={18} />
      </MenuButton>
    </StatefulPopover>
  );
}
