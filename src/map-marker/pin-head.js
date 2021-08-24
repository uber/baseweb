/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {useStyletron} from '../styles/index.js';
import {Label1, Label2, Label3} from '../typography/index.js';
import {Block} from '../block/index.js';
import type {ItemPropsT, PinHeadPropsT} from './types.js';
import {PINHEAD_SIZES, PINHEAD_TYPES} from './constants.js';
const sizes = {
  small: {height: 24, icon: 16},
  medium: {height: 36, icon: 16},
  large: {height: 48, icon: 24},
};

const Item = ({children, color, size}: ItemPropsT) => {
  const [css] = useStyletron();
  const props = {
    color,
    className: css({
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      lineheight: size,
      height: size,
      color,
    }),
  };
  if (size === 24) {
    return <Label3 {...props}>{children}</Label3>;
  } else if (size === 36) {
    return <Label2 {...props}>{children}</Label2>;
  } else {
    return <Label1 {...props}>{children}</Label1>;
  }
};

const PinHead = ({
  size = PINHEAD_SIZES.medium,
  label = '',
  startEnhancer = null,
  endEnhancer = null,
  color,
  background,
  type = PINHEAD_TYPES.fixed,
}: PinHeadPropsT) => {
  const [css, theme] = useStyletron();
  const {
    colors: {backgroundPrimary, primaryA},
    lighting: {shadow600},
  } = theme;

  color = color || backgroundPrimary;
  background = background || primaryA;

  const activeElements = [label, startEnhancer, endEnhancer].filter(x => x);
  const gridTemplateColumns = activeElements.map(() => 'auto').join(' ');
  const forceCircle = activeElements.length === 1 && !label;

  if (type === 'fixed' && size.includes('x-small')) {
    const round = size.includes('round');
    return (
      <Block
        className={css({
          background,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '16px',
          width: '16px',
          borderRadius: round ? '50%' : 0,

          boxShadow: shadow600,
        })}
      >
        <Block
          className={css({
            background: color,
            height: '4px',
            width: '4px',
            borderRadius: round ? '50%' : 0,
          })}
        />
      </Block>
    );
  }

  const {height, icon} = sizes[size];
  const sharedStyles = {
    fixed: {
      padding: '0px 12px',
      borderRadius: height + 'px',
    },
    floating: {
      padding: '0px 8px',
    },
  };

  return (
    <Block
      className={css({
        background,
        height: height + 'px',
        display: 'grid',
        gridTemplateColumns,
        gap: '8px',
        boxShadow: shadow600,
        whiteSpace: 'nowrap',
        ...sharedStyles[type],
        ...(forceCircle && {
          width: height + 'px',
          display: 'flex',
          justifyContent: 'center',
          boxSizing: 'border-box',
        }),
      })}
    >
      {startEnhancer && (
        <Item size={height} color={color}>
          {React.cloneElement(startEnhancer, {size: `${icon}px`}, null)}
        </Item>
      )}
      {label && (
        <Item size={height} color={color}>
          {label}
        </Item>
      )}
      {endEnhancer && (
        <Item size={height} color={color}>
          {React.cloneElement(endEnhancer, {size: `${icon}px`}, null)}
        </Item>
      )}
    </Block>
  );
};
export default PinHead;
