import React from 'react';
import {StatefulSlider} from 'baseui/slider';

export default () => (
  <StatefulSlider initialState={{value: [20]}} range={[0, 100]} />
);
