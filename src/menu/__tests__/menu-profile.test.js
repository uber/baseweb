// @flow
import React from 'react';
import {mount} from 'enzyme';
import {
  List,
  ListItemProfile,
  ProfileImgContainer,
  ProfileImg,
  ProfileLabelsContainer,
  ProfileTitle,
  ProfileSubtitle,
  ProfileBody,
} from '../styled-components';
import MenuProfile from '../menu-profile';

const mockItems = [
  {
    title: 'David Smith',
    subtitle: 'Senior Engineering Manager',
    body: 'Uber Everything',
    imgUrl: 'imgUrl',
  },
];

function getSharedProps() {
  return {
    items: mockItems,
    getProfileItemLabels: ({title, subtitle, body}) => ({
      title,
      subtitle,
      body,
    }),
    getProfileItemImg: item => item.imgUrl,
    getProfileItemImgText: item => item.title,
    rootRef: React.createRef(),
    overrides: {
      List,
      ListItemProfile,
      ProfileImgContainer,
      ProfileImg,
      ProfileLabelsContainer,
      ProfileTitle,
      ProfileSubtitle,
      ProfileBody,
    },
  };
}

describe('Menu Profile Stateless Component', () => {
  test('basic renders', () => {
    // $FlowFixMe
    const component = mount(<MenuProfile {...getSharedProps()} />);

    expect(component.find(List)).toExist();
    expect(component.find(List)).toHaveProp({
      $ref: React.createRef(),
    });

    expect(
      component
        .find(ProfileTitle)
        .first()
        .text(),
    ).toEqual(mockItems[0].title);

    expect(
      component
        .find(ProfileSubtitle)
        .first()
        .text(),
    ).toEqual(mockItems[0].subtitle);

    expect(
      component
        .find(ProfileBody)
        .first()
        .text(),
    ).toEqual(mockItems[0].body);

    expect(
      component
        .find(ProfileImg)
        .first()
        .prop('src'),
    ).toEqual(mockItems[0].imgUrl);
  });

  test('renders with custom image component', () => {
    function MockComponent() {
      return <div />;
    }
    const props = {
      ...getSharedProps(),
      getProfileItemImg: item => MockComponent,
    };
    const component = mount(<MenuProfile {...props} />);
    expect(component.find(MockComponent)).toExist();
  });

  test('renders with components overrides', () => {
    function MockComponent() {
      return <div />;
    }
    const props = {
      ...getSharedProps(),
      overrides: {
        ListItemProfile: MockComponent,
      },
    };
    const component = mount(<MenuProfile {...props} />);
    expect(component.find(ListItemProfile)).not.toExist();
    expect(component.find(MockComponent)).toExist();
  });
});
