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
/* eslint-disable */
import React from 'react';
import {mount} from 'enzyme';

import ThemeProvider from '../theme-provider';
import styled from '../styled';
import {withStyletronProvider} from '../../test/test-utils';

jest.unmock('../styled.js');

test('<ThemeProvider />', () => {
  const StyledMockButton = styled('button', ({theme}) => ({
    backgroundColor: 'red',
  }));

  const TestComponent = withStyletronProvider(() => (
    <ThemeProvider theme="red">
      <StyledMockButton id="testButton" />
    </ThemeProvider>
  ));
  const wrapper = mount(<TestComponent />);
  const button = wrapper
    .find('#testButton')
    .children()
    .at(0);
  expect(button.props().$theme).toBe('red');
  wrapper.unmount();
});
