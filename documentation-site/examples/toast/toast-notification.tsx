import * as React from 'react';
import {Toast, KIND} from 'spaceweb/toast';

export default () => (
  <React.Fragment>
    <Toast>Default info notification</Toast>
    <Toast kind={KIND.positive}>Positive notification</Toast>
    <Toast kind={KIND.warning}>Warning notification</Toast>
    <Toast kind={KIND.negative}>Negative notification</Toast>
  </React.Fragment>
);
