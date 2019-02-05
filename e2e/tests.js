/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable react/prop-types */
/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env browser */

import React from 'react';

import FileUploader from '../src/file-uploader/examples.js';
import FormControl from '../src/form-control/examples.js';
import Input from '../src/input/examples.js';
import Menu from '../src/menu/examples.js';
import Modal from '../src/modal/examples.js';
import Pagination from '../src/pagination/examples.js';
import Popover from '../src/popover/examples.js';
import ProgressSteps from '../src/progress-steps/examples.js';
import Radio from '../src/radio/examples.js';
import Select from '../src/select/examples.js';
import Tabs from '../src/tabs/examples.js';
import Tag from '../src/tag/examples.js';
import Textarea from '../src/textarea/examples.js';
import Tooltip from '../src/tooltip/examples.js';

import scenarios from '../src/**/*.scenario.js';

const Examples = [
  FileUploader,
  FormControl,
  Input,
  Modal,
  Menu,
  Pagination,
  Popover,
  ProgressSteps,
  Radio,
  Select,
  Tabs,
  Tag,
  Textarea,
  Tooltip,
];

const createError = ({name, suite, test}) => {
  return (
    <div style={{background: 'red', padding: '10px'}}>
      <h1>
        Test or suite was not found{' '}
        <span role="img" aria-label="Face With Hand Over Mouth">
          🤭
        </span>
      </h1>

      {(suite || test) && (
        <React.Fragment>
          <p>
            Suite: {suite} | Test: {test}
          </p>
          <p>
            If you see this error message, check the following: component you
            are testing to the file e2e/tests.js.
          </p>
        </React.Fragment>
      )}

      {!!name && (
        <React.Fragment>
          <p>Name: {name}</p>
          <p>
            If you see this error message, double check your scenario file to
            ensure that you have specified the correct name export.
          </p>
        </React.Fragment>
      )}
    </div>
  );
};

export default function showTestcase() {
  // needs polyfill for IE
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');

  if (name) {
    const scenario = scenarios.find(s => s.name === name);
    if (!scenario) {
      return createError({name});
    }

    return <div>{scenario.component()}</div>;
  }

  const suite = urlParams.get('suite');
  const test = urlParams.get('test');
  if (!suite || !test) {
    return createError({suite, test});
  }

  const Component = Examples.find(currentExample => {
    return currentExample[test];
  });

  const example = Component[test];

  if (!example) {
    return createError({suite, test});
  }

  const description = escape(test);

  return (
    <div key={`example${description}`} id={description}>
      {example()}
    </div>
  );
}
