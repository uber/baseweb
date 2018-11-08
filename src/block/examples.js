/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import React from 'react';
import {Block} from './';
import examples from './examples-list';

export default {
  [examples.DEFAULT]: function Story1() {
    const colors = ['primary', 'negative', 'warning', 'positive'];
    const elements = [];

    for (const color of colors) {
      for (let x = 100; x <= 700; x += 100) {
        const colorString = `${color}${x}`;
        elements.push(<Block color={colorString}>{colorString}</Block>);
      }
    }

    return elements;
  },
  [examples.FONTS]: function Story2() {
    const sizes = [
      100,
      200,
      250,
      300,
      350,
      400,
      450,
      500,
      600,
      700,
      800,
      900,
      1000,
    ];
    const elements = [];

    for (const size of sizes) {
      const fontString = `font${size}`;
      elements.push(<Block font={fontString}>{fontString}</Block>);
    }

    return elements;
  },
  [examples.FLEXBOX]: function Story3() {
    return (
      <Block
        color="primary"
        font="font500"
        height="500px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        Centered with flexbox
      </Block>
    );
  },
};
