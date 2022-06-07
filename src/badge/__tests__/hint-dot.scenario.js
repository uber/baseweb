/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import { HintDot, COLOR } from '../index.js';
import { Button } from '../../button/index.js';
import Upload from '../../icon/upload.js';
import Alert from '../../icon/alert.js';
import { Tag, SIZE } from '../../tag/index.js';

const layout = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '50px',
};

export function Scenario() {
  return (
    <div>
      <div style={layout}>
        <HintDot color={COLOR.negative}>
          <Tag closeable={false} size={SIZE.medium}>
            Default
          </Tag>
        </HintDot>
        <HintDot color={COLOR.positive}>
          <Tag closeable={false} size={SIZE.medium}>
            Default
          </Tag>
        </HintDot>
        <HintDot color={COLOR.accent}>
          <Tag closeable={false} size={SIZE.medium}>
            Default
          </Tag>
        </HintDot>
        <HintDot color={COLOR.warning}>
          <Tag closeable={false} size={SIZE.medium}>
            Default
          </Tag>
        </HintDot>
        <HintDot color={COLOR.primary}>
          <Tag closeable={false} size={SIZE.medium}>
            Default
          </Tag>
        </HintDot>
      </div>

      <div style={layout}>
        <HintDot color={COLOR.negative} horizontalOffset="2px" verticalOffset="2px">
          <Tag closeable={false} size={SIZE.medium}>
            2px, 2px
          </Tag>
        </HintDot>
        <HintDot color={COLOR.positive} horizontalOffset="2px" verticalOffset="2px">
          <Tag closeable={false} size={SIZE.medium}>
            2px, 2px
          </Tag>
        </HintDot>
        <HintDot color={COLOR.accent} horizontalOffset="2px" verticalOffset="2px">
          <Tag closeable={false} size={SIZE.medium}>
            2px, 2px
          </Tag>
        </HintDot>
        <HintDot color={COLOR.warning} horizontalOffset="2px" verticalOffset="2px">
          <Tag closeable={false} size={SIZE.medium}>
            2px, 2px
          </Tag>
        </HintDot>
        <HintDot color={COLOR.primary} horizontalOffset="2px" verticalOffset="2px">
          <Tag closeable={false} size={SIZE.medium}>
            2px, 2px
          </Tag>
        </HintDot>
      </div>

      <div style={layout}>
        <HintDot color={COLOR.negative} horizontalOffset="3px" verticalOffset="3px">
          <Tag closeable={false} size={SIZE.large}>
            3px, 3px
          </Tag>
        </HintDot>
        <HintDot color={COLOR.positive} horizontalOffset="3px" verticalOffset="3px">
          <Tag closeable={false} size={SIZE.large}>
            3px, 3px
          </Tag>
        </HintDot>
        <HintDot color={COLOR.accent} horizontalOffset="3px" verticalOffset="3px">
          <Tag closeable={false} size={SIZE.large}>
            3px, 3px
          </Tag>
        </HintDot>
        <HintDot color={COLOR.warning} horizontalOffset="3px" verticalOffset="3px">
          <Tag closeable={false} size={SIZE.large}>
            3px, 3px
          </Tag>
        </HintDot>
        <HintDot color={COLOR.primary} horizontalOffset="3px" verticalOffset="3px">
          <Tag closeable={false} size={SIZE.large}>
            3px, 3px
          </Tag>
        </HintDot>
      </div>

      <div style={layout}>
        <HintDot color={COLOR.negative} horizontalOffset="1px" verticalOffset="1px">
          <Tag closeable={false} size={SIZE.small}>
            1px, 1px
          </Tag>
        </HintDot>
        <HintDot color={COLOR.positive} horizontalOffset="1px" verticalOffset="1px">
          <Tag closeable={false} size={SIZE.small}>
            1px, 1px
          </Tag>
        </HintDot>
        <HintDot color={COLOR.accent} horizontalOffset="1px" verticalOffset="1px">
          <Tag closeable={false} size={SIZE.small}>
            1px, 1px
          </Tag>
        </HintDot>
        <HintDot color={COLOR.warning} horizontalOffset="1px" verticalOffset="1px">
          <Tag closeable={false} size={SIZE.small}>
            1px, 1px
          </Tag>
        </HintDot>
        <HintDot color={COLOR.primary} horizontalOffset="1px" verticalOffset="1px">
          <Tag closeable={false} size={SIZE.small}>
            1px, 1px
          </Tag>
        </HintDot>
      </div>

      <div style={layout}>
        <HintDot>This is some text</HintDot>
      </div>

      <div style={layout}>
        <HintDot>
          <Upload size={64} />
        </HintDot>
        <HintDot>
          <Upload size={32} />
        </HintDot>
        <HintDot>
          <Alert size={64} />
        </HintDot>
        <HintDot>
          <Alert size={32} />
        </HintDot>
      </div>

      <div style={layout}>
        <HintDot>
          <Button>Button</Button>
        </HintDot>
      </div>
    </div>
  );
}
