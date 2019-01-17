/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {styled} from '../styles/index.js';
import {StatefulList as BaseStatefulList, List as BaseList} from './index.js';
import {mergeOverrides} from '../helpers/overrides.js';
import type {StatefulListPropsT, ListPropsT} from './types.js';
import ArrowRight from '../icon/arrow-right.js';

export const suite = 'Component Test Suite';
export const tests = {
  LIST_EXAMPLE: 'Basic list',
  REMOVABLE_ITEMS_EXAMPLE: 'Removable items',
  VARYING_HEIGHTS_EXAMPLE: 'Varying heights',
  CUSTOM_DRAG_HANDLE_EXAMPLE: 'Custom drag handle',
  STATELESS_LIST_EXAMPLE: 'Stateless list',
  OVERRIDE_LABEL_EXAMPLE: 'Override label',
};

const List = (props: ListPropsT) => {
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
  return <BaseList {...otherProps} overrides={listOverrides} />;
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

const CustomDragHandleWrapper = styled('div', () => {
  return {
    marginRight: '1em',
    width: '24px',
    display: 'flex',
    alignItems: 'center',
  };
});

const CustomDragHandle = () => (
  <CustomDragHandleWrapper>
    <ArrowRight size={24} color="#CCC" />
  </CustomDragHandleWrapper>
);

export default {
  [tests.LIST_EXAMPLE]: function Story1() {
    return (
      <StatefulList
        initialState={{
          items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
        }}
        onChange={console.log} // eslint-disable-line no-console
      />
    );
  },
  [tests.REMOVABLE_ITEMS_EXAMPLE]: function Story2() {
    return (
      <StatefulList
        initialState={{
          items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
        }}
        removable
        onChange={console.log} // eslint-disable-line no-console
      />
    );
  },
  [tests.VARYING_HEIGHTS_EXAMPLE]: function Story3() {
    return (
      <StatefulList
        initialState={{
          items: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'Donec ornare.',
            'Morbi malesuada id ante ac tincidunt. Phasellus at varius enim, fringilla pretium lorem. Integer placerat, est in aliquam tempus, ex urna hendrerit quam, eu sagittis nulla lorem eu magna.',
            'Morbi nibh nunc.',
            'Nunc consequat erat id ante mollis tincidunt in a nulla.',
          ],
        }}
        onChange={console.log} // eslint-disable-line no-console
      />
    );
  },
  [tests.CUSTOM_DRAG_HANDLE_EXAMPLE]: function Story4() {
    return (
      <StatefulList
        initialState={{
          items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
        }}
        overrides={{
          DragHandle: CustomDragHandle,
        }}
        onChange={console.log} // eslint-disable-line no-console
      />
    );
  },
  [tests.STATELESS_LIST_EXAMPLE]: function Story5() {
    return (
      <List
        items={['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']}
        onChange={console.log} // eslint-disable-line no-console
      />
    );
  },
  [tests.OVERRIDE_LABEL_EXAMPLE]: function Story6() {
    return (
      <StatefulList
        initialState={{
          items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
        }}
        overrides={{
          Label: {
            style: ({$isDragged}) => ({
              fontSize: $isDragged ? '20px' : null,
              color: $isDragged ? 'darkred' : null,
            }),
          },
        }}
        onChange={console.log} // eslint-disable-line no-console
      />
    );
  },
};
