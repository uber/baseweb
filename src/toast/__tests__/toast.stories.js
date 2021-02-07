/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import ToastDefault from './toast.scenario.js';
import ToasterFocus from './toaster-focus.scenario.js';
import Toaster from './toaster.scenario.js';

export const Toast = () => <ToastDefault />;
export const erFocus = () => <ToasterFocus />;
export const er = () => <Toaster />;
