// @flow
import * as React from 'react';
import {createStyled, withStyleDeep} from 'styletron-react-core';
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

const baseStyled = createStyled({wrapper, getInitialStyle, driver});

// TODO: Need a flow expert to help remove this 'any' type
// eslint-disable-next-line flowtype/no-weak-types
export default function styledWrapper(...args: any) {
  // Also allow passing deep style overrides via $style prop
  // Ex: <StyledDiv $style={{color: 'red'}} />
  // Issue for supporting this natively in styletron:
  // https://github.com/rtsao/styletron/issues/221
  return withStyleDeep(baseStyled(...args), props => {
    const {$style} = props;
    if (typeof $style === 'function') {
      return $style(props);
    }
    return $style;
  });
}
