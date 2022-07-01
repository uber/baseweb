/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import { FormControl } from '../../form-control/index.js';
import Input from '../input.js';

export function Scenario() {
  return (
    <>
      <FormControl label={'Positive'} caption={() => 'caption'} positive={'Success!'}>
        <Input
          overrides={{
            Root: {
              style: ({ $positive, $error }) => {
                console.log(
                  `Example 1 ${$positive ? 'positive' : 'error'} value: ${$positive || $error}`
                );

                return {};
              },
            },
          }}
        />
      </FormControl>
      <br />
      <FormControl label={'Error'} caption={() => 'caption'} error={'Error!'}>
        <Input
          overrides={{
            Root: {
              style: ({ $positive, $error }) => {
                console.log(
                  `Example 1 ${$positive ? 'positive' : 'error'} value: ${$positive || $error}`
                );

                console.log($error);
                return {};
              },
            },
          }}
        />
      </FormControl>
      <br />
    </>
  );
}
