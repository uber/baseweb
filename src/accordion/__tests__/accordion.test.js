/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {
  render,
  fireEvent,
  getByText,
  getByTestId,
  queryAllByText,
} from '@testing-library/react';

import {Accordion, Panel} from '../index.js';

describe('Accordion', () => {
  it('renders basic configuration', () => {
    const {container} = render(
      <Accordion
        overrides={{
          ContentAnimationContainer: {props: {'data-testid': 'transitionDiv'}},
        }}
      >
        <Panel title="Accordion panel 1">panel 1</Panel>
        <Panel title="Accordion panel 2">panel 2</Panel>
        <Panel title="Accordion panel 3">panel 3</Panel>
      </Accordion>,
    );
    const first = getByText(container, 'Accordion panel 1');
    expect(queryAllByText(container, 'panel 1').length).toBe(0);

    fireEvent.click(first);
    expect(queryAllByText(container, 'panel 1').length).toBe(1);

    const second = getByText(container, 'Accordion panel 2');
    fireEvent.click(second);
    fireEvent.transitionEnd(getByTestId(first.parentElement, 'transitionDiv'));
    expect(queryAllByText(container, 'panel 1').length).toBe(0);
    expect(queryAllByText(container, 'panel 2').length).toBe(1);

    getByText(container, 'Accordion panel 3');
  });

  it('can render all visibly hidden content for seo', () => {
    const {container} = render(
      <Accordion renderAll>
        <Panel title="Accordion panel 1">panel 1</Panel>
        <Panel title="Accordion panel 2">panel 2</Panel>
        <Panel title="Accordion panel 3">panel 3</Panel>
      </Accordion>,
    );
    getByText(container, 'panel 1');
    getByText(container, 'panel 2');
    getByText(container, 'panel 3');
  });
});
