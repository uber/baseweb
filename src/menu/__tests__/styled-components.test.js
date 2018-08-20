/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {shallow} from 'enzyme';
import {
  List,
  ListItem,
  ListItemProfile,
  ProfileBody,
  ProfileImg,
  ProfileTitle,
  ProfileSubtitle,
  ProfileImgContainer,
  ProfileLabelsContainer,
} from '../styled-components';

function makeTest({
  title,
  component: Component,
  props = {},
  children = null,
  snapshotName = 'correct styles',
}: {
  title: string,
  component: React.ComponentType<*>,
  props?: {},
  children?: *,
  snapshotName?: string,
}) {
  test(title, () => {
    const shallowed = shallow(<Component {...props}>{children}</Component>);
    expect(shallowed.instance().getStyles()).toMatchSnapshot(snapshotName);
  });
}

describe('Menu Styled Components', () => {
  makeTest({
    title: 'ListItem - basic render',
    component: ListItem,
  });

  makeTest({
    title: 'ListItem - highlighted render',
    component: ListItem,
    props: {
      $isHighlighted: true,
    },
  });

  makeTest({
    title: 'List - basic render',
    component: List,
  });

  makeTest({
    title: 'ListItemProfile - basic render',
    component: ListItemProfile,
  });

  makeTest({
    title: 'ProfileImgContainer - basic render',
    component: ProfileImgContainer,
  });

  makeTest({
    title: 'ProfileImg - basic render',
    component: ProfileImg,
  });

  makeTest({
    title: 'ProfileLabelsContainer - basic render',
    component: ProfileLabelsContainer,
  });

  makeTest({
    title: 'ProfileTitle - basic render',
    component: ProfileTitle,
  });

  makeTest({
    title: 'ProfileSubtitle - basic render',
    component: ProfileSubtitle,
  });

  makeTest({
    title: 'ProfileBody - basic render',
    component: ProfileBody,
  });
});
