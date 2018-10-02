/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */

import React from 'react';
import CheckboxExamples from '../src/checkbox/examples';
import ModalExamples from '../src/modal/examples';
import ButtonExamples from '../src/button/examples';
import CardExamples from '../src/card/examples';

const Examples = [
  CheckboxExamples,
  ModalExamples,
  ButtonExamples,
  CardExamples,
];

export default function() {
  // needs polyfill for IE
  const urlParams = new URLSearchParams(window.location.search);
  const suite = urlParams.get('suite');
  if (!suite) {
    return null;
  }
  const test = urlParams.get('test');
  if (!test) {
    return null;
  }
  let example, description;
  for (let i = 0; i < Examples.length; i++) {
    const exampleSuite = Examples[i];
    example = exampleSuite[test];
    if (example) {
      break;
    }
  }
  description = escape(test);
  if (example) {
    return (
      <div key={`example${description}`} id={description}>
        {example()}
      </div>
    );
  } else {
    return (
      <div>
        Test did not found! Suite: {suite}
        Test: {test}
      </div>
    );
  }
}
