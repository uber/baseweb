/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {shallow} from 'enzyme';

import {ButtonGroup, Button} from '../index.js';

function buildSimpleWrapper(props = {}) {
  return shallow(
    <ButtonGroup {...props}>
      <Button />
      <Button />
      <Button />
    </ButtonGroup>,
  );
}

describe('ButtonGroup', () => {
  it('applies correct posiiton props to first child element', () => {
    const wrapper = buildSimpleWrapper();
    const first = wrapper.children().first();
    expect(first).toHaveProp('first', true);
    expect(first).toHaveProp('last', false);
  });

  it('applies correct position props to middle child element', () => {
    const wrapper = buildSimpleWrapper();
    const middle = wrapper.childAt(1);
    expect(middle).toHaveProp('first', false);
    expect(middle).toHaveProp('last', false);
  });

  it('applies correct position props to last child element', () => {
    const wrapper = buildSimpleWrapper();
    const last = wrapper.children().last();
    expect(last).toHaveProp('first', false);
    expect(last).toHaveProp('last', true);
  });

  it('propogates kind to children', () => {
    const kind = 'tertiary';
    const wrapper = buildSimpleWrapper({kind});
    wrapper.children().forEach(child => {
      expect(child).toHaveProp('kind', kind);
    });
  });

  it('propogates shape to children', () => {
    const shape = 'round';
    const wrapper = buildSimpleWrapper({shape});
    wrapper.children().forEach(child => {
      expect(child).toHaveProp('shape', shape);
    });
  });

  it('propogates size to children', () => {
    const size = 'compact';
    const wrapper = buildSimpleWrapper({size});
    wrapper.children().forEach(child => {
      expect(child).toHaveProp('size', size);
    });
  });

  it('propogates disabled to children', () => {
    const wrapper = buildSimpleWrapper({disabled: true});
    wrapper.children().forEach(child => {
      expect(child).toHaveProp('disabled', true);
    });
  });

  it('click event on child element triggers parent handler', () => {
    const handler = jest.fn();
    const wrapper = buildSimpleWrapper({onClick: handler});
    wrapper.children().forEach((child, index) => {
      child.simulate('click');
      expect(handler).toHaveBeenCalledTimes(index + 1);
    });
  });

  it('does not clobber click handler on child element', () => {
    const parentHandler = jest.fn();
    const childHandler = jest.fn();
    const wrapper = shallow(
      <ButtonGroup onClick={parentHandler}>
        <button onClick={childHandler} />
        <button />
      </ButtonGroup>,
    );

    const childWithHandler = wrapper.children().first();
    const childWithoutHandler = wrapper.children().last();

    childWithHandler.simulate('click');
    expect(parentHandler).toHaveBeenCalledTimes(1);
    expect(childHandler).toHaveBeenCalledTimes(1);

    childWithoutHandler.simulate('click');
    expect(parentHandler).toHaveBeenCalledTimes(2);
    expect(childHandler).toHaveBeenCalledTimes(1);
  });

  it('if disabled, click events do not call provided handler', () => {
    const handler = jest.fn();
    const wrapper = buildSimpleWrapper({disabled: true, onClick: handler});
    const child = wrapper.children().first();
    child.simulate('click');
    expect(handler).toHaveBeenCalledTimes(0);
  });

  it('sets no children as selected if selected prop is null value', () => {
    const wrapper = buildSimpleWrapper({selected: null});
    wrapper.children().forEach(child => {
      expect(child).toHaveProp('selected', false);
    });
  });

  it('sets no children as selected if selected prop is empty array', () => {
    const wrapper = buildSimpleWrapper({selected: []});
    wrapper.children().forEach(child => {
      expect(child).toHaveProp('selected', false);
    });
  });

  it('sets appropriate child as selected if selected prop is a number', () => {
    const selectedIndex = 2;
    const wrapper = buildSimpleWrapper({selected: selectedIndex});
    wrapper.children().forEach((child, index) => {
      expect(child).toHaveProp('selected', selectedIndex === index);
    });
  });

  it('sets appropriate child as selected if selected prop is an array', () => {
    const selectedIndicies = [0, 2];
    const wrapper = buildSimpleWrapper({selected: selectedIndicies});
    wrapper.children().forEach((child, index) => {
      expect(child).toHaveProp('selected', selectedIndicies.includes(index));
    });
  });
});
