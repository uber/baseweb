// @flow
/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';

import Menulist from './menulist';
import StatefulContainer from './stateful-container';

import type {StatefulMenulistPropsT} from './types';

export default class StatefulMenuList extends React.Component<
  StatefulMenulistPropsT,
> {
  static defaultProps = {
    overrides: {},
  };

  render() {
    const {overrides, ...props} = this.props;
    return (
      <StatefulContainer {...props}>
        {renderProps => <Menulist {...renderProps} overrides={overrides} />}
      </StatefulContainer>
    );
  }
}
