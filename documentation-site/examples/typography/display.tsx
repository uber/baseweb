import * as React from 'react';
import {
  DisplayLarge,
  DisplayMedium,
  DisplaySmall,
  DisplayXSmall,
} from 'baseui/typography';

const textString =
  'We ignite opportunity by setting the world in motion.';

export default function Example() {
  return (
    <React.Fragment>
      <DisplayLarge marginBottom="scale500">
        {textString}
      </DisplayLarge>
      <DisplayMedium marginBottom="scale500">
        {textString}
      </DisplayMedium>
      <DisplaySmall marginBottom="scale500">
        {textString}
      </DisplaySmall>
      <DisplayXSmall>{textString}</DisplayXSmall>
    </React.Fragment>
  );
}
