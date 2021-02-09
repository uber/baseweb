/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import CardImageLink from './card-image-link.scenario.js';
import CardImageObject from './card-image-object.scenario.js';
import CardTextOnly from './card-text-only.scenario.js';
import CardDefault from './card.scenario.js';

export const ImageLink = () => <CardImageLink />;
export const ImageObject = () => <CardImageObject />;
export const TextOnly = () => <CardTextOnly />;
export const Card = () => <CardDefault />;
