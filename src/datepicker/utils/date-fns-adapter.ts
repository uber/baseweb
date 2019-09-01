/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import DateFnsUtils from '@date-io/date-fns';
import type { DateIOAdapter } from './types';

// @ts-expect-error todo DateIOAdapter types is not exactly correct
const adapter: DateIOAdapter<Date> = new DateFnsUtils({});

export default adapter;
