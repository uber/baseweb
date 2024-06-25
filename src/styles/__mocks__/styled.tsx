/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { getInitialStyle } from 'styletron-standard';
import { LightTheme } from '../../themes';
import createMockTheme from '../../test/create-mock-theme';
import type { Theme } from '../../styles/types';
import type { StyletronComponent } from '../styled';

type ObjOrFn = {} | ((a: {}) => {});

type Props = {
  $style?: ObjOrFn;
  $theme?: Theme;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  forwardedRef: any;
};

type State = {
  styles?: {};
};

const MOCK_THEME = createMockTheme(LightTheme);
const IDENTITY = (x) => x;

export function useStyletron() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function css(styles: any) {
    return {
      label: 'useStyletron mock describes the applied css properties',
      ...styles,
    };
  }

  return [css, MOCK_THEME];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function styled(ElementName: string | React.ComponentType<any>, objOrFn: ObjOrFn = {}) {
  class MockStyledComponent extends React.Component<Props, State> {
    static displayName = 'MockStyledComponent';

    state = {} as State;

    static getDerivedStateFromProps(props: Props) {
      const styleFnArg = {
        ...props,
        // If we use defaultProps, $theme unnecessarily ends up in snapshots
        $theme: props.$theme || MOCK_THEME,
      };

      let styles = typeof objOrFn === 'function' ? objOrFn(styleFnArg) : objOrFn;

      // Check for runtime overrides
      let { $style } = props;
      if (typeof $style === 'function') {
        $style = $style(styleFnArg);
      }
      if ($style) {
        styles = { ...styles, ...$style };
      }

      return { styles };
    }

    getPassedProps() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { forwardedRef, ...restProps } = this.props;
      return Object.keys(restProps).reduce((acc, key) => {
        if (key[0] !== '$') {
          acc[key] = restProps[key];
        }
        return acc;
      }, {});
    }

    render() {
      return (
        <ElementName
          ref={this.props.forwardedRef}
          styled-component="true"
          test-style={JSON.stringify(this.state.styles, null, 2)}
          {...this.getPassedProps()}
        />
      );
    }
  }

  // @ts-expect-error
  MockStyledComponent.__STYLETRON__ = {
    getInitialStyle,
    wrapper: IDENTITY,
    base: ElementName,
  };

  return React.forwardRef<HTMLElement, Props>((props, ref) => (
    // @ts-ignore
    <MockStyledComponent forwardedRef={ref} {...props} />
  ));
}

export const withStyle = styled;

export function withWrapper(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  StyledElement: StyletronComponent<any, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wrapperFn: (a: StyletronComponent<any, any>) => (a: any) => any
) {
  // eslint-disable-next-line react/display-name,@typescript-eslint/no-explicit-any
  return React.forwardRef<any, any>((props, ref) =>
    wrapperFn(StyledElement)({ ref: ref, ...props, $theme: MOCK_THEME })
  );
}
