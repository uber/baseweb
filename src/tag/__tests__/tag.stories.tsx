/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as TagLongText } from './tag-long-text.scenario';
import { Scenario as TagOverrides } from './tag-overrides.scenario';
import { Scenario as TagSize } from './tag-size.scenario';
import { Scenario as TagDefault } from './tag.scenario';
import { Scenario as TagStartEnhancer } from './tag-start-enhancer.scenario';

export const LongText = () => <TagLongText />;
export const Overrides = () => <TagOverrides />;
export const Size = () => <TagSize />;
export const Tag = () => <TagDefault />;
export const StartEnhancer = () => <TagStartEnhancer />;
