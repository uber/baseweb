import * as React from "react";
import { Button, KIND } from "baseui/button";
import { Upload, ArrowRight } from "baseui/icon";

export default function Example() {
  return (
    <React.Fragment>
      <p>
        <Button
          kind={KIND.secondary}
          startEnhancer={() => <ArrowRight size={24} title="" />}
          endEnhancer={() => <Upload size={24} title="" />}
        >
          BackgroundSafe: off
        </Button>
      </p>
      <p>
        <Button
          kind={KIND.secondary}
          startEnhancer={() => <ArrowRight size={24} title="" />}
          endEnhancer={() => <Upload size={24} title="" />}
          backgroundSafe
        >
          BackgroundSafe: on
        </Button>
      </p>
    </React.Fragment>
  );
}
