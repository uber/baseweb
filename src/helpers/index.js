// @flow
import * as React from 'react';

export function withProps(Component: React.ComponentType<*>, customProps: {}) {
  return function withPropsHOC(props: {}) {
    return <Component {...customProps} {...props} />;
  };
}
