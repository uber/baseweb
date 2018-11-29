/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {Notification} from '..';

describe('Notification', () => {
  it('applies correct accessibility attributes to root element', () => {
    const example = shallow(<Notification>Test</Notification>);
    expect(example).toHaveProp('role', 'alert');
  });
});
