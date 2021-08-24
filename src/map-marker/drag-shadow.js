/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {Block} from '../block/index.js';
import * as React from 'react';
import {useStyletron} from '../styles/index.js';

const DragShadow = ({background, dragging, height}) => {
  const [css, theme] = useStyletron();
  const {
    animation: {timing300, easeOutCurve},
    lighting: {shadow600},
  } = theme;
  const width = 6;

  return (
    <Block
      className={css({
        width: `${width}px`,
        height: `${height}px`,
        opacity: dragging ? 1 : 0,
        visibility: dragging ? 'visible' : 'hidden',
        transition: `${timing300} ${easeOutCurve} all`,
        position: 'relative',
        boxShadow: shadow600,
      })}
    >
      <Block
        className={css({
          background,
          borderRadius: '50%',
          width: `${width}px`,
          height: `${4}px`,
          position: 'absolute',
          bottom: 0,
        })}
      />
    </Block>
  );
};

export default DragShadow;
