/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import SelectDropdown from '../dropdown.js';
import {SIZE, TYPE} from '../constants.js';
import {StatefulMenu} from '../../menu/index.js';

jest.mock('../../menu');

describe('SelectDropdown', function() {
  let wrapper;
  let props = {};
  const options = [{id: '1', label: 'label1'}, {id: '2', label: 'label2'}];
  const value = [{id: '1', label: 'label1'}];
  const ref = React.createRef();

  beforeEach(function() {
    props = {
      value,
      valueKey: 'id',
      labelKey: 'label',
      size: SIZE.default,
      options,
      onItemSelect: jest.fn(),
      getOptionLabel: jest.fn(({option}) => <span>option.label</span>),
      maxDropdownHeight: '1000px',
      overrides: {},
      error: false,
      isLoading: false,
      multi: false,
      required: false,
      searchable: true,
      type: TYPE.select,
      width: 100,
    };
    wrapper = mount(<SelectDropdown innerRef={ref} {...props} />);
  });

  afterEach(function() {
    wrapper && wrapper.unmount();
  });

  afterAll(function() {
    jest.restoreAllMocks();
  });

  test('renders StatefulMenu', function() {
    // $FlowFixMe
    const menuProps = StatefulMenu.mock.calls[0][0];
    expect(StatefulMenu).toHaveBeenCalled();
    expect(menuProps.items).toMatchInlineSnapshot(`
Object {
  "__ungrouped": Array [
    Object {
      "id": "1",
      "label": "label1",
    },
    Object {
      "id": "2",
      "label": "label2",
    },
  ],
}
`);
    expect(menuProps.overrides).toMatchInlineSnapshot(`
Object {
  "List": Object {
    "component": Object {
      "$$typeof": Symbol(react.forward_ref),
      "render": [MockFunction],
    },
    "props": Object {
      "$maxHeight": "1000px",
      "aria-multiselectable": false,
    },
    "style": [Function],
  },
  "Option": Object {
    "props": Object {
      "getItemLabel": [Function],
      "onMouseDown": [Function],
      "overrides": Object {
        "ListItem": Object {
          "component": Object {
            "$$typeof": Symbol(react.forward_ref),
            "__STYLETRON__": undefined,
            "displayName": "StyledListItem",
            "render": [MockFunction],
          },
          "props": Object {
            "role": "option",
          },
          "style": undefined,
        },
      },
    },
  },
}
`);
  });

  test('StatefulMenu overrides merge with default overrides', function() {
    const emptyStateOverrides = {
      EmptyState: {
        style: {
          backgroundColor: 'red',
        },
      },
    };
    wrapper.setProps({
      overrides: {
        StatefulMenu: {
          props: {
            overrides: emptyStateOverrides,
          },
        },
      },
    });
    expect(wrapper.find(StatefulMenu).props().overrides.EmptyState)
      .toMatchInlineSnapshot(`
Object {
  "style": Object {
    "backgroundColor": "red",
  },
}
`);

    expect(wrapper.find(StatefulMenu).props().overrides.Option)
      .toMatchInlineSnapshot(`
Object {
  "props": Object {
    "getItemLabel": [Function],
    "onMouseDown": [Function],
    "overrides": Object {
      "ListItem": Object {
        "component": Object {
          "$$typeof": Symbol(react.forward_ref),
          "__STYLETRON__": undefined,
          "displayName": "StyledListItem",
          "render": [MockFunction],
        },
        "props": Object {
          "role": "option",
        },
        "style": undefined,
      },
    },
  },
}
`);
  });
});
