import * as React from "react";
import { Toast, KIND, ToasterContainer } from "baseui/toast";

export default function Example() {
  return (
    <React.Fragment>
      <ToasterContainer />
      <Toast>Default info notification</Toast>
      <Toast kind={KIND.positive}>Positive notification</Toast>
      <Toast kind={KIND.warning}>Warning notification</Toast>
      <Toast kind={KIND.negative}>Negative notification</Toast>
    </React.Fragment>
  );
}
