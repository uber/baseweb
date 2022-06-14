/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render } from '@testing-library/react';

import {
  StatefulSelect,
  StyledRoot,
  StyledControlContainer,
  StyledValueContainer,
  StyledPlaceholder,
  StyledSingleValue,
  StyledInputContainer,
  StyledInput,
  StyledInputSizer,
  StyledSelectArrow,
  StyledClearIcon,
  StyledSearchIconContainer,
  StyledOptionContent,
} from '..';
import SearchIconComponent from '../../icon/search';
import Select from '../select';

jest.mock('../select', () => jest.fn(() => null));

describe('Stateful select', function () {
  afterAll(function () {
    jest.restoreAllMocks();
  });

  it('should provide default styled components to render', function () {
    const props = {
      overrides: {
        Root: StyledRoot,
        ControlContainer: StyledControlContainer,
        ValueContainer: StyledValueContainer,
        Placeholder: StyledPlaceholder,
        SingleValue: StyledSingleValue,
        Tag: function TagComponent({ children }) {
          return <div>{children}</div>;
        },
        InputContainer: StyledInputContainer,
        Input: StyledInput,
        InputSizer: StyledInputSizer,
        SelectArrow: StyledSelectArrow,
        ClearIcon: StyledClearIcon,
        SearchIconContainer: StyledSearchIconContainer,
        SearchIcon: SearchIconComponent,
        OptionContent: StyledOptionContent,
      },
    };
    render(<StatefulSelect {...props} />);
    // @ts-expect-error
    const { overrides } = Select.mock.calls[0][0];
    expect(overrides).toEqual(props.overrides);
    expect(Select).toHaveBeenCalled();
  });
});
