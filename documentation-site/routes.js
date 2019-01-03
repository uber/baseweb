/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

const isProd = process.env.BUILD_ENV === 'production';
const prefix = isProd ? '/beta' : '';

const getPath = path => `${prefix}${path}`;

const routes = [
  {
    text: 'Getting started',
    path: getPath('/getting-started'),
    children: [
      {
        text: 'Playground',
        path: getPath('/playground'),
      },
      {
        text: 'Versioning policy',
        path: getPath('/versioning-policy'),
      },
    ],
  },
  {
    text: 'Theming',
    path: getPath('/custom-themes'),
    children: [
      {
        text: 'Theming values',
        path: getPath('/theming-values'),
      },
    ],
  },
];

export default routes;
