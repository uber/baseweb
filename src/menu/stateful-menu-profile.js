// @flow
/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';

import MenuProfile from './menu-profile';
import StatefulContainer from './stateful-container';

import type {StatefulMenuProfilePropsT} from './types';

export default class StatefulMenu extends React.PureComponent<
  StatefulMenuProfilePropsT,
> {
  static defaultProps = {
    overrides: {},
  };

  render() {
    const {
      overrides,
      getProfileItemLabels,
      getProfileItemImg,
      getProfileItemImgText,
      ...props
    } = this.props;
    return (
      <StatefulContainer {...props}>
        {renderProps => (
          <MenuProfile
            {...renderProps}
            getProfileItemLabels={getProfileItemLabels}
            getProfileItemImg={getProfileItemImg}
            getProfileItemImgText={getProfileItemImgText}
            overrides={overrides}
          />
        )}
      </StatefulContainer>
    );
  }
}
