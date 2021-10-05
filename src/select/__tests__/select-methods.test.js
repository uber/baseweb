/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import BaseProvider from '../../helpers/base-provider.js';
import {LightTheme} from '../../themes/index.js';

import {StatefulSelect} from '../index.js';

describe('setDropdownOpen', function() {
  it('opens and closes dropdown', () => {
    const options = [
      {id: 'a', label: 'a'},
      {id: 'b', label: 'b'},
      {id: 'c', label: 'c'},
    ];
    const methodsRef = React.createRef();

    const {container} = render(
      <BaseProvider theme={LightTheme}>
        <StatefulSelect methodsRef={methodsRef} options={options} />
      </BaseProvider>,
    );

    expect(container.querySelectorAll('li').length).toBe(0);

    expect(typeof methodsRef.current.setDropdownOpen).toBe('function');

    if (methodsRef.current && methodsRef.current.setDropdownOpen) {
      methodsRef.current.setDropdownOpen(true);
      expect(container.querySelectorAll('li').length).toBe(3);

      methodsRef.current.setDropdownOpen(false);
      expect(container.querySelectorAll('li').length).toBe(0);

      methodsRef.current.setDropdownOpen(false);
      expect(container.querySelectorAll('li').length).toBe(0);

      fireEvent.click(screen.getByText('Select...'));
      expect(container.querySelectorAll('li').length).toBe(3);

      methodsRef.current.setDropdownOpen(false);
      expect(container.querySelectorAll('li').length).toBe(0);
    }
  });
});
