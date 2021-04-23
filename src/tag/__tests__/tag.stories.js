/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import TagLongText from './tag-long-text.scenario.js';
import TagSize from './tag-size.scenario.js';
import TagDefault from './tag.scenario.js';

export const LongText = () => <TagLongText />;
export const Size = () => <TagSize />;
export const Tag = () => <TagDefault />;
