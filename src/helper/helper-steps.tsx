/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import ArrowLeft from '../icon/arrow-left.js';
import ArrowRight from '../icon/arrow-right.js';
import Check from '../icon/check.js';
import { Button, KIND, SHAPE } from '../button/index.js';
import { useStyletron } from '../styles/index.js';

import type { HelperStepsPropsT } from './types.js';

export function HelperSteps({ index, length, onFinish, onPrev, onNext }: HelperStepsPropsT) {
  const [css, theme] = useStyletron();

  const isLast = index === length - 1;

  return (
    <div
      className={css({
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
      })}
    >
      <Button disabled={index === 0} kind={KIND.secondary} onClick={onPrev} shape={SHAPE.circle}>
        <ArrowLeft size={20} />
      </Button>
      <div className={css({ display: 'flex' })}>
        {new Array(length).fill().map((_, i) => {
          return (
            <div
              key={i}
              className={css({
                height: '8px',
                width: '8px',
                backgroundColor:
                  i === index ? theme.colors.contentPrimary : theme.colors.backgroundTertiary,
                borderTopLeftRadius: '50%',
                borderTopRightRadius: '50%',
                borderBottomRightRadius: '50%',
                borderBottomLeftRadius: '50%',
                ':not(:last-child)': {
                  marginRight: '8px',
                },
              })}
            />
          );
        })}
      </div>
      <Button
        kind={isLast ? KIND.primary : KIND.secondary}
        onClick={isLast ? onFinish : onNext}
        shape={SHAPE.circle}
      >
        {isLast ? <Check size={20} /> : <ArrowRight size={20} />}
      </Button>
    </div>
  );
}
