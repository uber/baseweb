// @flow
/* eslint-disable import/prefer-default-export */
import React from 'react';

export function withProps(Component: any, customProps: {}) {
  return (props: {}) => <Component {...customProps} {...props} />;
}
/* eslint-enable import/prefer-default-export */
