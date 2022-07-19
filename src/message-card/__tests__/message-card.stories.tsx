/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as MessageCardBasic } from './message-card.scenario';
import { Scenario as MessageCardTrailingImage } from './message-card-trailing-image.scenario';
import { Scenario as MessageCardSizes } from './message-card-sizes.scenario';

export const MessageCard = () => <MessageCardBasic />;
export const TrailingImage = () => <MessageCardTrailingImage />;
export const Sizes = () => <MessageCardSizes />;
