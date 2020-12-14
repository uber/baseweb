/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* global document */

import {Client, Server} from 'styletron-engine-atomic';
import {DebugEngine} from 'styletron-react';

export const isServer = typeof window === 'undefined';

const getHydrate = () => document.getElementsByClassName('_styletron_hydrate_');

export const styletron = isServer
  ? new Server()
  : new Client({hydrate: getHydrate()});

export const debug =
  /*eslint-disable*/
  process.env.NODE_ENV === 'production' ? void 0 : new DebugEngine();
