/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global alert */
import * as React from 'react';
import { Upload } from '../../icon';
import { useStyletron } from '../../styles';
import { Tag, KIND, SIZE, VARIANT } from '..';

const customColor = '#26c6da';

export function Scenario() {
  const [css] = useStyletron();
  return (
    <React.Fragment>
      <div>
        <Tag size={SIZE.small} startEnhancer={() => <Upload />}>
          Label
        </Tag>
        <br />
        <Tag size={SIZE.medium} startEnhancer={() => <Upload size={16} />}>
          Label
        </Tag>
        <br />
        <Tag size={SIZE.large} startEnhancer={() => <Upload size={18} />}>
          Label
        </Tag>
      </div>

      {/* SEMANTIC TAGS */}
      {[KIND.neutral, KIND.primary, KIND.accent, KIND.positive, KIND.negative, KIND.warning].map(
        (kind) => (
          <div key={kind} className={css({ display: 'flex' })}>
            <div className={css({ marginRight: '20px' })}>
              <Tag
                startEnhancer={() => <Upload />}
                kind={kind}
                onClick={() => alert('click')}
                closeable={false}
              >
                Label
              </Tag>
              <Tag
                startEnhancer={() => <Upload />}
                kind={kind}
                onClick={() => alert('click')}
                closeable={false}
                variant={VARIANT.solid}
              >
                Label
              </Tag>
              <Tag startEnhancer={() => <Upload />} kind={kind} disabled closeable={false}>
                Label
              </Tag>
            </div>
            <div>
              <Tag
                startEnhancer={() => <Upload />}
                kind={kind}
                onClick={() => alert('click')}
                onActionClick={() => alert('action')}
              >
                Label
              </Tag>
              <Tag
                startEnhancer={() => <Upload />}
                kind={kind}
                variant={VARIANT.solid}
                onClick={() => alert('click')}
                onActionClick={() => alert('action')}
              >
                Label
              </Tag>
              <Tag
                startEnhancer={() => <Upload />}
                kind={kind}
                disabled
                onActionClick={() => alert('action')}
              >
                Label
              </Tag>
            </div>
          </div>
        )
      )}

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
      ].map((kind) => (
        <div key={kind} className={css({ display: 'flex' })}>
          <div className={css({ marginRight: '20px' })}>
            <Tag
              startEnhancer={() => <Upload />}
              kind={kind}
              onClick={() => alert('click')}
              closeable={false}
            >
              Label
            </Tag>
            <Tag
              startEnhancer={() => <Upload />}
              kind={kind}
              onClick={() => alert('click')}
              closeable={false}
              variant={VARIANT.solid}
            >
              Label
            </Tag>
            <Tag startEnhancer={() => <Upload />} kind={kind} disabled closeable={false}>
              Label
            </Tag>
          </div>
          <div>
            <Tag
              startEnhancer={() => <Upload />}
              kind={kind}
              onClick={() => alert('click')}
              onActionClick={() => alert('action')}
            >
              Label
            </Tag>
            <Tag
              startEnhancer={() => <Upload />}
              kind={kind}
              variant={VARIANT.solid}
              onClick={() => alert('click')}
              onActionClick={() => alert('action')}
            >
              Label
            </Tag>
            <Tag
              startEnhancer={() => <Upload />}
              kind={kind}
              disabled
              onActionClick={() => alert('action')}
            >
              Label
            </Tag>
          </div>
        </div>
      ))}

      <br />
      {/* CUSTOM TAG */}
      <div key={KIND.custom} color={customColor} className={css({ display: 'flex' })}>
        <div className={css({ marginRight: '20px' })}>
          <Tag
            startEnhancer={() => <Upload />}
            kind={KIND.custom}
            color={customColor}
            onClick={() => alert('click')}
            closeable={false}
          >
            Label
          </Tag>
          <Tag
            startEnhancer={() => <Upload />}
            kind={KIND.custom}
            color={customColor}
            onClick={() => alert('click')}
            closeable={false}
            variant={VARIANT.solid}
          >
            Label
          </Tag>
          <Tag
            startEnhancer={() => <Upload />}
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
            startEnhancer={() => <Upload />}
            kind={KIND.custom}
            color={customColor}
            onClick={() => alert('click')}
            onActionClick={() => alert('action')}
          >
            Label
          </Tag>
          <Tag
            startEnhancer={() => <Upload />}
            kind={KIND.custom}
            color={customColor}
            variant={VARIANT.solid}
            onClick={() => alert('click')}
            onActionClick={() => alert('action')}
          >
            Label
          </Tag>
          <Tag
            startEnhancer={() => <Upload />}
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
