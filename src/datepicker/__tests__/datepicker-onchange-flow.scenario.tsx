/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Datepicker } from '../index';

// regression test for onChange and onRangeChange type definitions
export function Scenario() {
  const [singleInferred, setSingleInferred] = React.useState();
  const [rangeInferred, setRangeInferred] = React.useState([]);
  const [monomorphic, setMonomorphic] = React.useState<Array<Date>>([]);
  const [polymorphic, setPolymorphic] = React.useState<Array<Date | undefined | null>>([]);
  const [covariant, setCovariant] = React.useState<ReadonlyArray<Date | undefined | null>>([]);

  return (
    <div>
      <Datepicker onChange={({ date }) => setSingleInferred(date)} value={singleInferred} />

      <Datepicker onChange={({ date }) => setRangeInferred(date)} range value={rangeInferred} />

      <Datepicker
        onChange={({ date }) => Array.isArray(date) && setMonomorphic(date)}
        range
        value={monomorphic}
      />

      <Datepicker
        // Flow cannot cast Array<Date> to explicitly set Array<?Date>. Polymorphic
        // state could be typed as $ReadOnlyArray. See covariant case below.
        // $FlowExpectedError
        onChange={({ date }) => Array.isArray(date) && setPolymorphic(date)}
        // date property of onRangeChange is of type Array<?Date>
        onRangeChange={({ date }) => Array.isArray(date) && setPolymorphic(date)}
        range
        value={polymorphic}
      />

      <Datepicker
        onChange={({ date }) => Array.isArray(date) && setCovariant(date)}
        range
        value={covariant}
      />
    </div>
  );
}
