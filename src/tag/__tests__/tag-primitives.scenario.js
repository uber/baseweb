/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global alert */
import * as React from 'react';
import {useStyletron} from '../../styles/index.js';
import {Tag, KIND, VARIANT} from '../index.js';

const customColor = '#4CA';

export default function Scenario() {
  const [css] = useStyletron();
  return (
    <React.Fragment>
      {[
        KIND.neutral,
        KIND.primary,
        KIND.accent,
        KIND.positive,
        KIND.warning,
        KIND.negative,
        KIND.orange,
        KIND.purple,
        KIND.brown,
      ].map(kind => (
        <div key={kind} className={css({display: 'flex'})}>
          <div className={css({marginRight: '20px'})}>
            <Tag kind={kind} closeable={false}>
              Label
            </Tag>
            <Tag kind={kind} onClick={() => alert('click')} closeable={false}>
              Label
            </Tag>
            <Tag kind={kind} variant={VARIANT.solid} closeable={false}>
              Label
            </Tag>
            <Tag kind={kind} disabled closeable={false}>
              Label
            </Tag>
          </div>
          <div>
            <Tag kind={kind} onActionClick={() => alert('action')}>
              Label
            </Tag>
            <Tag
              kind={kind}
              onClick={() => alert('click')}
              onActionClick={() => alert('action')}
            >
              Label
            </Tag>
            <Tag
              kind={kind}
              variant={VARIANT.solid}
              onActionClick={() => alert('action')}
            >
              Label
            </Tag>
            <Tag kind={kind} disabled onActionClick={() => alert('action')}>
              Label
            </Tag>
          </div>
        </div>
      ))}
      <div
        key={KIND.custom}
        color={customColor}
        className={css({display: 'flex'})}
      >
        <div className={css({marginRight: '20px'})}>
          <Tag kind={KIND.custom} color={customColor} closeable={false}>
            Label
          </Tag>
          <Tag
            kind={KIND.custom}
            color={customColor}
            onClick={() => alert('click')}
            closeable={false}
          >
            Label
          </Tag>
          <Tag
            kind={KIND.custom}
            color={customColor}
            variant={VARIANT.solid}
            closeable={false}
          >
            Label
          </Tag>
          <Tag
            kind={KIND.custom}
            color={customColor}
            disabled
            closeable={false}
          >
            Label
          </Tag>
        </div>
        <div>
          <Tag
            kind={KIND.custom}
            color={customColor}
            onActionClick={() => alert('action')}
          >
            Label
          </Tag>
          <Tag
            kind={KIND.custom}
            color={customColor}
            onClick={() => alert('click')}
            onActionClick={() => alert('action')}
          >
            Label
          </Tag>
          <Tag
            kind={KIND.custom}
            color={customColor}
            variant={VARIANT.solid}
            onActionClick={() => alert('action')}
          >
            Label
          </Tag>
          <Tag
            kind={KIND.custom}
            color={customColor}
            disabled
            onActionClick={() => alert('action')}
          >
            Label
          </Tag>
        </div>
      </div>
    </React.Fragment>
  );
}
