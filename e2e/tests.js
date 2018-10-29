/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable react/prop-types */
/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env browser */

import React from 'react';
import Checkbox from '../src/checkbox/examples';
import Modal from '../src/modal/examples';
import Button from '../src/button/examples';
import Card from '../src/card/examples';
import FormControl from '../src/form-control/examples';
import Menu from '../src/menu/examples';
import Pagination from '../src/pagination/examples';
import Popover from '../src/popover/examples';
import Radio from '../src/radio/examples';
import Select from '../src/select/examples';
import Tag from '../src/tag/examples';
import Textarea from '../src/textarea/examples';
import Tooltip from '../src/tooltip/examples';

const Examples = [
  Checkbox,
  Modal,
  Button,
  Card,
  FormControl,
  Menu,
  Pagination,
  Popover,
  Radio,
  Select,
  Tag,
  Textarea,
  Tooltip,
];

const createError = ({suite, test}) => {
  return (
    <div style={{background: 'red', padding: '10px'}}>
      <h1>Test or suite was not found 🤭</h1>

      <p>
        Suite: {suite} | Test: {test}
      </p>
      <p>
        If you see this error message, make sure you have added the component
        you are testing to the file e2e/tests.js.
      </p>
    </div>
  );
};
export default function showTestcase() {
  // needs polyfill for IE
  const urlParams = new URLSearchParams(window.location.search);
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
