// @flow
/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';

import Menulist from './menulist';
import StatefulContainer from './stateful-container';

import type {StatefulMenulistProps} from './types';

export default class StatefulMenuList extends React.Component<
  StatefulMenulistProps,
> {
  static defaultProps = {
    components: {},
  };

  render() {
    const {components, ...props} = this.props;
    return (
      <StatefulContainer {...props}>
        {renderProps => <Menulist {...renderProps} components={components} />}
      </StatefulContainer>
    );
  }
}
