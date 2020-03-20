/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {default as DeleteIcon} from '../delete.js';
import {ThemeProvider, LightTheme, styled} from '../../index.js';
import {getOverrides, mergeOverrides} from '../../helpers/overrides.js';
import {getSvgStyles} from '../../icon/styled-components.js';

const XSmallFilled = ({title, ...props}) => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
      <path
        d="M18.1 8.1l-2.2-2.2-3.9 4-3.9-4-2.2 2.2 4 3.9-4 3.9 2.2 2.2 3.9-4 3.9 4 2.2-2.2-4-3.9 4-3.9z"
        fill="currentColor"
      />
    </svg>
  );
};

const theme = {
  ...LightTheme,
  icons: {
    Delete: XSmallFilled,
  },
};

// ! All of these styles will be wiped out by the theme icons.
const StyledCloseIcon = styled('svg', props => {
  return {
    ...getSvgStyles(props),
    color: 'pink',
    order: 1,
  };
});

const StyledBody = styled('div', {
  display: 'flex',
});

const Toast = props => {
  const closeRef = React.useRef();
  const {CloseIcon: CloseIconOverride = {}} = props.overrides || {};
  // eslint-disable-next-line no-unused-vars
  const [CloseIcon, closeIconProps] = getOverrides(
    CloseIconOverride,
    StyledCloseIcon,
  );
  const closeIconOverrides = mergeOverrides(
    {
      Svg: {
        component: StyledCloseIcon,
        props: {
          ref: closeRef,
        },
      },
    },
    {Svg: CloseIconOverride},
  );
  return (
    <StyledBody>
      <DeleteIcon {...closeIconProps} overrides={closeIconOverrides} />
      Stuff
    </StyledBody>
  );
};

export default function Scenario() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Toast />
      </ThemeProvider>
    </div>
  );
}
