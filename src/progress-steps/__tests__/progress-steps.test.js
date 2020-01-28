/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {shallow} from 'enzyme';
import ProgressSteps from '../progress-steps.js';
import Step from '../step.js';

let example;

describe('ProgressSteps', () => {
  beforeEach(() => {
    const steps = [];

    for (let x = 0; x < 5; x++) {
      steps.push(<Step key={x}>Step {x}</Step>);
    }

    example = shallow(<ProgressSteps current={3}>{steps}</ProgressSteps>);
  });

  it('applies isLast prop to child if element is last child', () => {
    example.children().forEach((element, index) => {
      const isLast = index === 4;
      expect(element).toHaveProp('isLast', isLast);
    });
  });

  it('applies isCompleted prop to child if element is rendered before the provided index', () => {
    example.children().forEach((element, index) => {
      const isCompleted = index === 0 || index === 1 || index === 2;
      expect(element).toHaveProp('isCompleted', isCompleted);
    });
  });

  it('applies isActive prop to child if element is rendered at the provided index', () => {
    example.children().forEach((element, index) => {
      const isActive = index === 3;
      expect(element).toHaveProp('isActive', isActive);
    });
  });

  it('passes down overrides to the Step component', () => {
    const steps = [];
    const overrides = {
      Icon: {
        style: {
          backgroundColor: 'pink',
        },
      },
    };

    for (let x = 0; x < 5; x++) {
      steps.push(<Step key={x}>Step {x}</Step>);
    }

    const component = shallow(
      <ProgressSteps overrides={overrides} current={3}>
        {steps}
      </ProgressSteps>,
    );

    component.children().forEach((element, index) => {
      expect(element).toHaveProp('overrides', overrides);
    });
  });

  it('applies step prop to child for the current index', () => {
    example.children().forEach((element, index) => {
      const step = index + 1;
      expect(element).toHaveProp('step', step);
    });
  });
});
