/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render, getByTestId, getByText, fireEvent } from '@testing-library/react';

import { TestBaseProvider } from '../../test/test-utils';

import { Layer, LayersManager } from '..';

describe('Layer', () => {
  it('renders layer content', () => {
    const onMount = jest.fn();
    const content = 'Hello world';
    const { container } = render(
      <TestBaseProvider>
        <Layer onMount={onMount}>{content}</Layer>
      </TestBaseProvider>
    );
    getByText(container, content);
    expect(onMount).toBeCalledTimes(1);
  });

  it('accepts custom mountNode', () => {
    const content = 'Hello world';
    function TestCase() {
      const [, setMounted] = React.useState(false);
      const ref = React.useRef();
      return (
        <TestBaseProvider>
          <div data-testid="mount-node" ref={ref} />
          <Layer onMount={() => setMounted(true)} mountNode={ref.current ? ref.current : undefined}>
            {content}
          </Layer>
        </TestBaseProvider>
      );
    }
    const { container } = render(<TestCase />);
    expect(getByTestId(container, 'mount-node').textContent).toBe(content);
  });

  it('renders layers-manager as expected', () => {
    const onMount = jest.fn();
    const appContent = 'app-content';
    const layerContent = 'layer-content';
    const { container } = render(
      <LayersManager
        overrides={{
          AppContainer: { props: { 'data-testid': 'app-container' } },
          LayersContainer: { props: { 'data-testid': 'layers-container' } },
        }}
      >
        <p>{appContent}</p>
        <Layer onMount={onMount}>{layerContent}</Layer>
      </LayersManager>
    );

    const appContainer = getByTestId(container, 'app-container');
    expect(appContainer.children.length).toBe(1);
    expect(appContainer.children[0].textContent).toBe(appContent);

    const layersContainer = getByTestId(container, 'layers-container');
    expect(layersContainer.children.length).toBe(1);
    expect(layersContainer.children[0].textContent).toBe(layerContent);
  });

  it('renders multiple layers', () => {
    const contentOne = 'content 1';
    const contentTwo = 'content 2';
    const onMount = jest.fn();
    const { container } = render(
      <LayersManager
        overrides={{
          LayersContainer: { props: { 'data-testid': 'layers-container' } },
        }}
      >
        <strong>Hello world</strong>
        <Layer onMount={onMount}>{contentOne}</Layer>
        <Layer onMount={onMount}>{contentTwo}</Layer>
      </LayersManager>
    );
    const layersContainer = getByTestId(container, 'layers-container');
    expect(layersContainer.children.length).toBe(2);
    expect(layersContainer.children[0].textContent).toBe(contentOne);
    expect(layersContainer.children[1].textContent).toBe(contentTwo);
  });

  it('configures rendering order when index is provided', () => {
    const contentOne = 'content 1';
    const contentTwo = 'content 2';
    const { container } = render(
      <LayersManager
        overrides={{
          LayersContainer: { props: { 'data-testid': 'layers-container' } },
        }}
      >
        <strong>Hello world</strong>
        <Layer>{contentOne}</Layer>
        <Layer index={0}>{contentTwo}</Layer>
      </LayersManager>
    );
    const layersContainer = getByTestId(container, 'layers-container');
    expect(layersContainer.children.length).toBe(2);
    expect(layersContainer.children[0].textContent).toBe(contentTwo);
    expect(layersContainer.children[1].textContent).toBe(contentOne);
  });

  it('passes keyboard events only to the last layer', () => {
    const firstKeyHandler = jest.fn();
    const secondKeyHandler = jest.fn();

    const { container } = render(
      <LayersManager>
        <Layer onKeyPress={firstKeyHandler}>Layer 1</Layer>
        <Layer onKeyPress={secondKeyHandler}>Layer 2</Layer>
      </LayersManager>
    );

    fireEvent.keyPress(container, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(firstKeyHandler).toBeCalledTimes(0);
    expect(secondKeyHandler).toBeCalledTimes(1);
  });
});
