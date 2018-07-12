// @flow
import * as React from 'react';
import {createStyled} from 'styletron-react-core';
import {driver} from 'styletron-standard';

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
