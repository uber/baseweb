/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Scenario as CardImageLink} from './card-image-link.scenario.js';
import {Scenario as CardImageObject} from './card-image-object.scenario.js';
import {Scenario as CardTextOnly} from './card-text-only.scenario.js';
import {Scenario as CardDefault} from './card.scenario.js';
import {Scenario as CardHeaderLevel} from './card-header-level.scenario.js';

export const ImageLink = () => <CardImageLink />;
export const ImageObject = () => <CardImageObject />;
export const TextOnly = () => <CardTextOnly />;
export const Card = () => <CardDefault />;
export const HeaderLevel = () => <CardHeaderLevel />;
