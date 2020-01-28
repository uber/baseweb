import * as React from 'react';
import {StyledSpinnerNext, SIZE} from 'baseui/spinner';

export default () => (
  <React.Fragment>
    <StyledSpinnerNext $size={SIZE.small} />
    <StyledSpinnerNext $size={SIZE.medium} /> {/* Default */}
    <StyledSpinnerNext $size={SIZE.large} />
  </React.Fragment>
);
