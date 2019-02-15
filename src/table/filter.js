/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

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
import TrapFocus from './trap-focus.js';
import type {FilterProps} from './types.js';

function makeOverride(Override, Source) {
  const OverriddenComponent = props => {
    const [Overridden, overrideProps] = getOverrides(Override, Source);
    return <Overridden {...props} {...overrideProps} />;
  };

  OverriddenComponent.displayName = Source.displayName;
  return OverriddenComponent;
}

export default function Filter(props: FilterProps) {
  const {onSelectAll = () => {}, onReset = () => {}, overrides = {}} = props;

  const MenuButton = makeOverride(overrides.MenuButton, StyledFilterButton);
  const Content = makeOverride(overrides.Content, StyledFilterContent);
  const Heading = makeOverride(overrides.Heading, StyledFilterHeading);
  const Footer = makeOverride(overrides.Footer, StyledFilterFooter);

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
      eventsEnabled={false}
      placement={PLACEMENT.bottom}
      stateReducer={(_, nextState) => {
        if (props.disabled) {
          return {...nextState, isOpen: false};
        }
        return nextState;
      }}
      content={
        <TrapFocus>
          <Heading>Filter Column</Heading>
          <Content>{props.children}</Content>
          <Footer>
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
        </TrapFocus>
      }
    >
      <MenuButton>
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
      </MenuButton>
    </StatefulPopover>
  );
}
