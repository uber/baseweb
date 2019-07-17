/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable import/no-extraneous-dependencies */

import includes from 'core-js/features/string/includes';
import repeat from 'core-js/features/string/repeat';
import startsWith from 'core-js/features/string/starts-with';
import assign from 'core-js/features/object/assign';

String.prototype.includes = includes;
String.prototype.repeat = repeat;
String.prototype.startsWith = startsWith;
Object.assign = assign;
