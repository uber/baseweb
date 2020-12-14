// @flow
import * as React from 'react';
import {
  Label1,
  Label2,
  Label3,
  Label4,
  Paragraph1,
  Paragraph2,
  Paragraph3,
  Paragraph4,
} from 'baseui/typography';

const textString =
  'We ignite opportunity by setting the world in motion.';
const bodyString =
  'Good things happen when people can move, whether across town or towards their dreams. Opportunities appear, open up, become reality. What started as a way to tap a button to get a ride has led to billions of moments of human connection as people around the world go all kinds of places in all kinds of ways with the help of our technology.';

export default function Example() {
  return (
    <React.Fragment>
      <Label1>{textString}</Label1>
      <Paragraph1>{bodyString}</Paragraph1>
      <Label2>{textString}</Label2>
      <Paragraph2>{bodyString}</Paragraph2>
      <Label3>{textString}</Label3>
      <Paragraph3>{bodyString}</Paragraph3>
      <Label4>{textString}</Label4>
      <Paragraph4>{bodyString}</Paragraph4>
    </React.Fragment>
  );
}
