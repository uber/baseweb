/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {mount} from 'enzyme';
import {Heading, HeadingLevel} from '../index.js';

describe('Heading', () => {
  let wrapper;
  let mountNode;

  afterEach(() => {
    wrapper && wrapper.unmount();
    mountNode && mountNode.unmount();
    mountNode = null;
  });

  test('basic render', () => {
    const wrapper = mount(
      <HeadingLevel>
        <Heading>Base Web [L1]</Heading>
        <HeadingLevel>
          <Heading>Introduction [L2]</Heading>
          <HeadingLevel>
            <Heading>Quotes [L3]</Heading>
            <HeadingLevel>
              <Heading>Subtitle [L4]</Heading>
              <HeadingLevel>
                <Heading>Subtitle [L5]</Heading>
                <HeadingLevel>
                  <Heading>Subtitle [L6]</Heading>
                </HeadingLevel>
              </HeadingLevel>
            </HeadingLevel>
          </HeadingLevel>
          <Heading>Motivation [L2]</Heading>
        </HeadingLevel>
      </HeadingLevel>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('styleLevels', () => {
    const wrapper = mount(
      <HeadingLevel>
        <Heading styleLevel={2}>Base Web [L1 styled as L2]</Heading>
      </HeadingLevel>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
