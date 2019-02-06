/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import Props from 'pretty-proptypes';

const API = props => {
  const {heading, api} = props;
  return <Props heading={heading} props={api} />;
};

export default API;
