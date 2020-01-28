/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

import {Toast, TYPE} from '../toast/index.js';
import type {ToastPropsT, ToastPropsShapeT} from '../toast/types.js';

export default class Notification extends React.Component<ToastPropsT> {
  static defaultProps: ToastPropsShapeT = {
    notificationType: TYPE.inline,
    closeable: false,
  };

  render() {
    return <Toast data-baseweb="notification" {...this.props} />;
  }
}
