/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// @flow
/* eslint-env browser */
/* eslint-disable react/display-name*/

import * as React from 'react';
import {StatefulCheckbox as Checkbox, STYLE_TYPE} from './index';

const onChange = e => {
  // eslint-disable-next-line no-console
  console.log('Checked:', e.target.checked);
};

export const suite = 'Checkbox Test Suite';
export const tests = {
  SIMPLE_TOGGLE_EXAMPLE: 'Checkbox as toggle example',
  TOGGLE_DISABLED_EXAMPLE: 'Checkbox as disabled toggle example',
};

export default {
  [tests.SIMPLE_TOGGLE_EXAMPLE]: () => {
    return (
      <div style={{width: '400px'}}>
        <Checkbox onChange={onChange} checkmarkType={STYLE_TYPE.toggle}>
          click this toggle
        </Checkbox>
      </div>
    );
  },
  [tests.TOGGLE_DISABLED_EXAMPLE]: () => {
    return (
      <div style={{width: '400px'}}>
        <Checkbox
          onChange={onChange}
          disabled
          checkmarkType={STYLE_TYPE.toggle}
        >
          this toggle is disabled
        </Checkbox>
      </div>
    );
  },
};
