/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import type {CardProps} from '../../legacy-dts/card';

export { default as Card, hasThumbnail } from './card';
export {
  Action as StyledAction,
  Body as StyledBody,
  Contents as StyledContents,
  HeaderImage as StyledHeaderImage,
  Thumbnail as StyledThumbnail,
  Title as StyledTitle,
  Root as StyledRoot,
  Root as StyledWrapper,
} from './styled-components';
export * from './types';
/** @deprecated To be removed in future versions */
type hasThumbnail = CardProps['hasThumbnail'];
