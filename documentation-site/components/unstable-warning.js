/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {StyledLink} from 'baseui/link';
import {KIND, Notification} from 'baseui/notification';
import Link from 'next/link';
import React from 'react';

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
        <Link href="/discover-more/versioning-policy">
          <StyledLink href="/discover-more/versioning-policy">
            versioning policy
          </StyledLink>
        </Link>{' '}
        for more information.
      </>
    </Notification>
  );
}
