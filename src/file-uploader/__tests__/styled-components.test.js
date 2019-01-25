/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {shallow} from 'enzyme';
import {
  StyledFileDragAndDrop,
  StyledContentMessage,
  StyledErrorMessage,
  StyledRoot,
  StyledHiddenInput,
} from '../index.js';

describe('FileUploader styled components', () => {
  const styledComponents = [
    [StyledFileDragAndDrop, 'StyledFileDragAndDrop'],
    [StyledContentMessage, 'StyledContentMessage'],
    [StyledErrorMessage, 'StyledErrorMessage'],
    [StyledRoot, 'StyledRoot'],
    [StyledHiddenInput, 'StyledHiddenInput'],
  ];

  test.each(styledComponents)('default properties', (Component, name) => {
    const component = shallow(<Component />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has expected default styles`,
    );
  });

  test.each(styledComponents)('disabled', (Component, name) => {
    const component = shallow(<Component $isDisabled />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has expected styles when disabled`,
    );
  });

  test.each(styledComponents)('drag active', (Component, name) => {
    const component = shallow(<Component $isDragActive />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has expected styles when drag active`,
    );
  });

  test.each(styledComponents)('drag accept', (Component, name) => {
    const component = shallow(<Component $isDragAccept />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has expected styles when drag accept`,
    );
  });

  test.each(styledComponents)('drag reject', (Component, name) => {
    const component = shallow(<Component $isDragReject />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has expected styles when drag reject`,
    );
  });

  test.each(styledComponents)('focused', (Component, name) => {
    const component = shallow(<Component $isFocused />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has expected styles when focused`,
    );
  });

  test.each(styledComponents)('afterFileDrop', (Component, name) => {
    const component = shallow(<Component $afterFileDrop />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has expected styles when after files are dropped`,
    );
  });
});
