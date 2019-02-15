/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {Unstable_StatefulCalendar as StatefulCalendar} from '../index.js';

export const name = 'Stateful range quick select';

export const component = () => <StatefulCalendar isRange enableQuickSelect />;
