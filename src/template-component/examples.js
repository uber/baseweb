/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {styled} from '../styles/index.js';
import {Component, StatefulComponent, StyledRoot} from './index.js';

export const suite = 'Component Test Suite';
export const tests = {
  SIMPLE_EXAMPLE: 'Stateless component',
  STATEFUL_EXAMPLE: 'Stateful component',
  STYLE_PROPS_OVERRIDES: 'Component style and props overrides',
  STYLED_COMPONENT_OVERRIDES: 'Styled components overrides',
};

const Span = styled<{$prop: boolean}>('span', ({$prop, $theme}) => {
  return {
    color: $prop ? $theme.colors.positive : $theme.colors.warning,
  };
});

const CustomRoot = ({children, ...restProps}: {children?: React.Node}) => {
  return (
    <StyledRoot $prop={true} {...restProps}>
      <Span $prop={false} {...restProps}>
        {children}
      </Span>
    </StyledRoot>
  );
};

export default {
  [tests.SIMPLE_EXAMPLE]: function Story1() {
    return <Component>Component</Component>;
  },
  [tests.STATEFUL_EXAMPLE]: function Story2() {
    return <StatefulComponent>Component</StatefulComponent>;
  },
  [tests.STYLE_PROPS_OVERRIDES]: function Story3() {
    return (
      <StatefulComponent
        initialState={{prop: false}}
        overrides={{
          Root: {
            props: {
              'data-label': 'data-label',
            },
            style: {
              cursor: 'wait',
            },
          },
        }}
      >
        Component
      </StatefulComponent>
    );
  },
  [tests.STYLED_COMPONENT_OVERRIDES]: function Story3() {
    return (
      <StatefulComponent
        overrides={{
          Root: {
            component: CustomRoot,
          },
        }}
      >
        Component
      </StatefulComponent>
    );
  },
};
