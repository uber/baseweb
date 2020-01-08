/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

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

export type ImagePropsT = {
  alt?: string,
  complete?: boolean,
  crossOrigin?: string,
  currentSrc?: string,
  height?: number,
  decode?: Promise<void>,
  isMap?: boolean,
  naturalHeight?: number,
  naturalWidth?: number,
  sizes?: string,
  src?: string,
  srcset?: string,
  useMap?: string,
  width?: number,
};

export type CardsPropsT = {
  /** Contents to be rendered at the bottom of the Card. Used to organize UI which enables user action. */
  +action?: Node,
  /** Content to be rendered within the Card body. */
  +children?: Node,
  /** Function that takes Card props and returns a boolean that represents if a thumbnail will be rendered. */
  +hasThumbnail: ({+thumbnail?: string}) => boolean,
  /** Image to be positioned at the top of the Card. Can be a string representing the img src or an object with img attrs */
  +headerImage?: string | ImagePropsT,
  +overrides: CardComponentsT,
  /** Image src that by default is rendered to the side of children content. */
  +thumbnail?: string,
  /** Content to render above the body content. */
  +title?: Node,
};
