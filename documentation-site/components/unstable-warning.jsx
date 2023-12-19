/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
//      

import React from 'react';
import { Notification, KIND } from 'baseui/notification';
import { StyledLink } from 'baseui/link';
import Link from 'next/link';

export default function UnstableWarning() {
  return (
    <Notification overrides={{ Body: { style: { width: 'auto' } } }} kind={KIND.warning}>
      <>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        This component is currently 'Unstable', which means that the functionality and API is
        subject to change in any version release. We publish unstable components so that feedback
        can be presented before
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        aligning on a consistent design. Please see baseui's{' '}
        <Link href="/discover-more/versioning-policy">
          <StyledLink href="/discover-more/versioning-policy">versioning policy</StyledLink>
        </Link>{' '}
        for more information.
      </>
    </Notification>
  );
}
