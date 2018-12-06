/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {Node} from 'react';
import type {OverrideT} from '../helpers/overrides.js';

export type CardComponentsT = {
  Action?: OverrideT<?{}>,
  Body?: OverrideT<?{}>,
  Contents?: OverrideT<?{}>,
  HeaderImage?: OverrideT<?{}>,
  Root?: OverrideT<?{}>,
  Thumbnail?: OverrideT<?{}>,
  Title?: OverrideT<?{}>,
};

export type CardsPropsT = {
  +action?: Node,
  +children?: Node,
  +hasThumbnail: ({+thumbnail?: string}) => boolean,
  +headerImage?: string,
  +overrides: CardComponentsT,
  +thumbnail?: string,
  +title?: Node,
};
