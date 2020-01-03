/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable import/no-extraneous-dependencies */

// core-js comes with Next.js. So, you can import it like below
import includes from 'core-js/library/fn/string/virtual/includes';
import repeat from 'core-js/library/fn/string/virtual/repeat';
import startsWith from 'core-js/library/fn/string/virtual/starts-with';
import endsWith from 'core-js/library/fn/string/virtual/ends-with';
import assign from 'core-js/library/fn/object/assign';

String.prototype.includes = includes;
String.prototype.repeat = repeat;
String.prototype.startsWith = startsWith;
String.prototype.endsWith = endsWith;
Object.assign = assign;
