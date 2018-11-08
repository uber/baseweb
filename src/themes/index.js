/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import createTheme from './creator';
import {primitives as lightThemePrimitives} from './light-theme-primitives';
import {LightThemeMove} from './light-theme-with-move';

export const LightTheme = createTheme(lightThemePrimitives);

export {LightThemeMove};

export * from './types';
