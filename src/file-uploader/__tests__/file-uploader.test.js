/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {mount} from 'enzyme';

import {Unstable_FileUploader} from '../index.js';

describe('FileUploader', () => {
  it('applies expected accessibility attributes to button', () => {
    const wrapper = mount(<Unstable_FileUploader />);
    const button = wrapper.find('button').getDOMNode();

    expect(button.getAttribute('aria-controls')).toBe('fileupload');
    expect(button.getAttribute('role')).toBe('button');
  });
});
