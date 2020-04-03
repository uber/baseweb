/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {render, fireEvent, getByTestId} from '@testing-library/react';

import {styled} from '../../styles/index.js';
import {Override, type OverrideT} from '../override.js';

describe('override hoc', () => {
  it('renders provided component with no overrides', () => {
    const StyledBase = styled('p', {color: 'blue'});
    const Base = Override(StyledBase);
    const {container} = render(<Base override={undefined}>text</Base>);
    const element = container.querySelector('p');
    expect(element.textContent).toBe('text');
    const style = JSON.parse(element.getAttribute('test-style'));
    expect(style.color).toBe('blue');
  });

  describe('style overrides', () => {
    it('applies static style override', () => {
      const StyledBase = styled('p', {color: 'blue'});
      const Base = Override(StyledBase);
      const override = {style: {backgroundColor: 'green'}};
      const {container} = render(<Base override={override}>text</Base>);
      const element = container.querySelector('p');
      const style = JSON.parse(element.getAttribute('test-style'));
      expect(style.color).toBe('blue');
      expect(style.backgroundColor).toBe(override.style.backgroundColor);
    });

    it('applies dynamic style override', () => {
      const StyledBase = styled('p', {color: 'blue'});
      const Base = Override(StyledBase);
      const override = {
        style: props => ({backgroundColor: props.$theme.colors.primary}),
      };
      const {container} = render(<Base override={override}>text</Base>);
      const element = container.querySelector('p');
      const style = JSON.parse(element.getAttribute('test-style'));
      expect(style.color).toBe('blue');
      expect(style.backgroundColor).toBe('$theme.colors.primary');
    });

    it('overwrites existing rule from static style override', () => {
      const StyledBase = styled('p', {color: 'blue'});
      const Base = Override(StyledBase);
      const override = {style: {color: 'green'}};
      const {container} = render(<Base override={override}>text</Base>);
      const element = container.querySelector('p');
      const style = JSON.parse(element.getAttribute('test-style'));
      expect(style.color).toBe('green');
    });

    it('overwrites existing rule from dynamic style override', () => {
      const StyledBase = styled('p', {color: 'blue'});
      const Base = Override(StyledBase);
      const override = {
        style: props => ({color: props.$theme.colors.primary}),
      };
      const {container} = render(<Base override={override}>text</Base>);
      const element = container.querySelector('p');
      const style = JSON.parse(element.getAttribute('test-style'));
      expect(style.color).toBe('$theme.colors.primary');
    });
  });

  describe('props overrides', () => {
    it('applies static props override', () => {
      const StyledBase = styled('p', {color: 'blue'});
      const Base = Override(StyledBase);
      const override = {props: {x: 'y'}};
      const {container} = render(<Base override={override}>text</Base>);
      const element = container.querySelector('p');
      expect(element.getAttribute('x')).toBe('y');
    });

    it('applies dynamic props override', () => {
      const StyledBase = styled('p', {color: 'blue'});
      const Base = Override(StyledBase);
      const override = {
        props: props => {
          return {...props, x: 'y'};
        },
      };
      const {container} = render(<Base override={override}>text</Base>);
      const element = container.querySelector('p');
      expect(element.getAttribute('x')).toBe('y');
    });

    it('overwrites existing prop from static props override', () => {
      const StyledBase = styled('p', {color: 'blue'});
      const Base = Override(StyledBase);
      const override = {props: {x: 'z'}};
      const {container} = render(
        <Base x="y" override={override}>
          text
        </Base>,
      );
      const element = container.querySelector('p');
      expect(element.getAttribute('x')).toBe('z');
    });

    it('overwrites existing prop from dynamic props override', () => {
      const StyledBase = styled('p', {color: 'blue'});
      const Base = Override(StyledBase);
      const override = {
        props: props => {
          return {...props, count: props.count + 1};
        },
      };
      const {container} = render(
        <Base count={1} override={override}>
          text
        </Base>,
      );
      const element = container.querySelector('p');
      expect(element.getAttribute('count')).toBe('2');
    });
  });

  describe('component overrides', () => {
    it('applies component from property', () => {
      const StyledBase = styled('p', {color: 'blue'});
      const StyledComponentOverride = styled('h1', {color: 'red'});
      const Base = Override(StyledBase);
      const override = {component: StyledComponentOverride};
      const {container} = render(<Base override={override}>text</Base>);
      const p = container.querySelector('p');
      expect(p).toBeNull();
      const h1 = container.querySelector('h1');
      expect(h1).not.toBeNull();
      expect(h1.textContent).toBe('text');
      const style = JSON.parse(h1.getAttribute('test-style'));
      expect(style.color).toBe('red');
    });

    it('applies component if only component provided', () => {
      const StyledBase = styled('p', {color: 'blue'});
      const StyledComponentOverride = styled('h1', {color: 'red'});
      const Base = Override(StyledBase);
      const override = StyledComponentOverride;
      const {container} = render(<Base override={override}>text</Base>);
      const p = container.querySelector('p');
      expect(p).toBeNull();
      const h1 = container.querySelector('h1');
      expect(h1).not.toBeNull();
      expect(h1.textContent).toBe('text');
      const style = JSON.parse(h1.getAttribute('test-style'));
      expect(style.color).toBe('red');
    });

    it('does not remount component on parent update', () => {
      const StyledBase = styled('div', {});
      const Base = Override(StyledBase);
      function Child(props: {overrides: {Base: OverrideT<{}>}}) {
        return (
          <div>
            <Base override={props.overrides.Base}>default children</Base>
          </div>
        );
      }

      // eslint-disable-next-line flowtype/no-weak-types
      function InputOverride(props: any) {
        return <input onChange={props.onChange} value={props.value} />;
      }

      function Parent() {
        const [value, setValue] = React.useState('');
        return (
          <Child
            overrides={{
              Base: {
                component: InputOverride,
                props: {
                  onChange: event => setValue(event.target.value),
                  value,
                },
              },
            }}
          />
        );
      }

      const {container} = render(<Parent />);
      const input = container.querySelector('input');
      fireEvent.change(input, {target: {value: 'abc'}});
      expect(input.getAttribute('value')).toBe('abc');
    });
  });

  describe('grandchild overrides', () => {
    it('can override a grandchild props with overrides api', () => {
      const StyledBase = styled('div', {});
      const Base = Override(StyledBase);
      function Grandchild(props: {overrides?: {Base: OverrideT<{}>}}) {
        const {overrides = {}} = props;
        return (
          <div>
            <Base override={overrides.Base}>default children</Base>
          </div>
        );
      }

      const GrandchildOverride = Override(Grandchild);
      function Child(props: {overrides?: {Grandchild: OverrideT<{}>}}) {
        const {overrides = {}} = props;
        return <GrandchildOverride override={overrides.Grandchild} />;
      }

      function Parent() {
        return (
          <Child
            overrides={{
              Grandchild: {
                props: {overrides: {Base: {props: {'data-testid': 'xyz'}}}},
              },
            }}
          />
        );
      }

      const {container} = render(<Parent />);
      const element = getByTestId(container, 'xyz');
      expect(element).not.toBeNull();
    });

    it('can override a grandchild styles with overrides api', () => {
      const StyledBase = styled('div', {});
      const Base = Override(StyledBase);
      function Grandchild(props: {overrides?: {Base: OverrideT<{}>}}) {
        const {overrides = {}} = props;
        return (
          <div>
            <Base override={overrides.Base}>default children</Base>
          </div>
        );
      }

      const GrandchildOverride = Override(Grandchild);
      function Child(props: {overrides?: {Grandchild: OverrideT<{}>}}) {
        const {overrides = {}} = props;
        return <GrandchildOverride override={overrides.Grandchild} />;
      }

      function Parent() {
        return (
          <Child
            overrides={{
              Grandchild: {
                props: {
                  overrides: {
                    Base: {
                      props: {'data-testid': 'xyz'},
                      style: {color: 'blue'},
                    },
                  },
                },
              },
            }}
          />
        );
      }

      const {container} = render(<Parent />);
      const element = getByTestId(container, 'xyz');
      const style = JSON.parse(element.getAttribute('test-style'));
      expect(style.color).toBe('blue');
    });

    it('can override a grandchild component with overrides api', () => {
      const StyledBase = styled('div', {});
      const Base = Override(StyledBase);
      function Grandchild(props: {overrides?: {Base: OverrideT<{}>}}) {
        const {overrides = {}} = props;
        return (
          <div>
            <Base override={overrides.Base}>default children</Base>
          </div>
        );
      }

      const GrandchildOverride = Override(Grandchild);
      function Child(props: {overrides?: {Grandchild: OverrideT<{}>}}) {
        const {overrides = {}} = props;
        return <GrandchildOverride override={overrides.Grandchild} />;
      }

      const PTag = styled('p', {});
      function Parent() {
        return (
          <Child
            overrides={{
              Grandchild: {
                props: {
                  overrides: {
                    Base: {
                      props: {'data-testid': 'xyz'},
                      component: PTag,
                    },
                  },
                },
              },
            }}
          />
        );
      }

      const {container} = render(<Parent />);
      const element = getByTestId(container, 'xyz');
      expect(element.tagName).toBe('P');
    });
  });
});
