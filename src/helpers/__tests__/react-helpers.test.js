/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {flattenFragments} from '../react-helpers.js';

describe('Helpers - ReactHelpers', () => {
  test('flattenFragments', () => {
    const list = (
      <ul>
        <li>Item 1</li>
        <React.Fragment>
          <li>Item 2</li>
        </React.Fragment>
      </ul>
    );
    expect(flattenFragments(list.props.children)).toMatchSnapshot('no wrapper');

    const Wrapper = props => <b {...props} />;
    expect(flattenFragments(list.props.children, Wrapper)).toMatchSnapshot(
      'with wrapper',
    );
  });
});
