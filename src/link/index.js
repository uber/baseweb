/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
// Styled elements
import * as React from 'react';
import {Link} from './styled-components.js';

// $FlowFixMe
export const StyledLink: React.AbstractComponent = React.forwardRef(
  (props, ref) => <Link data-baseweb="link" {...props} ref={ref} />,
);

StyledLink.__STYLETRON__ = Link.__STYLETRON__;
