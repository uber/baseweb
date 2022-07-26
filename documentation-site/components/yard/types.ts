/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { TImportsConfig, TProp } from 'react-view';

export type TConfig = {
  componentName: string;
  scope: { [key: string]: any };
  props: { [key: string]: TProp };
  theme: string[];
  imports: TImportsConfig;
};

export type TYardProps = TConfig & {
  componentName: string;
  placeholderHeight: number;
  queryStringName?: string;
  compilerStyles: { [key: string]: any };
  initialTab?: string;
};
