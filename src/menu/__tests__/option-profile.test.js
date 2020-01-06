/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import {
  StyledListItemProfile,
  StyledProfileImg,
  StyledProfileTitle,
  StyledProfileSubtitle,
  StyledProfileBody,
} from '../styled-components.js';
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
  test('basic renders', () => {
    const component = mount(<OptionProfile {...getSharedProps()} />);

    expect(component.find(StyledListItemProfile)).toExist();

    expect(
      component
        .find(StyledProfileTitle)
        .first()
        .text(),
    ).toEqual(mockItem.title);

    expect(
      component
        .find(StyledProfileSubtitle)
        .first()
        .text(),
    ).toEqual(mockItem.subtitle);

    expect(
      component
        .find(StyledProfileBody)
        .first()
        .text(),
    ).toEqual(mockItem.body);

    expect(
      component
        .find(StyledProfileImg)
        .first()
        .prop('src'),
    ).toEqual(mockItem.imgUrl);
  });

  test('renders with custom image component', () => {
    function MockComponent() {
      return <div />;
    }
    const props = {
      ...getSharedProps(),
      getProfileItemImg: item => MockComponent,
    };
    const component = mount(<OptionProfile {...props} />);
    expect(component.find(MockComponent)).toExist();
  });

  test('renders with components overrides', () => {
    function MockComponent() {
      return <div />;
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
    const component = mount(<OptionProfile {...props} />);
    expect(component.find(StyledListItemProfile)).not.toExist();
    expect(component.find(MockComponent)).toExist();
    expect(component.find(MockComponent).prop('custom')).toEqual('prop');
  });
});
