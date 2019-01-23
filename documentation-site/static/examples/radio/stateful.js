import React from 'react';
import {StyledRadio, StatefulRadioGroup} from 'baseui/radio';

export default () => (
  <StatefulRadioGroup name="choose one option" initialState={{value: '2'}}>
    <StyledRadio value="1">First</StyledRadio>
    <StyledRadio value="2">Second</StyledRadio>
    <StyledRadio value="3">Third</StyledRadio>
  </StatefulRadioGroup>
);
