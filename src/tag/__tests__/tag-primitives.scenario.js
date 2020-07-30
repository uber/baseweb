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
        KIND.blue,
        KIND.red,
        KIND.orange,
        KIND.yellow,
        KIND.green,
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
            <Tag kind={kind}>Label</Tag>
            <Tag kind={kind} onClick={() => alert('click')}>
              Label
            </Tag>
            <Tag kind={kind} variant={VARIANT.solid}>
              Label
            </Tag>
            <Tag kind={kind} disabled>
              Label
            </Tag>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}
