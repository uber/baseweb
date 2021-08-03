// @flow
import * as React from 'react';

import {toaster, ToasterContainer} from 'baseui/toast';
import {Button} from 'baseui/button';

export default function Example() {
  const [toastKey, setToastKey] = React.useState(null);

  const showToast = () =>
    setToastKey(toaster.info('This is the message.'));

  const closeToast = () => {
    toaster.clear(toastKey);
    setToastKey(null);
  };

  return (
    <React.Fragment>
      <ToasterContainer />
      <Button onClick={showToast}>Show notification</Button>
      <Button disabled={!toastKey} onClick={closeToast}>
        Close notification
      </Button>
    </React.Fragment>
  );
}
