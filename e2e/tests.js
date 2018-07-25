// @flow

import React from 'react';
import PopoverExamples from '../src/components/popover/examples';
import CheckboxExamples from '../src/components/checkbox/examples';
import window from 'global/window';

const Examples = [PopoverExamples, CheckboxExamples];

export default function() {
  // needs polyfill for IE
  const urlParams = new URLSearchParams(window.location.search);
  const suite = urlParams.get('suite');
  if (!suite) {
    return null;
  }
  const test = urlParams.get('test');
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
    // eslint-disable-next-line no-console
    console.error(`NOT_FOUND_TEST: Test ${test} is not found, please, check`);
    return null;
  }
}
