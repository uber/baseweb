import React from 'react';
import {Button, SHAPE} from 'baseui/button';
import Upload from 'baseui/icon/upload';

export default () => (
  <React.Fragment>
    <p>
      <Button shape={SHAPE.default}>Default shape</Button>
    </p>
    <p>
      <Button shape={SHAPE.square}>
        <Upload />
      </Button>
    </p>
    <p>
      <Button shape={SHAPE.round}>
        <Upload />
      </Button>
    </p>
  </React.Fragment>
);
