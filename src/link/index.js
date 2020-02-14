/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
// Styled elements
import * as React from 'react';
import {Link} from './styled-components.js';
import {isFocusVisible, forkFocus, forkBlur} from '../utils/focusVisible.js';

// $FlowFixMe
export const StyledLink: React.AbstractComponent = React.forwardRef(
  (props, ref) => {
    const [focusVisible, setFocusVisible] = React.useState(false);
    const handleFocus = (event: SyntheticEvent<>) => {
      if (isFocusVisible(event)) {
        setFocusVisible(true);
      }
    };

    const handleBlur = (event: SyntheticEvent<>) => {
      if (focusVisible !== false) {
        setFocusVisible(false);
      }
    };
    return (
      <Link
        data-baseweb="link"
        $isFocusVisible={focusVisible}
        {...props}
        onFocus={forkFocus(props, handleFocus)}
        onBlur={forkBlur(props, handleBlur)}
        ref={ref}
      />
    );
  },
);

StyledLink.__STYLETRON__ = Link.__STYLETRON__;
