/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Scenario as RatingEmoticon} from './rating-emoticon.scenario.js';
import {Scenario as RatingSize} from './rating-size.scenario.js';
import {Scenario as RatingStar} from './rating-star.scenario.js';

export const Emoticon = () => <RatingEmoticon />;
export const Size = () => <RatingSize />;
export const Star = () => <RatingStar />;
