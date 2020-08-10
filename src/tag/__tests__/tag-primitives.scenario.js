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

export default function Scenario() {
  const [css] = useStyletron();
  return (
    <React.Fragment>
      {[
        KIND.black,
        KIND.white,
        KIND.blue,
        KIND.green,
        KIND.yellow,
        KIND.red,
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
    </React.Fragment>
  );
}
