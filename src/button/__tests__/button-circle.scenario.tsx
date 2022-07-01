/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import { useStyletron } from '../../index.js';
import { Button, SHAPE, SIZE, KIND } from '../index.js';
import Upload from '../../icon/upload.js';

export function Scenario() {
  const [css] = useStyletron();
  return (
    <React.Fragment>
      <div>
        <Button key={`circle-kind-primary`} shape={SHAPE.circle} kind={KIND.primary}>
          GM
        </Button>
        <span className={css({ display: 'inline-block', width: '10px' })} />
        <Button key={`circle-kind-secondary`} shape={SHAPE.circle} kind={KIND.secondary}>
          GM
        </Button>
        <span className={css({ display: 'inline-block', width: '10px' })} />
        <Button key={`circle-kind-tertiary`} shape={SHAPE.circle} kind={KIND.tertiary}>
          GM
        </Button>
      </div>
      <br />
      <div>
        <Button key={`circle-size-mini`} shape={SHAPE.circle} size={SIZE.mini}>
          GM
        </Button>
        <span className={css({ display: 'inline-block', width: '10px' })} />
        <Button key={`circle-size-compact`} shape={SHAPE.circle} size={SIZE.compact}>
          GM
        </Button>
        <span className={css({ display: 'inline-block', width: '10px' })} />
        <Button key={`circle-size-default`} shape={SHAPE.circle} size={SIZE.default}>
          GM
        </Button>
        <span className={css({ display: 'inline-block', width: '10px' })} />
        <Button key={`circle-size-large`} shape={SHAPE.circle} size={SIZE.large}>
          GM
        </Button>
      </div>
      <br />
      <div>
        <Button shape={SHAPE.circle}>
          <Upload size={24} />
        </Button>
      </div>
    </React.Fragment>
  );
}
