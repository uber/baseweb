/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {mount} from 'enzyme';

import {Avatar, StyledInitials} from '../index.js';

// manually trigger src load error. jsdom will not fire a load event
// https://github.com/jsdom/jsdom/issues/1816#issuecomment-310106280
function triggerLoadError(wrapper) {
  wrapper.instance().handleError();
  wrapper.update();
}

describe('Avatar', () => {
  it('applies expected accessibility attributes to img element', () => {
    const name = 'user name';
    const wrapper = mount(<Avatar name={name} src="valid-img-src.png" />);

    const image = wrapper.find('img');
    expect(image.getDOMNode().getAttribute('alt')).toBe(name);
  });

  it('does not render img element if image fails to load', () => {
    const wrapper = mount(
      <Avatar name="user name" src="invalid-img-src.png" />,
    );

    expect(wrapper.find('img')).toExist();
    triggerLoadError(wrapper);
    expect(wrapper.find('img')).not.toExist();
  });

  it('applies expected accessibility attributes to root by default', () => {
    const name = 'user name';
    const wrapper = mount(<Avatar name={name} src="invalid-img-src.png" />);
    const rootNode = wrapper.childAt(0).getDOMNode();

    expect(rootNode.getAttribute('aria-label')).toBeNull();
    expect(rootNode.getAttribute('role')).toBeNull();
  });

  it('applies expected accessibility attributes to root if image fails to load', () => {
    const name = 'user name';
    const wrapper = mount(<Avatar name={name} src="invalid-img-src.png" />);
    const rootNode = wrapper.childAt(0).getDOMNode();

    triggerLoadError(wrapper);
    expect(rootNode.getAttribute('aria-label')).toBe(name);
    expect(rootNode.getAttribute('role')).toBe('img');
  });

  it('renders user first 2 initials when image fails to load', () => {
    const name = 'user name';
    const wrapper = mount(<Avatar name={name} src="invalid-img-src.png" />);

    triggerLoadError(wrapper);
    expect(wrapper.find(StyledInitials).text()).toBe('UN');
  });

  it('only renders 2 initials if more names exist when image fails to load', () => {
    const name = 'user name surname';
    const wrapper = mount(<Avatar name={name} src="invalid-img-src.png" />);

    triggerLoadError(wrapper);
    expect(wrapper.find(StyledInitials).text()).toBe('UN');
  });

  it('only renders 1 initial if one name exists when image fails to load', () => {
    const name = 'user';
    const wrapper = mount(<Avatar name={name} src="invalid-img-src.png" />);

    triggerLoadError(wrapper);
    expect(wrapper.find(StyledInitials).text()).toBe('U');
  });

  it('only renders initial from name if src is not provided', () => {
    const name = 'user';
    const wrapper = mount(<Avatar name={name} />);

    expect(wrapper.find(StyledInitials).text()).toBe('U');
  });

  it('resets noImageAvailable flag when src is updated', done => {
    const wrapper = mount(
      <Avatar name="user name" src="invalid-img-src.png" />,
    );

    triggerLoadError(wrapper);
    expect(wrapper.state().noImageAvailable).toBeTruthy();
    wrapper.setProps({name: 'user name', src: 'valid-img-src.png'}, () => {
      setTimeout(() => {
        expect(wrapper.state().noImageAvailable).toBeFalsy();
        done();
      }, 0);
    });
  });
});
