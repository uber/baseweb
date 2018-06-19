// @flow
import * as React from 'react';
// TODO do we need to add styletron-react-core and styletron-standard to peer dependencies explicitly?
/* eslint-disable import/no-extraneous-dependencies */
import {createStyled} from 'styletron-react-core';
import {driver} from 'styletron-standard';
/* eslint-enable import/no-extraneous-dependencies */

import {ThemeContext} from './theme-provider';

const getInitialStyle = () => ({});

const wrapper = StyledComponent =>
  function withThemeHOC(props) {
    return (
      <ThemeContext.Consumer>
        {theme => <StyledComponent {...props} $theme={theme} />}
      </ThemeContext.Consumer>
    );
  };

export default createStyled({wrapper, getInitialStyle, driver});
