/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import {Accordion, Panel} from '../index.js';

describe('Accordion', () => {
  const Component = props => (
    <Accordion {...props}>
      <Panel title="Accordion panel 1">panel 1</Panel>
      <Panel title="Accordion panel 2">panel 2</Panel>
      <Panel title="Accordion panel 3">panel 3</Panel>
    </Accordion>
  );

  test('basic render', () => {
    const component = mount(<Component />);
    expect(component).toMatchSnapshot('Accordion renders correctly');
  });

  test('basic render w/ SEO', () => {
    const component = mount(<Component renderAll />);
    const Panel1Content = component
      .find(Panel)
      .at(0)
      .text();
    expect(Panel1Content).not.toBe(null);
    const Panel2Content = component
      .find(Panel)
      .at(0)
      .text();
    expect(Panel2Content).not.toBe(null);
    const Panel3Content = component
      .find(Panel)
      .at(0)
      .text();
    expect(Panel3Content).not.toBe(null);
    expect(component).toMatchSnapshot(
      'Accordion renders all panel content with renderAll',
    );
  });
});
