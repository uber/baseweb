// @flow
import * as React from 'react';
import {Button, SHAPE} from 'baseui/button';
import Upload from 'baseui/icon/upload';

export default () => (
  <React.Fragment>
    <p>
      <Button>Default shape</Button>
    </p>
    <p>
      <Button shape={SHAPE.pill}>Pill shape</Button>
    </p>
    <p>
      <Button shape={SHAPE.round}>Round shape</Button>
    </p>
    <p>
      <Button shape={SHAPE.square}>
        <Upload />
      </Button>
    </p>
    <p>
      <Button shape={SHAPE.circle}>
        <Upload />
      </Button>
    </p>
  </React.Fragment>
);
