/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {useStyletron} from '../styles/index.js';
import {Label1, Label2, Label3} from '../typography/index.js';

import type {ItemPropsT} from './types.js';

// TODO: set a default size
const Item = ({children, color, size = 5}: ItemPropsT) => {
  const [css] = useStyletron();
  const props = {
    color,
    className: css({
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      lineHeight: `${size}px`,
      height: `${size}px`,
      color,
    }),
  };
  if (size === 24) {
    return <Label3 {...props}>{children}</Label3>;
  } else if (size === 36) {
    return <Label2 {...props}>{children}</Label2>;
  } else {
    return <Label1 {...props}>{children}</Label1>;
  }
};

export default Item;
