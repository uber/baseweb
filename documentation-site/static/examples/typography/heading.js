import * as React from 'react';
import {H1, H2, H3, H4, H5, H6} from 'baseui/typography';

const textString = 'We ignite opportunity by setting the world in motion.';

export default () => (
  <React.Fragment>
    <H6>{`H6 - ${textString}`}</H6>
    <H5>{`H5 - ${textString}`}</H5>
    <H4>{`H4 - ${textString}`}</H4>
    <H3>{`H3 - ${textString}`}</H3>
    <H2>{`H2 - ${textString}`}</H2>
    <H1>{`H1 - ${textString}`}</H1>
  </React.Fragment>
);
