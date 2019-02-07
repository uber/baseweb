/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button, KIND, SIZE} from '../button/index.js';
import FilterIcon from '../icon/filter.js';
import {StatefulPopover} from '../popover/index.js';

import {
  StyledFilterContent,
  StyledFilterHeading,
  StyledFilterFooter,
} from './index.js';
import type {FilterProps} from './types.js';

export default function Filter(props: FilterProps) {
  const {onSelectAll = () => {}, onReset = () => {}} = props;

  function getIconColor(theme) {
    if (props.disabled) {
      return theme.colors.mono500;
    }

    if (props.active) {
      return theme.colors.primary;
    }

    return theme.colors.mono600;
  }

  function getIconHoverColor(theme) {
    if (props.disabled || props.active) {
      return null;
    }

    return theme.colors.black;
  }

  return (
    <StatefulPopover
      content={
        <React.Fragment>
          <StyledFilterHeading>Filter Column</StyledFilterHeading>
          <StyledFilterContent>{props.children}</StyledFilterContent>
          <StyledFilterFooter>
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
          </StyledFilterFooter>
        </React.Fragment>
      }
    >
      <FilterIcon
        overrides={{
          Svg: {
            style: ({$theme}) => ({
              color: getIconColor($theme),
              ':hover': {
                color: getIconHoverColor($theme),
                cursor: props.disabled ? null : 'pointer',
              },
            }),
          },
        }}
        size={18}
      />
    </StatefulPopover>
  );
}
