// @flow
import React from 'react';
import {mount} from 'enzyme';
import {
  ListItemProfile,
  ProfileImg,
  ProfileTitle,
  ProfileSubtitle,
  ProfileBody,
} from '../styled-components';
import OptionProfile from '../option-profile';

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

    expect(component.find(ListItemProfile)).toExist();

    expect(
      component
        .find(ProfileTitle)
        .first()
        .text(),
    ).toEqual(mockItem.title);

    expect(
      component
        .find(ProfileSubtitle)
        .first()
        .text(),
    ).toEqual(mockItem.subtitle);

    expect(
      component
        .find(ProfileBody)
        .first()
        .text(),
    ).toEqual(mockItem.body);

    expect(
      component
        .find(ProfileImg)
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
    expect(component.find(ListItemProfile)).not.toExist();
    expect(component.find(MockComponent)).toExist();
    expect(component.find(MockComponent).prop('custom')).toEqual('prop');
  });
});
