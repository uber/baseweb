// @flow
import * as React from 'react';
import {
  AspectRatioBox,
  AspectRatioBoxBody,
} from 'baseui/aspect-ratio-box';

export default function Example() {
  return (
    <AspectRatioBox width="scale1400">
      <AspectRatioBoxBody
        as="img"
        src="https://api.adorable.io/avatars/285/11@adorable.io.png"
      />
    </AspectRatioBox>
  );
}
