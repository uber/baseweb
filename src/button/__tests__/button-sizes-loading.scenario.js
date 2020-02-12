/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {Button} from '../index.js';
import {SIZE} from '../constants.js';
import {useStyletron} from '../../styles/index.js';

export default function Scenario() {
  const [css] = useStyletron();

  return (
    <React.Fragment>
      <div
        className={css({display: 'flex', marginBottom: '12px', height: '64px'})}
      >
        <div>
          <Button size={SIZE.mini}>Mini</Button>
        </div>
        <div>
          <Button isLoading size={SIZE.mini}>
            Mini
          </Button>
        </div>
      </div>

      <div
        className={css({display: 'flex', marginBottom: '12px', height: '64px'})}
      >
        <div>
          <Button size={SIZE.compact}>Compact</Button>
        </div>
        <div>
          <Button isLoading size={SIZE.compact}>
            Compact
          </Button>
        </div>
      </div>

      <div
        className={css({display: 'flex', marginBottom: '12px', height: '64px'})}
      >
        <div>
          <Button size={SIZE.default}>Default</Button>
        </div>
        <div>
          <Button isLoading size={SIZE.default}>
            Default
          </Button>
        </div>
      </div>

      <div
        className={css({display: 'flex', marginBottom: '12px', height: '64px'})}
      >
        <div>
          <Button size={SIZE.large}>Large</Button>
        </div>
        <div>
          <Button isLoading size={SIZE.large}>
            Large
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}
