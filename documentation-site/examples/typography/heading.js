// @flow
import * as React from 'react';
import {
  HeadingXXLarge,
  HeadingXLarge,
  HeadingLarge,
  HeadingMedium,
  HeadingSmall,
  HeadingXSmall,
} from 'baseui/typography';

const textString =
  'We ignite opportunity by setting the world in motion.';

export default function Example() {
  return (
    <React.Fragment>
      <HeadingXXLarge>{textString}</HeadingXXLarge>
      <HeadingXLarge>{textString}</HeadingXLarge>
      <HeadingLarge>{textString}</HeadingLarge>
      <HeadingMedium>{textString}</HeadingMedium>
      <HeadingSmall>{textString}</HeadingSmall>
      <HeadingXSmall>{textString}</HeadingXSmall>
    </React.Fragment>
  );
}
