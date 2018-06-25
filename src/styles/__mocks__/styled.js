// @flow
import React from 'react';
import DEFAULT_THEME from '../../themes/light-theme';

type objOrFnT = {} | (({}) => {});

function styled(Base: string, objOrFn: objOrFnT) {
  return class MockStyledComponent extends React.Component<{}, {}> {
    static displayName = 'MockStyledComponent';

    state = {};

    static getDerivedStateFromProps(props: {}) {
      return {
        styles:
          typeof objOrFn === 'function'
            ? objOrFn({...props, $theme: DEFAULT_THEME})
            : objOrFn,
      };
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
