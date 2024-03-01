import * as React from "react";

import { toaster, ToasterContainer } from "baseui/toast";
import { Button } from "baseui/button";

type INullableReactText = React.ReactText | null;

export default function Example() {
  const [toastKey, setToastKey] = React.useState<INullableReactText>(null);

  const showToast = () => setToastKey(toaster.info("This is the message.", {}));

  const closeToast = () => {
    if (toastKey) {
      toaster.clear(toastKey);
      setToastKey(null);
    }
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
