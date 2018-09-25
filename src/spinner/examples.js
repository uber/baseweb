/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {styled} from '../styles';
import {Spinner} from './index';

export const suite = 'Spinner Test Suite';
export const tests = {
  SIMPLE_EXAMPLE: 'Spinner component',
  STYLE_PROPS_OVERRIDES: 'Spinner style and props overrides',
};

const Centered = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: '90vh',
  lineHeight: 1.5,
});

const Spacing = styled('span', {
  margin: '10px',
});

export default {
  [tests.SIMPLE_EXAMPLE]: function Story1() {
    return (
      <Centered>
        <Spacing>
          <Spinner size={22} />
        </Spacing>
        <Spacing>
          <Spinner />
        </Spacing>
        <Spacing>
          <Spinner size={88} />
        </Spacing>
      </Centered>
    );
  },
  [tests.STYLE_PROPS_OVERRIDES]: function Story3() {
    return (
      <Centered>
        <Spinner
          overrides={{
            Svg: {
              props: {
                'data-label': 'data-label',
              },
              style: ({$theme}) => ({
                borderRadius: '50%',
                backgroundColor: $theme.colors.primary50,
              }),
            },
          }}
        />
      </Centered>
    );
  },
};
