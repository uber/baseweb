/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global alert */
import * as React from 'react';
import {Upload} from '../../icon/index.js';
import {useStyletron} from '../../styles/index.js';
import {Tag, KIND, VARIANT} from '../index.js';

const customColor = '#26c6da';

function Content() {
  return (
    <React.Fragment>
      <Upload overrides={{Svg: {style: {paddingRight: '12px'}}}} /> Label
    </React.Fragment>
  );
}

export default function Scenario() {
  const [css] = useStyletron();
  return (
    <React.Fragment>
      <br />
      {/* SEMANTIC TAGS */}
      {[
        KIND.neutral,
        KIND.primary,
        KIND.accent,
        KIND.positive,
        KIND.negative,
        KIND.warning,
      ].map(kind => (
        <div key={kind} className={css({display: 'flex'})}>
          <div className={css({marginRight: '20px'})}>
            <Tag kind={kind} onClick={() => alert('click')} closeable={false}>
              <Content />
            </Tag>
            <Tag
              kind={kind}
              onClick={() => alert('click')}
              closeable={false}
              variant={VARIANT.solid}
            >
              <Content />
            </Tag>
            <Tag kind={kind} disabled closeable={false}>
              <Content />
            </Tag>
          </div>
          <div>
            <Tag
              kind={kind}
              onClick={() => alert('click')}
              onActionClick={() => alert('action')}
            >
              <Content />
            </Tag>
            <Tag
              kind={kind}
              variant={VARIANT.solid}
              onClick={() => alert('click')}
              onActionClick={() => alert('action')}
            >
              <Content />
            </Tag>
            <Tag kind={kind} disabled onActionClick={() => alert('action')}>
              <Content />
            </Tag>
          </div>
        </div>
      ))}
      <br />
      {/* PRIMITIVE TAGS */}
      {[
        KIND.black,
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
            <Tag kind={kind} onClick={() => alert('click')} closeable={false}>
              <Content />
            </Tag>
            <Tag
              kind={kind}
              onClick={() => alert('click')}
              closeable={false}
              variant={VARIANT.solid}
            >
              <Content />
            </Tag>
            <Tag kind={kind} disabled closeable={false}>
              <Content />
            </Tag>
          </div>
          <div>
            <Tag
              kind={kind}
              onClick={() => alert('click')}
              onActionClick={() => alert('action')}
            >
              <Content />
            </Tag>
            <Tag
              kind={kind}
              variant={VARIANT.solid}
              onClick={() => alert('click')}
              onActionClick={() => alert('action')}
            >
              <Content />
            </Tag>
            <Tag kind={kind} disabled onActionClick={() => alert('action')}>
              <Content />
            </Tag>
          </div>
        </div>
      ))}
      <br />
      {/* CUSTOM TAG */}
      <div
        key={KIND.custom}
        color={customColor}
        className={css({display: 'flex'})}
      >
        <div className={css({marginRight: '20px'})}>
          <Tag
            kind={KIND.custom}
            color={customColor}
            onClick={() => alert('click')}
            closeable={false}
          >
            <Content />
          </Tag>
          <Tag
            kind={KIND.custom}
            color={customColor}
            onClick={() => alert('click')}
            closeable={false}
            variant={VARIANT.solid}
          >
            <Content />
          </Tag>
          <Tag
            kind={KIND.custom}
            color={customColor}
            disabled
            closeable={false}
          >
            <Content />
          </Tag>
        </div>
        <div>
          <Tag
            kind={KIND.custom}
            color={customColor}
            onClick={() => alert('click')}
            onActionClick={() => alert('action')}
          >
            <Content />
          </Tag>
          <Tag
            kind={KIND.custom}
            color={customColor}
            variant={VARIANT.solid}
            onClick={() => alert('click')}
            onActionClick={() => alert('action')}
          >
            <Content />
          </Tag>
          <Tag
            kind={KIND.custom}
            color={customColor}
            disabled
            onActionClick={() => alert('action')}
          >
            <Content />
          </Tag>
        </div>
      </div>
    </React.Fragment>
  );
}
