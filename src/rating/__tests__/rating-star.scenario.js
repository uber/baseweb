/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StarRating} from '../index.js';

export const name = 'rating-star';

export const component = () => <StarRatingContainer />;

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
