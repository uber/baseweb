/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Block} from '../../block/index.js';
import {TimezonePicker} from '../index.js';

export const name = 'timezone-picker';

const overrides = {
  Select: {
    props: {overrides: {ValueContainer: {props: {'data-id': 'selected'}}}},
  },
};

// eslint-disable-next-line flowtype/no-weak-types
class Controlled extends React.Component<any, any> {
  state = {value: [{id: 'Asia/Tokyo'}]};

  render() {
    return (
      <div data-e2e="controlled">
        controlled
        <TimezonePicker
          value={this.state.value}
          onChange={({value}) => this.setState({value})}
          overrides={overrides}
        />
      </div>
    );
  }
}

export const component = () => (
  <Block width="400px">
    <div data-e2e="daylight">
      daylight savings time:
      <TimezonePicker date={new Date(2019, 3, 1)} overrides={overrides} />
    </div>

    <div data-e2e="standard">
      standard time:
      <TimezonePicker date={new Date(2019, 2, 1)} overrides={overrides} />
    </div>

    <Controlled />
  </Block>
);
