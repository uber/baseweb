/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {shallow} from 'enzyme';
import {EmoticonRating} from '../index.js';

describe('EmoticonRating', () => {
  let example, onChangeSpy;

  beforeEach(() => {
    onChangeSpy = jest.fn();
    example = shallow(<EmoticonRating value={2} onChange={onChangeSpy} />);
  });

  describe('Root', () => {
    it('applies correct accessibility attributes to the Root element', () => {
      expect(example).toHaveProp('tabIndex', 0);
      expect(example).toHaveProp('role', 'radiogroup');
    });

    it('removes previewIndex if mouse leaves', () => {
      example.simulate('mouseLeave');
      expect(example).toHaveState('previewIndex', undefined);
    });
  });

  describe('RatingItem', () => {
    it('applies correct props if item is active', () => {
      expect(example.childAt(0)).toMatchSnapshot();
    });

    it('applies correct props if item is selected', () => {
      example.childAt(1).simulate('focus');
      example.update();

      expect(example.childAt(1)).toMatchSnapshot();
    });

    it('calls onChange if item is clicked', () => {
      example.childAt(1).simulate('click');

      expect(onChangeSpy).toHaveBeenCalledWith({value: 2});
    });

    it('calls onChange if item is keyed with spacebar', () => {
      example.childAt(1).simulate('keyDown', {keyCode: 32});

      expect(onChangeSpy).toHaveBeenCalledWith({value: 2});
    });

    it('calls onChange if item is keyed with enter', () => {
      example.childAt(1).simulate('keyDown', {keyCode: 13});

      expect(onChangeSpy).toHaveBeenCalledWith({value: 2});
    });

    it('updates previewIndex if item is focused', () => {
      example.childAt(3).simulate('focus');
      expect(example).toHaveState('previewIndex', 4);
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
});
