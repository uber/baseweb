/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {mount, shallow} from 'enzyme';
import {StarRating} from '../index.js';

describe('StarRating', () => {
  let example, onChangeSpy;

  beforeEach(() => {
    onChangeSpy = jest.fn();
    example = shallow(<StarRating value={2} onChange={onChangeSpy} />);
  });

  describe('Root', () => {
    it('applies correct accessibility attributes to the Root element', () => {
      expect(example).toHaveProp('role', 'radiogroup');
    });

    it('removes previewIndex if mouse leaves', () => {
      example.simulate('mouseLeave');
      expect(example).toHaveState('previewIndex', undefined);
    });

    it('renders the correct number of items provided', () => {
      example = shallow(
        <StarRating value={2} numItems={10} onChange={onChangeSpy} />,
      );
      expect(example.children()).toHaveLength(10);
    });
  });

  describe('RatingItem', () => {
    it('applies correct props if item is active', () => {
      expect(example.childAt(0)).toMatchSnapshot();
    });

    it('calls onChange if item is clicked', () => {
      example.childAt(1).simulate('click');

      expect(onChangeSpy).toHaveBeenCalledWith({value: 2});
    });

    it('calls onChange if item is keyed with arrow right', () => {
      example.childAt(1).simulate('keyDown', {keyCode: 39});
      expect(onChangeSpy).toHaveBeenCalledWith({value: 3});
    });

    it('calls onChange if item is keyed with arrow left', () => {
      example.childAt(1).simulate('keyDown', {keyCode: 37});
      expect(onChangeSpy).toHaveBeenCalledWith({value: 1});
    });

    it('updates previewIndex if item is moused over', () => {
      example.childAt(3).simulate('mouseOver');
      expect(example).toHaveState('previewIndex', 4);
    });

    it('removes previewIndex if item is blurred', () => {
      example.childAt(3).simulate('blur');
      expect(example).toHaveState('previewIndex', undefined);
    });
  });

  describe('Mount', () => {
    it('renders 5 stars by default', () => {
      const mountedStarRating = mount(
        <StarRating value={2} onChange={onChangeSpy} />,
      );

      expect(mountedStarRating.find('li')).toHaveLength(5);
    });
  });
});
