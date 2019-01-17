import React from 'react';
import {Spinner} from 'baseui/spinner';

export default () => (
  <React.Fragment>
    <Spinner />
    <br />
    <Spinner size={72} />
  </React.Fragment>
);
