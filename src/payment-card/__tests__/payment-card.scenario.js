/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {PaymentCard} from '../index.js';

export const name = 'payment-card';

export const component = () => (
  <React.Fragment>
    <PaymentCard value="378282246310005" />
    <br />
    <PaymentCard value="36259600000004" />
    <br />
    <PaymentCard value="6011111111111117" />
    <br />
    <PaymentCard value="6550000000000001" />
    <br />
    <PaymentCard value="3530111333300000" />
    <br />
    <PaymentCard value="6304000000000000" />
    <br />
    <PaymentCard value="5555555555554444" />
    <br />
    <PaymentCard value="6246729687894613" />
    <br />
    <PaymentCard value="4111111111111111" />
  </React.Fragment>
);
