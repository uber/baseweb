/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Notification, KIND} from 'baseui/notification';

export default function UnstableWarning() {
  return (
    <Notification
      overrides={{Body: {style: {width: 'auto'}}}}
      kind={KIND.warning}
    >
      <>
        This component is currently 'Unstable', which means that the
        functionality and API is subject to change in any version release. We
        publish unstable components so that feedback can be presented before
        aligning on a consistent design. Please see baseui's{' '}
        <a href="/discover-more/versioning-policy">versioning policy</a> for
        more information.
      </>
    </Notification>
  );
}
