// @flow
/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';

import Menu from './menu';
import StatefulContainer from './stateful-container';

import type {StatefulMenuPropsT} from './types';

export default class StatefulMenu extends React.Component<StatefulMenuPropsT> {
  static defaultProps = {
    overrides: {},
  };

  render() {
    const {overrides, ...props} = this.props;
    return (
      <StatefulContainer {...props}>
        {renderProps => <Menu {...renderProps} overrides={overrides} />}
      </StatefulContainer>
    );
  }
}
