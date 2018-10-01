/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import StatefulSliderContainer from './stateful-slider-container';
import Slider from './slider';

export default function StatefulSlider(props) {
  return (
    <StatefulSliderContainer {...props}>
      {(childrenProps) => <Slider {...childrenProps} />}
    </StatefulSliderContainer>
  );
}
