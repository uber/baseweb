// @flow
import * as React from 'react';
import {H1, H2, H3, H4, H5, H6} from 'baseui/typography';

const textString =
  'We ignite opportunity by setting the world in motion.';

export default function Example() {
  return (
    <React.Fragment>
      <H1>{textString}</H1>
      <H2>{textString}</H2>
      <H3>{textString}</H3>
      <H4>{textString}</H4>
      <H5>{textString}</H5>
      <H6>{textString}</H6>
    </React.Fragment>
  );
}
