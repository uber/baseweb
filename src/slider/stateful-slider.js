/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import StatefulSliderContainer from './stateful-slider-container.js';
import Slider from './slider.js';
import type {StatefulSliderPropsT} from './types.js';

export default function StatefulSlider(props: StatefulSliderPropsT) {
  return (
    <StatefulSliderContainer {...props}>
      {childrenProps => <Slider {...childrenProps} />}
    </StatefulSliderContainer>
  );
}
