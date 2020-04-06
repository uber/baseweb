/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {default as DeleteIcon} from '../delete.js';
import {ThemeProvider, LightTheme, styled} from '../../index.js';
import {mergeOverrideResources} from '../../helpers/override.js';
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

  const closeIconOverrides = mergeOverrideResources(
    {
      component: StyledCloseIcon,
      props: {
        ref: closeRef,
      },
    },
    CloseIconOverride,
  );

  return (
    <StyledBody>
      <DeleteIcon overrides={{Svg: closeIconOverrides}} />
      Stuff
    </StyledBody>
  );
};

// This scenario proves that icons from theme will not supercede local overrides
export default function Scenario() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Toast />
      </ThemeProvider>
    </div>
  );
}
