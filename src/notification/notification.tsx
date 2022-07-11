/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Toast, TYPE } from '../toast/index';
import type { ToastPropsT, ToastPropsShapeT } from '../toast/types';
import { mergeOverrides } from '../helpers/overrides';

export default class Notification extends React.Component<ToastPropsT> {
  static defaultProps: ToastPropsShapeT = {
    notificationType: TYPE.inline,
    closeable: false,
  };

  render() {
    const overrides = mergeOverrides(
      {
        Body: {
          style: ({ $theme }) => ({
            marginTop: $theme.sizing.scale600,
            marginRight: $theme.sizing.scale600,
            marginBottom: $theme.sizing.scale600,
            marginLeft: $theme.sizing.scale600,
          }),
        },
      },
      this.props.overrides
    );
    return <Toast data-baseweb="notification" {...this.props} overrides={overrides} />;
  }
}
