/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { ActionContent, ArtworkContent, BannerProps } from './types';

export { Banner } from './banner';
export * from './constants';
export * from './styled-components';
export * from './types';

/** @deprecated use ActionContent instead. To be removed in future versions.*/
export type ActionContentT = ActionContent;
/** @deprecated use ArtworkContent instead. To be removed in future versions.*/
export type ArtworkContentT = ArtworkContent;
/** @deprecated use BannerProps instead. To be removed in future versions.*/
export type PropsT = BannerProps;
