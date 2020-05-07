import * as React from 'react';
import {toaster, ToasterContainer} from 'baseui/toast';
import {Button} from 'baseui/button';

export default () => {
  const [toastKey, setToastKey] = React.useState(null);
  function showToast() {
    const key = toaster.info('This is the message.');
    setToastKey(key);
  }

  function closeToast() {
    if (toastKey) {
      toaster.clear(toastKey);
      setToastKey(null);
    }
  }

  return (
    <ToasterContainer>
      <Button onClick={showToast}>Show notification</Button>
      <Button onClick={closeToast}>Close notification</Button>
    </ToasterContainer>
  );
};
