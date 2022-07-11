/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Avatar } from '../index';

const src = 'https://avatars.dicebear.com/api/human/yard.svg?width=285&mood=happy';

export function Scenario() {
  const [displayImage, setDisplayImage] = React.useState(false);
  return (
    <div>
      <div>
        <button onClick={() => setDisplayImage((prev) => !prev)}>toggle image</button>
      </div>
      <Avatar name={'user name'} src={displayImage ? src : undefined} />
    </div>
  );
}
