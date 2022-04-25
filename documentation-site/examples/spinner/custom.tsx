import {withStyle} from 'baseui';
import {Spinner} from 'baseui/spinner';

const ExtraLargeSpinner = withStyle(Spinner, {
  width: '96px',
  height: '96px',
  borderLeftWidth: '12px',
  borderRightWidth: '12px',
  borderTopWidth: '12px',
  borderBottomWidth: '12px',
  borderTopColor: 'pink',
});

export default ExtraLargeSpinner;
