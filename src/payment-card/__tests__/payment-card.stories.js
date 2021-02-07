/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import PaymentCardDefault from './payment-card.scenario.js';
import StatefulPaymentCard from './stateful-payment-card.scenario.js';

export const PaymentCard = () => <PaymentCardDefault />;
export const Stateful = () => <StatefulPaymentCard />;
