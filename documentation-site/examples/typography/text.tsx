import * as React from "react";
import {
  ParagraphLarge,
  ParagraphMedium,
  ParagraphSmall,
  ParagraphXSmall,
  LabelLarge,
  LabelMedium,
  LabelSmall,
  LabelXSmall,
} from "baseui/typography";

const textString = "We ignite opportunity by setting the world in motion.";
const bodyString =
  "Good things happen when people can move, whether across town or towards their dreams. Opportunities appear, open up, become reality. What started as a way to tap a button to get a ride has led to billions of moments of human connection as people around the world go all kinds of places in all kinds of ways with the help of our technology.";

export default function Example() {
  return (
    <React.Fragment>
      <LabelLarge>{textString}</LabelLarge>
      <ParagraphLarge>{bodyString}</ParagraphLarge>
      <LabelMedium>{textString}</LabelMedium>
      <ParagraphMedium>{bodyString}</ParagraphMedium>
      <LabelSmall>{textString}</LabelSmall>
      <ParagraphSmall>{bodyString}</ParagraphSmall>
      <LabelXSmall>{textString}</LabelXSmall>
      <ParagraphXSmall>{bodyString}</ParagraphXSmall>
    </React.Fragment>
  );
}
