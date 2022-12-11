/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { flattenFragments } from '../react-helpers';

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
    // eslint-disable-next-line jest/no-restricted-matchers
    expect(flattenFragments(list.props.children)).toMatchSnapshot('no wrapper');

    // @ts-ignore
    const Wrapper = (props) => <b {...props} />;
    // eslint-disable-next-line jest/no-restricted-matchers
    expect(flattenFragments(list.props.children, Wrapper)).toMatchSnapshot('with wrapper');
  });
});
