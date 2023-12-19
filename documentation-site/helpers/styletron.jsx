/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* global document */

import {
  Client,
  Server,
} from "styletron-engine-monolithic";

export const isServer = typeof window === "undefined";

const getHydrate = () =>
  document.getElementsByClassName("_styletron_hydrate_");

export const styletron = isServer
  ? new Server()
  : new Client({ hydrate: getHydrate() });
