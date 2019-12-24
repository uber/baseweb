// @flow

import {withStyle} from 'baseui';
import {StyledSpinnerNext} from 'baseui/spinner';

const ExtraLargeSpinner = withStyle(StyledSpinnerNext, {
  width: '96px',
  height: '96px',
  borderWidth: '12px',
  borderTopColor: 'pink',
});

export default ExtraLargeSpinner;
