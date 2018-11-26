/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import React from 'react';
import {Rating, KIND} from './';
import examples from './examples-list';

type ExampleState = {
  value?: number,
};

export default {
  [examples.DEFAULT]: function Story1() {
    class Example extends React.Component<{}, ExampleState> {
      state = {};

      render() {
        return (
          <Rating
            value={this.state.value}
            onChange={({value}) => this.setState({value})}
          />
        );
      }
    }

    return <Example />;
  },
  [examples.EMOTICON]: function Story2() {
    class Example extends React.Component<{}, ExampleState> {
      state = {};

      render() {
        return (
          <Rating
            kind={KIND.emoticon}
            value={this.state.value}
            onChange={({value}) => this.setState({value})}
          />
        );
      }
    }

    return <Example />;
  },
};
