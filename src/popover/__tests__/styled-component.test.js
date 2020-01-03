/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable */
// @flow
import * as React from 'react';
import {StyledBody, StyledArrow, Popover, PLACEMENT} from '../index.js';
import type {BodyStylePropsArgT} from '../index.js';

describe('Popover styled components flow', () => {
  test('it runs without flow error when we override StyledArrow', () => {
    const CustomArrow = () => (
      <StyledArrow
        $arrowOffset={{top: 0, left: 0}}
        $placement={PLACEMENT.right}
      >
        <span>➤</span>
      </StyledArrow>
    );
    const CustomPopover = () => (
      <Popover
        overrides={{
          Arrow: {
            component: CustomArrow,
          },
        }}
      >
        Some text
      </Popover>
    );
  });

  test('it provides flow error if we not provide all required props for StyledArrow', () => {
    const BrokenCustomArrow = () => (
      // $FlowFixMe missing $arrowOffset prop
      <StyledArrow $placement={PLACEMENT.right}>
        <span>➤</span>
      </StyledArrow>
    );
    const CustomPopover = () => (
      <Popover
        overrides={{
          Arrow: {
            component: BrokenCustomArrow,
          },
        }}
      >
        Some text
      </Popover>
    );
  });

  test('it runs without flow error when we override StyledBody', () => {
    const CustomBody = props => {
      const {$isAnimating, children, ...rest} = props;
      return (
        <StyledBody {...rest} $isAnimating={false}>
          {children}
        </StyledBody>
      );
    };
    const CustomPopover = () => (
      <Popover
        overrides={{
          Body: {
            component: CustomBody,
          },
        }}
      >
        Some text
      </Popover>
    );
  });

  test('it provides flow error if we not provide all required props for StyledBody', () => {
    const BrokenCustomBody = props => {
      const {$isAnimating, children, ...rest} = props;
      // $FlowFixMe missing $isAnimating prop
      return <StyledBody {...rest}>{children}</StyledBody>;
    };
    const CustomPopover = () => (
      <Popover
        overrides={{
          Body: {
            component: BrokenCustomBody,
          },
        }}
      >
        Some text
      </Popover>
    );
  });
});
