/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import Screener, {Steps} from 'screener-storybook/src/screener.js';

import {StarRating} from '../index.js';

export const name = 'rating-star';

export const component = () => {
  const selector = 'li:nth-child(5)';
  return (
    <Screener
      steps={new Steps()
        .wait(selector)
        .click(selector)
        .snapshot('starRating: five stars selected')
        .end()}
    >
      <StarRatingContainer />
    </Screener>
  );
};

class StarRatingContainer extends React.Component<{}, {value: number}> {
  state = {
    value: 3,
  };

  render() {
    return (
      <StarRating
        value={this.state.value}
        onChange={({value}) => this.setState({value})}
      />
    );
  }
}
