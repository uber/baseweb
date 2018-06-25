// @flow
/* eslint-disable import/prefer-default-export */
import * as React from 'react';

export function withProps(Component: React.ComponentType<*>, customProps: {}) {
  return (props: {}) => <Component {...customProps} {...props} />;
}
/* eslint-enable import/prefer-default-export */
