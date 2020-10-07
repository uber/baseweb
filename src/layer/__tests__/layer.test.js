/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {mount} from 'enzyme';

import {BaseProvider} from '../../index.js';

import {Layer, LayersManager} from '../index.js';

describe('Layer', () => {
  let wrapper;
  let mountNode;

  afterEach(() => {
    wrapper && wrapper.unmount();
    mountNode && mountNode.unmount();
    mountNode = null;
  });

  test('basic render', () => {
    const content = <strong>Hello world</strong>;
    const props = {
      onMount: jest.fn(),
      'data-id': 'data-id',
    };
    wrapper = mount(
      <BaseProvider>
        <Layer {...props}>{content}</Layer>
      </BaseProvider>,
    );

    const layerElement = wrapper.find(Layer);

    // Should render Layer
    expect(wrapper.length).toBe(1);
    expect(layerElement).not.toBeNull();
    // Should render the LayerComponent and pass props to it
    expect(layerElement.children().length).toBe(1);
    expect(layerElement.childAt(0)).toHaveDisplayName('LayerComponent');
    expect(layerElement.childAt(0)).toHaveProp(props);
    // Layer should have the content
    expect(layerElement.find('strong').first()).toExist();
    expect(layerElement).toHaveText('Hello world');
    // onMount should be called
    expect(props.onMount).toHaveBeenCalled();
  });

  test('custom mountNode', () => {
    mountNode = mount(<div />);
    const content = <strong>Hello world</strong>;
    const props = {
      onMount: jest.fn(),
      mountNode: mountNode.getDOMNode(),
    };
    wrapper = mount(
      <BaseProvider>
        <Layer {...props}>{content}</Layer>
      </BaseProvider>,
    );
    // mountNode should have the content
    expect(mountNode).toHaveText('Hello world');
    // onMount should be called
    expect(props.onMount).toHaveBeenCalled();
  });

  test('LayersManager', () => {
    const content = <strong>Hello layer</strong>;
    const props = {
      onMount: jest.fn(),
    };
    function App() {
      return (
        <div data-test="layers">
          <strong>Hello world</strong>
          <Layer {...props}>{content}</Layer>
        </div>
      );
    }
    wrapper = mount(
      <LayersManager>
        <App />
      </LayersManager>,
    );
    // Should render two containers
    expect(wrapper).toHaveDisplayName('LayersManager');
    expect(wrapper.children().length).toBe(2);

    // Should have the main content in the first container
    expect(wrapper.childAt(0)).toHaveText('Hello world');
    expect(wrapper.childAt(1)).not.toHaveText('Hello world');

    // LayerComponent gets host prop value set to the second container
    const hostNode = wrapper.childAt(1).getDOMNode();
    const layerComponent = wrapper
      .find(Layer)
      .first()
      .childAt(0);
    expect(layerComponent.props().host === hostNode).toBe(true);

    // onMount should be called
    expect(props.onMount).toHaveBeenCalled();
  });

  test('Layers rendering', () => {
    const content = 'Hello layer';
    const props = {
      onMount: jest.fn(),
    };
    function App() {
      return (
        <div data-test="layers">
          <strong>Hello world</strong>
          <Layer {...props}>{content} 1</Layer>
          <Layer {...props}>{content} 2</Layer>
        </div>
      );
    }
    wrapper = mount(
      <LayersManager>
        <App />
      </LayersManager>,
    );
    // Should have the later rendered layer prepended at the index 0
    // in a layers container (hostNode)
    const hostNode = wrapper.childAt(1).getDOMNode();
    expect(hostNode.children.length).toEqual(2);
    expect(hostNode.children[0].textContent).toEqual(`${content} 1`);
    expect(hostNode.children[1].textContent).toEqual(`${content} 2`);
  });

  test('Layers rendering order when index is passed in', () => {
    const content = 'Hello layer';
    const props = {
      onMount: jest.fn(),
    };
    function App() {
      return (
        <div data-test="layers">
          <strong>Hello world</strong>
          <Layer {...props}>{content} 1</Layer>
          <Layer {...props} index={0}>
            {content} 2
          </Layer>
        </div>
      );
    }
    wrapper = mount(
      <LayersManager>
        <App />
      </LayersManager>,
    );
    // Should have the later rendered layer prepended at the index 0
    // in a layers container (hostNode)
    const hostNode = wrapper.childAt(1).getDOMNode();
    expect(hostNode.children.length).toEqual(2);
    expect(hostNode.children[0].textContent).toEqual(`${content} 2`);
    expect(hostNode.children[1].textContent).toEqual(`${content} 1`);
  });
});
