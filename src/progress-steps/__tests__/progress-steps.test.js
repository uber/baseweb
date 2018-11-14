/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {shallow} from 'enzyme';
import ProgressSteps from '../progress-steps';

let example;

describe('ProgressSteps', () => {
  beforeEach(() => {
    const steps = [];

    for (let x = 0; x < 5; x++) {
      steps.push(<div key={x}>Step {x}</div>);
    }

    example = shallow(<ProgressSteps current={3}>{steps}</ProgressSteps>);
  });

  it('applies isLast prop to child if element is last child', () => {
    expect(example.childAt(0)).toHaveProp('isLast', false);
    expect(example.childAt(1)).toHaveProp('isLast', false);
    expect(example.childAt(2)).toHaveProp('isLast', false);
    expect(example.childAt(3)).toHaveProp('isLast', false);
    expect(example.childAt(4)).toHaveProp('isLast', true);
  });

  it('applies isCompleted prop to child if element is rendered before the provided index', () => {
    expect(example.childAt(0)).toHaveProp('isCompleted', true);
    expect(example.childAt(1)).toHaveProp('isCompleted', true);
    expect(example.childAt(2)).toHaveProp('isCompleted', true);
    expect(example.childAt(3)).toHaveProp('isCompleted', false);
    expect(example.childAt(4)).toHaveProp('isCompleted', false);
  });

  it('applies isActive prop to child if element is rendered at the provided index', () => {
    expect(example.childAt(0)).toHaveProp('isActive', false);
    expect(example.childAt(1)).toHaveProp('isActive', false);
    expect(example.childAt(2)).toHaveProp('isActive', false);
    expect(example.childAt(3)).toHaveProp('isActive', true);
    expect(example.childAt(4)).toHaveProp('isActive', false);
  });

  it('applies step prop to child for the current index', () => {
    expect(example.childAt(0)).toHaveProp('step', 1);
    expect(example.childAt(1)).toHaveProp('step', 2);
    expect(example.childAt(2)).toHaveProp('step', 3);
    expect(example.childAt(3)).toHaveProp('step', 4);
    expect(example.childAt(4)).toHaveProp('step', 5);
  });
});
