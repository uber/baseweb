/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import Block from '../block/block.js';
import {LevelContext} from './heading-level.js';
import type {HeadingPropsT} from './types.js';

const FONTS = [
  '',
  'font1050',
  'font950',
  'font850',
  'font750',
  'font650',
  'font550',
];

const Heading = ({styleLevel, ...restProps}: HeadingPropsT) => (
  <LevelContext.Consumer>
    {level => {
      if (level === 0) {
        throw new Error(
          'Heading component must be a descendant of HeadingLevel component.',
        );
      }
      if (level > 6) {
        throw new Error(
          `HeadingLevel cannot be nested ${level} times. The maximum is 6 levels.`,
        );
      }
      if (
        typeof styleLevel !== 'undefined' &&
        (styleLevel < 1 || styleLevel > 6)
      ) {
        throw new Error(`styleLevel = ${styleLevel} is out of 1-6 range.`);
      }
      return (
        <Block
          data-baseweb="heading"
          as={`h${level}`}
          font={styleLevel ? FONTS[styleLevel] : FONTS[level]}
          color="contentPrimary"
          {...restProps}
        />
      );
    }}
  </LevelContext.Consumer>
);

export default Heading;
