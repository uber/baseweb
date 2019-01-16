/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
// import {styled} from '../styles/index.js';
import {StatefulList as BaseStatefulList} from './index.js';
import {mergeOverrides} from '../helpers/overrides.js';
import type {StatefulListPropsT} from './types.js';

export const suite = 'Component Test Suite';
export const tests = {
  SIMPLE_EXAMPLE: 'Stateless list',
  STATEFUL_EXAMPLE: 'Stateful list',
  STYLE_PROPS_OVERRIDES: 'Component style and props overrides',
  STYLED_COMPONENT_OVERRIDES: 'Styled components overrides',
};

const StatefulList = (props: StatefulListPropsT) => {
  const {overrides, ...otherProps} = props;
  const listOverrides = mergeOverrides(
    {
      Root: {
        style: {
          width: '344px',
        },
      },
    },
    overrides,
  );
  return <BaseStatefulList {...otherProps} overrides={listOverrides} />;
};

// const Span = styled('span', ({$prop, $theme}) => {
//   return {
//     color: $prop ? $theme.colors.positive : $theme.colors.warning,
//   };
// });

// const CustomRoot = ({children, ...rest}: {children?: React.Node}) => {
//   return (
//     <StyledRoot {...rest}>
//       <Span {...rest}>{children}</Span>
//     </StyledRoot>
//   );
// };

export default {
  [tests.STATEFUL_EXAMPLE]: function Story2() {
    return (
      <StatefulList
        initialState={{
          items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
        }}
        onChange={console.log} // eslint-disable-line no-console
      />
    );
  },
};
