import {withStyle} from 'spaceweb';
import {StyledSpinnerNext} from 'spaceweb/spinner';

const ExtraLargeSpinner = withStyle(StyledSpinnerNext, {
  width: '96px',
  height: '96px',
  borderWidth: '12px',
  borderTopColor: 'pink',
});

export default ExtraLargeSpinner;
