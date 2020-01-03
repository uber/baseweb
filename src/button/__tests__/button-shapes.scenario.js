/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button, SHAPE, SIZE} from '../index.js';
import Upload from '../../icon/upload.js';
import ChevronRight from '../../icon/chevron-right.js';

export const name = 'button-shapes';

export const component = () => (
  <React.Fragment>
    <Button size={SIZE.large}>Default</Button>
    <br />
    <Button>Default</Button>
    <br />
    <Button size={SIZE.compact}>Default</Button>
    <br />
    <br />

    <Button shape={SHAPE.pill} size={SIZE.large}>
      Label
    </Button>
    <Button
      startEnhancer={() => <Upload />}
      endEnhancer={() => <ChevronRight />}
      shape={SHAPE.pill}
      size={SIZE.large}
    >
      Label
    </Button>
    <br />
    <Button shape={SHAPE.pill}>Label</Button>
    <Button
      startEnhancer={() => <Upload />}
      endEnhancer={() => <ChevronRight />}
      shape={SHAPE.pill}
    >
      Label
    </Button>
    <br />
    <Button shape={SHAPE.pill} size={SIZE.compact}>
      Label
    </Button>
    <Button
      startEnhancer={() => <Upload />}
      endEnhancer={() => <ChevronRight />}
      shape={SHAPE.pill}
      size={SIZE.compact}
    >
      Label
    </Button>
    <br />
    <br />

    <Button shape={SHAPE.round} size={SIZE.large}>
      <Upload />
    </Button>
    <br />
    <Button shape={SHAPE.round}>
      <Upload />
    </Button>
    <br />
    <Button shape={SHAPE.round} size={SIZE.compact}>
      <Upload />
    </Button>
    <br />
  </React.Fragment>
);
