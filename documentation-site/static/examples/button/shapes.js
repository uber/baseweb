import React from 'react';
import {Button, SHAPE} from 'baseui/button';

export default () => (
  <React.Fragment>
    <Button shape={SHAPE.default}>Default shape</Button>
    <Button shape={SHAPE.square}>Square shape</Button>
    <Button shape={SHAPE.round}>Round shape</Button>
  </React.Fragment>
);
