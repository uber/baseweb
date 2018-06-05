// @flow
import React from 'react';
import LIGHT_THEME from '../../themes/light-theme';
import createMockTheme from '../../test/create-mock-theme';

type objOrFnT = {} | (({}) => {});

const MOCK_THEME = createMockTheme(LIGHT_THEME);

function styled(Base: string, objOrFn: objOrFnT) {
  return class MockStyledComponent extends React.Component<{}, {styles?: {}}> {
    static displayName = 'MockStyledComponent';

    state = {};

    static getDerivedStateFromProps(props: {}) {
      return {
        styles:
          typeof objOrFn === 'function'
            ? objOrFn({...props, $theme: MOCK_THEME})
            : objOrFn,
      };
    }

    getStyles() {
      return this.state.styles;
    }

    getPassedProps() {
      const {props} = this;
      return Object.keys(props).reduce((acc, key) => {
        if (key[0] !== '$') {
          acc[key] = props[key];
        }
        return acc;
      }, {});
    }

    render() {
      return <Base styled-component="true" {...this.getPassedProps()} />;
    }
  };
}

export default styled;
