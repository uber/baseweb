/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import * as React from 'react';
import {render, getByTestId, getByText} from '@testing-library/react';

import OptionProfile from '../option-profile.js';

const mockItem = {
  title: 'David Smith',
  subtitle: 'Senior Engineering Manager',
  body: 'Uber Everything',
  imgUrl: 'imgUrl',
};

function getSharedProps() {
  return {
    item: mockItem,
    getProfileItemLabels: ({title, subtitle, body}) => ({
      title,
      subtitle,
      body,
    }),
    getProfileItemImg: item => item.imgUrl,
    getProfileItemImgText: item => item.title,
  };
}

describe('Option Profile Stateless Component', () => {
  it('basic renders', () => {
    const {container} = render(<OptionProfile {...getSharedProps()} />);
    getByText(container, mockItem.title);
    getByText(container, mockItem.subtitle);
    getByText(container, mockItem.body);
    expect(container.querySelector('img').getAttribute('src')).toBe(
      mockItem.imgUrl,
    );
  });

  it('renders with custom image component', () => {
    function MockComponent() {
      return <div data-testid="mock-image-element" />;
    }
    const props = {
      ...getSharedProps(),
      getProfileItemImg: item => MockComponent,
    };
    const {container} = render(<OptionProfile {...props} />);
    getByTestId(container, 'mock-image-element');
  });

  it('renders with components overrides', () => {
    function MockComponent() {
      return <div data-testid="mock-list-item-element" />;
    }
    const props = {
      ...getSharedProps(),
      overrides: {
        ListItemProfile: {
          component: MockComponent,
          props: {
            custom: 'prop',
          },
        },
      },
    };
    const {container} = render(<OptionProfile {...props} />);
    getByTestId(container, 'mock-list-item-element');
  });
});
